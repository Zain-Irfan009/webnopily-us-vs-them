<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\Api\TemplateController;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Shopify\Auth\OAuth;
use Shopify\Auth\Session as AuthSession;
use Shopify\Clients\HttpHeaders;
use Shopify\Clients\Rest;
use Shopify\Context;
use Shopify\Utils;
use Shopify\Webhooks\Registry;
use Shopify\Webhooks\Topics;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::fallback(function (Request $request) {

    $shop = Utils::sanitizeShopDomain($request->query('shop'));
    $host = $request->query('host');
    $appInstalled = Session::where('shop', $shop)->exists();
    if ($appInstalled) {
//        dd(Context::$API_KEY,$shop,$host);

        $template_controller=new TemplateController();
        $session=Session::where('shop',$request->query('shop'))->first();
        $charge=\App\Models\Charge::where('shop_id',$session->id)->latest()->first();
        $url=null;
        if($charge==null ||$charge->status!='active') {
           $url= $template_controller->PlanCreate($request->query('shop'),$host);

        }
        return view('react', [
            'shop' => $shop,
            'host' => $host,
            'apiKey' => Context::$API_KEY,
            'url'=>$url
        ]);
    }
    return redirect("/login?shop=$shop");
});

Route::get('/login/toplevel', function (Request $request, Response $response) {
    $shop = Utils::sanitizeShopDomain($request->query('shop'));

    $response = new Response(view('top_level', [
        'apiKey' => Context::$API_KEY,
        'shop' => $shop,
        'hostName' => Context::$HOST_NAME,
    ]));

    $response->withCookie(cookie()->forever('shopify_top_level_oauth', '', null, null, true, true, false, 'strict'));

    return $response;
});

Route::get('/login', function (Request $request) {
    $shop = Utils::sanitizeShopDomain($request->query('shop'));

    if (!$request->hasCookie('shopify_top_level_oauth')) {
        return redirect("/login/toplevel?shop=$shop");
    }

    $installUrl = OAuth::begin(
        $shop,
        '/auth/callback',
        true,
        ['App\Lib\CookieHandler', 'saveShopifyCookie'],
    );

    return redirect($installUrl);
});

Route::get('check-charge',[App\Http\Controllers\ProductController::class,'CheckCharge']);


Route::get('/auth/callback', function (Request $request) {
    $session = OAuth::callback(
        $request->cookie(),
        $request->query(),
        ['App\Lib\CookieHandler', 'saveShopifyCookie'],
    );

    $host = $request->query('host');
    $shop = Utils::sanitizeShopDomain($request->query('shop'));

    $response = Registry::register('/webhooks/app-uninstall', Topics::APP_UNINSTALLED, $shop, $session->getAccessToken());
    $response_products_create = Registry::register('/webhooks/product-create', Topics::PRODUCTS_CREATE, $shop, $session->getAccessToken());
    $response_products_update = Registry::register('/webhooks/product-update', Topics::PRODUCTS_UPDATE, $shop, $session->getAccessToken());
    $response_products_delete = Registry::register('/webhooks/product-delete', Topics::PRODUCTS_DELETE, $shop, $session->getAccessToken());
    if ($response->isSuccess()) {
        Log::debug("Registered APP_UNINSTALLED webhook for shop $shop");
        $productcontroller = new ProductController();
        $productcontroller->SyncProdcuts($shop);

    } else {
        Log::error(
            "Failed to register APP_UNINSTALLED webhook for shop $shop with response body: " .
            print_r($response->getBody(), true)
        );
    }

    return redirect("?" . http_build_query(['host' => $host, 'shop' => $shop]));
});

Route::post('/graphql', function (Request $request) {
    $response = Utils::graphqlProxy($request->header(), $request->cookie(), $request->getContent());

    $xHeaders = array_filter(
        $response->getHeaders(),
        function ($key) {
            return str_starts_with($key, 'X') || str_starts_with($key, 'x');
        },
        ARRAY_FILTER_USE_KEY
    );

    return response($response->getDecodedBody(), $response->getStatusCode())->withHeaders($xHeaders);
})->middleware('shopify.auth:online');

Route::get('/rest-example', function (Request $request) {

    /** @var AuthSession */
    $session = $request->get('shopifySession'); // Provided by the shopify.auth middleware, guaranteed to be active

    $client = new Rest($session->getShop(), $session->getAccessToken());
    $result = $client->get('products', [], ['limit' => 5]);


    return response($result->getDecodedBody());
})->middleware('shopify.auth:online');


Route::get('sync-products',[App\Http\Controllers\ProductController::class,'SyncProdcuts'])->middleware('shopify.auth:online');



//Route::post('/webhooks', function (Request $request) {
//    $error_log=new \App\Models\ErrorLog();
//    $error_log->response=  'it nooo work';
//    $error_log->save();
//    try {
//        $topic = $request->header(HttpHeaders::X_SHOPIFY_TOPIC, '');
//        $response = Registry::process($request->header(), $request->getContent());
//        $res=$response->getDecodedBody();
//
//        $error_log=new \App\Models\ErrorLog();
//        $error_log->response= 'try work';
//        $error_log->save();
//        if (!$response->isSuccess()) {
//            Log::error("Failed to process '$topic' webhook: {$response->getErrorMessage()}");
//            return response()->json(['message' => "Failed to process '$topic' webhook"], 500);
//        }
//    } catch (\Exception $e) {
//        Log::error("Got an exception when handling '$topic' webhook: {$e->getMessage()}");
//        $error_log=new \App\Models\ErrorLog();
//        $error_log->topic='catch';
//        $error_log->response= 'workfdf';
//        $error_log->save();
//        return response()->json(['message' => "Got an exception when handling '$topic' webhook"], 500);
//    }
//});

Route::post('/webhooks/app-uninstall', function (Request $request) {

    try {

        $product=json_decode($request->getContent());
        $shop=$request->header('x-shopify-shop-domain');
        $shop=Session::where('shop',$shop)->first();
        $client = new Rest($shop->shop, $shop->access_token);
        \App\Models\ProductVariant::where('shop_id',$shop->id)->delete();
        \App\Models\UserTemplate::where('shop_id',$shop->id)->delete();
        \App\Models\Advantage::where('shop_id',$shop->id)->delete();
        \App\Models\UserTemplateProduct::where('shop_id',$shop->id)->delete();
        \App\Models\Product::where('shop_id',$shop->id)->delete();
        $result = $client->get('/metafields/' .$shop->metafield_id. '.json');
        $result = $result->getDecodedBody();
        if($result['metafield']) {
            $shop_metafield = $client->delete('/metafields/' . $shop->metafield_id . '.json');
        }
        Session::where('id',$shop->id)->forceDelete();

    } catch (\Exception $e) {

        $error_log=new \App\Models\ErrorLog();
        $error_log->topic='Unistall catch';
        $error_log->response=  $e->getMessage();
        $error_log->save();
    }
});

Route::post('/webhooks/product-update', function (Request $request) {
    try {

        $product=json_decode($request->getContent());
        $shop=$request->header('x-shopify-shop-domain');
        $shop=Session::where('shop',$shop)->first();
        $productcontroller = new ProductController();
        $productcontroller->createShopifyProducts($product, $shop);

    } catch (\Exception $e) {

        $error_log=new \App\Models\ErrorLog();
        $error_log->topic='Product update catch';
        $error_log->response=  $e->getMessage();
        $error_log->save();
    }
});

Route::post('/webhooks/product-create', function (Request $request) {
    try {

        $product=json_decode($request->getContent());
        $shop=$request->header('x-shopify-shop-domain');
        $shop=Session::where('shop',$shop)->first();
        $productcontroller = new ProductController();
        $productcontroller->createShopifyProducts($product, $shop);

    } catch (\Exception $e) {

        $error_log=new \App\Models\ErrorLog();
        $error_log->topic='Product Create catch';
        $error_log->response=  $e->getMessage();
        $error_log->save();
    }
});

Route::post('/webhooks/product-delete', function (Request $request) {
    try {

        $product=json_decode($request->getContent());
        $shop=$request->header('x-shopify-shop-domain');
        $shop=Session::where('shop',$shop)->first();
        $productcontroller = new ProductController();
        $productcontroller->DeleteProduct($product, $shop);

    } catch (\Exception $e) {

        $error_log=new \App\Models\ErrorLog();
        $error_log->topic='Product Delete catch';
        $error_log->response=  $e->getMessage();
        $error_log->save();
    }
});


Route::post('tes',[App\Http\Controllers\ProductController::class,'SyncProdcuts']);
Route::get('test',[App\Http\Controllers\Api\TemplateController::class,'testing']);


Route::get('/update-count',[App\Http\Controllers\ProductController::class,'UpdateCount']);


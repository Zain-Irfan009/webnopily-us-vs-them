<?php

namespace App\Http\Controllers;

use App\Models\Charge;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductVarient;
use App\Models\Session;
use Illuminate\Http\Request;
use Shopify\Clients\Rest;

class ProductController extends Controller
{
    public function SyncProdcuts($shop_name){

        $session = Session::where('shop',$shop_name)->first();
        $shop = new Rest($session->shop, $session->access_token);
        $result = $shop->get('products', [], ['limit' => 250]);
        $products=$result->getDecodedBody();

        foreach ($products['products'] as $product) {

            $this->createShopifyProducts($product,$session);
        }
        return response($result->getDecodedBody());
    }

    public function createShopifyProducts($product, $shop)
    {

        $product= json_decode(json_encode($product));

        $p = Product::where('shopify_id', $product->id)->where('shop_id',$shop->id)->first();

        if ($p === null) {
            $p = new Product();
        }
        if ($product->images) {
            $image = $product->images[0]->src;
        } else {
            $image = '';
        }
        $p->shopify_id = $product->id;
        $p->title = $product->title;
        $p->description = $product->body_html;
        $p->handle = $product->handle;
        $p->vendor = $product->vendor;
        $p->type = $product->product_type;
        $p->featured_image = $image;
        $p->tags = $product->tags;
        $p->options = json_encode($product->options);
        $p->status = $product->status;
        $p->published_at = $product->published_at;
        $p->shop_id = $shop->id;
        $p->save();
        if (count($product->variants) >= 1) {
            foreach ($product->variants as $variant) {
                $v = ProductVariant::where('shopify_id', $variant->id)->where('shop_id',$shop->id)->first();
                if ($v === null) {
                    $v = new ProductVariant();
                }
                $v->shopify_id = $variant->id;
                $v->shopify_product_id = $variant->product_id;
                $v->title = $variant->title;
                $v->option1 = $variant->option1;
                $v->option2 = $variant->option2;
                $v->option3 = $variant->option2;
                $v->sku = $variant->sku;
                $v->requires_shipping = $variant->requires_shipping;
                $v->fulfillment_service = $variant->fulfillment_service;
                $v->taxable = $variant->taxable;
                if (isset($product->images)){
                    foreach ($product->images as $image){
                        if (isset($variant->image_id)){
                            if ($image->id == $variant->image_id){
                                $v->image = $image->src;
                            }
                        }else{
                            $v->image = "";
                        }
                    }
                }
                $v->price = $variant->price;
                $v->compare_at_price = $variant->compare_at_price;
                $v->weight = $variant->weight;
                $v->grams = $variant->grams;
                $v->weight_unit = $variant->weight_unit;
                $v->inventory_item_id = $variant->inventory_item_id;
                $v->shop_id = $shop->id;
                $v->save();
            }
        }
    }

    public function DeleteProduct($product, $shop)
    {
        $product= json_decode(json_encode($product));
        $dellproduct = Product::where('shopify_id', $product->id)->first();
        $product_id = $product->id;
        $productvarients = ProductVariant::where('shopify_product_id', $product_id)->get();
        foreach ($productvarients as $varient) {
            $varient->delete();
        }
        $dellproduct->delete();
    }

    public function CheckCharge(Request $request){

        $session = Session::where('shop','zain-store-tlx.myshopify.com')->first();
        $host=$request->host;
        $client = new Rest($session->shop, $session->access_token);

        $response = $client->get( '/recurring_application_charges/'.$request->charge_id.'json');
        $response=$response->getDecodedBody();
        $response= json_decode(json_encode($response));
        $response=$response->recurring_application_charge;

        if($response->status=='active'){
            $charge=Charge::where('charge_id',$response->id)->first();

            $charge->status='active';
            $charge->billing_on=$response->billing_on;
            $charge->activated_on=$response->activated_on;
            $charge->cancelled_on=$response->cancelled_on;
            $charge->trial_ends_on=$response->trial_ends_on;
            $charge->save();
        }

        return redirect("/?shop=$session->shop&host=$host");

    }

    public function UpdateCount(Request $request){

        $shop=Session::where('shop',$request->shop)->first();
        $shop->count=$shop->count+1;
        $shop->save();
    }
}

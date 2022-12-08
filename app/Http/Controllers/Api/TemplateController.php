<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Advantage;
use App\Models\Product;
use App\Models\Session;
use App\Models\Template;
use App\Models\UserTemplate;
use App\Models\UserTemplateProduct;
use Illuminate\Http\Request;
use Shopify\Clients\Rest;

class TemplateController extends ApiController
{
    public function SelectTemplate(Request $request)
    {
        $templates = Template::all();
        $result = [];
        if ($templates->count() > 0) {
            foreach ($templates as $template) {
                $data = [
                    'template_id' => $template->id,
                    'name' => $template->name,
                ];
                $result[] = $data;
            }
        }
        return $this->response($result, 200);
    }

    public function Step1Template(Request $request)
    {

        $shop = Session::where('shop', $request->shop_name)->first();

        $template = Template::find($request->template_id);
        $random_number = mt_rand(20, 90);

        if (isset($request->user_template_id)) {
            $user_template = UserTemplate::where('id', $request->user_template_id)->where('shop_id', $shop->id)->first();
            $user_template->template_id = $template->id;
            $user_template->shop_id = $shop->id;
            $user_template->save();

            $items_array = [];

            $advantages = Advantage::where('user_template_id', $request->user_template_id)->where('shop_id', $shop->id)->get();
            foreach ($advantages as $index => $value) {

                if ($value->brand == 'true') {
                    $brand = true;
                } else {
                    $brand = false;
                }
                if ($value->competitors == 'true') {
                    $competitor = true;
                } else {
                    $competitor = false;
                }
                $item = [
                    'advantage' => $value->advantage,
                    'brand' => $brand,
                    'competitor' => $competitor,
                ];
                array_push($items_array, $item);
            }
            $result = [];
            $data = [
                'shop_name' => $shop->shop,
                'template_id' => $user_template->template_id,
                'user_template_id' => $user_template->id,
                'template_name' => $user_template->template_name,
                'brand' => $user_template->brand,
                'competitor' => $user_template->competitors,
                'background_color1' => $user_template->background_color1,
                'background_color2' => $user_template->background_color2,
                'column1_color' => $user_template->column1_color,
                'column2_color' => $user_template->column2_color,
                'column3_color' => $user_template->column3_color,
                'brand_checkbox_color1' => $user_template->brand_checkbox_color1,
                'brand_checkbox_color2' => $user_template->brand_checkbox_color2,
                'competitors_checkbox_color1' => $user_template->competitors_checkbox_color1,
                'competitors_checkbox_color2' => $user_template->competitors_checkbox_color2,
                'template_id' => $user_template->template_id,
                'items' => $items_array
            ];
            $result[] = $data;
            return $this->response($result, 200);

        } else {
            $user_template_products = UserTemplateProduct::where('shop_id', $shop->id)->whereNull('user_template_id')->get();
            $user_templates = new UserTemplate();
            $user_templates->template_id = $template->id;
            $user_templates->template_name = 'My Template_' . $random_number;
            $user_templates->brand = 'Your Brand';
            $user_templates->competitors = 'competitor';
            $user_templates->background_color1 = '#ffffff';
            $user_templates->background_color2 = '#ebecf0';
            $user_templates->column1_color = '#626dff';
            $user_templates->column2_color = '#8c94ff';
            $user_templates->column3_color = '#a9afff';
            $user_templates->brand_checkbox_color1 = '#474b8b';
            $user_templates->brand_checkbox_color2 = '#7b7eac';
            $user_templates->competitors_checkbox_color1 = '#474b8b';
            $user_templates->competitors_checkbox_color2 = '#7b7eac';
            $user_templates->advantages_count = 5;
            $user_templates->shop_id = $shop->id;
            $user_templates->save();


            for ($i = 1; $i < 6; $i++) {
                $advantages = new Advantage();
                $advantages->advantage = 'Advantage' . $i;
                $advantages->brand = 1;
                $advantages->competitors = 0;
                $advantages->user_template_id = $user_templates->id;
                $advantages->shop_id = $shop->id;
                $advantages->save();

            }
            foreach ($user_template_products as $user_template_product) {
                $user_template_product->user_template_id = $user_templates->id;
                $user_template_product->save();
            }
        }
        $result = [];
        if ($template != null) {
            $data = [
                'template_id' => $template->id,
                'user_template_id' => $user_templates->id,
                'shop_name' => $shop->shop
            ];
            $result = $data;


        }
        return $this->response($result, 200);
    }

    public function Step2Template(Request $request)
    {

        $template = Template::find($request->template_id);

        $shop = Session::where('shop', $request->shop_name)->first();
        if ($template) {
            Advantage::where('user_template_id', $request->user_template_id)->where('shop_id', $shop->id)->delete();

            $user_template = UserTemplate::where('id', $request->user_template_id)->where('shop_id', $shop->id)->first();
            $user_template->template_name = $request->template_name;
            $user_template->brand = $request->brand;
            $user_template->competitors = $request->competitor;
            $user_template->background_color1 = $request->background_color1;
            $user_template->background_color2 = $request->background_color2;
            $user_template->column1_color = $request->column1_color;
            $user_template->column2_color = $request->column2_color;
            $user_template->column3_color = $request->column3_color;
            $user_template->brand_checkbox_color1 = $request->brand_checkbox_color1;
            $user_template->brand_checkbox_color2 = $request->brand_checkbox_color2;
            $user_template->competitors_checkbox_color1 = $request->competitors_checkbox_color1;
            $user_template->competitors_checkbox_color2 = $request->competitors_checkbox_color2;
            $user_template->template_id = $request->template_id;
            $user_template->advantages_count = $request->advantages_count;
            $user_template->save();

            $items_array = [];

            foreach ($request->advantages as $index => $value) {

                $advantage = new Advantage();
                $advantage->advantage = $value;
                $advantage->brand = $request->brands[$index];
                $advantage->competitors = $request->competitors[$index];
                $advantage->user_template_id = $user_template->id;
                $advantage->shop_id = $shop->id;
                $advantage->save();

                if ($request->brands[$index] == true) {

                    $brand = true;
                } else {
                    $brand = false;
                }
                if ($request->competitors[$index] == true) {
                    $competitor = true;
                } else {
                    $competitor = false;
                }
                $item = [
                    'advantage' => $value,
                    'brand' => $request->brands[$index],
                    'competitor' => $request->competitors[$index],
                ];
                array_push($items_array, $item);
            }

            $result = [];
            $data = [
                'shop_name' => $shop->shop,
                'template_name' => $user_template->template_name,
                'brand' => $user_template->brand,
                'competitor' => $user_template->competitors,
                'background_color1' => $user_template->background_color1,
                'background_color2' => $user_template->background_color2,
                'column1_color' => $user_template->column1_color,
                'column2_color' => $user_template->column2_color,
                'column3_color' => $user_template->column3_color,
                'brand_checkbox_color1' => $user_template->brand_checkbox_color1,
                'brand_checkbox_color2' => $user_template->brand_checkbox_color2,
                'competitors_checkbox_color1' => $user_template->competitors_checkbox_color1,
                'competitors_checkbox_color2' => $user_template->competitors_checkbox_color2,
                'template_id' => $user_template->template_id,
                'items' => $items_array
            ];
            $result[] = $data;
            return $this->response($result, 200);
        }

    }

    public function CurrentTemplate(Request $request)
    {

        $shop = Session::where('shop', $request->shop_name)->first();
        $user_templates = UserTemplate::where('shop_id', $shop->id)->get();


        $result = [];
        if ($user_templates->count() > 0) {
            foreach ($user_templates as $user_template) {
                $template = Template::find($user_template->template_id);

                $data = [
                    'shop_name' => $shop->shop,
                    'template_id' => $user_template->template_id,
                    'user_template_id' => $user_template->id,
                    'name' => $user_template->template_name,
                    'image' => $template->image
                ];
                $result[] = $data;
            }
        }
        return $this->response($result, 200);
    }

    public function TemplateView($id)
    {

        $user_template = UserTemplate::find($id);
        if ($user_template) {

            $advantages = Advantage::where('user_template_id', $id)->get();
            $items_array = [];
            foreach ($advantages as $index => $value) {

                if ($value->brand == 'true') {
                    $brand = true;
                } else {
                    $brand = false;
                }
                if ($value->competitors == 'true') {
                    $competitor = true;
                } else {
                    $competitor = false;
                }
                $item = [
                    'advantage' => $value->advantage,
                    'brand' => $brand,
                    'competitor' => $competitor,
                ];
                array_push($items_array, $item);
            }

            $result = [];
            $data = [
                'template_name' => $user_template->template_name,
                'brand' => $user_template->brand,
                'competitor' => $user_template->competitors,
                'background_color1' => $user_template->background_color1,
                'background_color2' => $user_template->background_color2,
                'column1_color' => $user_template->column1_color,
                'column2_color' => $user_template->column2_color,
                'column3_color' => $user_template->column3_color,
                'brand_checkbox_color1' => $user_template->brand_checkbox_color1,
                'brand_checkbox_color2' => $user_template->brand_checkbox_color2,
                'competitors_checkbox_color1' => $user_template->competitors_checkbox_color1,
                'competitors_checkbox_color2' => $user_template->competitors_checkbox_color2,
                'template_id' => $user_template->template_id,
                'items' => $items_array
            ];
            $result[] = $data;
            return $this->response($result, 200);
        }

    }

    public function RenameTemplate(Request $request)
    {

        $shop = Session::where('shop', $request->shop_name)->first();
        $rename_user_template = UserTemplate::where('id', $request->user_template_id)->where('shop_id', $shop->id)->first();
        if ($rename_user_template) {

            $rename_user_template->template_name = $request->template_name;
            $rename_user_template->save();

            $user_templates = UserTemplate::where('shop_id', $shop->id)->get();
            $result = [];
            if ($user_templates->count() > 0) {
                foreach ($user_templates as $user_template) {
                    $data = [
                        'shop_name' => $shop->shop,
                        'id' => $user_template->id,
                        'name' => $user_template->template_name,
                    ];
                    $result[] = $data;
                }
            }
            return $this->response($result, 200);
        }
    }

    public function DuplicateTemplate(Request $request)
    {

        $duplicate_user_template = UserTemplate::find($request->user_template_id);
        $random_number = mt_rand(20, 90);
        if ($duplicate_user_template) {
            $user_template = new UserTemplate();
            $user_template->template_name = $duplicate_user_template->template_name . '_' . $random_number;
            $user_template->brand = $duplicate_user_template->brand;
            $user_template->competitors = $duplicate_user_template->competitors;
            $user_template->background_color1 = $duplicate_user_template->background_color1;
            $user_template->background_color2 = $duplicate_user_template->background_color2;
            $user_template->column1_color = $duplicate_user_template->column1_color;
            $user_template->column2_color = $duplicate_user_template->column2_color;
            $user_template->brand_checkbox_color1 = $duplicate_user_template->brand_checkbox_color1;
            $user_template->brand_checkbox_color2 = $duplicate_user_template->brand_checkbox_color2;
            $user_template->competitors_checkbox_color1 = $duplicate_user_template->competitors_checkbox_color1;
            $user_template->competitors_checkbox_color2 = $duplicate_user_template->competitors_checkbox_color2;
            $user_template->template_id = $duplicate_user_template->template_id;
            $user_template->shop_id = $duplicate_user_template->shop_id;
            $user_template->save();


            $advantages = Advantage::where('user_template_id', $duplicate_user_template->id)->where('shop_id', $duplicate_user_template->shop_id)->get();

            foreach ($advantages as $advantage_value) {
                $advantage = new Advantage();
                $advantage->advantage = $advantage_value->advantage;
                $advantage->brand = $advantage_value->brand;
                $advantage->competitors = $advantage_value->competitors;
                $advantage->user_template_id = $user_template->id;
                $advantage->shop_id = $advantage_value->shop_id;
                $advantage->save();
            }

            $all_user_templates = UserTemplate::where('shop_id', $duplicate_user_template->shop_id)->get();
            $result = [];
            if ($all_user_templates->count() > 0) {
                foreach ($all_user_templates as $all_user_template) {
                    $data = [
                        'id' => $all_user_template->id,
                        'name' => $all_user_template->template_name,
                    ];
                    $result[] = $data;
                }
            }
            return $this->response($result, 200);
        }
    }

    public function DeleteTemplate(Request $request)
    {

        Advantage::where('user_template_id', $request->user_template_id)->delete();
        UserTemplate::where('id', $request->user_template_id)->delete();
        UserTemplateProduct::where('id', $request->user_template_id)->delete();
        $user_templates = UserTemplate::all();
        $result = [];
        if ($user_templates->count() > 0) {
            foreach ($user_templates as $user_template) {
                $data = [
                    'id' => $user_template->id,
                    'name' => $user_template->template_name,
                ];
                $result[] = $data;
            }
        }
        return $this->response($result, 200);
    }


    public function Products(Request $request)
    {

        $shop = Session::where('shop', $request->shop_name)->first();

        if (isset($request->user_template_id)) {
            $user_template = UserTemplate::where('id', $request->user_template_id)->where('shop_id', $shop->id)->first();

            $products = Product::with(['templateProducts' => function ($q) use ($user_template) {
                $q->where('user_template_id', $user_template->id);

            }])->whereDoesntHave('templateProducts', function ($q) use ($user_template) {
                $q->where('user_template_id', '!=', $user_template->id);

            })->where('shop_id', $shop->id)->get();

            $prodcuts_array = [];
            foreach ($products as $product) {

                $item = [
                    'id' => $product->shopify_id,
                    'title' => $product->title,
                    'image' => $product->featured_image,
                    'selected' => ($product->templateProducts->count() > 0) ? true : false
                ];
                $prodcuts_array[] = $item;
            }
        } else {
            $products = Product::whereDoesntHave('templateProducts', function ($q) use ($shop) {
                $q->where('shop_id', $shop->id);
            })->get();
            $prodcuts_array = [];
            foreach ($products as $product) {

                $item = [
                    'id' => $product->shopify_id,
                    'title' => $product->title,
                    'image' => $product->featured_image,
                    'selected' => ($product->templateProducts->count() > 0) ? true : false
                ];
                $prodcuts_array[] = $item;
            }

        }
        $result = $prodcuts_array;

        return $this->response($result, 200);
    }


    public function SelectedProducts(Request $request)
    {

        $shop = Session::where('shop', $request->shop_name)->first();
        $client = new Rest($shop->shop, $shop->access_token);


        if (isset($request->user_template_id)) {
            $user_template = UserTemplate::where('id', $request->user_template_id)->where('shop_id', $shop->id)->first();
            if ($user_template) {

                $advantages = Advantage::where('user_template_id', $request->user_template_id)->get();

                $items_array = [];
                foreach ($advantages as $index => $value) {


                    if ($value->brand == 1) {
                        $brand = true;
                    } else {
                        $brand = false;
                    }
                    if ($value->competitors == 1) {
                        $competitor = true;
                    } else {
                        $competitor = false;
                    }
                    $item = [
                        'advantage' => $value->advantage,
                        'brand' => $brand,
                        'competitor' => $competitor,
                    ];
                    array_push($items_array, $item);

                }

                UserTemplateProduct::where('user_template_id', $user_template->id)->where('shop_id', $shop->id)->delete();

                if (count($request->product_ids) > 0) {


                    foreach ($request->product_ids as $product_id) {


                        $product = Product::where('shopify_id', $product_id)->first();
                        $user_template_product = new UserTemplateProduct();
                        $user_template_product->user_template_id = $user_template->id;
                        $user_template_product->shopify_product_id = $product_id;
                        $user_template_product->shop_id = $shop->id;
                        $user_template_product->save();

                        $value = [
                            "template_id" => $user_template->template_id,
                            "user_template_id" => $user_template->id,
                            "brand" => $user_template->brand,
                            "competitor" => $user_template->competitors,
                            "background_color1" => $user_template->background_color1,
                            "background_color2" => $user_template->background_color2,
                            "column1_color" => $user_template->column1_color,
                            "column2_color" => $user_template->column2_color,
                            "column3_color" => $user_template->column3_color,
                            "brand_checkbox_color1" => $user_template->brand_checkbox_color1,
                            "brand_checkbox_color2" => $user_template->brand_checkbox_color2,
                            "competitors_checkbox_color1" => $user_template->competitors_checkbox_color1,
                            "competitors_checkbox_color2" => $user_template->competitors_checkbox_color2,
                            'items' => $items_array
                        ];


                        $product_metafield = $client->put('/products/' . $product->shopify_id . '.json', [
                            'product' => [
                                "metafields" =>
                                    array(
                                        0 =>
                                            array(
                                                "key" => 'products',
                                                "value" => json_encode($value),
                                                "type" => "json_string",
                                                "namespace" => "widget",
                                            ),
                                    ),
                            ]
                        ]);


                        if (isset($product_metafield->getDecodedBody()['errors']['key'])) {

                            $res = $client->get('/products/' . $product->shopify_id . '/metafields.json');
                            $res = $res->getDecodedBody();

                            foreach ($res['metafields'] as $deliverydate) {


                                if ($deliverydate['key'] == 'products') {
//                                    $delete = $client->delete( '/metafields/' . $deliverydate['id'] . '.json');


                                    $product_metafield = $client->put('/metafields/' . $deliverydate['id'] . '.json', [

                                        "metafield" =>

                                            array(
                                                "type" => "json_string",
                                                "value" => json_encode($value),
                                            ),
                                    ]);


                                }


                            }
                        }

                    }
                }
                if(count($request->unSelected_ids) > 0){
                foreach ($request->unSelected_ids as $unSelected_id) {

                    $res_for_delete = $client->get('/products/' . $unSelected_id . '/metafields.json');
                    $res_for_delete = $res_for_delete->getDecodedBody();

                  if($res_for_delete['metafields']){
                      foreach ($res_for_delete['metafields'] as $delete_meta) {
                          if ($delete_meta['key'] == 'products') {

                              $delete = $client->delete('/metafields/' . $delete_meta['id'] . '.json');
                          }
                      }
                  }
                }


                    $data = [
                        'user_template_id' => $user_template->id,
                        'product_ids' => $request->product_ids
                    ];

                    $result[] = $data;


                    return $this->response($result, 200);
                }
            } else {
                if (isset($request->product_ids)) {
                    foreach ($request->product_ids as $product_id) {
                        $user_template_product = new UserTemplateProduct();
                        $user_template_product->shopify_product_id = $product_id;
                        $user_template_product->shop_id = $shop->id;
                        $user_template_product->save();
                    }
                    $data = [
                        'product_ids' => $request->product_ids
                    ];
                    $result[] = $data;
                    return $this->response($result, 200);
                }
            }
        }
    }

    public function TemplateData(Request $request)
    {

        $user_template = UserTemplate::find($request->user_template_id);
        if ($user_template) {

            $advantages = Advantage::where('user_template_id', $request->user_template_id)->get();
            $advantages_get = Advantage::where('user_template_id', $request->user_template_id)->pluck('advantage')->toArray();
            $brands_get = Advantage::where('user_template_id', $request->user_template_id)->pluck('brand')->toArray();
            $competitors_get = Advantage::where('user_template_id', $request->user_template_id)->pluck('competitors')->toArray();
            $brands_array = [];
            foreach ($brands_get as $brand_ge) {
                if ($brand_ge == 1) {
                    $brands = true;
                } else {
                    $brands = false;
                }
                array_push($brands_array, $brands);
            }

            $competitors_array = [];
            foreach ($competitors_get as $competitor_ge) {
                if ($competitor_ge == 1) {
                    $competitors = true;
                } else {
                    $competitors = false;
                }
                array_push($competitors_array, $competitors);
            }


            $items_array = [];
            foreach ($advantages as $index => $value) {

                if ($value->brand == 1) {
                    $brand = true;
                } else {
                    $brand = false;
                }
                if ($value->competitors == 1) {
                    $competitor = true;
                } else {
                    $competitor = false;
                }
                $item = [
                    'advantage' => $value->advantage,
                    'brand' => $brand,
                    'competitor' => $competitor,
                ];
                array_push($items_array, $item);

            }

            $result = [];

            $colors_array = [];

            $color_data = [
                'background_color1' => $user_template->background_color1,
                'background_color2' => $user_template->background_color2,
                'column1_color' => $user_template->column1_color,
                'column2_color' => $user_template->column2_color,
                'column3_color' => $user_template->column3_color,
                'brand_checkbox_color1' => $user_template->brand_checkbox_color1,
                'brand_checkbox_color2' => $user_template->brand_checkbox_color2,
                'competitors_checkbox_color1' => $user_template->competitors_checkbox_color1,
                'competitors_checkbox_color2' => $user_template->competitors_checkbox_color2,
            ];
            array_push($colors_array, $color_data);
            $data = [
                'template_name' => $user_template->template_name,
                'brand' => $user_template->brand,
                'competitor' => $user_template->competitors,
                'colors' => $colors_array,
                'advantages_count' => $user_template->advantages_count,
                'template_id' => $user_template->template_id,
                'advantages' => $advantages_get,
                'brands' => $brands_array,
                'competitors' => $competitors_array,
                'items' => $items_array,
            ];
            $result = $data;
            return $this->response($result, 200);
        }
    }


    public function testing()
    {

        $shop = Session::where('shop', 'zain-store-tlx.myshopify.com')->first();
        $client = new Rest($shop->shop, $shop->access_token);
        $res = $client->get( '/webhooks.json');
        $res = $res->getDecodedBody();
        dd($res);

        $res = $client->get('/products/' . $product->shopify_id . '/metafields.json');
        $products = Product::all();
        foreach ($products as $product) {
            $res = $client->get('/products/' . $product->shopify_id . '/metafields.json');
            $res = $res->getDecodedBody();

            foreach ($res['metafields'] as $deliverydate) {


                if ($deliverydate['key'] == 'products') {

                    $delete = $client->delete( '/metafields/' . $deliverydate['id'] . '.json');
                }
            }
        }
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Advantage;
use App\Models\Competator;
use App\Models\CompetitorName;
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

        if ($request->user_template_id!='undefined') {
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
                'template_id' => $template->id,
                'user_template_id' => $user_template->id,
                'shop_name' => $shop->shop
            ];

            $result = $data;
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
            $user_templates->brand_checkbox_color1 = '#474b8b';
            $user_templates->brand_checkbox_color2 = '#7b7eac';
            $user_templates->competitors_checkbox_color1 = '#474b8b';
            $user_templates->competitors_checkbox_color2 = '#7b7eac';
            $user_templates->advantages_count = 5;
            $user_templates->shop_id = $shop->id;
            $user_templates->save();


            for ($i = 1; $i < 6; $i++) {
                $advantages = new Advantage();
                $advantages->advantage = 'Advantage '. $i;
                $advantages->brand = 1;
                $advantages->user_template_id = $user_templates->id;
                $advantages->advantage_column_color='#000000';
                $advantages->competitors=0;
                $advantages->shop_id = $shop->id;
                $advantages->save();
                $new_competator=new Competator();
                $new_competator->competator_status=0;
                $new_competator->advantage_id=$advantages->id;
                $new_competator->shop_id = $shop->id;
                $new_competator->save();
            }

            $competitor_name=new CompetitorName();
            $competitor_name->name='Competitor 1';
            $competitor_name->user_template_id=$user_templates->id;
            $competitor_name->shop_id = $shop->id;
            $competitor_name->save();
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

          $get_advantages= Advantage::where('user_template_id', $request->user_template_id)->where('shop_id', $shop->id)->get();
          foreach ($get_advantages as $get_advantage){
              Competator::where('advantage_id', $get_advantage->id)->where('shop_id', $shop->id)->delete();
          }
            Advantage::where('user_template_id', $request->user_template_id)->where('shop_id', $shop->id)->delete();
            CompetitorName::where('user_template_id', $request->user_template_id)->where('shop_id', $shop->id)->delete();

            $user_template = UserTemplate::where('id', $request->user_template_id)->where('shop_id', $shop->id)->first();
            $user_template->template_name = $request->template_name;
            $user_template->brand = $request->brand;
            $user_template->competitors = $request->competitor;
            $user_template->background_color1 = $request->background_color1;
            $user_template->background_color2 = $request->background_color2;
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
                $advantage->brand = $request->brand_values[$index];
//                $advantage->competitors = $request->competitor_values[$index];
                $advantage->advantage_column_color = $request->advantage_color_values[$index];
                $advantage->user_template_id = $user_template->id;
                $advantage->shop_id = $shop->id;
                $advantage->save();


                if ($request->brand_values[$index] == true) {

                    $brand = true;
                } else {
                    $brand = false;
                }
//                if ($request->competitor_values[$index] == true) {
//                    $competitor = true;
//                } else {
//                    $competitor = false;
//                }
                $item = [
                    'advantage' => $value,
                    'advantage_color_value'=>$request->advantage_color_values[$index],
                    'brand' => $request->brand_values[$index],
//                    'competitor' => $request->competitor_values[$index],
                ];
                array_push($items_array, $item);


//                foreach($request->competitor_value as $competitor_value){
//
//                    foreach ($competitor_value as $comp_value){
//                        $comp_status=new Competator();
//                        $comp_status->competator_status=$comp_value;
//                        $comp_status->shop_id=$shop->id;
//                        $comp_status->save();
//                    }
//
//                }
            }

                foreach ($request->competitors_name as $competitors_name){
                    $competitor_name=new CompetitorName();
                    $competitor_name->name=$competitors_name;
                    $competitor_name->user_template_id=$user_template->id;
                    $competitor_name->shop_id = $shop->id;
                    $competitor_name->save();
                }


            $user_template_products=UserTemplateProduct::where('user_template_id',$request->user_template_id)->get();
            if(count($user_template_products) > 0){
                $value = [
                    "template_id" => $user_template->template_id,
                    "user_template_id" => $user_template->id,
                    "brand" => $user_template->brand,
                    "competitor" => $user_template->competitors,
                    "background_color1" => $user_template->background_color1,
                    "background_color2" => $user_template->background_color2,
                    "brand_checkbox_color1" => $user_template->brand_checkbox_color1,
                    "brand_checkbox_color2" => $user_template->brand_checkbox_color2,
                    "competitors_checkbox_color1" => $user_template->competitors_checkbox_color1,
                    "competitors_checkbox_color2" => $user_template->competitors_checkbox_color2,
                    'items' => $items_array
                ];
                foreach ($user_template_products as $user_template_product) {
                    $client = new Rest($shop->shop, $shop->access_token);
                    $res = $client->get('/products/' .$user_template_product->shopify_product_id . '/metafields.json');
                    $res = $res->getDecodedBody();

                    foreach ($res['metafields'] as $deliverydate) {

                        if ($deliverydate['key'] == 'products') {

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
            $result = [];
            $data = [
                'shop_name' => $shop->shop,
                'template_name' => $user_template->template_name,
                'brand' => $user_template->brand,
                'competitor' => $user_template->competitors,
                'background_color1' => $user_template->background_color1,
                'background_color2' => $user_template->background_color2,
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
        $shop = Session::where('shop', $request->shop_name)->first();
        $client = new Rest($shop->shop, $shop->access_token);
        $user_template_products=UserTemplateProduct::where('user_template_id', $request->user_template_id)->get();

        if(count($user_template_products) > 0) {
            foreach ($user_template_products as $user_template_product) {
                $res = $client->get('/products/' . $user_template_product->shopify_product_id . '/metafields.json');
                $res = $res->getDecodedBody();
                foreach ($res['metafields'] as $deliverydate) {
                    if ($deliverydate['key'] == 'products') {
                        $delete = $client->delete('/metafields/' . $deliverydate['id'] . '.json');
                    }
                }
            }
        }
        Advantage::where('user_template_id', $request->user_template_id)->delete();
        UserTemplate::where('id', $request->user_template_id)->delete();
        UserTemplateProduct::where('user_template_id', $request->user_template_id)->delete();
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
                        'advantage_color_value'=>$value->advantage_column_color,
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
            $advantages_color_get = Advantage::where('user_template_id', $request->user_template_id)->pluck('advantage_column_color')->toArray();
                $competitor_names=CompetitorName::where('user_template_id', $request->user_template_id)->pluck('name')->toArray();
                $competitor_names_count=CompetitorName::where('user_template_id', $request->user_template_id)->count();

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
            $advantages_array=[];
            $main_array=[];
            $item_advantage= array();
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
                    'competitors'=>$competitor,
//                    'column_color'=>$value->advantage_column_color
                ];
                array_push($items_array, $item);




                $competators_data=Competator::where('advantage_id',$value->id)->get();

                $result_new=array();
                foreach ($competators_data as $data){
//                    $data_competator=[
//                        'status'=>$data->competator_status
//                    ];

                    array_push($result_new,$data->competator_status);
                }




                array_push($main_array,(object)$result_new);
            }

            $result = [];

            $colors_array = [];

            $color_data = [
                'background_color1' => $user_template->background_color1,
                'background_color2' => $user_template->background_color2,
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
                'primary_colors' => $colors_array,
                'advantages_count' => strval($user_template->advantages_count),
                'template_id' => $user_template->template_id,
                'advantages' => $advantages_get,
                'brand_value' => $brands_array,
                'competators_count'=>strval($competitor_names_count),
//                'competitor_value'=>$competitors_array,
                'advantage_color_values'=>$advantages_color_get,
                'items' => $items_array,
                'competitors_name'=>$competitor_names,
                'competitor_value'=>$main_array

            ];

            $result = $data;
            return $this->response($result, 200);
        }
    }


    public function testing(Request $request)
    {
//
        $shop = Session::where('shop', $request->shop_name)->first();

        $client = new Rest($shop->shop, $shop->access_token);

//
//        $result = $client->get('products', [], ['limit' => 5]);
//        $result = $result->getDecodedBody();
//        dd($result);
//        $res = $client->get( '/webhooks.json');
//        $res = $res->getDecodedBody();
//        dd($res);

//        $res = $client->get('/products/' . $product->shopify_id . '/metafields.json');
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

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
        public function SelectTemplate(Request $request){
        $templates=Template::all();
        $result = [];
        if($templates->count()>0)
        {
            foreach ($templates as $template)
            {
                $data = [
                    'template_id'=> $template->id,
                    'name'=> $template->name,
                ];
                $result[] = $data;
            }
        }
       return $this->response($result,200);
    }

        public function Step1Template(Request $request){

            $shop=Session::where('shop',$request->shop_name)->first();

            $template=Template::find($request->template_id);

        if(isset($request->user_template_id)){
            $user_template=UserTemplate::where('id',$request->user_template_id)->where('shop_id',$shop->id)->first();
            $user_template->template_id=$template->id;
            $user_template->shop_id=$shop->id;
            $user_template->save();

            $items_array=[];

            $advantages=Advantage::where('user_template_id',$request->user_template_id)->where('shop_id',$shop->id)->get();
            foreach ($advantages as $index=> $value){

                if($value->brand =='true'){
                    $brand=true;
                }else{
                    $brand=false;
                }
                if($value->competitors =='true'){
                    $competitor=true;
                }else{
                    $competitor=false;
                }
                $item=[
                    'advantage'=>$value->advantage,
                    'brand'=>$brand,
                    'competitor'=>$competitor,
                ];
                array_push($items_array,$item);
            }
            $result = [];
            $data = [
                'shop_name'=>$shop->shop,
                'template_id'=>$user_template->template_id,
                'user_template_id'=>$user_template->id,
                'template_name'=>$user_template->template_name,
                'brand'=> $user_template->brand,
                'competitor'=> $user_template->competitors,
                'background_color1'=>$user_template->background_color1,
                'background_color2'=>$user_template->background_color2,
                'column1_color'=>$user_template->column1_color,
                'column2_color'=>$user_template->column2_color,
                'column3_color'=>$user_template->column3_color,
                'brand_checkbox_color1'=>$user_template->brand_checkbox_color1,
                'brand_checkbox_color2'=>$user_template->brand_checkbox_color2,
                'competitors_checkbox_color1'=>$user_template->competitors_checkbox_color1,
                'competitors_checkbox_color2'=>$user_template->competitors_checkbox_color2,
                'template_id'=>$user_template->template_id,
                'items'=>$items_array
            ];
            $result[] = $data;
            return $this->response($result, 200);

        }
        else {
            $user_template_products=UserTemplateProduct::where('shop_id',$shop->id)->whereNull('user_template_id')->get();
            $user_templates = new UserTemplate();
            $user_templates->template_id = $template->id;
            $user_templates->shop_id=$shop->id;
            $user_templates->save();

            foreach ($user_template_products as $user_template_product){
                $user_template_product->user_template_id=$user_templates->id;
                $user_template_product->save();
            }
        }
        $result = [];
        if($template!=null) {
            $data = [
                'template_id'=>$template->id,
                'user_template_id' => $user_templates->id,
                'shop_name'=>$shop->shop
            ];
            $result = $data;

        }
        return $this->response($result, 200);
        }

        public function Step2Template(Request $request){
//dd($request->template_id);
//dd($request->all());
            $template=Template::find($request->template_id);

            $shop=Session::where('shop',$request->shop_name)->first();

            if($template){
//                if(isset($request->user_template_id) || $request->user_template_id!=null){
//                    $user_template=UserTemplate::where('id',$request->user_template_id)->where('shop_id',$shop->id)->first();
//                    Advantage::where('user_template_id',$request->user_template_id)->where('shop_id',$shop->id)->delete();
//                }else {

//                    $user_template = new UserTemplate();
//                }
                    Advantage::where('user_template_id',$request->user_template_id)->where('shop_id',$shop->id)->delete();


                $user_template=UserTemplate::where('id',$request->user_template_id)->where('shop_id',$shop->id)->first();
                $user_template->template_name=$request->template_name;
                $user_template->brand=$request->brand;
                $user_template->competitors=$request->competitor;
                $user_template->background_color1=$request->background_color1;
                $user_template->background_color2=$request->background_color2;
                $user_template->column1_color=$request->column1_color;
                $user_template->column2_color=$request->column2_color;
                $user_template->column3_color=$request->column3_color;
                $user_template->brand_checkbox_color1=$request->brand_checkbox_color1;
                $user_template->brand_checkbox_color2=$request->brand_checkbox_color2;
                $user_template->competitors_checkbox_color1=$request->competitors_checkbox_color1;
                $user_template->competitors_checkbox_color2=$request->competitors_checkbox_color2;
                $user_template->template_id=$request->template_id;
                $user_template->save();

                $items_array=[];

                foreach ($request->advantages as $index=> $value){

                    $advantage=new Advantage();
                    $advantage->advantage=$value;
                    $advantage->brand=$request->brands[$index];
                    $advantage->competitors=$request->competitors[$index];
                    $advantage->user_template_id=$user_template->id;
                    $advantage->shop_id=$shop->id;
                    $advantage->save();

                    if($request->brands[$index] ==true){
                        $brand=true;
                    }else{
                        $brand=false;
                    }
                    if($request->competitors[$index] ==true){
                        $competitor=true;
                    }else{
                        $competitor=false;
                    }
                    $item=[
                       'advantage'=>$value,
                       'brand'=>$request->brands[$index],
                       'competitor'=>$request->competitors[$index],
                    ];
                    array_push($items_array,$item);
                }
                $result = [];
                $data = [
                    'shop_name'=>$shop->shop,
                    'template_name'=>$user_template->template_name,
                    'brand'=> $user_template->brand,
                    'competitor'=> $user_template->competitors,
                    'background_color1'=>$user_template->background_color1,
                    'background_color2'=>$user_template->background_color2,
                    'column1_color'=>$user_template->column1_color,
                    'column2_color'=>$user_template->column2_color,
                    'column3_color'=>$user_template->column3_color,
                    'brand_checkbox_color1'=>$user_template->brand_checkbox_color1,
                    'brand_checkbox_color2'=>$user_template->brand_checkbox_color2,
                    'competitors_checkbox_color1'=>$user_template->competitors_checkbox_color1,
                    'competitors_checkbox_color2'=>$user_template->competitors_checkbox_color2,
                    'template_id'=>$user_template->template_id,
                    'items'=>$items_array
                ];
                $result[] = $data;
                return $this->response($result, 200);
            }

        }

        public function CurrentTemplate(Request $request){
            $shop=Session::where('shop',$request->shop_name)->first();
            $user_templates=UserTemplate::where('shop_id',$shop->id)->get();

            $result = [];
            if($user_templates->count()>0)
            {
                foreach ($user_templates as $user_template)
                {
                    $data = [
                        'shop_name'=>$shop->shop,
                        'template_id'=> $user_template->template_id,
                        'user_template_id'=> $user_template->id,
                        'name'=> $user_template->template_name,
                    ];
                    $result[] = $data;
                }
            }
            return $this->response($result,200);
        }

        public function TemplateView($id){

        $user_template=UserTemplate::find($id);
        if($user_template){

            $advantages=Advantage::where('user_template_id',$id)->get();
            $items_array=[];
            foreach ($advantages as $index=> $value){

                if($value->brand =='true'){
                    $brand=true;
                }else{
                    $brand=false;
                }
                if($value->competitors =='true'){
                    $competitor=true;
                }else{
                    $competitor=false;
                }
                $item=[
                    'advantage'=>$value->advantage,
                    'brand'=>$brand,
                    'competitor'=>$competitor,
                ];
                array_push($items_array,$item);
            }

            $result = [];
            $data = [
                'template_name'=>$user_template->template_name,
                'brand'=> $user_template->brand,
                'competitor'=> $user_template->competitors,
                'background_color1'=>$user_template->background_color1,
                'background_color2'=>$user_template->background_color2,
                'column1_color'=>$user_template->column1_color,
                'column2_color'=>$user_template->column2_color,
                'column3_color'=>$user_template->column3_color,
                'brand_checkbox_color1'=>$user_template->brand_checkbox_color1,
                'brand_checkbox_color2'=>$user_template->brand_checkbox_color2,
                'competitors_checkbox_color1'=>$user_template->competitors_checkbox_color1,
                'competitors_checkbox_color2'=>$user_template->competitors_checkbox_color2,
                'template_id'=>$user_template->template_id,
                'items'=>$items_array
            ];
            $result[] = $data;
            return $this->response($result, 200);
        }

        }

        public function RenameTemplate(Request $request,$id){

            $shop=Session::where('shop',$request->shop_name)->first();
            $rename_user_template=UserTemplate::where('id',$id)->where('shop_id',$shop->id)->first();
            if($rename_user_template){

                $rename_user_template->template_name=$request->template_name;
                $rename_user_template->save();

                $user_templates=UserTemplate::where('shop_id',$shop->id)->get();
                $result = [];
                if($user_templates->count()>0)
                {
                    foreach ($user_templates as $user_template)
                    {
                        $data = [
                            'shop_name'=>$shop->shop,
                            'id'=> $user_template->id,
                            'name'=> $user_template->template_name,
                        ];
                        $result[] = $data;
                    }
                }
                return $this->response($result,200);
            }
        }

        public function DuplicateTemplate($id){

            $duplicate_user_template=UserTemplate::find($id);
            $random_number=mt_rand(20,90);
            if($duplicate_user_template)
            {
                $user_template = new UserTemplate();
                $user_template->template_name=$duplicate_user_template->template_name.'_'.$random_number;
                $user_template->brand=$duplicate_user_template->brand;
                $user_template->competitors=$duplicate_user_template->competitors;
                $user_template->background_color1=$duplicate_user_template->background_color1;
                $user_template->background_color2=$duplicate_user_template->background_color2;
                $user_template->column1_color=$duplicate_user_template->column1_color;
                $user_template->column2_color=$duplicate_user_template->column2_color;
                $user_template->brand_checkbox_color1=$duplicate_user_template->brand_checkbox_color1;
                $user_template->brand_checkbox_color2=$duplicate_user_template->brand_checkbox_color2;
                $user_template->competitors_checkbox_color1=$duplicate_user_template->competitors_checkbox_color1;
                $user_template->competitors_checkbox_color2=$duplicate_user_template->competitors_checkbox_color2;
                $user_template->template_id=$duplicate_user_template->template_id;
                $user_template->shop_id=$duplicate_user_template->shop_id;
                $user_template->save();


                $advantages=Advantage::where('user_template_id',$duplicate_user_template->id)->where('shop_id',$duplicate_user_template->shop_id)->get();

                foreach ($advantages as  $advantage_value){
                    $advantage=new Advantage();
                    $advantage->advantage=$advantage_value->advantage;
                    $advantage->brand=$advantage_value->brand;
                    $advantage->competitors=$advantage_value->competitors;
                    $advantage->user_template_id=$user_template->id;
                    $advantage->shop_id=$advantage_value->shop_id;
                    $advantage->save();
                }

                $all_user_templates=UserTemplate::where('shop_id',$duplicate_user_template->shop_id)->get();
                $result = [];
                if($all_user_templates->count()>0)
                {
                    foreach ($all_user_templates as $all_user_template)
                    {
                        $data = [
                            'id'=> $all_user_template->id,
                            'name'=> $all_user_template->template_name,
                        ];
                        $result[] = $data;
                    }
                }
                return $this->response($result,200);
            }
        }

        public function DeleteTemplate($id){
           Advantage::where('user_template_id',$id)->delete();
           UserTemplate::where('id',$id)->delete();
            $user_templates=UserTemplate::all();
            $result = [];
            if($user_templates->count()>0)
            {
                foreach ($user_templates as $user_template)
                {
                    $data = [
                        'id'=> $user_template->id,
                        'name'=> $user_template->template_name,
                    ];
                    $result[] = $data;
                }
            }
            return $this->response($result,200);
        }


        public function Products(Request $request){

            $shop=Session::where('shop',$request->shop_name)->first();

            if(isset($request->user_template_id)) {
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
            }else{
                $products = Product::whereDoesntHave('templateProducts', function ($q) use ($shop) {
                    $q->where('shop_id',$shop->id);
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
            $shop=Session::where('shop',$request->shop_name)->first();
            if(isset($request->user_template_id)) {
                $user_template = UserTemplate::where('id', $request->user_template_id)->where('shop_id', $shop->id)->first();
                if ($user_template) {
                    if (isset($request->product_ids)) {
                        UserTemplateProduct::where('user_template_id',$user_template->id)->where('shop_id', $shop->id)->delete();
                        foreach ($request->product_ids as $product_id) {
                            $user_template_product = new UserTemplateProduct();
                            $user_template_product->user_template_id = $user_template->id;
                            $user_template_product->shopify_product_id = $product_id;
                            $user_template_product->shop_id = $shop->id;
                            $user_template_product->save();
                        }
                        $data = [
                            'user_template_id' => $user_template->id,
                            'product_ids' => $request->product_ids
                        ];
                        $result[] = $data;
                        return $this->response($result, 200);
                    }
                }
            }
            else{
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

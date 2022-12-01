<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function templateProducts(){
        return  $this->hasMany('App\Models\UserTemplateProduct', 'shopify_product_id', 'shopify_id');
    }
}

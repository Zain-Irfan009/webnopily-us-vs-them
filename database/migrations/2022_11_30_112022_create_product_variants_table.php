<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductVariantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('shopify_id')->nullable();
            $table->bigInteger('shopify_product_id')->nullable();
            $table->text('title')->nullable();
            $table->text('option1')->nullable();
            $table->text('option2')->nullable();
            $table->text('option3')->nullable();
            $table->text('sku')->nullable();
            $table->boolean('requires_shipping')->nullable();
            $table->text('fulfillment_service')->nullable();
            $table->text('taxable')->nullable();
            $table->text('image')->nullable();
            $table->bigInteger('price')->nullable();
            $table->bigInteger('compare_at_price')->nullable();
            $table->text('weight')->nullable();
            $table->text('grams')->nullable();
            $table->text('weight_unit')->nullable();
            $table->bigInteger('inventory_item_id')->nullable();
            $table->bigInteger('stock')->nullable();
            $table->bigInteger('shop_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_variants');
    }
}

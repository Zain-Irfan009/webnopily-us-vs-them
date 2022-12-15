<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAdvantagecolorsToUserTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_templates', function (Blueprint $table) {
            $table->text('text_advantage_color')->nullable();
            $table->text('text_brand_color')->nullable();
            $table->text('brand_background1')->nullable();
            $table->text('brand_background2')->nullable();
            $table->text('text_competitor_color')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_templates', function (Blueprint $table) {
            //
        });
    }
}

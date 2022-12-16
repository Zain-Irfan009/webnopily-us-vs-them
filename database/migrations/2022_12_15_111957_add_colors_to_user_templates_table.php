<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColorsToUserTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_templates', function (Blueprint $table) {
            $table->text('text_brand_color_inside')->nullable();
            $table->text('text_competitor_color_inside')->nullable();
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

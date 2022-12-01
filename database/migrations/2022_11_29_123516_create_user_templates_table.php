<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_templates', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('template_id')->nullable();
            $table->longText('template_name')->nullable();
            $table->longText('brand')->nullable();
            $table->longText('competitors')->nullable();
            $table->text('background_color1')->nullable();
            $table->text('background_color2')->nullable();
            $table->text('column1_color')->nullable();
            $table->text('column2_color')->nullable();
            $table->text('column3_color')->nullable();
            $table->text('brand_checkbox_color1')->nullable();
            $table->text('brand_checkbox_color2')->nullable();
            $table->text('competitors_checkbox_color1')->nullable();
            $table->text('competitors_checkbox_color2')->nullable();

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
        Schema::dropIfExists('user_templates');
    }
}

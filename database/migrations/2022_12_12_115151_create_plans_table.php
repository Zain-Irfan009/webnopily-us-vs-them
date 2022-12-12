<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->text('type')->nullable();
            $table->text('name')->nullable();
            $table->text('price')->nullable();
            $table->text('interval')->nullable();
            $table->text('capped_amount')->nullable();
            $table->text('usage_limit')->nullable();
            $table->text('terms')->nullable();
            $table->text('trial_days')->nullable();
            $table->text('test')->nullable();
            $table->text('on_install')->nullable();
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
        Schema::dropIfExists('plans');
    }
}

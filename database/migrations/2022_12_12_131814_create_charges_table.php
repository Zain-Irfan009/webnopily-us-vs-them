<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChargesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('charges', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->bigInteger('charge_id')->nullable();
            $table->bigInteger('price')->nullable();
            $table->text('status')->nullable();
            $table->text('capped_amount')->nullable();
            $table->text('balance_used')->nullable();
            $table->text('risk_level')->nullable();
            $table->text('balance_remaining')->nullable();
            $table->text('trial_days')->nullable();
            $table->text('billing_on')->nullable();
            $table->text('api_client_id')->nullable();
            $table->text('test')->nullable();
            $table->text('activated_on')->nullable();
            $table->text('cancelled_on')->nullable();
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
        Schema::dropIfExists('charges');
    }
}

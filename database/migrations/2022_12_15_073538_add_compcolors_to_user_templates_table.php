<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCompcolorsToUserTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_templates', function (Blueprint $table) {
            $table->text('competitor_backgorund1')->nullable();
            $table->text('competitor_backgorund2')->nullable();
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

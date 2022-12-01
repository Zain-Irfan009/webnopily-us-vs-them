<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function () {
    return "Hello API";
});Route::get('select-template',[App\Http\Controllers\Api\TemplateController::class,'SelectTemplate']);
Route::post('step-1',[App\Http\Controllers\Api\TemplateController::class,'Step1Template']);
Route::post('step-2',[App\Http\Controllers\Api\TemplateController::class,'Step2Template']);
Route::get('current-templates',[App\Http\Controllers\Api\TemplateController::class,'CurrentTemplate']);
Route::get('template-view/{id}',[App\Http\Controllers\Api\TemplateController::class,'TemplateView']);
Route::post('rename-template/{id}',[App\Http\Controllers\Api\TemplateController::class,'RenameTemplate']);
Route::get('duplicate-template/{id}',[App\Http\Controllers\Api\TemplateController::class,'DuplicateTemplate']);
Route::get('delete-template/{id}',[App\Http\Controllers\Api\TemplateController::class,'DeleteTemplate']);
Route::get('products',[App\Http\Controllers\Api\TemplateController::class,'Products']);
Route::post('selected-products',[App\Http\Controllers\Api\TemplateController::class,'SelectedProducts']);



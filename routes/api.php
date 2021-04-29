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

Route::get('test', [App\Http\Controllers\PostController::class, 'index']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('posts', [App\Http\Controllers\PostController::class, 'index']);
Route::get('posts/{post}', [App\Http\Controllers\PostController::class, 'show']);
Route::post('posts', [App\Http\Controllers\PostController::class, 'store']);
Route::put('posts/{post}', [App\Http\Controllers\PostController::class, 'update']);
Route::delete('posts', [App\Http\Controllers\PostController::class, 'destroyMany']);
Route::delete('posts/{post}', [App\Http\Controllers\PostController::class, 'destroy']);

Route::get('users', [App\Http\Controllers\UserController::class, 'index']);
Route::get('users/{user}', [App\Http\Controllers\UserController::class, 'show']);
Route::post('users', [App\Http\Controllers\UserController::class, 'store']);
Route::put('users/{user}', [App\Http\Controllers\UserController::class, 'update']);
Route::delete('users', [App\Http\Controllers\UserController::class, 'destroyMany']);
Route::delete('users/{user}', [App\Http\Controllers\UserController::class, 'destroy']);

Route::get('customers', [App\Http\Controllers\CustomerController::class, 'index']);
Route::get('customers/{customer}', [App\Http\Controllers\CustomerController::class, 'show']);
Route::post('customers', [App\Http\Controllers\CustomerController::class, 'store']);
Route::put('customers/{customer}', [App\Http\Controllers\CustomerController::class, 'update']);
Route::delete('customers', [App\Http\Controllers\CustomerController::class, 'destroyMany']);
Route::delete('customers/{customer}', [App\Http\Controllers\CustomerController::class, 'destroy']);

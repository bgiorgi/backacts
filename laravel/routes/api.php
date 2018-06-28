<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->post('events/add', 'Api\EventController@Add');


Route::post('user/sign-up', 'Api\UserController@Signup');


Route::get('events', 'Api\EventController@All');
Route::get('user/{id}', 'Api\UserController@Single');
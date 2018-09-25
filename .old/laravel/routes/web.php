<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return view('welcome');
});


// email bulk download
Route::get('admin/user-emails-bulk-export','EmailBulkController@Export')->middleware('admin.user');




if (App::environment('local','production', 'staging')) {
URL::forceScheme('https');
}

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});

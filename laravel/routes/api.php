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



// sign up
Route::post('user/sign-up', 'Api\UserController@Signup');

// events list
Route::get('events', 'Api\EventController@Search');

// event
Route::get('event/{slug}', 'Api\EventController@Single');



Route::group(['middleware' => 'auth:api'], function() {

    
    // event image upload
    Route::post('upload-image','Api\UploadController@UploadImage');
    
    
    // add event
    Route::post('events/add', 'Api\EventController@Add');
    
            
    // Google places autocomplete
    Route::get('google-places/autocomplete', 'Api\GooglePlacesController@Autocomplete');

    // authorized user data
    Route::get('user', function (Request $request) {
        return $request->user();
    });
    
    // get profile info
    Route::get('user/get-profile-info', 'Api\UserController@GetProfileInfo');
    
    // update profile
    Route::post('user/update-profile', 'Api\UserController@UpdateProfile');
    
    // check bookmarks
    Route::get('check-bookmarks','Api\BookmarkController@CheckBookmarks');
    
    // toggle bookmark
    Route::post('toggle-bookmark', 'Api\BookmarkController@ToggleBookmark');    
    
    // user bookmarks
    Route::get('user-bookmarked-events','Api\UserEventsController@UserBookmarks');    
    
    // user uploads
    Route::get('user-uploaded-events','Api\UserEventsController@UserUploads');
    
});
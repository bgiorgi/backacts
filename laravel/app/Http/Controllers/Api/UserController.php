<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\User;
use App\UserTag;
use App\Tag;
use App\UserPreference;
use App\Http\Resources\User as UserResource;
use Auth;
use App\Http\Requests\RegisterUser;
use Response;

class UserController extends Controller
{
    
    // get profile info
    public static function GetProfileInfo() {
        $user = Auth::user()->with('tags')->with('preferences')->first();
        return new UserResource($user);
    }
    
    
    
    
    
    // update profile
    public static function UpdateProfile(Request $request) {
        $user = Auth::user();
        if($request->avatar) $user->avatar = $request->avatar;        
        if($request->birth_date) $user->birth_date = date('Y-m-d',strtotime($request->birth_date));
        if($request->email) $user->email = $request->email;
        if($request->password) $user->password = bcrypt($request->password);
        
        // use tags
        UserTag::where('user_id',$user->id)->delete();
        if(isset($request->tags) && is_array($request->tags)) {
                foreach($request->tags as $newTag) {
                $tagEntry = Tag::where('title',$newTag['title'])->first();
                if($tagEntry) {
                    $newUserTag = new UserTag;
                    $newUserTag->tag_id = $tagEntry->id;
                    $newUserTag->user_id = $user->id;
                    $newUserTag->save();
                }
            }
        }   
        
        // user preferences
       $userPreferences = UserPreference::firstOrNew(['user_id'=>$user->id]);
       $userPreferences->food = $request->food;
       $userPreferences->alcohol = $request->alcohol;
       $userPreferences->email_notifications = $request->email_notifications;
       $userPreferences->save();
       
       
       $user->save();
    }
    
    
    
    
    public static function Signup(RegisterUser $request) {
        

        
        $user = new User;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        
        return Response::json('success',200);
    }
    
    
}

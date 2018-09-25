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
use App\Http\Resources\EventTag as EventTagResource;
use App\EventTag;

class UserController extends Controller
{
    
    // get profile info
    public static function GetProfileInfo() {
        $user = User::with('preferences')->find(Auth::user()->id);
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
                foreach($request->tags as $tag) {
                $newUserTag = new UserTag;
                $newUserTag->tag_id = $tag['tag_id']; 
                $newUserTag->user_id = $user->id;
                $newUserTag->save();
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
        
        $userPreference = new UserPreference;
        $userPreference->user_id = $user->id;
        $userPreference->food = 1;
        $userPreference->save();
        
        
        // insert 2 most popular tag
        $popularTags = EventTag::selectRaw('tag_id, count(tag_id) as tag_count')->groupBy('tag_id')->orderBy('tag_count','desc')->limit(2)->get();
        foreach($popularTags as $popularTag) {
            $userTag = new UserTag;
            $userTag->user_id = $user->id;
            $userTag->tag_id = $popularTag->tag_id;
            $userTag->save();
        }

        
        return Response::json('success',200);
    }
    
    
    // get popular tags from events
    public static function ProfilePopularTags() {
        $popularTags = EventTag::selectRaw('tag_id,count(tag_id) as tag_count,(select title from tags where id=event_tag.tag_id) as title,(select 1 from user_tag where tag_id=event_tag.tag_id and user_id='.Auth::user()->id.') as is_user_tag')->groupBy('tag_id')->orderBy('tag_count','desc')->limit(20)->get();
        return Response::json($popularTags,200);
    }
    
    
    
}

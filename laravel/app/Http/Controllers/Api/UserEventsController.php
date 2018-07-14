<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Event;
use App\Http\Resources\Event as EventResource;

use Auth;
use DB;

class UserEventsController extends Controller
{

    public static function UserInterests() {
        $events = Event
        ::join('event_tag','events.id','=','event_tag.event_id')
        ->join('user_tag', function($join) {
            $join->where('user_tag.user_id',Auth::user()->id);
        })
        ->with('location') 
        ->with('tags')
        ->with('user')
        ->paginate(5);
        // ->toSql();
        // dd($events);
        
        
        return EventResource::collection($events);
    }
        
    
    
    public static function UserBookmarks() {
        $events = Event
        ::selectRaw('*, 1 as is_bookmarked')
        ->join('bookmarks',function($join) {
            $join->on('events.id','bookmarks.event_id')->where('bookmarks.user_id',Auth::user()->id);
        })
        ->with('location') 
        ->with('tags')
        ->with('user')
        ->paginate(5);
    
        return EventResource::collection($events);
    }
    
    
    public static function UserUploads() {
        $events = Event
        ::where('user_id',Auth::user()->id)
        ->with('location') 
        ->with('tags')
        ->with('user')
        ->paginate(5);
        
        return EventResource::collection($events);
    }
    
    
    
    
    
}

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
    public static function UserBookmarks() {
        $events = Event
        ::selectRaw('*, 1 as is_bookmarked')
        ->join('bookmarks',function($join) {
            $join->on('events.id','bookmarks.event_id')->where('bookmarks.user_id',Auth::user()->id);
        })
        ->get();
        
        return EventResource::collection($events);
    }
    
    
    public static function UserUploads() {
        $events = Event
        ::where('user_id',Auth::user()->id)
        ->get();
        
        return EventResource::collection($events);
    }
    
    
    
    
    
}

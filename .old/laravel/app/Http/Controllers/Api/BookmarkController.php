<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Response;
use App\Bookmark;
use App\Http\Resources\Bookmark as BookmarkResource;
use Auth;


class BookmarkController extends Controller
{
        
        
    // check bookmark
    public static function CheckBookmarks(Request $request) {
        $eventIds = json_decode($request->event_ids,1);
        $bookmarks = Bookmark
        ::where('user_id',Auth::user()->id)
        ->whereIn('event_id',$eventIds)
        ->get();
    
        return BookmarkResource::collection($bookmarks);
        
    } 
    
    
    // toggle bookmark
    public static function ToggleBookmark(Request $request) {
        $bookmark = Bookmark::where('user_id',Auth::user()->id)->where('event_id',$request->event_id)->first();
        if($bookmark) {
            $bookmark->delete();
            return Response::json('unsaved',200);
        }
        else {
            $bookmark = new Bookmark;
            $bookmark->user_id = Auth::user()->id;
            $bookmark->event_id = $request->event_id;
            $bookmark->save();
            return Response::json('saved',200);
        }
    }
    
    
}

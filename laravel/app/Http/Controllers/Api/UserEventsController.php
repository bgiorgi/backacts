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
    

    public static function UserInterests(Request $request) {
        
        // date manipulation
        $strtotime = strtotime($request->date);
        $dayStart = date('Y:m:d',$strtotime);
        $dayEnd = date('Y:m:d',$strtotime+60*60*24);
        $date = date('Y-m-d',strtotime($request->date));
        
        
        $events = Event
        ::selectRaw('*, events.id')
        ->join('event_tag','event_tag.event_id','=','events.id')
        ->join('user_tag', function($join) {
            $join->where('user_tag.user_id',Auth::user()->id)->whereRaw('user_tag.tag_id in(event_tag.tag_id)');
        })
        ->addSelect(DB::raw('(select 1 from bookmarks where event_id=events.id and user_id='.Auth('api')->user()->id.') as is_bookmarked'))
        //keyword
        ->when($request->keyword, function($query) use($request) {
            return $query->where('title','like',"%$request->keyword%");
            
        })              
        //date
        ->when($request->date, function($query) use($request,$dayStart,$dayEnd) {
            return $query->where('date_time','>',$dayStart)->where('date_time','<',$dayEnd);
            
        })  
        //price max
        ->when($request->price_max, function($query) use($request) {
            return $query->where('price_amount','<',$request->price_max)->orWhere('price_amount',null);
        })
        // if event is bookmark of current authorized user
        ->when(Auth('api')->user(), function($query) {
            return $query->addSelect(DB::raw('(select 1 from bookmarks where event_id=events.id and user_id='.Auth('api')->user()->id.') as is_bookmarked'));
        })  
        // where distance < ?
        ->when($request->lng && $request->lat && $request->distance, function($query) use($request){                   
                return $query->whereRaw('(select ( 6371 * acos( cos( radians('.$request->lat.') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('.$request->lng.') ) + sin( radians('.$request->lat.') ) * sin( radians( lat ) ) ) )   from locations where id=events.location_id  limit 1) is not null AND (select ( 6371 * acos( cos( radians('.$request->lat.') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('.$request->lng.') ) + sin( radians('.$request->lat.') ) * sin( radians( lat ) ) ) )   from locations where id=events.location_id  limit 1) < '.$request->distance); 
        })    
        ->orderBy('date_time')            
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
        ::selectRaw('*,events.id, 1 as is_bookmarked')
        ->join('bookmarks',function($join) {
            $join->on('events.id','bookmarks.event_id')->where('bookmarks.user_id',Auth::user()->id);
        })
        ->orderBy('date_time')            
        ->with('location') 
        ->with('tags')
        ->with('user')
        ->paginate(5);
    
        return EventResource::collection($events);
    }
    
    
    public static function UserUploads() {
        $events = Event
        ::selectRaw('*, events.id')
        ->addSelect(DB::raw('(select 1 from bookmarks where event_id=events.id and user_id='.Auth('api')->user()->id.') as is_bookmarked'))
        ->where('user_id',Auth::user()->id)
        ->orderBy('date_time')            
        ->with('location') 
        ->with('tags')
        ->with('user')
        ->paginate(5);
        
        return EventResource::collection($events);
    }
    
    
    
    
    
}

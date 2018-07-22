<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Event;
use App\Http\Resources\Event as EventResource;
use App\Tag;
use App\EventTag;
use App\Location;
use App\Bookmark;
use Auth;
use Response;
use DB;
use App\Http\Requests\AddEvent;

class EventController extends Controller
{

    public static function Search(Request $request) {
        
        // date manipulation
        $strtotime = strtotime($request->date);
        $dayStart = date('Y:m:d',$strtotime);
        $dayEnd = date('Y:m:d',$strtotime+60*60*24);
        $date = date('Y-m-d',strtotime($request->date));
        
        
        $events = Event::
            select('*')
            // if event is bookmark of current authorized user
            ->when(Auth('api')->user(), function($query) {
                return $query->addSelect(DB::raw('(select 1 from bookmarks where event_id=events.id and user_id='.Auth('api')->user()->id.') as is_bookmarked'));
            })              
            // distance
            ->when($request->lng && $request->lat, function($query) use($request){
                return $query->addSelect(DB::raw('(select ( 6371 * acos( cos( radians('.$request->lat.') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('.$request->lng.') ) + sin( radians('.$request->lat.') ) * sin( radians( lat ) ) ) ) as distance1  from locations where id=events.location_id  limit 1) AS distance'));
            })
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
                return $query->whereRaw('(price_amount < '.$request->price_max.' or price_amount is null)');
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
    
    
    
    public static function Add(AddEvent $request) {
        
        
        // Google places api / place detail
        //$googlePlace = json_decode($request->google_place,1);
        $google_place_id = $request->google_place['place_id'];
        $location = Location::where('google_id',$google_place_id)->first();
        if(!$location) { 
            //https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,formatted_address,geometry&key=AIzaSyBvaUiRxSCYYfbHYvONJUViQ6xpkPIqejE
            $googlePlaceUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='.$google_place_id.'&fields=name,formatted_address,geometry&key=AIzaSyBvaUiRxSCYYfbHYvONJUViQ6xpkPIqejE';
            $googlePlaceContent = file_get_contents($googlePlaceUrl); 
            $googlePlace = json_decode($googlePlaceContent,1); 
            $location = new Location;
            $location->address = $googlePlace['result']['formatted_address'];
            $location->lat =  $googlePlace['result']['geometry']['location']['lat'];
            $location->lng =  $googlePlace['result']['geometry']['location']['lng'];
            $location->name =  $googlePlace['result']['name'];
            $location->save();
        }
        


        $event = new Event;
        $event->user_id = Auth::user()->id;
        $event->title = $request->title;
        $event->slug = str_slug($request->title);
        $event->date_time = date('Y-m-d',strtotime($request->date)).' '.$request->time;
        $event->duration_hours = $request->duration_hours;
        $event->location_id = $location->id;
        $event->link = $request->link;
        $event->min_age = $request->min_age;
        $event->alcohol = $request->alcohol;
        $event->food = $request->food;
        $event->price_amount = $request->price_amount;
        $event->price_method = $request->price_method;
        $event->ticket_link = $request->ticket_link;
        $event->description = $request->description;
        $event->image = $request->image;
        
        $event->save();
        
        $tags = explode('#',$request->tags);
        $tags = array_filter($tags);
        foreach($tags as $tagTitle) {
            $tag = Tag::firstOrCreate(['title'=>$tagTitle]);
            $eventTag = new EventTag;
            $eventTag->event_id = $event->id;
            $eventTag->tag_id = $tag->id;
            $eventTag->save();
        }
        
        return Response::json('success', 200); 
        
    }
    
    
    
    
    public static function single($slug) {
        $event = Event
        ::where('slug',$slug)
            ->with('location') 
            ->with('tags')
            ->with('user')
            ->first();
            
        return new EventResource($event);            
    }
    
    
    


}

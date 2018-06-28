<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Event;
use App\Http\Resources\Event as EventResource;
use App\Tag;
use App\EventTag;
use App\Location;
use Auth;
use Response;

class EventController extends Controller
{
    public static function All() {
        return EventResource::collection(Event::with('tags')->paginate(15));
    }
    
    public static function Add(Request $request) {
        
        

        $location = Location::where('google_id',$request->google_place_id)->first();
        if(!$location) { 
            //https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,formatted_address,geometry&key=AIzaSyBvaUiRxSCYYfbHYvONJUViQ6xpkPIqejE
            $googlePlaceUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='.$request->google_place_id.'&fields=name,formatted_address,geometry&key=AIzaSyBvaUiRxSCYYfbHYvONJUViQ6xpkPIqejE';
            $googlePlaceContent = file_get_contents($googlePlaceUrl); 
            $googlePlace = json_decode($googlePlaceContent,1); 
            $location = new Location;
            $location->address = $googlePlace['result']['formatted_address'];
            $location->lat =  $googlePlace['result']['geometry']['location']['lat'];
            $location->lng =  $googlePlace['result']['geometry']['location']['lng'];
            $location->name =  $googlePlace['result']['name'];
        }
        
        

        $event = new Event;
        $event->user_id = Auth::user()->id;
        $event->title = $request->title;
        $event->slug = str_slug($request->title);
        $event->date_time = $request->date.' '.$request->time;
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
        //$event->image = $image_link;
        
        $event->save();
        
        $tags = explode('#',$request->tags);
        foreach($tags as $tagTitle) {
            $tag = Tag::firstOrCreate(['title'=>$tagTitle]);
            $eventTag = new EventTag;
            $eventTag->event_id = $event->id;
            $eventTag->tag_id = $tag->id;
            $eventTag->save();
        }
        
        
        return Response::json('success', 200); 
        
    }

}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use App\Http\Resources\Tag as TagResource;
use App\Tag;

use Auth;

class Event extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
            return [
                'id' => $this->id,
                'title' => $this->title,
                'slug' => $this->slug,
                'date_time' => $this->date_time,
                'duration_hours' => $this->duration_hours,
                'link' => $this->link,
                'min_age' => $this->min_age,
                'alcohol' => $this->alcohol,
                'food' => $this->food,
                'price_amount' => $this->price_amount,
                'price_method' => $this->price_method,
                'ticket_link' => $this->ticket_link,
                'description' => $this->description,
                'image' => $this->image,
                'tags' => $this->tags,
                'user' => $this->user,
                'location' => $this->location,
                'distance' => $this->distance,
                'is_bookmarked' => $this->is_bookmarked,
                'belongs_current_user' => belongsCurrentUser($this->user_id),
                'relative_date' => relativeDate($this->date_time),
                'bookmark_count' => $this->bookmark_count // for uploaders only
                ];
    }
}


    $previousRelativeDate='';
    function relativeDate($dateTime) {
        global $previousRelativeDate;
        
        $targetTime = strtotime($dateTime);
        $currentTime = time();
        
        $targetDayStart = strtotime(date('Y-m-d 0:0:0',$targetTime));
        $currentDayStart = strtotime(date('Y-m-d 0:0:0',$currentTime));
        
        $dayDifference = floor(($targetDayStart-$currentDayStart)/(24*60*60));
        switch($dayDifference) {
            case 0: $relativeDate = 'Today'; break;
            case 1: $relativeDate = 'Tomorrow'; break;
            default: $relativeDate = date('M d',$targetTime);
        }
        if($previousRelativeDate!=$relativeDate) {
            $previousRelativeDate = $relativeDate;
            return $relativeDate;
        }
    }
    
    
    
    
    function belongsCurrentUser($userId) {
        if(Auth('api')->check() && $userId==Auth('api')->user()->id) return 1;
    }
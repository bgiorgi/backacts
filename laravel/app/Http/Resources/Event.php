<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use App\Http\Resources\Tag as TagResource;
use App\Tag;

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
                ];
    }
}

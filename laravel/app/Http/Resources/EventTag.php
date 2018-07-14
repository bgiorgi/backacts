<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class EventTag extends Resource
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
            'event_id' => $this->event_id,
            'tag_id' => $this->tag_id,
            'tag' => $this->tag
            ];
    }
}

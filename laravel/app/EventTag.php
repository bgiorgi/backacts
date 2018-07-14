<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventTag extends Model
{
    protected $table = "event_tag";
    
    
    public function tag() {
        return $this->belongsTo('App\Tag');
    }
}

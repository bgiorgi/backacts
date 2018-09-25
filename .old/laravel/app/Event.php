<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public function tags() {
        return $this->belongsToMany('App\Tag');
    }
    
    public function location() {
        return $this->belongsTo('App\Location');
    }    
    
    public function user() {
        return $this->belongsTo('App\User');
    }        
    
}

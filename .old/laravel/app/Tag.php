<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['title'];
    
    protected $hidden = [
        'created_at', 'updated_at',
    ];
}

<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Image;
use Response;

class UploadController extends Controller
{
    public static function UploadImage(Request $request) {
        $path = $request->file('image')->store('public/gallery');
        $path = str_replace('public/','',$path);
        return Response::json($path,200);
        
    }
}

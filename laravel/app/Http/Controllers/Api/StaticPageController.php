<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\StaticPage;
use App\Http\Resources\StaticPage as StaticPageResource;

class StaticPageController extends Controller
{
    public static function Single(Request $request) {
         $staticPage = StaticPage::where('slug',$request->slug)->first();
         return new StaticPageResource($staticPage);
    }
    

    
}

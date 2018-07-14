<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GooglePlacesController extends Controller
{
    public static function Autocomplete(Request $request) {
        $googleApiUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='.urlencode($request->input).'&types=geocode&location=43.6514893,-79.3839198&types=establishment&components=country:ca&key=AIzaSyBvaUiRxSCYYfbHYvONJUViQ6xpkPIqejE';
        $contents = file_get_contents($googleApiUrl);
        $json = json_decode($contents,1);
        $data = array();
        foreach($json['predictions'] as $place) { 
            $data[] = array('description'=>$place['description'],'place_id'=>$place['place_id']);
        }
        echo json_encode($data);
    }
}

<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Http\Resources\User as UserResource;
use Response;

class UserController extends Controller
{
    public static function Single($id) {
        return new UserResource(User::with('tags')->with('preferences')->find($id));
    }
    
    public static function Signup(Request $request) {
        $user = new User;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        
        return Response::json('success',200);
    }
    
}

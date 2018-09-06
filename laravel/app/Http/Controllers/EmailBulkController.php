<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;

use Response;

class EmailBulkController extends Controller
{
    public function Export()
{
    $headers = array(
        "Content-type" => "text/csv",
        "Content-Disposition" => "attachment; filename=user_emails.csv",
        "Pragma" => "no-cache",
        "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
        "Expires" => "0"
    );

    $users = User::all();
    $columns = array('Username','E-mail');

    $callback = function() use ($users, $columns)
    {
        $file = fopen('php://output', 'w');
        fputcsv($file, $columns);

        foreach($users as $user) {
            fputcsv($file, array($user->name, $user->email));
        }
        fclose($file);
    };
    return Response::stream($callback, 200, $headers);
}
}

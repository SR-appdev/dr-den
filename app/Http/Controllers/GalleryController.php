<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Modals\Images;
use Auth;
use Carbon\Carbon;

class GalleryController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function getall()
    {
       $img = Images::with('customer')->orderBy('created_at','DESC')->get()->toArray();
        return Response::json(array('gallery' => $img));;
    }
}

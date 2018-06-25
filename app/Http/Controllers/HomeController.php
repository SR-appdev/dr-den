<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Modals\User;
use Auth;
class HomeController extends Controller
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
    public function index()
    {
        $menu = \Session()->get('menu');
        $user = User::where('id', Auth::user()->id)->first()->toArray();
        return view('master')->with(['menu'=>$menu,'user'=>$user]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Modals\User;
use App\Modals\Visits;
use App\Modals\Operations;
use App\Modals\VisitOperaton;
use App\Modals\Toothnote;
use Auth;

class UploadController  extends Controller
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




    public function uploadimages(Request $request){
     if($request->hasFile('file')){
      $file = $request->file('file');
      $imgname = rand().time();
      while(file_exists(public_path().$imgname.".".$file->getClientOriginalExtension())){
        $imgname = $imgname.rand();
      }
      $path = $file->storeAs('images', $imgname.".".$file->getClientOriginalExtension());

      return Response::json(array('path' =>  $path));
    }
  }
}

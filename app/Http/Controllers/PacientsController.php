<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Modals\User;
use App\Modals\Pacients;
use Auth;
class PacientsController  extends Controller
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


    public function getpacients(){


        $patients = Pacients::where('is_deleted',0)->get()->toArray();
        return Response::json(array('patients' => $patients));
    }

    public function deletepat(Request $request){

        $id = $request->id;
        $patient =Pacients::where('id',$id)->first();
        $patient->is_deleted = 1;
        $patient->save();
        return Response::json(array('status' =>"success"));
    }

    public function submit(Request $request){

        $input = $request->input('data');
        if (isset($input['id']) && $input['id'] != '') {
            $id = $input['id'];
            unset($input['id']);
            $items = Pacients::where('id', $id)->first();
            
        } else {
            $items = new Pacients;
        }
        foreach ($input as $key => $value) {
            $items->$key = $value;
        }
        $items->save();
        return Response::json(array('status' => 'OK','id'=>$items->id));
    }



}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Modals\Operations;
use Auth;
class OperationsController  extends Controller
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


    public function getoperations(){


        $operations = Operations::where('is_deleted',0)->get()->toArray();
        return Response::json(array('operations' => $operations));
    }

    public function deletepat(Request $request){

        $id = $request->id;
        $patient =Operations::where('id',$id)->first();
        $patient->is_deleted = 1;
        $patient->save();
        return Response::json(array('status' =>"success"));
    }

    public function submit(Request $request){

        $input = $request->input('data');
        if (isset($input['id']) && $input['id'] != '') {
            $id = $input['id'];
            unset($input['id']);
            unset($input['created_at']);
            unset($input['updated_at']);
            $items = Operations::where('id', $id)->first();
            
        } else {
            $items = new Operations;
        }
        foreach ($input as $key => $value) {
            $items->$key = $value;
        }
        $items->save();
        return Response::json(array('status' => 'OK','id'=>$items->id));
    }



}

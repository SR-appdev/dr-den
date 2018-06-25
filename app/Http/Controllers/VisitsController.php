<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Modals\User;
use App\Modals\Visits;
use App\Modals\Operations;
use App\Modals\VisitOperaton;
use Auth;
class VisitsController  extends Controller
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


    public function getall(Request $request){
        $id = $request->id;

        $Visits = Visits::where('is_deleted',0)->with(['operations','operations.name','images','patients']);

        if(isset($id) && $id > 0)
            $Visits = $Visits->where('customer_id',$id);

        $Visits = $Visits->limit(1000)->orderBy('created_at','desc')->get()->toArray();
        $operations = Operations::where('is_deleted',0)->get()->toArray();
        return Response::json(array('visits' => $Visits,'operations'=>$operations));
    }


    public function delete(Request $request){

        $id = $request->id;
        $patient =Visits::where('id',$id)->first();
        $patient->is_deleted = 1;
        $patient->save();
        return Response::json(array('status' =>"success"));
    }

    public function submit(Request $request){

        $input = $request->input('data');
        if(isset($input['operations'])) unset($input['operations']);
        if(isset($input['images'])){
            $imgs = $input['images'];
            unset($input['images']);
        } 
        if(isset($input['operations_id'])){
            $operations_id = $input['operations_id'];
            unset($input['operations_id']);
        }
        if(isset($input['patients'])) unset($input['patients']);
        if (isset($input['id']) && $input['id'] != '') {
            $id = $input['id'];
            unset($input['id']);
            $items = Visits::where('id', $id)->first();
            
        } else {
            $items = new Visits;
        }
        foreach ($input as $key => $value) {
            $items->$key = $value;
        }
        $items->save();
        VisitOperaton::where('visit_id', $items->id)->delete();
        foreach ($operations_id as   $value) {
          $ops = new VisitOperaton();
          $ops->visit_id = $items->id;
          $ops->operation_id = $value;
          $ops->save();

        }
        
        return Response::json(array('status' => 'OK','id'=>$items->id));
    }

}

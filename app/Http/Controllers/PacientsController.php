<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Modals\User;
use App\Modals\Pacients;
use App\Modals\Operations;
use App\Modals\Factures;
use Auth;
use Carbon\Carbon;
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
        $today = Carbon::today()->toDateString();
        $operations = Operations::where('is_deleted',0)->get()->toArray();

        $patients = Pacients::selectRaw('sum(factures.paid) as paid,den_customers.*,joint1.total')->with(['tooth','images','operations','factures','calendar'=>function($q)use($today){
            $q->whereDate('schedule_date','>=',$today);
            }])->leftJoin('factures','den_customers.id', '=', 'factures.patient_id')->where('is_deleted',0)->groupBy('den_customers.id')->leftJoin(\DB::raw('(SELECT SUM(total) AS total,customer_id
            FROM den_visit GROUP BY customer_id) joint1'),function($join){
            $join->on('den_customers.id', '=', 'joint1.customer_id');
        })
        // ->leftJoin('den_schedule','den_customers.id', '=', 'den_schedule.customer_id')->whereDate('den_schedule.schedule_date','>=',$today)

        ->get()->toArray();
        return Response::json(array('patients' => $patients,'operations'=>$operations));
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
        unset($input['tooth']);
        unset($input['operations']);
        unset($input['images']);
        unset($input['factures']);
        unset($input['operations_id']);
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


    public function submitfacture(Request $request){

        $amount = $request->input('amount');
        $id = $request->input('id');
        $patienid = $request->input('patienid');

        if (isset($id) && $id != '') {
            $items = Factures::where('id', $id)->first();
            
        } else {
            $items = new Factures;
            $items->patient_id =  $patienid;
        }
        $items->paid = $amount;
        $items->save();
        return Response::json(array('status' => 'OK','item'=>$items));
    }

    public function deletefacture(Request $request){

        $id = $request->id;
        Factures::where('id',$id)->delete();
        return Response::json(array('status' =>"success"));
    }

    public function getfactures(Request $request){

        $id = $request->id;
        $factures = Factures::where('patient_id',$id)->orderBy('created_at','desc')->get()->toArray();
        return Response::json(array('factures' =>$factures));
    }

}

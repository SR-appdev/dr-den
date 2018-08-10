<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Modals\Pacients;
use App\Modals\Schedule;
use Illuminate\Support\Facades\Response;
use Auth;
class CalendarController  extends Controller
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
    public function getpatient()
    {
        $pat = Pacients::where('is_deleted',0)->get()->toArray();
        
        return response()->json(['patients'=>$pat]);
    }

    public function allcalendar(Request $request)
    {   $arracal = [];
        $data = $request->input('data');
        $pat = Schedule::with('customer');
        if(isset($data['end']) && isset($data['start']) ){
            $pat = $pat->whereDate('schedule_date','>=',$data['start'])
            ->whereDate('end_date','<=',$data['end']);
        }
        $pat = $pat->get()->toArray();
        foreach ($pat as $value) {
            $arracal[] = array(
                'id'=>$value['id'],
                'customer_id'=>$value['customer_id'],
                'title'=>$value['customer']['name'],
                'start'=>$value['schedule_date'],
                'end'=>$value['end_date'],
                'note'=>$value['note']

            ); 
        }
        return response()->json(['calendar'=>$arracal]);
    }

    public function submit(Request $request)
    {
        $input = $request->input('data');
        if (isset($input['id']) && $input['id'] != '') {
            $id = $input['id'];
            unset($input['id']);
            $items = Schedule::where('id', $id)->first();
            
        } else {
            $items = new Schedule;
        }
        foreach ($input as $key => $value) {
            $items->$key = $value;
        }
        $items->save();
        return Response::json(array('status' => 'OK','id'=>$items->id));
    }

    public function resizecalendar(Request $request)
    {
        $id = $request->input('id');
        $end = $request->input('end');
        $items = Schedule::where('id', $id)->first();
        if($items){
            $items->end_date =$end;
            $items->save();
        }
        return Response::json(array('status' => 'OK'));
    }
    public function dragcalendar(Request $request)
    {
        $id = $request->input('id');
        $start = $request->input('start');
        $end = $request->input('end');
        $items = Schedule::where('id', $id)->first();
        if($items){
            $items->schedule_date = $start;
            $items->end_date =$end;
            $items->save();
        }
        return Response::json(array('status' => 'OK'));
    }
    public function deletecal(Request $request)
    {
        $id = $request->input('id');
        $items = Schedule::where('id', $id)->delete();
        return Response::json(array('status' => 'OK'));
    }
}

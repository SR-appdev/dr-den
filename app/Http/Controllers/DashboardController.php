<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Modals\User;
use App\Modals\Pacients;
use App\Modals\Visits;
use App\Modals\Schedule;
use App\Modals\Factures;
use App\Modals\VisitOperaton;
use Auth;
use Carbon\Carbon;

class DashboardController extends Controller
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
        $data = [];
        $today = Carbon::today()->toDateString();
        $firstmonth =Carbon::parse('first day of this month')->toDateString();
        $lastmonth =Carbon::parse('last day of this month')->toDateString();
        $data['patients'] = Pacients::where('is_deleted',0)->count();
        $data['visits'] = Visits::where('is_deleted',0)->count();
        $data['apointment'] = Schedule::whereDate('schedule_date','>=', $today)->count();
        $data['total'] = Visits::where('is_deleted',0)->whereDate('created_at','>=', $firstmonth)->sum('total');
        $data['paid'] = Factures::whereDate('created_at','>=', $firstmonth)->sum('paid');
        $data['rest'] = $data['total'] - $data['paid'] ;

        $thismonth = Carbon::now()->subMonth();
        $data['totalmonth'] = [];
        $data['totalpaid'] = [];
        $data['monthname'] = [];
        for ($i=0; $i < 6 ; $i++) { 
            $m = $thismonth->month;
            $y = $thismonth->year;
            $s = Visits::where('is_deleted',0)->whereMonth('created_at', $m)->whereYear('created_at',$y)->sum('total');
            $p = Factures::whereMonth('created_at', $m)->whereYear('created_at',$y)->sum('paid');
            $thismonth->subMonth();
            $monthName = date('F', mktime(0, 0, 0, $m, 10));
            array_push($data['totalmonth'], $s);
            array_push($data['totalpaid'], $p);
            array_push($data['monthname'], $monthName);
        }

        $data['userapointment'] = Schedule::whereDate('schedule_date', $today)->with('customer')->get()->toArray();

        $appop = VisitOperaton::selectRaw('operation_id,count(*) as count')->with('name')->groupBy('operation_id')->get()->toArray();
        $data['opname']=[];
        $data['opcount']=[];
        foreach ($appop as $value) {
            array_push($data['opname'], $value['name']['name']);
            $ops = array('value' => $value['count'], 'name'=>$value['name']['name'],'color'=>$value['name']['color']);
            array_push($data['opcount'], $ops);

        }


        return Response::json(array('data' => $data));;
    }
}

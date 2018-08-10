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

class StatementController extends Controller
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
    public function getinvoice(Request $request)
    {
        $date = $request->input('date');
        $inv = Factures::with('customer');
        if(isset($date['start']) && isset($date['end'])){
            $inv = $inv->whereDate('created_at','>=',$date['start'])->whereDate('created_at','<=',$date['end']);
        }


       $inv = $inv->get()->toArray();

        return Response::json(array('invoices' => $inv));;
    }
}

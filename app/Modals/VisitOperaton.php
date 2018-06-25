<?php

namespace App\Modals;
use Illuminate\Database\Eloquent\Model;



class VisitOperaton extends Model
{
protected $table = 'operation_visit';

	public function name(){
	return	$this->belongsTo('App\Modals\operations','operation_id');
	}

}



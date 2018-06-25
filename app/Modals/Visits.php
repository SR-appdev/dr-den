<?php

namespace App\Modals;
use Illuminate\Database\Eloquent\Model;



class Visits extends Model
{
protected $table = 'den_visit';

	public function operations(){
		return $this->hasMany('App\Modals\VisitOperaton','visit_id');
	}

	public function images(){
		return $this->hasMany('App\Modals\Images','visit_id');
	}
	public function patients(){
		return $this->belongsTo('App\Modals\Pacients','customer_id');
	}
}



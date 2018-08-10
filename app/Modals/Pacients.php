<?php

namespace App\Modals;
use Illuminate\Database\Eloquent\Model;



class Pacients extends Model
{
	protected $table = 'den_customers';


	public function images(){
		return $this->hasMany('App\Modals\Images','patient_id');
	}

	public function tooth(){
		return $this->hasMany('App\Modals\Toothnote','patient_id');
	}
	public function operations(){
		return $this->hasMany('App\Modals\VisitOperaton','patient_id');
	}
	public function factures(){
		return $this->hasMany('App\Modals\Factures','patient_id');
	}
	public function calendar(){
		return $this->hasMany('App\Modals\Schedule','customer_id');
	}

}



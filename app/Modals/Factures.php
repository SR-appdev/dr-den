<?php

namespace App\Modals;
use Illuminate\Database\Eloquent\Model;



class Factures extends Model
{
	protected $table = 'factures';

	public function customer(){
		return $this->belongsTo('App\Modals\Pacients','patient_id');
	}
}



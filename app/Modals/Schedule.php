<?php

namespace App\Modals;
use Illuminate\Database\Eloquent\Model;



class Schedule extends Model
{
	protected $table = 'den_schedule';

	public function customer(){
		return $this->belongsTo('App\Modals\Pacients','customer_id');
	}

}



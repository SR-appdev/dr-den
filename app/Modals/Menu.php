<?php

namespace App\Modals;
use Illuminate\Database\Eloquent\Model;



class Menu extends Model
{
protected $table = 'menu';

public function translate(){
    return $this->hasMany('App\Modals\Menui18','menu_id');
}
public function child(){
	return $this->hasMany(static::class,'parent_id');
}
}

class Menui18 extends Model
{
protected $table = 'menu_i18';

}



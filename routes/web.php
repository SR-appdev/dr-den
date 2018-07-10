<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Auth::routes();
Route::get('/','HomeController@index');
Route::get('/views/{page}','ViewController@page');

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/logout', 'Auth\LoginController@logout');


//Pacients
Route::get('/pacients/all', 'PacientsController@getpacients');
Route::post('/pacients/delete', 'PacientsController@deletepat');
Route::post('/pacients/submit', 'PacientsController@submit');

//visits
Route::get('/visits/all', 'VisitsController@getall');
Route::get('/visits/operations', 'VisitsController@getoperations');
Route::post('/visits/delete', 'VisitsController@delete');
Route::post('/visits/submit', 'VisitsController@submit');
Route::post('/upload/images', 'UploadController@uploadimages');


//Operations
Route::get('/operations/all', 'OperationsController@getoperations');
Route::post('/operations/delete', 'OperationsController@deletepat');
Route::post('/operations/submit', 'OperationsController@submit');
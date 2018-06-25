<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Modals\Menu;
class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
    public function username()
{
        return 'username';
}
    public function login(Request $request){
        $this->validateLogin($request);
        if ($this->attemptLogin($request)) {
            $menu = Menu::with(['translate','child','child.translate'])->where('parent_id',0)->where('active',1)->get()->toArray();
            $request->session()->put('menu',$menu);
        }
        return redirect('/');
    }
    public function logout(){
        \Session::flush();
        Auth::logout();
        return redirect('/login');
    }
}

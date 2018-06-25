<!DOCTYPE html>
<html lang="en">
<head>
    <title>Login V1</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--===============================================================================================-->
    <link rel="icon" type="image/png" href="{{ asset('imgs/favicon.ico')}}"/>
    <!--===============================================================================================-->
    <link href="{{ asset('libraries/bootstrap/dist/css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{ asset('libraries/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet">
    <!--===============================================================================================-->
    <link href="{{ asset('libraries/animate/animate.css')}}" rel="stylesheet">
    <!--===============================================================================================-->  
    <link href="{{ asset('libraries/css-hamburgers/hamburgers.min.css')}}" rel="stylesheet">
    <!--===============================================================================================-->
    <link href="{{ asset('libraries/select2/select2.min.css')}}" rel="stylesheet">
    <!--===============================================================================================-->
    <link href="{{ asset('css/util.css')}}" rel="stylesheet">
    <link href="{{ asset('css/login.css')}}" rel="stylesheet">
    <!--===============================================================================================-->
</head>
<body>

    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100">
                <div class="login100-pic js-tilt" data-tilt>
                    <img src="{{ asset('imgs/avatar5.png')}}" alt="IMG">
                </div>

                <form class="login100-form validate-form" method="POST" action="{{ route('login') }}">
                    <span class="login100-form-title">
                        Member Login
                    </span>
                    {{ csrf_field() }}
                    <div class="wrap-input100 validate-input" data-validate = "Valid username is required:admin">
                        <input class="input100" type="text" name="username" placeholder="Username">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate = "Password is required">
                        <input class="input100" type="password" name="password" placeholder="Password">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>
                    
                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn">
                            Login
                        </button>
                    </div>


                    <div class="text-center p-t-136">
                        <a class="txt2" href="#">
                           Copyright &copy; {{ date('Y')}} <b><a href="https://adminlte.io" class="text-black">SR#DEV</a></b><br>
                           All rights reserved
                       </a>
                   </div>
               </form>
           </div>
       </div>
   </div>




   <!--===============================================================================================-->  
   <script src="{{ asset('libraries/jquery/dist/jquery.min.js')}}"></script>
   <script src="{{ asset('libraries/bootstrap/dist/js/bootstrap.min.js')}}"></script>
   <script src="{{ asset('libraries/bootstrap/dist/js/popper.min.js')}}"></script>
   <!--===============================================================================================-->
   <script src="{{ asset('libraries/select2/select2.min.js')}}"></script>
   <!--===============================================================================================-->
   <script src="{{ asset('libraries/tilt/tilt.jquery.min.js')}}"></script>
   <script >
    $('.js-tilt').tilt({
        scale: 1.1
    })
</script>
<!--===============================================================================================-->
<script src="{{ asset('js/login.js')}}"></script>

</body>
</html>
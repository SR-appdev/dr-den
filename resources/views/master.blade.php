<!DOCTYPE html>
<html lang="en" ng-app="dentist">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <!-- Meta, title, CSS, favicons, etc. -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="images/favicon.ico" type="image/ico" />

  <title data-ng-bind="'Dental Clinic&nbsp;| '+ state.current.data.title"></title>

  <!-- Bootstrap -->
  <link href="{{ asset('libraries/bootstrap/dist/css/bootstrap.min.css')}}" rel="stylesheet">
  <link href="{{ asset('libraries/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet">
  <link href="{{ asset('libraries/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css')}}" rel="stylesheet">
  <link href="{{ asset('libraries/angular/angular-block-ui.min.css')}}" rel="stylesheet">
  <link href="{{ asset('libraries/fancybox/jquery.fancybox.min.css')}}" rel="stylesheet">
  <!-- <link href="{{ asset('libraries/datatables/css/jquery.dataTables.min.css')}}" rel="stylesheet"> -->
  <link href="{{ asset('libraries/select/css/bootstrap-select.min.css')}}" rel="stylesheet">
  <link href="{{ asset('libraries/datatables/css/dataTables.bootstrap.min.css')}}" rel="stylesheet">
  <link href="{{ asset('libraries/datatables/css/responsive.bootstrap.min.css')}}" rel="stylesheet">
  <link href="{{ asset('libraries/toast/ngToast.min.css')}}" rel="stylesheet">
  <link href="{{ asset('libraries/dropzone/dropzone.min.css')}}" rel="stylesheet">
  <link href="{{ asset('libraries/nprogress/nprogress.css')}}" rel="stylesheet">
  <link href="{{ asset('libraries/toast/ngToast-animations.css')}}" rel="stylesheet">
  <link href="{{ asset('libraries/colorpicker/css/bootstrap-colorpicker.min.css')}}" rel="stylesheet">
  <link href="{{ asset('css/template.css')}}" rel="stylesheet">
  <link href="{{ asset('libraries/fullcalendar/fullcalendar.min.css')}}" rel="stylesheet">
  <link href="{{ asset('libraries/fullcalendar/fullcalendar.print.min.css')}}" rel="stylesheet"  media='print'>
  <link href="{{ asset('libraries/bootsrapdaterangepicker/daterangepicker.css')}}" rel="stylesheet">
  <link href="{{ asset('css/custom.css')}}" rel="stylesheet">
    <style>
    .my-animation.ng-enter {
      -webkit-animation: flipInY 1s;
      -moz-animation: flipInY 1s;
      animation: flipInY 1s;
    }
    .my-animation.ng-leave {
      -webkit-animation: flipOutY 1s;
      -moz-animation: flipOutY 1s;
      animation: flipOutY 1s;
    }
  </style>
</head>

<body class="nav-sm">
 
  <div class="container body">
    <div class="main_container">
      <div class="col-md-3 left_col">
       @include('include.menu')
     </div>

     <!-- top navigation -->
     <div class="top_nav">
       @include('include.header')
     </div>
     <!-- /top navigation -->

     <!-- page content -->
     <div class="right_col" role="main" ui-view>
      <!-- top tiles -->
      
    </div>
    <!-- /page content -->
    <!-- footer content -->
    @include('include.footer')
    <!-- /footer content -->
  </div>
</div>

<script src="{{ asset('libraries/jquery/dist/jquery.min.js')}}"></script>
<script src="{{ asset('libraries/bootstrap/dist/js/bootstrap.min.js')}}"></script>
<script src="{{ asset('libraries/moment/moment.js')}}"></script>
<script src="{{ asset('libraries/echarts/echarts.min.js')}}"></script>
<script src="{{ asset('libraries/bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js')}}"></script>
<script src="{{ asset('libraries/bootsrapdaterangepicker/daterangepicker.js')}}"></script>


<script src="{{ asset('libraries/angular/angular.min.js')}}"></script>
<script src="{{ asset('libraries/angular/angular-animate.js')}}"></script>
<script src="{{ asset('libraries/angular/angular-sanitize.min.js')}}"></script>
<script src="{{ asset('libraries/toast/ngToast.min.js')}}"></script>
<script src="{{ asset('libraries/angular/ocLazyLoad.min.js')}}"></script>
<script src="{{ asset('libraries/angular/angular-ui-router.min.js')}}"></script>
<script src="{{ asset('libraries/angular/angular-resource.js')}}"></script>
<script src="{{ asset('libraries/angular/angular-block-ui.min.js')}}"></script>
<script src="{{ asset('libraries/datatables/js/jquery.dataTables.min.js')}}"></script>
<script src="{{ asset('libraries/select/js/bootstrap-select.min.js')}}"></script>
<script src="{{ asset('libraries/datatables/js/dataTables.bootstrap.min.js')}}"></script>
<script src="{{ asset('libraries/datatables/js/dataTables.responsive.min.js')}}"></script>
<script src="{{ asset('libraries/dropzone/dropzone.min.js')}}"></script>
<script src="{{ asset('libraries/nprogress/nprogress.js')}}"></script>
<script src="{{ asset('libraries/fancybox/jquery.fancybox.min.js')}}"></script>
<script src="{{ asset('libraries/colorpicker/bootstrap-colorpicker.min.js')}}"></script>
<script src="{{ asset('libraries/lodash/lodash.js')}}"></script>
<script src="{{ asset('libraries/fullcalendar/fullcalendar.min.js')}}"></script>
<script src="{{ asset('js/custom.js')}}"></script>
<script src="{{ asset('js/angular.js')}}"></script>
<script src="{{ asset('js/directives.js')}}"></script>
<script src="{{ asset('js/service.js')}}"></script>
<script src="{{ asset('js/filter.js')}}"></script>
<script src="{{ asset('js/function.js')}}"></script>
<script src="{{ asset('js/controller/DashboardController.js')}}"></script>
<script src="{{ asset('js/controller/PacientsController.js')}}"></script>
<script src="{{ asset('js/controller/VisitsController.js')}}"></script>
<script src="{{ asset('js/controller/OperationsController.js')}}"></script>
<script src="{{ asset('js/controller/CalendarController.js')}}"></script>
<script src="{{ asset('js/controller/GalleryController.js')}}"></script>
<script src="{{ asset('js/controller/StatementController.js')}}"></script>

 <toast></toast>
</body>
</html>

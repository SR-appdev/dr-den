/* global app */

myApp.controller('VisitsController', function ($scope, $rootScope,Visits,$stateParams,$window,Pacients,$timeout) {
  $scope.patienid = $stateParams.patientid;
  $scope.visits ={};
  $scope.visit ={};
  $scope.listview = true;
  $scope.patients = {};


  $scope.getall = function(){
    $rootScope.startblockui();
    Visits.all({id: $scope.patienid}, function (data) {
     $('#myDatepicker2').datetimepicker({
      format: 'YYYY-MM-DD'
    });
     $scope.visits = data.visits;
     $scope.operations = data.operations;
     $rootScope.stopblockui();
     $rootScope.datatable();
   }, function (err) {
    console.log(err);
    $rootScope.stopblockui();
  });
  }
  $scope.getallpatients = function(){
    Pacients.all({}, function (data) {
      $scope.patients = data.patients;
    }, function (err) {
      console.log(err);
    });
  }
  $scope.addvisit = function(){
    $scope.listview = false;
    $scope.visit ={};
    $scope.visit.total =0;
    $scope.visit.payment =0;
  }

  $scope.edit = function(item){
    $('select').selectpicker('destroy');
    $scope.visit = JSON.parse(JSON.stringify(item));
    $scope.visit.operations_id = [];
    $scope.listview = false;
    $.each($scope.visit.operations,function(index,value){
      $scope.visit.operations_id.push(value.operation_id);
    })
    $timeout( function(){
     $('select').selectpicker({
      size: 6
    });
   }, 500 );
  }

  $scope.deletevisit = function(visitid){
    $rootScope.startblockui();
    Visits.deletevisit({id:visitid}, function (data) {
      if(data.status =="success"){
        $scope.getall();
        $rootScope.toastalert('Visit Deleted','success');
        $rootScope.stopblockui();
      }
    }, function (err) {
      console.log(err);
      $rootScope.stopblockui();
    });
  }
  $scope.calculrest = function(){
    $scope.visit.rest = $scope.visit.total - $scope.visit.payment
  }
  $scope.validform= function(){
    var value = true;
    if(angular.isUndefined($scope.visit.customer_id) || $scope.visit.customer_id==''){
      $("input[ng-model='visit.customer_id']").addClass("redBorder");
      value = false;
    }
    else{
      $("input[ng-model='visit.customer_id']").removeClass("redBorder");
    }
    if(angular.isUndefined($scope.visit.total) || $scope.visit.total==''){
      $("input[ng-model='visit.total']").addClass("redBorder");
      value = false;
    }
    else{
      $("input[ng-model='visit.total']").removeClass("redBorder");
    }
    if(angular.isUndefined($scope.visit.operations_id) || $scope.visit.operations_id==''){
      $("input[ng-model='visit.operations_id']").addClass("redBorder");
      value = false;
    }
    else{
      $("input[ng-model='visit.operations_id']").removeClass("redBorder");
    }
    return value;
  }
   $scope.back =function(){
   $scope.listview = true;
   $scope.visit ={};
   $("#myDatepicker2").val('');
 }
  $scope.submit = function(){
    if($scope.validform() == true){
     $rootScope.startblockui();
     $scope.visit.date_visit= $("#myDatepicker2").val();
     Visits.submit({data:$scope.visit}, function (data) {
       if(data.status =="OK"){
        $scope.visit.id = data.id;
        $scope.getall();
        $rootScope.toastalert('Success','success');
      }
      $rootScope.stopblockui();
    }, function (err) {
      $rootScope.toastalert('Please Try Again','danger');
      $rootScope.stopblockui();
      console.log(err);
    });
   }
 }
});
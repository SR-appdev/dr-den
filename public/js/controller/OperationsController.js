/* global app */

myApp.controller('OperationsController', function ($scope, $rootScope,Operations,$window,$timeout) {
  $scope.operations ={};
  $scope.listview = true;

  $timeout(function() {

    $('#colorpicker').colorpicker({ 
      color : '#ffffff',
      colorSelectors: {
        '#000000': '#000000',
        '#ffffff': '#ffffff',
        '#FF0000': '#FF0000',
        '#777777': '#777777',
        '#337ab7': '#337ab7',
        '#5cb85c': '#5cb85c',
        '#5bc0de': '#5bc0de',
        '#f0ad4e': '#f0ad4e',
        '#d9534f': '#d9534f'
      }
    });
  }, 1000);
  $scope.getall = function(){
    $rootScope.startblockui();
    Operations.all({}, function (data) {
      $scope.myoperations = data.operations;
      $rootScope.stopblockui();
      $rootScope.datatable();
    }, function (err) {
      console.log(err);
      $rootScope.stopblockui();
    });
  }

  $scope.addoperations = function(){
    $scope.listview = false;
    $scope.operations ={};
    $('#colorpicker').colorpicker('setValue', '#ffffff');

  }

  $scope.deleteoperations = function(operationsid){
    $rootScope.startblockui();
    Operations.deleteoperations({id:operationsid}, function (data) {
      if(data.status =="success"){
        $scope.getall();
        $rootScope.toastalert('operations Deleted','success');
        $rootScope.stopblockui();
      }
    }, function (err) {
      console.log(err);
      $rootScope.stopblockui();
    });
  }
  $scope.back =function(){
   $scope.listview = true;
   $scope.operations ={};
   $("#myDatepicker2").val('');
 }
 $scope.edit = function(item){
  $scope.operations = JSON.parse(JSON.stringify(item));
  $scope.listview = false;
  if($scope.operations.color != "" && $scope.operations.color!=null)
    $('#colorpicker').colorpicker('setValue', $scope.operations.color);
  else
    $('#colorpicker').colorpicker('setValue', '#ffffff');

}
$scope.submit = function(){
  if(angular.isUndefined($scope.operations.name) || $scope.operations.name==''){
    $("input[ng-model='operations.name']").addClass("redBorder");
    return false;
  }
  else{
   $rootScope.startblockui();
   $("input[ng-model='operations.name']").removeClass("redBorder");
   $scope.operations.dob= $("#myDatepicker2").val();
   Operations.submit({data:$scope.operations}, function (data) {
     if(data.status =="OK"){
      $scope.operations.id = data.id;
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
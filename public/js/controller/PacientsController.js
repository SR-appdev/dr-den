/* global app */

myApp.controller('PacientsController', function ($scope, $rootScope,Pacients,$window) {
  $scope.patient ={};
  $scope.listview = true;

  $scope.getall = function(){
      $rootScope.startblockui();
    Pacients.all({}, function (data) {
      $scope.patients = data.patients;
      $('#myDatepicker2').datetimepicker({
        format: 'YYYY-MM-DD'
      });
        $rootScope.stopblockui();
      $rootScope.datatable();
    }, function (err) {
      console.log(err);
      $rootScope.stopblockui();
    });
  }

  $scope.addpatient = function(){
    $scope.listview = false;
     $scope.patient ={};
     $scope.visit.operations =[];
  }

  $scope.deletepatient = function(patientid){
      $rootScope.startblockui();
    Pacients.deletepat({id:patientid}, function (data) {
      if(data.status =="success"){
        $scope.getall();
        $rootScope.toastalert('Patient Deleted','success');
        $rootScope.stopblockui();
      }
    }, function (err) {
      console.log(err);
      $rootScope.stopblockui();
    });
  }
  $scope.back =function(){
   $scope.listview = true;
   $scope.patient ={};
   $("#myDatepicker2").val('');
 }
 $scope.edit = function(item){
  $scope.patient = JSON.parse(JSON.stringify(item));
  $scope.listview = false;
 }
 $scope.submit = function(){
  if(angular.isUndefined($scope.patient.name) || $scope.patient.name==''){
    $("input[ng-model='patient.name']").addClass("redBorder");
    return false;
  }
  else{
       $rootScope.startblockui();
   $("input[ng-model='patient.name']").removeClass("redBorder");
   $scope.patient.dob= $("#myDatepicker2").val();
   Pacients.submit({data:$scope.patient}, function (data) {
     if(data.status =="OK"){
      $scope.patient.id = data.id;
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
  $scope.redirecttovisit = function(id){
    $window.location.href = "#!/visits/"+id;

  }
});
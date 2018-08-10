/* global app */

myApp.controller('StatementController', function ($scope, $rootScope,Statment,$window,$timeout) {
  $scope.filter = {};
  $scope.invoices = [];
  $timeout(function(){
    $('#reservation-time').daterangepicker({
      locale: {
        format: 'MM/DD/YYYY h:mm A'
      }
    });
    $('#reservation-time').on('apply.daterangepicker', function(ev, picker) {
      $scope.filter.start = picker.startDate;
      $scope.filter.end = picker.endDate;
      $scope.getinvoice();
    });
  },1000);
  $scope.getinvoice = function(){
    $rootScope.startblockui();
    Statment.getinvoice({date:$scope.filter}, function (data) {
      $scope.invoices = data.invoices;
      $rootScope.stopblockui();
      $rootScope.datatable();
    }, function (err) {
      console.log(err);
      $rootScope.stopblockui();
    });
  }
  $scope.getinvoice();
});
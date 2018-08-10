/* global app */

myApp.controller('GalleryController', function ($scope, $rootScope,Gallery,$window,$timeout) {
  $scope.gallery = {};
  $scope.getall = function(){
    $rootScope.startblockui();
    Gallery.all({}, function (data) {
      $scope.gallery = data.gallery;
      $rootScope.stopblockui();
    }, function (err) {
      console.log(err);
      $rootScope.stopblockui();
    });
  }
});
var myApp = angular.module("dentist", ['ui.router','ngResource','ngSanitize','ngAnimate','ngToast','blockUI','oc.lazyLoad']);
myApp.run(['$rootScope','$state',function($rootScope,$state){
    $rootScope.state = $state;
}]);
myApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider
    .state('home', {
        url: '/dashboard',
        templateUrl: 'views/dashboard',
        controller: "DashboardController",
        data:{
            title:"Home"
        }
    })
    .state('pacients', {
        url: '/patients',
        templateUrl: 'views/pacients',
        controller: "PacientsController",
        data:{
            title:"Patients"
        }
    })
    .state('visits', {
        url: '/visits',
        templateUrl: 'views/visits',
        controller: "VisitsController",
        data:{
            title:"Visits"
        }
    })
    .state('visitspatient', {
        url: '/visits/:patientid',
        templateUrl: 'views/visits',
        controller: "VisitsController",
        data:{
            title:"Visits Patient"
        }
    })
     .state('operations', {
        url: '/operations',
        templateUrl: 'views/operations',
        controller: "OperationsController",
        data:{
            title:"Operations"
        }
    })
      .state('calendar', {
        url: '/calendar',
        templateUrl: 'views/calendar',
        controller: "CalendarController",
        data:{
            title:"Calendar"
        }
    })  
      .state('gallery', {
        url: '/gallery',
        templateUrl: 'views/gallery',
        controller: "GalleryController",
        data:{
            title:"Gallery"
        }
    })
       .state('Summary', {
        url: '/summary',
        templateUrl: 'views/summary',
        controller: "StatementController",
        data:{
            title:"Summary"
        }
    })
        .state('Invoice', {
        url: '/invoice',
        templateUrl: 'views/invoice',
        controller: "StatementController",
        data:{
            title:"Invoice"
        }
    })


}]);
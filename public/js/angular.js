var myApp = angular.module("dentist", ['ui.router','ngResource','ngSanitize','ngAnimate','ngToast','blockUI','oc.lazyLoad']);

myApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider
    .state('home', {
        url: '/dashboard',
        templateUrl: 'views/dashboard',
        controller: "DashboardController"
    })
    .state('pacients', {
        url: '/patients',
        templateUrl: 'views/pacients',
        controller: "PacientsController"
    })
    .state('visits', {
        url: '/visits',
        templateUrl: 'views/visits',
        controller: "VisitsController"
    })
    .state('visitspatient', {
        url: '/visits/:patientid',
        templateUrl: 'views/visits',
        controller: "VisitsController"
    })


}]);
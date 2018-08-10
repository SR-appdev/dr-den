/* global app */

myApp.factory('Pacients', ['$resource', function ($resource) {

    return $resource('', {},
    {
        all: {
            url: 'pacients/all',
            method: 'GET'
        },
        deletepat: {
            url: 'pacients/delete',
            method: 'POST'
        },
        submit:{
            url: 'pacients/submit',
            method: 'POST'
        },
        submitfacture:{
            url: 'pacients/submitfacture',
            method: 'POST'
        },
        getfactures:{
            url: 'pacients/getfactures',
            method: 'GET'
        },
        deletefacture:{
            url: 'pacients/deletefacture',
            method: 'POST'
        }
    });

}])
.factory('Visits', ['$resource', function ($resource) {

    return $resource('', {},
    {
        all: {
            url: 'visits/all',
            method: 'GET'
        },
        deletevisit: {
            url: 'visits/delete',
            method: 'POST'
        },
        submit:{
            url: 'visits/submit',
            method: 'POST'
        }
    });

}])
.factory('Dashboard', ['$resource', function ($resource) {

    return $resource('', {},
    {
        all: {
            url: 'dashboard/all',
            method: 'GET'
        }
    });

}])
.factory('Gallery', ['$resource', function ($resource) {

    return $resource('', {},
    {
        all: {
            url: 'gallery/all',
            method: 'GET'
        }
    });

}])
.factory('Statment', ['$resource', function ($resource) {

    return $resource('', {},
    {
        getinvoice: {
            url: 'Statment/getinvoice',
            method: 'POST'
        }
    });

}])
.factory('Operations', ['$resource', function ($resource) {

    return $resource('', {},
    {
        all: {
            url: 'operations/all',
            method: 'GET'
        },
        deleteoperations: {
            url: 'operations/delete',
            method: 'POST'
        },
        submit:{
            url: 'operations/submit',
            method: 'POST'
        }
    });

}])
.factory('Calendar', ['$resource', function ($resource) {

    return $resource('', {},
    {
        allpatient: {
            url: 'calendar/patients',
            method: 'GET'
        },
          submit: {
            url: 'calendar/submit',
            method: 'POSt'
        },
         allcalendar: {
            url: 'calendar/allcalendar',
            method: 'POST'
        },
         resize: {
            url: 'calendar/resizecalendar',
            method: 'POST'
        },
         drag: {
            url: 'calendar/dragcalendar',
            method: 'POST'
        },
         deletecal: {
            url: 'calendar/deletecal',
            method: 'POST'
        }
    });

}]);
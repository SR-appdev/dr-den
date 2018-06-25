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

}]);
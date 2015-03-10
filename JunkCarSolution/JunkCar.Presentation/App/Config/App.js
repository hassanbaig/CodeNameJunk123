(function () {
    'use strict';
    var app = angular.module('app',
        ['angularSpinner',
            'filters',
            'rangeFilters',
            'timeRangeFilters',
            'ui-rangeSlider',
            'ui.bootstrap',
            //'ngCookies',
            //'ngResource',
            //'ngSanitize',
            'ngRoute',            
            'angularFileUpload']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', { templateUrl: 'Index.html', controller: 'homeController' })
            //.when('Howitworks', { templateUrl: 'Howitworks.html' })
            //.when('Aboutus', { templateUrl: 'Aboutus.html' })
            //.when('Contactus', { templateUrl: 'Contactus.html' })
            //.when('Signup', { templateUrl: 'Signup.html', controller: 'accountsController' })
            //.when('Login',{templareUrl:'Login.html'})
        .otherwise({ redirectTo: '/' });
    }]);

})();
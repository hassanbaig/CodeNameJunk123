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
        $routeProvider
            .when('/', { templateUrl: 'Default.html', controller: 'homeController as homeControllerVM' })
            .when('/get-an-offer', { templateUrl: 'Default.html', controller: 'homeController as homeControllerVM' })
            .when('/how-it-works', { templateUrl: 'Howitworks.html' })
            .when('/about-us', { templateUrl: 'Aboutus.html' })
            .when('/contact-us', { templateUrl: 'Contactus.html', controller: 'utilityController as utilityControllerVM' })
            .when('/sign-up', { templateUrl: 'Signup.html', controller: 'accountsController as accountsControllerVM' })
            .when('/login', { templateUrl: 'Login.html', controller: 'accountsController as accountsControllerVM' })
            .when('/settings', { templateUrl: 'Settings.html' })
            .when('/change-password', { templateUrl: 'Changepassword.html', controller: 'accountsController as accountsControllerVM' })
            .when('/edit-profile', { templateUrl: 'Editprofile.html', controller: 'accountsController as accountsControllerVM' })
        .otherwise({ redirectTo: '/' });
    }]);

})();
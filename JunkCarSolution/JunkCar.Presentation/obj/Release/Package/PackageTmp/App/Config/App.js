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

    //app.config(['$routeProvider', function ($routeProvider) {
    //    $routeProvider.when('/', { templateUrl: 'Index.html', controller: 'homeController' })
    //        .when('Signup', { templateUrl: 'Signup.html', controller: 'accountsController' })
    //    .otherwise({ redirectTo: '/' });
    //}]);

})();
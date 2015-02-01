angular.module('app', []).config(['$routeProvider', function ($routeProvider)
{
    $routeProvider.when('/', { templateUrl: 'Index.html', controller: 'homeController' })
        .when('Signup', { templateUrl: 'Signup.html', controller: 'accountsController' })
    .otherwise({ redirectTo: '/' });

    //.when('/Login', { templateUrl: '../Login.html', controller: 'authenticationController' })
        //.when('/Signup', { templateUrl: '../Signup.html', controller: 'authenticationController', resolve: { user: function (SessionService) { return SessionService.getCurrentUser(); } } })
        //.otherwise({ redirectTo: '/' });
}]);
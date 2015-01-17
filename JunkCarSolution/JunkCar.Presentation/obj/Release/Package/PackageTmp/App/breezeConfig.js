var app = angular.module('app', [
    // ... other dependencies ...
    'breeze.angular' // the breeze service module
]);

// Any first use of breeze would likely involve the breeze.EntityManager.
// Apps often combine EntityManager and breeze configuration in a "factory".
// This 'entityManagerFactory' creates a new EntityManager
// configured for a specific remote service.
angular.module('app')
       .factory('entityManagerFactory', ['breeze', emFactory]);

function emFactory(breeze) {
    // Convert properties between server-side PascalCase and client-side camelCase
    breeze.NamingConvention.camelCase.setAsDefault();

    // Identify the endpoint for the remote data service
    var serviceRoot = window.location.protocol + '//' + window.location.host + '/';
    var serviceName = 'http://localhost:4444' + '/breeze/Authentication/'; // breeze Web API controller

    // the "factory" services exposes two members
    var factory = {
        newManager: function () { return new breeze.EntityManager(serviceName); },
        serviceName: serviceName
    };

    return factory;
}


angular.module('app').run(['$http', function ($http) {
    var ajax = breeze.config.initializeAdapterInstance('ajax', 'angular');
    ajax.setHttp($http); // use the $http instance that Angular injected into your app.
}]);

//angular.module('app', ['breeze.angular'])
//       // merely depending on the 'breeze' service configures Breeze for Angular
//       .run(['breeze', function () {/* noop - unless you want do do something */ }]);

// get the current default Breeze AJAX adapter

var ajaxAdapter = breeze.config.getAdapterInstance('ajax');

ajaxAdapter.requestInterceptor = function (requestInfo) {
    requestInfo.config.timeout = 5000;
    ajaxAdapter.requestInterceptor.oneTime = true;
}
// set fixed headers
ajaxAdapter.defaultSettings = {
    headers: {
        "X-Test-Header": "foo2"
    },
};

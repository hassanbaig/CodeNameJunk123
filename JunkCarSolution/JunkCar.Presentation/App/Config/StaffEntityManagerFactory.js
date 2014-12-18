/***
 * Service: entityManagerFactory 
 *
 * Configures BreezeJS and creates new instance(s) of the 
 * BreezeJS EntityManager for use in a 'datacontext' service
 *
 ***/
(function () {
    'use strict';

    var serviceId = 'entityManagerFactoryStaff';
    angular.module('app')
           .factory(serviceId, ['breeze','$http', emFactory]);

    function emFactory(breeze) {
        configureBreeze();
        var serviceRoot = window.location.protocol + '//' + window.location.host + '/';
        //var serviceName = serviceRoot + 'odata/';        

        //var serviceName = 'http://localhost:5555' + '/JunkCar/v1/';

        var serviceName = 'http://localhost/JunkCarwebapi' + '/JunkCar/v1/Staff';
        
        var factory = {
            newManager: newManager,
            serviceName: serviceName
        };

        return factory;
        
             
                 
        //var metadataStore = new breeze.MetadataStore();

        //var provider = {
        //    metadataStore: metadataStore,
        //    newManager: newManager
        //};

        //return provider;               
    }

    function configureBreeze($http) {

        breeze.NamingConvention.camelCase.setAsDefault();

        // use Web API OData to query and save

        //breeze.config.initializeAdapterInstance('dataService', 'WebApi', true);



        //var ajaxAdapter = breeze.config.initializeAdapterInstance("ajax", "angular");
        //ajaxAdapter.setHttp($http);

        //breeze.ajaxpost.configAjaxAdapter(ajaxAdapter);
                

        //ajaxAdapter.requestInterceptor = function (requestInfo) {
        //    requestInfo.config.timeout = 5000;
        //    ajaxAdapter.requestInterceptor.oneTime = true;
        //}

        //// set fixed headers
        //ajaxAdapter.defaultSettings = {
        //    headers: {
        //        "X-Test-Header": "foo2"
        //    },
        //};



        angular.module('app').run(['$http', function ($http) {
            var ajax = breeze.config.initializeAdapterInstance('ajax', 'angular');
            ajax.setHttp($http); // use the $http instance that Angular injected into your app.
        }]);

        // convert between server-side PascalCase and client-side camelCase
        
    }

    function newManager() {
        var serviceName = 'http://localhost/JunkCarwebapi' + '/JunkCar/v1/Staff';
        var manager = new breeze.EntityManager(serviceName);
        return manager;
    }
})();
/***
 * Service: datacontext 
 *
 * Handles all persistence and creation/deletion of app entities
 * using BreezeJS.
 *
 ***/
(function () {
    'use strict';

    var serviceId = 'configService';
    angular.module('app').factory(serviceId,
    ['breeze', '$q', 'logger', 'entityManagerFactoryConfig', configService]);

    function configService(breeze, $q, logger, emFactory) {
        logger = logger.forSource(serviceId);
        var logError = logger.logError;
        var logSuccess = logger.logSuccess;
        var logWarning = logger.logWarning;

        var manager = emFactory.newManager();
                
        var service = {                                    
            getSpecialties:getSpecialties            
        };

        return service;

        function getSpecialties() {           

            return breeze.EntityQuery.from('GetSpecialties')
                  .using(manager).execute().then('successful').catch('failed');
        }      
    }    
    }
)();
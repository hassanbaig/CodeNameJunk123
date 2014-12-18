/***
 * Service: datacontext 
 *
 * Handles all persistence and creation/deletion of app entities
 * using BreezeJS.
 *
 ***/
(function () {
    'use strict';

    var serviceId = 'accountsService';
    angular.module('app').factory(serviceId,
    ['breeze', '$q', 'logger', 'entityManagerFactoryAccounts', accountsService]);

    function accountsService(breeze, $q, logger, emFactory) {
        logger = logger.forSource(serviceId);
        var logError = logger.logError;
        var logSuccess = logger.logSuccess;
        var logWarning = logger.logWarning;

        var manager = emFactory.newManager();
                       
        var service = {
            authenticateUser: authenticateUser,
            changePassword: changePassword,
            forgotPassword: forgotPassword,
            getSpecialties: getSpecialties,
            getCountries: getCountries,
            getCities: getCities,
            getLocalities: getLocalities,
            providerRegistration: providerRegistration,
            checkEmail: checkEmail,
            logout: logout
        };

        return service;                
       
        function checkEmail(emailField) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var isValid = false;
            if (re.test(emailField) == false) {                
                isValid = false;
            }
            else {                
                isValid = true;
            }
            return isValid;
        }

        function authenticateUser(initialValues) {
            return breeze.EntityQuery.from("Authenticate").withParameters(initialValues)
             .using(manager).execute().then('successful').catch('failed');            
        }                 
              
        function changePassword(initialValues) {       
          return breeze.EntityQuery.from('ChangePassword').withParameters(initialValues)              
               .using(manager).execute().then('successful').catch('failed');            
        }
        function forgotPassword(initialValues) {
            return breeze.EntityQuery.from('ForgotPassword').withParameters(initialValues)
                 .using(manager).execute().then('successful').catch('failed');
        }
        
        function getSpecialties() {
            return breeze.EntityQuery.from('GetSpecialties')
                  .using(manager).execute().then('successful').catch('failed');
        }

        function getCountries() {
            return breeze.EntityQuery.from('GetCountries')
                  .using(manager).execute().then('successful').catch('failed');
        }

        function getCities() {
            return breeze.EntityQuery.from('GetCities')
                  .using(manager).execute().then('successful').catch('failed');
        }

        function getLocalities() {
            return breeze.EntityQuery.from('GetLocalities')
                  .using(manager).execute().then('successful').catch('failed');
        }
        function logout()
        {
            return breeze.EntityQuery.from('Logout')
                .using(manager).execute().then('successful').catch('failed');
        }

        function providerRegistration(initialValues) {
            
            return breeze.EntityQuery.from('ProviderRegistration').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');            
        }
    }    
}
)();
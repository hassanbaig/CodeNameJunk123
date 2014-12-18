/***
 * Service: datacontext 
 *
 * Handles all persistence and creation/deletion of app entities
 * using BreezeJS.
 *
 ***/
(function () {
    'use strict';

    var serviceId = 'searchService';
    angular.module('app').factory(serviceId,
    ['breeze', '$q', 'logger', 'entityManagerFactorySearch', searchService]);

    function searchService(breeze, $q, logger, emFactory) {
        logger = logger.forSource(serviceId);
        var logError = logger.logError;
        var logSuccess = logger.logSuccess;
        var logWarning = logger.logWarning;

        var manager = emFactory.newManager();
                       
        var service = {
            searchProvider: searchProvider,
            searchPractice: searchPractice,
            getCountries: getCountries,
            getCities: getCities,
            getLocalities: getLocalities,
            getSpecialties: getSpecialties,
            getDoctors: getDoctors,
            getHospitals: getHospitals,
            getLabs: getLabs,
            getPharmacists: getPharmacists,
            getNurses: getNurses,
            getTreatments: getTreatments
        };

        return service;                       

        function searchProvider(initialValues) {
            return breeze.EntityQuery.from("SearchProvider").withParameters(initialValues)
             .using(manager).execute().then('successful').catch('failed');            
        }

        function searchPractice(initialValues) {
            return breeze.EntityQuery.from("SearchPractice").withParameters(initialValues)
             .using(manager).execute().then('successful').catch('failed');
        }

        function getCountries() {
            return breeze.EntityQuery.from('GetCountries').using(manager).execute().then('successful').catch('failed');
        }

        function getSpecialties() {
            return breeze.EntityQuery.from('GetSpecialties').using(manager).execute().then('successful').catch('failed');
        }

        function getDoctors() {
            return breeze.EntityQuery.from('GetDoctors').using(manager).execute().then('successful').catch('failed');
        }

        function getHospitals() {
            return breeze.EntityQuery.from('GetHospitals').using(manager).execute().then('successful').catch('failed');
        }

        function getLabs() {
            return breeze.EntityQuery.from('GetLabs').using(manager).execute().then('successful').catch('failed');
        }

        function getPharmacists() {
            return breeze.EntityQuery.from('GetPharmacists').using(manager).execute().then('successful').catch('failed');
        }

        function getNurses() {
            return breeze.EntityQuery.from('GetNurse').using(manager).execute().then('successful').catch('failed');
        }

        function getTreatments() {
            return breeze.EntityQuery.from('GetTreatments').using(manager).execute().then('successful').catch('failed');
        }

        function getCities(initialValues) {
            return breeze.EntityQuery.from("GetCities").withParameters(initialValues)
             .using(manager).execute().then('successful').catch('failed');
        }
        function getLocalities(initialValues) {
            return breeze.EntityQuery.from("GetLocalities").withParameters(initialValues)
             .using(manager).execute().then('successful').catch('failed');
        }
    }    
})();
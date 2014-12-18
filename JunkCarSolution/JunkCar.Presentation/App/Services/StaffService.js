/***
 * Service: datacontext 
 *
 * Handles all persistence and creation/deletion of app entities
 * using BreezeJS.
 *
 ***/
(function () {
    'use strict';

    var serviceId = 'staffService';
    angular.module('app').factory(serviceId,
    ['breeze', '$q', 'logger', 'entityManagerFactoryStaff', staffService]);

    function staffService(breeze, $q, logger, emFactory) {
        logger = logger.forSource(serviceId);
        var logError = logger.logError;
        var logSuccess = logger.logSuccess;
        var logWarning = logger.logWarning;

        var manager = emFactory.newManager();

        var service = {
            editProfile: editProfile,
            getStaffDoctorDetails: getStaffDoctorDetails,
            addStaffDoctorDetails: addStaffDoctorDetails,
            getStaffDoctorContacts: getStaffDoctorContacts,
            addStaffDoctorContacts: addStaffDoctorContacts,
            getStaffDoctorConsultation: getStaffDoctorConsultation,
            addStaffDoctorConsultation: addStaffDoctorConsultation,
            getSpecializations: getSpecializations,
            getAddedSpecializations: getAddedSpecializations,
            addDoctorSpecializations: addDoctorSpecializations,
            addToDoctorSpecializations:addToDoctorSpecializations,
            removeDoctorSpecializations: removeDoctorSpecializations,
            getLanguages: getLanguages,
            getAddedLanguages: getAddedLanguages,
            addDoctorLanguages: addDoctorLanguages,
            addToDoctorLanguages:addToDoctorLanguages,
            removeDoctorLanguages: removeDoctorLanguages,
            addDoctorTreatments: addDoctorTreatments,
            editDoctorTreatments:editDoctorTreatments,
            getProfileDetails: getProfileDetails,
            getRegistrationCouncils: getRegistrationCouncils,
            getCountries: getCountries,
            getStates : getStates,
            getCities : getCities,
            getLocalities: getLocalities,
            getTreatments: getTreatments,
            getParentTreatments: getParentTreatments,
            getAddedTreatments: getAddedTreatments,
            getAddedEducation: getAddedEducation,
            getAddedExperience: getAddedExperience,
            getAddedAffiliations: getAddedAffiliations,
            getAddedAwards: getAddedAwards,
            removeDoctorTreatments: removeDoctorTreatments,
            getDegrees: getDegrees,
            getColleges: getColleges,
            getAffiliations:getAffiliations,
            getAwards: getAwards,
            addDoctorEducation: addDoctorEducation,
            addDoctorExperience: addDoctorExperience,
            addDoctorAffiliations: addDoctorAffiliations,
            addDoctorAwards: addDoctorAwards,
            removeDoctorEducation: removeDoctorEducation,
            removeDoctorExperience: removeDoctorExperience,
            removeDoctorAffiliations: removeDoctorAffiliations,
            removeDoctorAwards: removeDoctorAwards,
            isValidEmail: isValidEmail,
            getPracticeDoctors: getPracticeDoctors,
            getPracticeStaff: getPracticeStaff,
            removeProvider: removeProvider
        };

        return service;

        function isValidEmail(emailField) {
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

        function editProfile(initialValues) {

            return breeze.EntityQuery.from('EditProfile').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }
        function getStaffDoctorDetails(initialValues) {

            return breeze.EntityQuery.from('GetDoctorDetails').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }
        function addStaffDoctorDetails(initialValues) {

            return breeze.EntityQuery.from('AddDoctorDetails').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }
        function getStaffDoctorContacts(initialValues) {

            return breeze.EntityQuery.from('GetDoctorContacts').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }        
        function addStaffDoctorContacts(initialValues) {

            return breeze.EntityQuery.from('AddDoctorContacts').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }
        function getStaffDoctorConsultation(initialValues) {

            return breeze.EntityQuery.from('GetDoctorConsultation').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }        
        function addStaffDoctorConsultation(initialValues) {

            return breeze.EntityQuery.from('AddDoctorConsultation').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }

        function getSpecializations() {
            return breeze.EntityQuery.from('GetSpecializations')
                  .using(manager).execute().then('successful').catch('failed');
        }

        function addDoctorSpecializations(initialValues) {

            return breeze.EntityQuery.from('AddDoctorSpecializations').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }

        function getAddedSpecializations(initialValues) {
            return breeze.EntityQuery.from('GetAddedSpecializations').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }

        function addToDoctorSpecializations(initialValues) {

            return breeze.EntityQuery.from('AddToDoctorSpecializations').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }

        function removeDoctorSpecializations(initialValues) {

            return breeze.EntityQuery.from('RemoveDoctorSpecializations').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }
        
        function getLanguages() {
            return breeze.EntityQuery.from('GetLanguages')
                  .using(manager).execute().then('successful').catch('failed');
        }

        function getAddedLanguages(initialValues) {
            return breeze.EntityQuery.from('GetAddedLanguages').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }

        function addDoctorLanguages(initialValues) {

            return breeze.EntityQuery.from('AddDoctorLanguages').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }
        function addToDoctorLanguages(initialValues) {

            return breeze.EntityQuery.from('AddToDoctorLanguages').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }

        function removeDoctorLanguages(initialValues) {

            return breeze.EntityQuery.from('RemoveDoctorLanguages').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }
        
        function getTreatments() {

            return breeze.EntityQuery.from('GetTreatments').using(manager).execute().then('successful').catch('failed');
        }        

        function getParentTreatments() {

            return breeze.EntityQuery.from('GetParentTreatments').using(manager).execute().then('successful').catch('failed');
        }    
   
        function getAddedTreatments(initialValues) {

            return breeze.EntityQuery.from('GetAddedTreatments').withParameters(initialValues)
                .using(manager).execute().then('successful').catch('failed');
        }
        function getAddedEducation(initialValues) {

            return breeze.EntityQuery.from('GetAddedEducation').withParameters(initialValues).using(manager).execute().then('successful').catch('failed');
        }
        function getAddedExperience(initialValues) {

            return breeze.EntityQuery.from('GetAddedExperience').withParameters(initialValues).using(manager).execute().then('successful').catch('failed');
        }
        function getAddedAffiliations(initialValues) {

            return breeze.EntityQuery.from('GetAddedAffiliations').withParameters(initialValues).using(manager).execute().then('successful').catch('failed');
        }
        function getAddedAwards(initialValues) {

            return breeze.EntityQuery.from('GetAddedAwards').withParameters(initialValues).using(manager).execute().then('successful').catch('failed');
        }
        function addDoctorTreatments(initialValues) {

            return breeze.EntityQuery.from('AddDoctorTreatments').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }
        function editDoctorTreatments(initialValues) {

            return breeze.EntityQuery.from('EditDoctorTreatments').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }
        
        function removeDoctorTreatments(initialValues) {

            return breeze.EntityQuery.from('RemoveDoctorTreatments').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }

        function getDegrees() {

            return breeze.EntityQuery.from('GetDegrees').using(manager).execute().then('successful').catch('failed');
        }

        function getColleges() {

            return breeze.EntityQuery.from('GetColleges').using(manager).execute().then('successful').catch('failed');
        }

        function getAffiliations() {

            return breeze.EntityQuery.from('GetAffiliations').using(manager).execute().then('successful').catch('failed');
        }

        function getAwards() {

            return breeze.EntityQuery.from('GetAwards').using(manager).execute().then('successful').catch('failed');
        }

        function addDoctorEducation(initialValues) {

            return breeze.EntityQuery.from('AddDoctorEducation').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }

        function addDoctorExperience(initialValues) {

            return breeze.EntityQuery.from('AddDoctorExperience').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }

        function addDoctorAffiliations(initialValues) {

            return breeze.EntityQuery.from('AddDoctorAffiliations').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }

        function addDoctorAwards(initialValues) {

            return breeze.EntityQuery.from('AddDoctorAwards').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }
        
        function removeDoctorEducation(initialValues) {

            return breeze.EntityQuery.from('RemoveDoctorEducation').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }
        function removeDoctorExperience(initialValues) {

            return breeze.EntityQuery.from('RemoveDoctorExperience').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }
        function removeDoctorAffiliations(initialValues) {

            return breeze.EntityQuery.from('RemoveDoctorAffiliations').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }
        function removeDoctorAwards(initialValues) {

            return breeze.EntityQuery.from('RemoveDoctorAwards').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }
        function getProfileDetails() {

            return breeze.EntityQuery.from('GetProfileDetails').using(manager).execute().then('successful').catch('failed');
        }
        
        function getRegistrationCouncils() {

            return breeze.EntityQuery.from('GetRegistrationCouncils').using(manager).execute().then('successful').catch('failed');
        }

        function getCountries() {

            return breeze.EntityQuery.from('GetCountries').using(manager).execute().then('successful').catch('failed');
        }

        function getStates() {

            return breeze.EntityQuery.from('GetStates').using(manager).execute().then('successful').catch('failed');
        }

        function getCities() {

            return breeze.EntityQuery.from('GetCities').using(manager).execute().then('successful').catch('failed');
        }

        function getLocalities() {

            return breeze.EntityQuery.from('GetLocalities').using(manager).execute().then('successful').catch('failed');
        }

        function getPracticeDoctors() {

            return breeze.EntityQuery.from('GetAllDoctorsByProviderPractice').using(manager).execute().then('successful').catch('failed');
        }

        function getPracticeStaff() {

            return breeze.EntityQuery.from('GetAllStaffByProviderPractice').using(manager).execute().then('successful').catch('failed');
        }
        
        function removeProvider(initialValues) {

            return breeze.EntityQuery.from('RemoveProvider').withParameters(initialValues)
                  .using(manager).execute().then('successful').catch('failed');
        }
    }
}
)();
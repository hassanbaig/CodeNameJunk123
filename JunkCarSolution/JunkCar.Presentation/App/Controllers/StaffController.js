/***
 * Controller/ViewModel: todolists 
 *
 * Support a view of all TodoLists
 *
 * Handles fetch and save of these lists
 *
 ***/
(function () {
    'use strict';

    var controllerId = 'staffController';
    angular.module('app').controller(controllerId,
    ['staffService', 'logger', '$scope', '$location', 'usSpinnerService', '$rootScope', 'alertsManager', staffController]);

    function staffController(staffService, logger, $scope, $location, usSpinnerService, $rootScope, alertsManager) {
        logger = logger.forSource(controllerId);
        var logError = logger.logError;
        var logSuccess = logger.logSuccess;        

        $scope.alerts = alertsManager.alerts;

        $scope.successAlert = successAlert;
        $scope.failureAlert = failureAlert;

        function successAlert(message) {
            alertsManager.addAlert(message, 'alert-success');
        }

        function failureAlert(message) {
            alertsManager.addAlert(message, 'alert-danger');
        };

        $scope.reset = function () {
            alertsManager.clearAlerts();
        };

        $scope.startSpin = function () {
            if (!$scope.spinneractive) {
                usSpinnerService.spin('spinner-1');
            }
        };

        $scope.stopSpin = function () {
            if ($scope.spinneractive) {
                usSpinnerService.stop('spinner-1');
            }
        };
        $scope.spinneractive = false;

        $rootScope.$on('us-spinner:spin', function (event, key) {
            $scope.spinneractive = true;
        });

        $rootScope.$on('us-spinner:stop', function (event, key) {
            $scope.spinneractive = false;
        });


        // ViewModel
        var staffControllerVM = this;

        // ViewModel variables
        // Tabs visibility variables
        staffControllerVM.isVisibleStaffDoctorDetails = true;
        staffControllerVM.isVisibleStaffDoctorContacts = false;
        staffControllerVM.isVisibleStaffConsultation = false;
        staffControllerVM.isVisibleStaffSpecialization = false;
        staffControllerVM.isVisibleStaffLanguages = false;
        staffControllerVM.isVisibleStaffProfessionalDetails = false;
        staffControllerVM.isVisibleStaffTreatments = false;        
        staffControllerVM.isVisibleStaffRedPlusAccess = false;
        staffControllerVM.isVisibleDoctorEditDisplay = true;
        staffControllerVM.isVisibleDoctorEdit = false;
        staffControllerVM.isVisibleAddSaveTreatment = true;
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
        staffControllerVM.editProviderProviderId = '';

        // Edit Profile
        staffControllerVM.editProfileFullName = '';
        staffControllerVM.editProfileGender = '';
        staffControllerVM.editProfileEmail = '';
        staffControllerVM.editProfileDOB = '';
        staffControllerVM.editProfileBloodGroup = '';
        staffControllerVM.editProfileTimeZone = '';
        staffControllerVM.editProfileMobileNumber = '';
        staffControllerVM.editProfileExtraPhoneNumber = '';
        staffControllerVM.editProfileStreetAddress = '';
        staffControllerVM.editProfileCountryId = '';
        staffControllerVM.editProfileStateId = '';
        staffControllerVM.editProfileCityId = '';
        staffControllerVM.editProfileLocalityId = '';
        staffControllerVM.editProfileZipCode = '';
        staffControllerVM.editProfileProfileDetailsList = [];        
        staffControllerVM.editProfileCountriesList = [];
        staffControllerVM.editProfileStatesList = [];
        staffControllerVM.editProfileCitiesList = [];
        staffControllerVM.editProfileLocalitiesList = [];

        staffControllerVM.staffDoctorDetailsRegistrationCouncilsList = [];
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Doctor details variables
        staffControllerVM.staffDoctorDetailsDoctorName = '';
        staffControllerVM.staffDoctorDetailsGender = '';
        staffControllerVM.staffDoctorDetailsRegistrationDetails = '';
        staffControllerVM.staffDoctorDetailsRegistrationYear = '';
        staffControllerVM.staffDoctorDetailsRegistrationCouncil = '';
        staffControllerVM.staffDoctorDetailsRegistrationCouncilId = '';
        staffControllerVM.staffDoctorDetailsNumberOfYears = '';
        staffControllerVM.staffDoctorDetailsDoctorTagLine = '';
        staffControllerVM.staffDoctorDetailsDoctorDescription = '';

        staffControllerVM.staffDoctorDetailsDoctorDetailsList = [];       
        
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Doctor contacts variables        
        staffControllerVM.isVisibleSecondaryPhone = false;
        staffControllerVM.isVisibleSecondaryEmailId = false;
        staffControllerVM.staffDoctorContactsPrimaryPhone = '';
        staffControllerVM.staffDoctorContactsSecondaryPhone = '';
        staffControllerVM.staffDoctorContactsPrimaryEmailId = '';
        staffControllerVM.staffDoctorContactsSecondaryEmailId = '';
        staffControllerVM.staffDoctorContactsWebsiteAddress = '';

        staffControllerVM.staffDoctorDetailsDoctorContactsList = [];
        
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Doctor Consultation variables
        $scope.hoursArray = ['None', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 am', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm', '12 pm'];
        $scope.minutesArray = ['None', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
        staffControllerVM.staffDoctorConsultationFee = '';
        staffControllerVM.staffDoctorConsultationDuration = '';
        staffControllerVM.staffDoctorConsultationLunchBreak = false;
        staffControllerVM.staffDoctorConsultationMonday = false;
        staffControllerVM.staffDoctorConsultationTuesday = false;
        staffControllerVM.staffDoctorConsultationWednesday = false;
        staffControllerVM.staffDoctorConsultationThursday = false;
        staffControllerVM.staffDoctorConsultationFriday = false;
        staffControllerVM.staffDoctorConsultationSaturday = false;
        staffControllerVM.staffDoctorConsultationSunday = false;

        staffControllerVM.staffDoctorConsultationClose1Open2Visible = false;

        staffControllerVM.staffDoctorConsultationMondayOpenHours1 = '';
        staffControllerVM.staffDoctorConsultationMondayOpenMinutes1 = '';
        staffControllerVM.staffDoctorConsultationMondayCloseHours1 = '';
        staffControllerVM.staffDoctorConsultationMondayCloseMinutes1 = '';
        staffControllerVM.staffDoctorConsultationMondayOpenHours2 = '';
        staffControllerVM.staffDoctorConsultationMondayOpenMinutes2 = '';
        staffControllerVM.staffDoctorConsultationMondayCloseHours2 = '';
        staffControllerVM.staffDoctorConsultationMondayCloseMinutes2 = '';
        staffControllerVM.staffDoctorConsultationTuesdayOpenHours1 = '';
        staffControllerVM.staffDoctorConsultationTuesdayOpenMinutes1 = '';
        staffControllerVM.staffDoctorConsultationTuesdayCloseHours1 = '';
        staffControllerVM.staffDoctorConsultationTuesdayCloseMinutes1 = '';
        staffControllerVM.staffDoctorConsultationTuesdayOpenHours2 = '';
        staffControllerVM.staffDoctorConsultationTuesdayOpenMinutes2 = '';
        staffControllerVM.staffDoctorConsultationTuesdayCloseHours2 = '';
        staffControllerVM.staffDoctorConsultationTuesdayCloseMinutes2 = '';
        staffControllerVM.staffDoctorConsultationWednesdayOpenHours1 = '';
        staffControllerVM.staffDoctorConsultationWednesdayOpenMinutes1 = '';
        staffControllerVM.staffDoctorConsultationWednesdayCloseHours1 = '';
        staffControllerVM.staffDoctorConsultationWednesdayCloseMinutes1 = '';
        staffControllerVM.staffDoctorConsultationWednesdayOpenHours2 = '';
        staffControllerVM.staffDoctorConsultationWednesdayOpenMinutes2 = '';
        staffControllerVM.staffDoctorConsultationWednesdayCloseHours2 = '';
        staffControllerVM.staffDoctorConsultationWednesdayCloseMinutes2 = '';
        staffControllerVM.staffDoctorConsultationThursdayOpenHours1 = '';
        staffControllerVM.staffDoctorConsultationThursdayOpenMinutes1 = '';
        staffControllerVM.staffDoctorConsultationThursdayCloseHours1 = '';
        staffControllerVM.staffDoctorConsultationThursdayCloseMinutes1 = '';
        staffControllerVM.staffDoctorConsultationThursdayOpenHours2 = '';
        staffControllerVM.staffDoctorConsultationThursdayOpenMinutes2 = '';
        staffControllerVM.staffDoctorConsultationThursdayCloseHours2 = '';
        staffControllerVM.staffDoctorConsultationThursdayCloseMinutes2 = '';
        staffControllerVM.staffDoctorConsultationFridayOpenHours1 = '';
        staffControllerVM.staffDoctorConsultationFridayOpenMinutes1 = '';
        staffControllerVM.staffDoctorConsultationFridayCloseHours1 = '';
        staffControllerVM.staffDoctorConsultationFridayCloseMinutes1 = '';
        staffControllerVM.staffDoctorConsultationFridayOpenHours2 = '';
        staffControllerVM.staffDoctorConsultationFridayOpenMinutes2 = '';
        staffControllerVM.staffDoctorConsultationFridayCloseHours2 = '';
        staffControllerVM.staffDoctorConsultationFridayCloseMinutes2 = '';
        staffControllerVM.staffDoctorConsultationSaturdayOpenHours1 = '';
        staffControllerVM.staffDoctorConsultationSaturdayOpenMinutes1 = '';
        staffControllerVM.staffDoctorConsultationSaturdayCloseHours1 = '';
        staffControllerVM.staffDoctorConsultationSaturdayCloseMinutes1 = '';
        staffControllerVM.staffDoctorConsultationSaturdayOpenHours2 = '';
        staffControllerVM.staffDoctorConsultationSaturdayOpenMinutes2 = '';
        staffControllerVM.staffDoctorConsultationSaturdayCloseHours2 = '';
        staffControllerVM.staffDoctorConsultationSaturdayCloseMinutes2 = '';
        staffControllerVM.staffDoctorConsultationSundayOpenHours1 = '';
        staffControllerVM.staffDoctorConsultationSundayOpenMinutes1 = '';
        staffControllerVM.staffDoctorConsultationSundayCloseHours1 = '';
        staffControllerVM.staffDoctorConsultationSundayCloseMinutes1 = '';
        staffControllerVM.staffDoctorConsultationSundayOpenHours2 = '';
        staffControllerVM.staffDoctorConsultationSundayOpenMinutes2 = '';
        staffControllerVM.staffDoctorConsultationSundayCloseHours2 = '';
        staffControllerVM.staffDoctorConsultationSundayCloseMinutes2 = '';

        staffControllerVM.staffDoctorDetailsDoctorConsultationList = [];
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Staff doctor Specializations variables
        staffControllerVM.addedSpecializationsList = [];
        staffControllerVM.addedSpecializationsListCount = 3;
        staffControllerVM.specializationsList = [];
        staffControllerVM.specializationsListCount = 3;
        staffControllerVM.staffDoctorSpecializationsSpecializationName = '';
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Staff doctor languages variables
        staffControllerVM.addedLanguagesList = [];
        staffControllerVM.addedLanguagesListCount = 3;
        staffControllerVM.languagesList = [];
        staffControllerVM.languagesListCount = 3;
        staffControllerVM.staffDoctorLanguagesLanguageName = '';
                
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Staff doctor professional details variables       
        staffControllerVM.isVisibleEducationAddMoreDegrees = true;
        staffControllerVM.isVisibleEducationSaveDegrees = false;
        staffControllerVM.isVisibleEducationAddMoreExperience = true;
        staffControllerVM.isVisibleEducationSaveExperience = false;
        staffControllerVM.isVisibleEducationAddMoreAffiliation = true;
        staffControllerVM.isVisibleEducationSaveAffiliation = false;
        staffControllerVM.isVisibleEducationAddMoreAwards = true;
        staffControllerVM.isVisibleEducationSaveAwards = false;

        staffControllerVM.isVisibleNewDegreeRow = false;
        staffControllerVM.isVisibleNewExperienceRow = false;
        staffControllerVM.isVisibleNewAffiliationRow = false;
        staffControllerVM.isVisibleNewAwardRow = false;

        staffControllerVM.staffDoctorProfessionalDetailsEducationAddDegreeName = '';
        staffControllerVM.staffDoctorProfessionalDetailsEducationAddCollegeName = '';
        staffControllerVM.staffDoctorDetailsAddDegreeYear = '';

        staffControllerVM.staffDoctorProfessionalDetailsExperienceAddDesignation = '';
        staffControllerVM.staffDoctorProfessionalDetailsExperienceAddOrganization = '';
        staffControllerVM.staffDoctorProfessionalDetailsExperienceAddCityName = '';
        staffControllerVM.staffDoctorProfessionalDetailsExperienceAddStartYear = '';
        staffControllerVM.staffDoctorProfessionalDetailsExperienceAddEndYear = '';
        
        staffControllerVM.staffDoctorProfessionalDetailsAffiliationAddAffiliationName = '';
        staffControllerVM.staffDoctorProfessionalDetailsAffiliationAddYear = '';

        staffControllerVM.staffDoctorProfessionalDetailsAwardsAddAwardName = '';
        staffControllerVM.staffDoctorProfessionalDetailsAwardsAddYear = '';

        staffControllerVM.staffDoctorDetailsDegreesList = [];
        staffControllerVM.staffDoctorDetailsCollegesList = [];
        staffControllerVM.staffDoctorDetailsCitiesList = [];        
        staffControllerVM.staffDoctorDetailsAffiliationsList = [];
        staffControllerVM.staffDoctorDetailsAwardsList = [];

        staffControllerVM.staffDoctorDetailsProfessionalDetailsEducationList = [];
        staffControllerVM.staffDoctorDetailsProfessionalDetailsExperienceList = [];
        staffControllerVM.staffDoctorDetailsProfessionalDetailsAffiliationsList = [];
        staffControllerVM.staffDoctorDetailsProfessionalDetailsAwardsList = [];

        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Staff doctor treatments variables       
        staffControllerVM.staffDoctorTreatmentsTreatmentId = '';
        staffControllerVM.staffDoctorTreatmentsTreatmentName = '';
        staffControllerVM.staffDoctorTreatmentsTreatmentCost = '';
        staffControllerVM.staffDoctorTreatmentsTax = '';
        staffControllerVM.staffDoctorTreatmentsSubcategory = false;
        staffControllerVM.staffDoctorTreatmentsExistingTreatment = '';
        staffControllerVM.staffDoctorTreatmentsTreatmentNotes = '';
        staffControllerVM.staffDoctorTreatmentsAddedTreatmentName = '';

        staffControllerVM.staffDoctorDetailsTreatmentsList = [];
        staffControllerVM.staffDoctorDetailsParentTreatmentsList = [];
        staffControllerVM.staffDoctorDetailsAddedTreatmentsList = [];
        
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Staff variables
        staffControllerVM.staffPracticeDoctorsList = [];
        staffControllerVM.staffPracticeStaffList = [];        
        
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // ViewModel Methods
        // Visibility methods
        staffControllerVM.showStaffDoctorDetails = showStaffDoctorDetails;
        staffControllerVM.showStaffDoctorContacts = showStaffDoctorContacts;
        staffControllerVM.showStaffConsultation = showStaffConsultation;
        staffControllerVM.showStaffSpecializations = showStaffSpecializations;
        staffControllerVM.showStaffLanguages = showStaffLanguages;
        staffControllerVM.showStaffProfessionalDetails = showStaffProfessionalDetails;
        staffControllerVM.showStaffTreatments = showStaffTreatments;
        staffControllerVM.showStaffRedPlusAccess = showStaffRedPlusAccess;

        staffControllerVM.showStaffContactsSecondaryPhone = showStaffContactsSecondaryPhone;
        staffControllerVM.showStaffContactsSecondaryEmailId = showStaffContactsSecondaryEmailId;

        staffControllerVM.hideStaffContactsSecondaryPhone = hideStaffContactsSecondaryPhone;
        staffControllerVM.hideStaffContactsSecondaryEmailId = hideStaffContactsSecondaryEmailId;
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------        

        // Doctor edit details methods
        staffControllerVM.getProviderDetailsOnLoad = getProviderDetailsOnLoad;
        staffControllerVM.getCountries = getCountries;
        staffControllerVM.getStates = getStates;
        staffControllerVM.getCities = getCities;
        staffControllerVM.getLocalities = getLocalities;
        staffControllerVM.editProfile = editProfile;
        staffControllerVM.getStaffDoctorDetails = getStaffDoctorDetails;
        staffControllerVM.addStaffDoctorDetails = addStaffDoctorDetails;
        staffControllerVM.getStaffDoctorContacts = getStaffDoctorContacts;        
        staffControllerVM.addStaffDoctorContacts = addStaffDoctorContacts;
        staffControllerVM.staffDoctorConsultationCopyToAll = staffDoctorConsultationCopyToAll;        
        staffControllerVM.getStaffDoctorConsultation = getStaffDoctorConsultation;
        staffControllerVM.addStaffDoctorConsultation = addStaffDoctorConsultation;
        staffControllerVM.getSpecializations = getSpecializations;
        staffControllerVM.getAddedSpecializations = getAddedSpecializations;
        staffControllerVM.loadMoreSpecializations = loadMoreSpecializations;
        staffControllerVM.addDoctorSpecializations = addDoctorSpecializations;
        staffControllerVM.addToDoctorSpecializations = addToDoctorSpecializations;        
        staffControllerVM.removeDoctorSpecializations = removeDoctorSpecializations;
        staffControllerVM.getLanguages = getLanguages;
        staffControllerVM.getAddedLanguages = getAddedLanguages;
        staffControllerVM.loadMoreLanguages = loadMoreLanguages;
        staffControllerVM.addDoctorLanguages = addDoctorLanguages;
        staffControllerVM.addToDoctorLanguages = addToDoctorLanguages;        
        staffControllerVM.removeDoctorLanguages = removeDoctorLanguages;
        staffControllerVM.getTreatments = getTreatments;
        staffControllerVM.getParentTreatments = getParentTreatments;        
        staffControllerVM.getAddedTreatments = getAddedTreatments;
        staffControllerVM.addDoctorTreatments = addDoctorTreatments;
        staffControllerVM.setDoctorTreatments = setDoctorTreatments;        
        staffControllerVM.editDoctorTreatments = editDoctorTreatments;
        staffControllerVM.removeDoctorTreatments = removeDoctorTreatments;
        staffControllerVM.getAddedEducation = getAddedEducation;
        staffControllerVM.addDoctorEducation = addDoctorEducation;
        staffControllerVM.getAddedExperience = getAddedExperience;
        staffControllerVM.addDoctorExperience = addDoctorExperience;
        staffControllerVM.getAddedAffiliations = getAddedAffiliations;
        staffControllerVM.addDoctorAffiliations = addDoctorAffiliations;
        staffControllerVM.getAddedAwards = getAddedAwards;
        staffControllerVM.addDoctorAwards = addDoctorAwards;
        staffControllerVM.getDegrees = getDegrees;
        staffControllerVM.getColleges = getColleges;   
        staffControllerVM.getAffiliations = getAffiliations;
        staffControllerVM.getAwards = getAwards;
        staffControllerVM.addMoreDegrees = addMoreDegrees;        
        staffControllerVM.addMoreExperiences = addMoreExperiences;        
        staffControllerVM.addMoreAffiliation = addMoreAffiliation;        
        staffControllerVM.addMoreAwards = addMoreAwards;
        staffControllerVM.removeDoctorEducation = removeDoctorEducation;
        staffControllerVM.removeDoctorExperience = removeDoctorExperience;
        staffControllerVM.removeDoctorAffiliations = removeDoctorAffiliations;
        staffControllerVM.removeDoctorAwards = removeDoctorAwards;       
        staffControllerVM.getProfileDetails = getProfileDetails;
        staffControllerVM.getRegistrationCouncils = getRegistrationCouncils;        
        staffControllerVM.showDoctorEditDisplay = showDoctorEditDisplay;
        staffControllerVM.showDoctorEdit = showDoctorEdit;
        staffControllerVM.getPracticeDoctors = getPracticeDoctors;
        staffControllerVM.getPracticeStaff = getPracticeStaff;
        staffControllerVM.removeProvider = removeProvider;
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //Implementation
        // Visibility methods implementation
        function showDoctorEditDisplay()
        {
            $scope.reset();
            staffControllerVM.isVisibleDoctorEditDisplay = true;
            staffControllerVM.isVisibleDoctorEdit = false;

        }
        function showDoctorEdit() {
            $scope.reset();
            staffControllerVM.isVisibleDoctorEditDisplay = false;
            staffControllerVM.isVisibleDoctorEdit = true;

        }
        function showStaffDoctorDetails() {
            clearAllDivs();
            $scope.reset();
            staffControllerVM.isVisibleStaffDoctorDetails = true;
            document.getElementById("staffDoctorDetailsLI").className = "active";
            document.getElementById("staffDoctorDetailsLI2").className = "active";
        }
        function showStaffDoctorContacts() {
            clearAllDivs();
            $scope.reset();
            staffControllerVM.isVisibleStaffDoctorContacts = true;
            document.getElementById("staffDoctorContactsLI").className = "active";
            document.getElementById("staffDoctorContactsLI2").className = "active";
        }
        function showStaffConsultation() {
            clearAllDivs();
            $scope.reset();
            staffControllerVM.isVisibleStaffConsultation = true;
            document.getElementById("staffConsultationLI").className = "active";
            document.getElementById("staffConsultationLI2").className = "active";
        }
        function showStaffSpecializations() {
            clearAllDivs();
            $scope.reset();
            staffControllerVM.isVisibleStaffSpecialization = true;
            document.getElementById("staffSpecializationsLI").className = "active";
            document.getElementById("staffSpecializationsLI2").className = "active";
        }
        function showStaffLanguages() {
            clearAllDivs();
            $scope.reset();
            staffControllerVM.isVisibleStaffLanguages = true;
            document.getElementById("staffLanguagesLI").className = "active";
            document.getElementById("staffLanguagesLI2").className = "active";
        }
        function showStaffProfessionalDetails() {
            clearAllDivs();
            $scope.reset();
            staffControllerVM.isVisibleStaffProfessionalDetails = true;
            document.getElementById("staffProfessionalDetailsLI").className = "active";
            document.getElementById("staffProfessionalDetailsLI2").className = "active";
        }
        function showStaffTreatments() {
            clearAllDivs();
            $scope.reset();
            staffControllerVM.isVisibleStaffTreatments = true;
            document.getElementById("staffTreatmentsLI").className = "active";
            document.getElementById("staffTreatmentsLI2").className = "active";
        }
        function showStaffRedPlusAccess() {
            clearAllDivs();
            $scope.reset();
            staffControllerVM.isVisibleStaffRedPlusAccess = true;
            document.getElementById("staffRedPlusAccessLI").className = "active";
            document.getElementById("staffRedPlusAccessLI2").className = "active";
        }
        function clearAllDivs() {
            staffControllerVM.isVisibleStaffDoctorDetails = false;
            document.getElementById("staffDoctorDetailsLI").className = "";
            document.getElementById("staffDoctorDetailsLI2").className = "";
            staffControllerVM.isVisibleStaffDoctorContacts = false;
            document.getElementById("staffDoctorContactsLI").className = "";
            document.getElementById("staffDoctorContactsLI2").className = "";
            staffControllerVM.isVisibleStaffConsultation = false;
            document.getElementById("staffConsultationLI").className = "";
            document.getElementById("staffConsultationLI2").className = "";
            staffControllerVM.isVisibleStaffSpecialization = false;
            document.getElementById("staffSpecializationsLI").className = "";
            document.getElementById("staffSpecializationsLI2").className = "";
            staffControllerVM.isVisibleStaffLanguages = false;
            document.getElementById("staffLanguagesLI").className = "";
            document.getElementById("staffLanguagesLI2").className = "";
            staffControllerVM.isVisibleStaffProfessionalDetails = false;
            document.getElementById("staffProfessionalDetailsLI").className = "";
            document.getElementById("staffProfessionalDetailsLI2").className = "";
            staffControllerVM.isVisibleStaffTreatments = false;
            document.getElementById("staffTreatmentsLI").className = "";
            document.getElementById("staffTreatmentsLI2").className = "";
            staffControllerVM.isVisibleStaffRedPlusAccess = false;
            document.getElementById("staffRedPlusAccessLI").className = "";
            document.getElementById("staffRedPlusAccessLI2").className = "";
        }

        function showStaffContactsSecondaryPhone() {
            staffControllerVM.isVisibleSecondaryPhone = true;
        }

        function showStaffContactsSecondaryEmailId() {
            staffControllerVM.isVisibleSecondaryEmailId = true;
        }

        function hideStaffContactsSecondaryPhone() {
            staffControllerVM.isVisibleSecondaryPhone = false;
            staffControllerVM.staffDoctorContactsSecondaryPhone = '';
        }

        function hideStaffContactsSecondaryEmailId() {
            staffControllerVM.isVisibleSecondaryEmailId = false;
            staffControllerVM.staffDoctorContactsSecondaryEmailId = '';
        }
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $scope.redirectPracticeEditDetails = function () {            
            window.location = "PracticeEditDetails.html";
        }
        $scope.redirectEditProfile = function () {
            window.location = "EditProfile.html";
        }
        $scope.redirectChangePassword = function () {
            window.location = "ChangePassword.html";
        }
        $scope.redirectMain = function () {
            //$location.path('/Login');
            window.location = "Index.html";
        }
        $scope.redirectLogin = function () {
            //$location.path('/Login');
            window.location = "Login.html";
        }
        $scope.redirectSignup = function () {
            //$location.path('/Login');
            window.location = "Signup.html";
        }
        $scope.redirectDoctorEditDetails = function () {
            //$location.path('/Login');
            window.location = "DoctorEditDetails.html";
        }

        function isValidEmail(emailAddress) {
            return staffService.isValidEmail(emailAddress);
        }
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        function getProviderDetailsOnLoad(infoType) {            
            debugger;
            var url = document.URL;
            var myUrl = new String(url);
            var separatedByQuestionMark = myUrl.split('?');
            if (separatedByQuestionMark.length > 1) {
                var separatedByEquals = separatedByQuestionMark[1].split('=');
                staffControllerVM.editProviderProviderId = parseInt(separatedByEquals[1]);
                switch (infoType) {
                    case 1:
                        staffControllerVM.getStaffDoctorDetails(staffControllerVM.editProviderProviderId);                        
                        break;
                    case 2:
                        staffControllerVM.getStaffDoctorContacts(staffControllerVM.editProviderProviderId);
                        break;
                    case 3:
                        staffControllerVM.getStaffDoctorConsultation(staffControllerVM.editProviderProviderId);
                        break;
                    case 4:
                        staffControllerVM.getAddedSpecializations(staffControllerVM.editProviderProviderId);
                        break;
                    case 5:
                        staffControllerVM.getAddedLanguages(staffControllerVM.editProviderProviderId);
                        break;
                    case 6:
                        staffControllerVM.getAddedEducation(staffControllerVM.editProviderProviderId);
                        staffControllerVM.getAddedExperience(staffControllerVM.editProviderProviderId);
                        staffControllerVM.getAddedAffiliations(staffControllerVM.editProviderProviderId);
                        staffControllerVM.getAddedAwards(staffControllerVM.editProviderProviderId);
                        break;
                    case 7:
                        staffControllerVM.getAddedTreatments(staffControllerVM.editProviderProviderId);
                        break;
                    case 8:

                        break;
                    case 9:
                        staffControllerVM.addStaffDoctorDetails(staffControllerVM.editProviderProviderId);
                        break;
                    case 10:
                        staffControllerVM.addStaffDoctorContacts(staffControllerVM.editProviderProviderId);
                        break;
                    case 11:
                        staffControllerVM.addStaffDoctorConsultation(staffControllerVM.editProviderProviderId);
                        break;
                    case 12:
                        staffControllerVM.addToDoctorSpecializations(staffControllerVM.editProviderProviderId);
                        break;                    
                    case 14:
                        staffControllerVM.addToDoctorLanguages(staffControllerVM.editProviderProviderId);
                        break;                    
                    case 17: 
                        staffControllerVM.addDoctorEducation(staffControllerVM.editProviderProviderId);
                        break;                    
                    case 19:
                        staffControllerVM.addDoctorExperience(staffControllerVM.editProviderProviderId);
                        break;                    
                    case 21:
                        staffControllerVM.addDoctorAffiliations(staffControllerVM.editProviderProviderId);
                        break;                    
                    case 23:
                        staffControllerVM.addDoctorAwards(staffControllerVM.editProviderProviderId);
                        break;
                    case 24:
                        staffControllerVM.addDoctorTreatments(staffControllerVM.editProviderProviderId);
                        break;
                    case 25:
                        staffControllerVM.editDoctorTreatments(staffControllerVM.editProviderProviderId);
                        break;                    
                    default:
                        break;
                }                
            }
            else {
                switch (infoType) {
                    case 1:
                        staffControllerVM.getStaffDoctorDetails(0);
                        break;
                    case 2:
                        staffControllerVM.getStaffDoctorContacts(0);
                        break;
                    case 3:
                        staffControllerVM.getStaffDoctorConsultation(0);
                        break;
                    case 4:
                        staffControllerVM.getAddedSpecializations(0);
                        break;
                    case 5:
                        staffControllerVM.getAddedLanguages(0);
                        break;
                    case 6:
                        staffControllerVM.getAddedEducation(0);
                        staffControllerVM.getAddedExperience(0);
                        staffControllerVM.getAddedAffiliations(0);
                        staffControllerVM.getAddedAwards(0);
                        break;
                    case 7:
                        staffControllerVM.getAddedTreatments(0);
                        break;
                    case 8:

                        break;
                    case 9:
                        staffControllerVM.addStaffDoctorDetails(0);
                        break;
                    case 10:
                        staffControllerVM.addStaffDoctorContacts(0);
                        break;
                    case 11:
                        staffControllerVM.addStaffDoctorConsultation(0);
                        break;
                    case 12:
                        staffControllerVM.addToDoctorSpecializations(0);
                        break;
                    case 14:
                        staffControllerVM.addToDoctorLanguages(0);
                        break;
                    case 17:
                        staffControllerVM.addDoctorEducation(0);
                        break;
                    case 19:
                        staffControllerVM.addDoctorExperience(0);
                        break;
                    case 21:
                        staffControllerVM.addDoctorAffiliations(0);
                        break;
                    case 23:
                        staffControllerVM.addDoctorAwards(0);
                        break;
                    case 24:
                        staffControllerVM.addDoctorTreatments(0);
                        break;
                    case 25:
                        staffControllerVM.editDoctorTreatments(0);
                        break;
                    default:
                        break;
                }
            }                       
        }

        function editProfile() {            
            var name = staffControllerVM.editProfileFullName;
            var gen = staffControllerVM.editProfileGender;
            var date = staffControllerVM.editProfileDOB;
            var bg = staffControllerVM.editProfileBloodGroup;
            var tz = staffControllerVM.editProfileTimeZone;
            var mn = staffControllerVM.editProfileMobileNumber;
            var epn = staffControllerVM.editProfileExtraPhoneNumber;
            var sa = staffControllerVM.editProfileStreetAddress;
            var couId = staffControllerVM.editProfileCountryId;
            var sId = staffControllerVM.editProfileStateId;
            var cId = staffControllerVM.editProfileCityId;
            var lId = staffControllerVM.editProfileLocalityId;
            var zc = staffControllerVM.editProfileZipCode;

            staffService.editProfile({
                firstName: name, lastName: name, gender: gen, dob: date, bloodGroup: bg, timeZone: tz,
                mobileNumber: mn, extraPhoneNumber: epn, streetAddress: sa,
                countryId:couId, stateId:sId, cityId:cId, localityId:lId, zipCode:zc }).then(function (data) {
                alert(data.results);
            });           

            staffControllerVM.editProfileFullName = '';
            staffControllerVM.editProfileGender = '';
            staffControllerVM.editProfileDOB = '';
            staffControllerVM.editProfileBloodGroup = '';
            staffControllerVM.editProfileTimeZone = '';
            staffControllerVM.editProfileMobileNumber = '';
            staffControllerVM.editProfileExtraPhoneNumber = '';
            staffControllerVM.editProfileStreetAddress = '';
            staffControllerVM.editProfileCountryId = '';
            staffControllerVM.editProfileStateId = '';
            staffControllerVM.editProfileCityId = '';
            staffControllerVM.editProfileLocalityId = '';
            staffControllerVM.editProfileZipCode = '';
        }

        function addStaffDoctorDetails(providerId) {
            $scope.reset();
            var logo = document.getElementById('exampleInputFile').value;
            var name = staffControllerVM.staffDoctorDetailsDoctorName;
            var gender = parseInt(staffControllerVM.staffDoctorDetailsGender);
            var regDetails = staffControllerVM.staffDoctorDetailsRegistrationDetails;
            var regYear = parseInt(staffControllerVM.staffDoctorDetailsRegistrationYear);
            var regCouncil = staffControllerVM.staffDoctorDetailsRegistrationCouncil;
            var regCouncilId = staffControllerVM.staffDoctorDetailsRegistrationCouncilId;
            var noOfYears = parseInt(staffControllerVM.staffDoctorDetailsNumberOfYears);
            var tagLine = staffControllerVM.staffDoctorDetailsDoctorTagLine;
            var description = staffControllerVM.staffDoctorDetailsDoctorDescription;                                                                      
            
            if (regCouncilId == "" || regCouncilId == null || regCouncilId <= 0) {
                for (var i = 0; i < staffControllerVM.staffDoctorDetailsRegistrationCouncilsList.length; i++) {
                    if (staffControllerVM.staffDoctorDetailsRegistrationCouncilsList[i].name == regCouncil) {
                        regCouncilId = parseInt(staffControllerVM.staffDoctorDetailsRegistrationCouncilsList[i].registrationCouncilId);
                        break;
                    }
                }
            }

            if (gender == null || gender == "" || gender.length == 0 || gender == 0)
            { gender = 0; }            
            if (regDetails == null || regDetails == "" || regDetails.length == 0)
            { regDetails = "null"; }
            if (regYear == null || regYear == "" || regYear.length == 0 || regYear == 0)
            { regYear = 0; }
            if (regCouncil == null || regCouncil == "" || regCouncil.length == 0 || regCouncil == 0)
            { regCouncil = 0; }
            if (noOfYears == null || noOfYears == "" || noOfYears.length == 0 || noOfYears == 0)
            { noOfYears = 0; }
            if (tagLine == null || tagLine == "" || tagLine.length == 0)
            { tagLine = "null"; }
            if (description == null || description == "" || description.length == 0)
            { description = "null"; }

            if (isNaN(regYear)) {
                failureAlert("Please select valid number for registration years.");
            }
            if (isNaN(noOfYears)) {
                failureAlert("Please select valid number for experience years.");
            }

            if (name.length > 0 && !isNaN(regYear) && !isNaN(noOfYears)) {
                $scope.startSpin();
                staffService.addStaffDoctorDetails({
                    doctorName: name, gender: gender, year: regYear, registrationCouncilId: regCouncilId, numberOfYears: noOfYears,providerId:providerId,
                    registrationDetails: regDetails, doctorTagLine: tagLine, doctorDescription: description
                }).then(function (data) {                    
                    var response = data.results;
                    $scope.reset();                    
                    $scope.stopSpin();
                    staffControllerVM.getStaffDoctorDetails(providerId);
                    successAlert(response);
                });                
            }           
            else {
                if (name == null || name == "") {
                    failureAlert("Doctor name is required");
                }
                if (isNaN(regYear) == true)
                { failureAlert("Invalid value for registration year"); }
                if (isNaN(noOfYears) == true)
                { failureAlert("Invalid value for experience year(s)"); }
            }
            regCouncilId = '';
            document.getElementById('exampleInputFile').value = '';
            staffControllerVM.staffDoctorDetailsDoctorName = '';
            staffControllerVM.staffDoctorDetailsGender = '';
            staffControllerVM.staffDoctorDetailsRegistrationDetails = '';
            staffControllerVM.staffDoctorDetailsRegistrationYear = '';
            staffControllerVM.staffDoctorDetailsRegistrationCouncil = '';
            staffControllerVM.staffDoctorDetailsNumberOfYears = '';
            staffControllerVM.staffDoctorDetailsDoctorTagLine = '';
            staffControllerVM.staffDoctorDetailsDoctorDescription = '';
        }      

        function getStaffDoctorDetails(providerId) {
            $scope.startSpin();
            return staffService.getStaffDoctorDetails({ providerId: providerId }).then(function (data) {
                var response = data.results;
                staffControllerVM.staffDoctorDetailsDoctorDetailsList = response;                                
                $scope.stopSpin();
                setStaffDoctorDetails();
                return response;
            });
        }

        function setStaffDoctorDetails() {
            if (staffControllerVM.staffDoctorDetailsDoctorDetailsList.length > 0) {
                staffControllerVM.staffDoctorDetailsDoctorName = staffControllerVM.staffDoctorDetailsDoctorDetailsList[0].doctorDetailsDoctorName;
                staffControllerVM.staffDoctorDetailsGender = staffControllerVM.staffDoctorDetailsDoctorDetailsList[0].doctorDetailsGender;
                staffControllerVM.staffDoctorDetailsRegistrationDetails = staffControllerVM.staffDoctorDetailsDoctorDetailsList[0].doctorDetailsRegistrationDetails;
                staffControllerVM.staffDoctorDetailsRegistrationYear = staffControllerVM.staffDoctorDetailsDoctorDetailsList[0].doctorDetailsRegistrationYear;
                staffControllerVM.staffDoctorDetailsRegistrationCouncilId = staffControllerVM.staffDoctorDetailsDoctorDetailsList[0].doctorDetailsRegistrationCouncil;
                staffControllerVM.staffDoctorDetailsNumberOfYears = staffControllerVM.staffDoctorDetailsDoctorDetailsList[0].doctorDetailsExperienceYears;
                staffControllerVM.staffDoctorDetailsDoctorTagLine = staffControllerVM.staffDoctorDetailsDoctorDetailsList[0].doctorDetailsTagline;
                staffControllerVM.staffDoctorDetailsDoctorDescription = staffControllerVM.staffDoctorDetailsDoctorDetailsList[0].doctorDetailsDoctorDescription;
            }
        }

        function getStaffDoctorContacts(providerId) {
            $scope.startSpin();
            return staffService.getStaffDoctorContacts({ providerId: providerId }).then(function (data) {
                var response = data.results;
                staffControllerVM.staffDoctorDetailsDoctorContactsList = response;                                
                $scope.stopSpin();
                setStaffDoctorContacts();
                return response;
            });
        }

        function setStaffDoctorContacts() {
            if (staffControllerVM.staffDoctorDetailsDoctorContactsList.length > 0) {
                staffControllerVM.staffDoctorContactsPrimaryPhone = staffControllerVM.staffDoctorDetailsDoctorContactsList[0].doctorContactsPrimaryPhone;
                staffControllerVM.staffDoctorContactsSecondaryPhone = staffControllerVM.staffDoctorDetailsDoctorContactsList[0].doctorContactsSecondaryPhone;
                staffControllerVM.staffDoctorContactsPrimaryEmailId = staffControllerVM.staffDoctorDetailsDoctorContactsList[0].doctorContactsPrimaryEmail;
                staffControllerVM.staffDoctorContactsSecondaryEmailId = staffControllerVM.staffDoctorDetailsDoctorContactsList[0].doctorContactsSecondaryEmail;
                staffControllerVM.staffDoctorContactsWebsiteAddress = staffControllerVM.staffDoctorDetailsDoctorContactsList[0].doctorContactsWebsiteAddress;
            }
        }         

        function addStaffDoctorContacts(providerId) {
            $scope.reset();
            var primaryPhone = parseInt(staffControllerVM.staffDoctorContactsPrimaryPhone);
            var secondaryPhone = parseInt(staffControllerVM.staffDoctorContactsSecondaryPhone);
            var primaryEmailId = staffControllerVM.staffDoctorContactsPrimaryEmailId.trim();
            var secondaryEmailId = staffControllerVM.staffDoctorContactsSecondaryEmailId.trim();
            var websiteAddress = staffControllerVM.staffDoctorContactsWebsiteAddress.trim();

            if (primaryPhone == '')
            { failureAlert("Primary phone is required."); }
            if (isNaN(primaryPhone)) {
                failureAlert("Please enter valid primary phone number.");
            }
            if (primaryEmailId == '')
            { failureAlert("Primary email id is required."); }
            if (!isValidEmail(primaryEmailId)) {
                failureAlert("Please enter valid primary email address.");
            }
            if (staffControllerVM.isVisibleSecondaryPhone == true && secondaryPhone == '')
            { failureAlert("Secondary phone is required."); }
            if (staffControllerVM.isVisibleSecondaryEmailId == true && secondaryEmailId == '')
            { failureAlert("Secondary email id is required."); }
            if (staffControllerVM.isVisibleSecondaryPhone == true && isNaN(secondaryPhone)) {
                failureAlert("Please enter valid secondary phone number.");
            }
            if (staffControllerVM.isVisibleSecondaryEmailId == true && !isValidEmail(secondaryEmailId)) {
                failureAlert("Please enter valid secondary email address.");
            }


            var myRegExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;

            if (!myRegExp.test(websiteAddress)) {
                failureAlert("Website address is invalid.");
            }

            if (primaryPhone != '' && (!isNaN(primaryPhone)) && primaryEmailId != '' && isValidEmail(primaryEmailId)) {
                // Primary Phone and primary Email id visible only, but secondary phone and secondary email id is invisible.
                if (staffControllerVM.isVisibleSecondaryPhone == false && staffControllerVM.isVisibleSecondaryEmailId == false) {
                    $scope.startSpin();
                    staffService.addStaffDoctorContacts({
                        primaryPhone: primaryPhone, primaryEmailId: primaryEmailId, providerId: providerId, websiteAddress: websiteAddress,
                        secondaryPhone: secondaryPhone, secondaryEmailId: secondaryEmailId
                    }).then(function (data) {
                        var response = data.results;
                        $scope.reset();                        
                        $scope.stopSpin();
                        staffControllerVM.getStaffDoctorContacts(providerId);
                        successAlert(response);
                    });
                    staffControllerVM.staffDoctorContactsPrimaryPhone = '';
                    staffControllerVM.staffDoctorContactsSecondaryPhone = '';
                    staffControllerVM.staffDoctorContactsPrimaryEmailId = '';
                    staffControllerVM.staffDoctorContactsSecondaryEmailId = '';
                    staffControllerVM.staffDoctorContactsWebsiteAddress = '';
                }
                    // Secondary phone visible
                else if (staffControllerVM.isVisibleSecondaryPhone == true && secondaryPhone != '') {
                    // Secondary phone and secondary email id visible
                    if (staffControllerVM.isVisibleSecondaryEmailId == true) {
                        if (isNaN(secondaryPhone)) {
                            failureAlert("Please enter valid secondary phone number.");
                        }
                        if (secondaryEmailId == '') {
                            failureAlert("Secondary email id is required.");
                        }
                        if (!isValidEmail(secondaryEmailId)) {
                            failureAlert("Please enter valid secondary email address.");
                        }
                        // Valid secondary phone and secondary email id.
                        if (secondaryPhone != '' && (!isNaN(secondaryPhone)) && secondaryEmailId != '' && isValidEmail(secondaryEmailId)) {
                            $scope.startSpin();
                            staffService.addStaffDoctorContacts({
                                primaryPhone: primaryPhone, primaryEmailId: primaryEmailId, providerId: providerId, websiteAddress: websiteAddress, secondaryPhone: secondaryPhone,
                                secondaryEmailId: secondaryEmailId
                            }).then(function (data) {
                                var response = data.results;
                                $scope.reset();                                
                                $scope.stopSpin();
                                staffControllerVM.getStaffDoctorContacts(providerId);
                                successAlert(response);
                            });
                            staffControllerVM.staffDoctorContactsPrimaryPhone = '';
                            staffControllerVM.staffDoctorContactsSecondaryPhone = '';
                            staffControllerVM.staffDoctorContactsPrimaryEmailId = '';
                            staffControllerVM.staffDoctorContactsSecondaryEmailId = '';
                            staffControllerVM.staffDoctorContactsWebsiteAddress = '';
                        }
                    }
                        // Secondary phone visible only.
                    else {
                        if (isNaN(secondaryPhone)) {
                            failureAlert("Please enter valid secondary phone number.");
                        }
                            // Valid secondary phone only.
                        else {
                            $scope.startSpin();
                            staffService.addStaffDoctorContacts({
                                primaryPhone: primaryPhone, primaryEmailId: primaryEmailId, providerId: providerId, websiteAddress: websiteAddress, secondaryPhone: secondaryPhone,
                                secondaryEmailId: secondaryEmailId
                            }).then(function (data) {
                                var response = data.results;
                                $scope.reset();                                
                                $scope.stopSpin();
                                staffControllerVM.getStaffDoctorContacts(providerId);
                                successAlert(response);
                            });
                            staffControllerVM.staffDoctorContactsPrimaryPhone = '';
                            staffControllerVM.staffDoctorContactsSecondaryPhone = '';
                            staffControllerVM.staffDoctorContactsPrimaryEmailId = '';
                            staffControllerVM.staffDoctorContactsSecondaryEmailId = '';
                            staffControllerVM.staffDoctorContactsWebsiteAddress = '';
                        }
                    }
                }
                    // Secondary email id visible.
                else if (staffControllerVM.isVisibleSecondaryEmailId == true && secondaryEmailId != '') {
                    // Secondary email id and phone visible.
                    if (staffControllerVM.isVisibleSecondaryPhone == true) {
                        if (isNaN(secondaryPhone)) {
                            failureAlert("Please enter valid secondary phone number.");
                        }
                        if (secondaryEmailId == '') {
                            failureAlert("Secondary email id is required.");
                        }
                        if (!isValidEmail(secondaryEmailId)) {
                            failureAlert("Please enter valid secondary email address.");
                        }
                        // Valid secondary phone and secondary email id.
                        if (secondaryPhone != '' && (!isNaN(secondaryPhone)) && secondaryEmailId != '' && isValidEmail(secondaryEmailId)) {
                            $scope.startSpin();

                            staffService.addStaffDoctorContacts({
                                primaryPhone: primaryPhone, primaryEmailId: primaryEmailId, providerId: providerId, websiteAddress: websiteAddress, secondaryPhone: secondaryPhone,
                                secondaryEmailId: secondaryEmailId
                            }).then(function (data) {
                                var response = data.results;
                                $scope.reset();                                
                                $scope.stopSpin();
                                staffControllerVM.getStaffDoctorContacts(providerId);
                                successAlert(response);
                            });
                            staffControllerVM.staffDoctorContactsPrimaryPhone = '';
                            staffControllerVM.staffDoctorContactsSecondaryPhone = '';
                            staffControllerVM.staffDoctorContactsPrimaryEmailId = '';
                            staffControllerVM.staffDoctorContactsSecondaryEmailId = '';
                            staffControllerVM.staffDoctorContactsWebsiteAddress = '';
                        }
                    }
                        // Valid secondary email id only
                    else {
                        if (secondaryEmailId == '') {
                            failureAlert("Secondary email id is required.");
                        }
                        if (!isValidEmail(secondaryEmailId)) {
                            failureAlert("Please enter valid secondary email address.");
                        }
                        if (secondaryEmailId != '' && isValidEmail(secondaryEmailId)) {
                            $scope.startSpin();

                            staffService.addStaffDoctorContacts({
                                primaryPhone: primaryPhone, primaryEmailId: primaryEmailId, providerId: providerId, websiteAddress: websiteAddress, secondaryPhone: secondaryPhone,
                                secondaryEmailId: secondaryEmailId
                            }).then(function (data) {

                                var response = data.results;
                                $scope.reset();                                
                                $scope.stopSpin();
                                staffControllerVM.getStaffDoctorContacts(providerId);
                                successAlert(response);
                            });
                            staffControllerVM.staffDoctorContactsPrimaryPhone = '';
                            staffControllerVM.staffDoctorContactsSecondaryPhone = '';
                            staffControllerVM.staffDoctorContactsPrimaryEmailId = '';
                            staffControllerVM.staffDoctorContactsSecondaryEmailId = '';
                            staffControllerVM.staffDoctorContactsWebsiteAddress = '';
                        }
                    }
                }
            }
        }

        function staffDoctorConsultationCopyToAll() {
            staffControllerVM.staffDoctorConsultationTuesday = staffControllerVM.staffDoctorConsultationMonday;
            staffControllerVM.staffDoctorConsultationWednesday = staffControllerVM.staffDoctorConsultationMonday;
            staffControllerVM.staffDoctorConsultationThursday = staffControllerVM.staffDoctorConsultationMonday;
            staffControllerVM.staffDoctorConsultationFriday = staffControllerVM.staffDoctorConsultationMonday;
            staffControllerVM.staffDoctorConsultationSaturday = staffControllerVM.staffDoctorConsultationMonday;
            staffControllerVM.staffDoctorConsultationSunday = staffControllerVM.staffDoctorConsultationMonday;

            staffControllerVM.staffDoctorConsultationTuesdayOpenHours1 = staffControllerVM.staffDoctorConsultationMondayOpenHours1;
            staffControllerVM.staffDoctorConsultationTuesdayOpenMinutes1 = staffControllerVM.staffDoctorConsultationMondayOpenMinutes1;
            staffControllerVM.staffDoctorConsultationTuesdayCloseHours1 = staffControllerVM.staffDoctorConsultationMondayCloseHours1;
            staffControllerVM.staffDoctorConsultationTuesdayCloseMinutes1 = staffControllerVM.staffDoctorConsultationMondayCloseMinutes1;
            staffControllerVM.staffDoctorConsultationTuesdayOpenHours2 = staffControllerVM.staffDoctorConsultationMondayOpenHours2;
            staffControllerVM.staffDoctorConsultationTuesdayOpenMinutes2 = staffControllerVM.staffDoctorConsultationMondayOpenMinutes2;
            staffControllerVM.staffDoctorConsultationTuesdayCloseHours2 = staffControllerVM.staffDoctorConsultationMondayCloseHours2;
            staffControllerVM.staffDoctorConsultationTuesdayCloseMinutes2 = staffControllerVM.staffDoctorConsultationMondayCloseMinutes2;
            staffControllerVM.staffDoctorConsultationWednesdayOpenHours1 = staffControllerVM.staffDoctorConsultationMondayOpenHours1;
            staffControllerVM.staffDoctorConsultationWednesdayOpenMinutes1 = staffControllerVM.staffDoctorConsultationMondayOpenMinutes1;
            staffControllerVM.staffDoctorConsultationWednesdayCloseHours1 = staffControllerVM.staffDoctorConsultationMondayCloseHours1;
            staffControllerVM.staffDoctorConsultationWednesdayCloseMinutes1 = staffControllerVM.staffDoctorConsultationMondayCloseMinutes1;
            staffControllerVM.staffDoctorConsultationWednesdayOpenHours2 = staffControllerVM.staffDoctorConsultationMondayOpenHours2;
            staffControllerVM.staffDoctorConsultationWednesdayOpenMinutes2 = staffControllerVM.staffDoctorConsultationMondayOpenMinutes2;
            staffControllerVM.staffDoctorConsultationWednesdayCloseHours2 = staffControllerVM.staffDoctorConsultationMondayCloseHours2;
            staffControllerVM.staffDoctorConsultationWednesdayCloseMinutes2 = staffControllerVM.staffDoctorConsultationMondayCloseMinutes2;
            staffControllerVM.staffDoctorConsultationThursdayOpenHours1 = staffControllerVM.staffDoctorConsultationMondayOpenHours1;
            staffControllerVM.staffDoctorConsultationThursdayOpenMinutes1 = staffControllerVM.staffDoctorConsultationMondayOpenMinutes1;
            staffControllerVM.staffDoctorConsultationThursdayCloseHours1 = staffControllerVM.staffDoctorConsultationMondayCloseHours1;
            staffControllerVM.staffDoctorConsultationThursdayCloseMinutes1 = staffControllerVM.staffDoctorConsultationMondayCloseMinutes1;
            staffControllerVM.staffDoctorConsultationThursdayOpenHours2 = staffControllerVM.staffDoctorConsultationMondayOpenHours2;
            staffControllerVM.staffDoctorConsultationThursdayOpenMinutes2 = staffControllerVM.staffDoctorConsultationMondayOpenMinutes2;
            staffControllerVM.staffDoctorConsultationThursdayCloseHours2 = staffControllerVM.staffDoctorConsultationMondayCloseHours2;
            staffControllerVM.staffDoctorConsultationThursdayCloseMinutes2 = staffControllerVM.staffDoctorConsultationMondayCloseMinutes2;
            staffControllerVM.staffDoctorConsultationFridayOpenHours1 = staffControllerVM.staffDoctorConsultationMondayOpenHours1;
            staffControllerVM.staffDoctorConsultationFridayOpenMinutes1 = staffControllerVM.staffDoctorConsultationMondayOpenMinutes1;
            staffControllerVM.staffDoctorConsultationFridayCloseHours1 = staffControllerVM.staffDoctorConsultationMondayCloseHours1;
            staffControllerVM.staffDoctorConsultationFridayCloseMinutes1 = staffControllerVM.staffDoctorConsultationMondayCloseMinutes1;
            staffControllerVM.staffDoctorConsultationFridayOpenHours2 = staffControllerVM.staffDoctorConsultationMondayOpenHours2;
            staffControllerVM.staffDoctorConsultationFridayOpenMinutes2 = staffControllerVM.staffDoctorConsultationMondayOpenMinutes2;
            staffControllerVM.staffDoctorConsultationFridayCloseHours2 = staffControllerVM.staffDoctorConsultationMondayCloseHours2;
            staffControllerVM.staffDoctorConsultationFridayCloseMinutes2 = staffControllerVM.staffDoctorConsultationMondayCloseMinutes2;
            staffControllerVM.staffDoctorConsultationSaturdayOpenHours1 = staffControllerVM.staffDoctorConsultationMondayOpenHours1;
            staffControllerVM.staffDoctorConsultationSaturdayOpenMinutes1 = staffControllerVM.staffDoctorConsultationMondayOpenMinutes1;
            staffControllerVM.staffDoctorConsultationSaturdayCloseHours1 = staffControllerVM.staffDoctorConsultationMondayCloseHours1;
            staffControllerVM.staffDoctorConsultationSaturdayCloseMinutes1 = staffControllerVM.staffDoctorConsultationMondayCloseMinutes1;
            staffControllerVM.staffDoctorConsultationSaturdayOpenHours2 = staffControllerVM.staffDoctorConsultationMondayOpenHours2;
            staffControllerVM.staffDoctorConsultationSaturdayOpenMinutes2 = staffControllerVM.staffDoctorConsultationMondayOpenMinutes2;
            staffControllerVM.staffDoctorConsultationSaturdayCloseHours2 = staffControllerVM.staffDoctorConsultationMondayCloseHours2;
            staffControllerVM.staffDoctorConsultationSaturdayCloseMinutes2 = staffControllerVM.staffDoctorConsultationMondayCloseMinutes2;
            staffControllerVM.staffDoctorConsultationSundayOpenHours1 = staffControllerVM.staffDoctorConsultationMondayOpenHours1;
            staffControllerVM.staffDoctorConsultationSundayOpenMinutes1 = staffControllerVM.staffDoctorConsultationMondayOpenMinutes1;
            staffControllerVM.staffDoctorConsultationSundayCloseHours1 = staffControllerVM.staffDoctorConsultationMondayCloseHours1;
            staffControllerVM.staffDoctorConsultationSundayCloseMinutes1 = staffControllerVM.staffDoctorConsultationMondayCloseMinutes1;
            staffControllerVM.staffDoctorConsultationSundayOpenHours2 = staffControllerVM.staffDoctorConsultationMondayOpenHours2;
            staffControllerVM.staffDoctorConsultationSundayOpenMinutes2 = staffControllerVM.staffDoctorConsultationMondayOpenMinutes2;
            staffControllerVM.staffDoctorConsultationSundayCloseHours2 = staffControllerVM.staffDoctorConsultationMondayCloseHours2;
            staffControllerVM.staffDoctorConsultationSundayCloseMinutes2 = staffControllerVM.staffDoctorConsultationMondayCloseMinutes2;
        }

        function getStaffDoctorConsultation(providerId) {
            $scope.startSpin();
            return staffService.getStaffDoctorConsultation({ providerId: providerId }).then(function (data) {
                var response = data.results;
                staffControllerVM.staffDoctorDetailsDoctorConsultationList = response;                                
                $scope.stopSpin();
                setStaffDoctorConsultation();
                return response;
            });
        }

        function setStaffDoctorConsultation() {            
            if (staffControllerVM.staffDoctorDetailsDoctorConsultationList.length > 0) {
                staffControllerVM.staffDoctorConsultationFee = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].doctorConsultationFee;
                staffControllerVM.staffDoctorConsultationDuration = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].doctorConsultationDuration;

                staffControllerVM.staffDoctorConsultationMonday = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monday;
                var monOpenHour1 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monOpenHour1);
                if (monOpenHour1 > 12) {
                    staffControllerVM.staffDoctorConsultationMondayOpenHours1 = (monOpenHour1 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationMondayOpenHours1 = monOpenHour1 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monOpenMinute1) < 10) {
                    staffControllerVM.staffDoctorConsultationMondayOpenMinutes1 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monOpenMinute1;
                }
                else { staffControllerVM.staffDoctorConsultationMondayOpenMinutes1 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monOpenMinute1; }
                var monCloseHour1 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monCloseHour1);
                if (monCloseHour1 > 12) {
                    staffControllerVM.staffDoctorConsultationMondayCloseHours1 = (monCloseHour1 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationMondayCloseHours1 = monCloseHour1 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monCloseMinute1) < 10) {
                    staffControllerVM.staffDoctorConsultationMondayCloseMinutes1 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monCloseMinute1;
                }
                else { staffControllerVM.staffDoctorConsultationMondayCloseMinutes1 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monCloseMinute1; }
                
                var monOpenHour2 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monOpenHour2);
                if (monOpenHour2 > 12) {
                    staffControllerVM.staffDoctorConsultationMondayOpenHours2 = (monOpenHour2 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationMondayOpenHours2 = monOpenHour2 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monOpenMinute2) < 10) {
                    staffControllerVM.staffDoctorConsultationMondayOpenMinutes2 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monOpenMinute2;
                }
                else { staffControllerVM.staffDoctorConsultationMondayOpenMinutes2 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monOpenMinute2; }
               
                var monCloseHour2 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monCloseHour2);
                if (monCloseHour2 > 12) {
                    staffControllerVM.staffDoctorConsultationMondayCloseHours2 = (monCloseHour2 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationMondayCloseHours2 = monCloseHour2 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monCloseMinute2) < 10) {
                    staffControllerVM.staffDoctorConsultationMondayCloseMinutes2 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monCloseMinute2;
                }
                else { staffControllerVM.staffDoctorConsultationMondayCloseMinutes2 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].monCloseMinute2; }
                

                staffControllerVM.staffDoctorConsultationTuesday = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tuesday;
                var tueOpeneHour1 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueOpenHour1);
                if (tueOpeneHour1 > 12) {
                    staffControllerVM.staffDoctorConsultationTuesdayOpenHours1 = (tueOpeneHour1 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationTuesdayOpenHours1 = tueOpeneHour1 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueOpenMinute1) < 10) {
                    staffControllerVM.staffDoctorConsultationTuesdayOpenMinutes1 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueOpenMinute1;
                }
                else { staffControllerVM.staffDoctorConsultationTuesdayOpenMinutes1 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueOpenMinute1; }
               
                var tueCloseHour1 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueCloseHour1);
                if (tueCloseHour1 > 12) {
                    staffControllerVM.staffDoctorConsultationTuesdayCloseHours1 = (tueCloseHour1 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationTuesdayCloseHours1 = tueCloseHour1 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueCloseMinute1) < 10) {
                    staffControllerVM.staffDoctorConsultationTuesdayCloseMinutes1 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueCloseMinute1;
                }
                else { staffControllerVM.staffDoctorConsultationTuesdayCloseMinutes1 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueCloseMinute1; }

               

                var tueOpenHour2 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueOpenHour2);
                if (tueOpenHour2 > 12) {
                    staffControllerVM.staffDoctorConsultationTuesdayOpenHours2 = (tueOpenHour2 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationTuesdayOpenHours2 = tueOpenHour2 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueOpenMinute2) < 10) {
                    staffControllerVM.staffDoctorConsultationTuesdayOpenMinutes2 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueOpenMinute2;
                }
                else { staffControllerVM.staffDoctorConsultationTuesdayOpenMinutes2 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueOpenMinute2; }

                
                var tueCloseHour2 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueCloseHour2);
                if (tueCloseHour2 > 12) {
                    staffControllerVM.staffDoctorConsultationTuesdayCloseHours2 = (tueCloseHour2 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationTuesdayCloseHours2 = tueCloseHour2 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueCloseMinute2) < 10) {
                    staffControllerVM.staffDoctorConsultationTuesdayCloseMinutes2 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueCloseMinute2;
                }
                else { staffControllerVM.staffDoctorConsultationTuesdayCloseMinutes2 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].tueCloseMinute2; }

            
                staffControllerVM.staffDoctorConsultationWednesday = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wednesday;
                var wedOpenHour1 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedOpenHour1);
                if (wedOpenHour1 > 12) {
                    staffControllerVM.staffDoctorConsultationWednesdayOpenHours1 = (wedOpenHour1 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationWednesdayOpenHours1 = wedOpenHour1 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedOpenMinute1) < 10) {
                    staffControllerVM.staffDoctorConsultationWednesdayOpenMinutes1 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedOpenMinute1;
                }
                else { staffControllerVM.staffDoctorConsultationWednesdayOpenMinutes1 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedOpenMinute1; }

              
                var wedCloseHour1 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedCloseHour1);
                if (wedCloseHour1 > 12) {
                    staffControllerVM.staffDoctorConsultationWednesdayCloseHours1 = (wedCloseHour1 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationWednesdayCloseHours1 = wedCloseHour1 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedCloseMinute1) < 10) {
                    staffControllerVM.staffDoctorConsultationWednesdayCloseMinutes1 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedCloseMinute1;
                }
                else { staffControllerVM.staffDoctorConsultationWednesdayCloseMinutes1 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedCloseMinute1; }
              
                var wedOpenHour2 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedOpenHour2);
                if (wedOpenHour2 > 12) {
                    staffControllerVM.staffDoctorConsultationWednesdayOpenHours2 = (wedOpenHour2 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationWednesdayOpenHours2 = wedOpenHour2 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedOpenMinute2) < 10) {
                    staffControllerVM.staffDoctorConsultationWednesdayOpenMinutes2 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedOpenMinute2;
                }
                else { staffControllerVM.staffDoctorConsultationWednesdayOpenMinutes2 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedOpenMinute2; }
              
                var wedCloseHour2 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedCloseHour2);
                if (wedCloseHour2 > 12) {
                    staffControllerVM.staffDoctorConsultationWednesdayCloseHours2 = (wedCloseHour2 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationWednesdayCloseHours2 = wedCloseHour2 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedCloseMinute2) < 10) {
                    staffControllerVM.staffDoctorConsultationWednesdayCloseMinutes2 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedCloseMinute2;
                }
                else { staffControllerVM.staffDoctorConsultationWednesdayCloseMinutes2 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].wedCloseMinute2; }

                staffControllerVM.staffDoctorConsultationThursday = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thursday;
                var thuOpenHour1 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuOpenHour1);
                if (thuOpenHour1 > 12) {
                    staffControllerVM.staffDoctorConsultationThursdayOpenHours1 = (thuOpenHour1 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationThursdayOpenHours1 = thuOpenHour1 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuOpenMinute1) < 10) {
                    staffControllerVM.staffDoctorConsultationThursdayOpenMinutes1 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuOpenMinute1;
                }
                else { staffControllerVM.staffDoctorConsultationThursdayOpenMinutes1 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuOpenMinute1; }
                
                var thuCloseHour1 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuCloseHour1);
                if (thuCloseHour1 > 12) {
                    staffControllerVM.staffDoctorConsultationThursdayCloseHours1 = (thuCloseHour1 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationThursdayCloseHours1 = thuCloseHour1 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuCloseMinute1) < 10) {
                    staffControllerVM.staffDoctorConsultationThursdayCloseMinutes1 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuCloseMinute1;
                }
                else { staffControllerVM.staffDoctorConsultationThursdayCloseMinutes1 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuCloseMinute1; }
                              
                var thuOpenHour2 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuOpenHour2);
                if (thuOpenHour2 > 12) {
                    staffControllerVM.staffDoctorConsultationThursdayOpenHours2 = (thuOpenHour2 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationThursdayOpenHours2 = thuOpenHour2 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuOpenMinute2) < 10) {
                    staffControllerVM.staffDoctorConsultationThursdayOpenMinutes2 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuOpenMinute2;
                }
                else { staffControllerVM.staffDoctorConsultationThursdayOpenMinutes2 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuOpenMinute2; }
               
                var thuCloseHour2 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuCloseHour2);
                if (thuCloseHour2 > 12) {
                    staffControllerVM.staffDoctorConsultationThursdayCloseHours2 = (thuCloseHour2 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationThursdayCloseHours2 = thuCloseHour2 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuCloseMinute2) < 10) {
                    staffControllerVM.staffDoctorConsultationThursdayCloseMinutes2 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuCloseMinute2;
                }
                else { staffControllerVM.staffDoctorConsultationThursdayCloseMinutes2 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].thuCloseMinute2; }
                

                staffControllerVM.staffDoctorConsultationFriday = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friday;
                var friOpenHour1 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friOpenHour1);
                if (friOpenHour1 > 12) {
                    staffControllerVM.staffDoctorConsultationFridayOpenHours1 = (friOpenHour1 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationFridayOpenHours1 = friOpenHour1 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friOpenMinute1) < 10) {
                    staffControllerVM.staffDoctorConsultationFridayOpenMinutes1 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friOpenMinute1;
                }
                else { staffControllerVM.staffDoctorConsultationFridayOpenMinutes1 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friOpenMinute1; }

                var friCloseHour1 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friCloseHour1);
                if (friCloseHour1 > 12) {
                    staffControllerVM.staffDoctorConsultationFridayCloseHours1 = (friCloseHour1 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationFridayCloseHours1 = friCloseHour1 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friCloseMinute1) < 10) {
                    staffControllerVM.staffDoctorConsultationFridayCloseMinutes1 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friCloseMinute1;
                }
                else { staffControllerVM.staffDoctorConsultationFridayCloseMinutes1 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friCloseMinute1; }
                              
                var friOpenHour2 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friOpenHour2);
                if (friOpenHour2 > 12) {
                    staffControllerVM.staffDoctorConsultationFridayOpenHours2 = (friOpenHour2 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationFridayOpenHours2 = friOpenHour2 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friOpenMinute2) < 10) {
                    staffControllerVM.staffDoctorConsultationFridayOpenMinutes2 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friOpenMinute2;
                }
                else { staffControllerVM.staffDoctorConsultationFridayOpenMinutes2 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friOpenMinute2; }
              
                var friCloseHour2 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friCloseHour2);
                if (friCloseHour2 > 12) {
                    staffControllerVM.staffDoctorConsultationFridayCloseHours2 = (friCloseHour2 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationFridayCloseHours2 = friCloseHour2 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friCloseMinute2) < 10) {
                    staffControllerVM.staffDoctorConsultationFridayCloseMinutes2 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friCloseMinute2;
                }
                else { staffControllerVM.staffDoctorConsultationFridayCloseMinutes2 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].friCloseMinute2; }


                staffControllerVM.staffDoctorConsultationSaturday = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].saturday;
                var satOpenHour1 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satOpenHour1);
                if (satOpenHour1 > 12) {
                    staffControllerVM.staffDoctorConsultationSaturdayOpenHours1 = (satOpenHour1 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationSaturdayOpenHours1 = satOpenHour1 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satOpenMinute1) < 10) {
                    staffControllerVM.staffDoctorConsultationSaturdayOpenMinutes1 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satOpenMinute1;
                }
                else { staffControllerVM.staffDoctorConsultationSaturdayOpenMinutes1 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satOpenMinute1; }

              
                var satCloseHour1 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satCloseHour1);
                if (satCloseHour1 > 12) {
                    staffControllerVM.staffDoctorConsultationSaturdayCloseHours1 = (satCloseHour1 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationSaturdayCloseHours1 = satCloseHour1 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satCloseMinute1) < 10) {
                    staffControllerVM.staffDoctorConsultationSaturdayCloseMinutes1 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satCloseMinute1;
                }
                else { staffControllerVM.staffDoctorConsultationSaturdayCloseMinutes1 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satCloseMinute1; }
                             
                var satOpenHour2 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satOpenHour2);
                if (satOpenHour2 > 12) {
                    staffControllerVM.staffDoctorConsultationSaturdayOpenHours2 = (satOpenHour2 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationSaturdayOpenHours2 = satOpenHour2 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satOpenMinute2) < 10) {
                    staffControllerVM.staffDoctorConsultationSaturdayOpenMinutes2 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satOpenMinute2;
                }
                else { staffControllerVM.staffDoctorConsultationSaturdayOpenMinutes2 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satOpenMinute2; }

                var satCloseHour2 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satCloseHour2);
                if (satCloseHour2 > 12) {
                    staffControllerVM.staffDoctorConsultationSaturdayCloseHours2 = (satCloseHour2 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationSaturdayCloseHours2 = satCloseHour2 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satCloseMinute2) < 10) {
                    staffControllerVM.staffDoctorConsultationSaturdayCloseMinutes2 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satCloseMinute2;
                }
                else { staffControllerVM.staffDoctorConsultationSaturdayCloseMinutes2 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].satCloseMinute2; }
                             

                staffControllerVM.staffDoctorConsultationSunday = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunday;
                var sunOpenHour1 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunOpenHour1);
                if (sunOpenHour1 > 12) {
                    staffControllerVM.staffDoctorConsultationSundayOpenHours1 = (sunOpenHour1 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationSundayOpenHours1 = sunOpenHour1 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunOpenMinute1) < 10) {
                    staffControllerVM.staffDoctorConsultationSundayOpenMinutes1 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunOpenMinute1;
                }
                else { staffControllerVM.staffDoctorConsultationSundayOpenMinutes1 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunOpenMinute1; }

               
                var sunCloseHour1 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunCloseHour1);
                if (sunCloseHour1 > 12) {
                    staffControllerVM.staffDoctorConsultationSundayCloseHours1 = (sunCloseHour1 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationSundayCloseHours1 = sunCloseHour1 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunCloseMinute1) < 10) {
                    staffControllerVM.staffDoctorConsultationSundayCloseMinutes1 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunCloseMinute1;
                }
                else { staffControllerVM.staffDoctorConsultationSundayCloseMinutes1 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunCloseMinute1; }

                
                var sunOpenHour2 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunOpenHour2);
                if (sunOpenHour2 > 12) {
                    staffControllerVM.staffDoctorConsultationSundayOpenHours2 = (sunOpenHour2 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationSundayOpenHours2 = sunOpenHour2 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunOpenMinute2) < 10) {
                    staffControllerVM.staffDoctorConsultationSundayOpenMinutes2 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunOpenMinute2;
                }
                else { staffControllerVM.staffDoctorConsultationSundayOpenMinutes2 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunOpenMinute2; }
                              
                var sunCloseHour2 = parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunCloseHour2);
                if (sunCloseHour2 > 12) {
                    staffControllerVM.staffDoctorConsultationSundayCloseHours2 = (sunCloseHour2 % 12) + ' pm';
                }
                else { staffControllerVM.staffDoctorConsultationSundayCloseHours2 = sunCloseHour2 + ' am'; }
                if (parseInt(staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunCloseMinute2) < 10) {
                    staffControllerVM.staffDoctorConsultationSundayCloseMinutes2 = '0' + staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunCloseMinute2;
                }
                else { staffControllerVM.staffDoctorConsultationSundayCloseMinutes2 = staffControllerVM.staffDoctorDetailsDoctorConsultationList[0].sunCloseMinute2; }      
            }
        }

        function addStaffDoctorConsultation(providerId) {
            $scope.reset();
            var fee = staffControllerVM.staffDoctorConsultationFee;
            var duration = staffControllerVM.staffDoctorConsultationDuration;
            var mondy = staffControllerVM.staffDoctorConsultationMonday;
            var monOpenHr1 = staffControllerVM.staffDoctorConsultationMondayOpenHours1;
            var monOpenMnt1 = staffControllerVM.staffDoctorConsultationMondayOpenMinutes1;
            var monCloseHr1 = staffControllerVM.staffDoctorConsultationMondayCloseHours1;
            var monCloseMnt1 = staffControllerVM.staffDoctorConsultationMondayCloseMinutes1;
            var monOpenHr2 = staffControllerVM.staffDoctorConsultationMondayOpenHours2;
            var monOpenMnt2 = staffControllerVM.staffDoctorConsultationMondayOpenMinutes2;
            var monCloseHr2 = staffControllerVM.staffDoctorConsultationMondayCloseHours2;
            var monCloseMnt2 = staffControllerVM.staffDoctorConsultationMondayCloseMinutes2;

            var tuesday = staffControllerVM.staffDoctorConsultationTuesday;
            var tueOpenHr1 = staffControllerVM.staffDoctorConsultationTuesdayOpenHours1;
            var tueOpenMnt1 = staffControllerVM.staffDoctorConsultationTuesdayOpenMinutes1;
            var tueCloseHr1 = staffControllerVM.staffDoctorConsultationTuesdayCloseHours1;
            var tueCloseMnt1 = staffControllerVM.staffDoctorConsultationTuesdayCloseMinutes1;
            var tueOpenHr2 = staffControllerVM.staffDoctorConsultationTuesdayOpenHours2;
            var tueOpenMnt2 = staffControllerVM.staffDoctorConsultationTuesdayOpenMinutes2;
            var tueCloseHr2 = staffControllerVM.staffDoctorConsultationTuesdayCloseHours2;
            var tueCloseMnt2 = staffControllerVM.staffDoctorConsultationTuesdayCloseMinutes2;

            var wednesday = staffControllerVM.staffDoctorConsultationWednesday;
            var wedOpenHr1 = staffControllerVM.staffDoctorConsultationWednesdayOpenHours1;
            var wedOpenMnt1 = staffControllerVM.staffDoctorConsultationWednesdayOpenMinutes1;
            var wedCloseHr1 = staffControllerVM.staffDoctorConsultationWednesdayCloseHours1;
            var wedCloseMnt1 = staffControllerVM.staffDoctorConsultationWednesdayCloseMinutes1;
            var wedOpenHr2 = staffControllerVM.staffDoctorConsultationWednesdayOpenHours2;
            var wedOpenMnt2 = staffControllerVM.staffDoctorConsultationWednesdayOpenMinutes2;
            var wedCloseHr2 = staffControllerVM.staffDoctorConsultationWednesdayCloseHours2;
            var wedCloseMnt2 = staffControllerVM.staffDoctorConsultationWednesdayCloseMinutes2;

            var thursday = staffControllerVM.staffDoctorConsultationThursday;
            var thuOpenHr1 = staffControllerVM.staffDoctorConsultationThursdayOpenHours1;
            var thuOpenMnt1 = staffControllerVM.staffDoctorConsultationThursdayOpenMinutes1;
            var thuCloseHr1 = staffControllerVM.staffDoctorConsultationThursdayCloseHours1;
            var thuCloseMnt1 = staffControllerVM.staffDoctorConsultationThursdayCloseMinutes1;
            var thuOpenHr2 = staffControllerVM.staffDoctorConsultationThursdayOpenHours2;
            var thuOpenMnt2 = staffControllerVM.staffDoctorConsultationThursdayOpenMinutes2;
            var thuCloseHr2 = staffControllerVM.staffDoctorConsultationThursdayCloseHours2;
            var thuCloseMnt2 = staffControllerVM.staffDoctorConsultationThursdayCloseMinutes2;

            var friday = staffControllerVM.staffDoctorConsultationFriday;
            var friOpenHr1 = staffControllerVM.staffDoctorConsultationFridayOpenHours1;
            var friOpenMnt1 = staffControllerVM.staffDoctorConsultationFridayOpenMinutes1;
            var friCloseHr1 = staffControllerVM.staffDoctorConsultationFridayCloseHours1;
            var friCloseMnt1 = staffControllerVM.staffDoctorConsultationFridayCloseMinutes1;
            var friOpenHr2 = staffControllerVM.staffDoctorConsultationFridayOpenHours2;
            var friOpenMnt2 = staffControllerVM.staffDoctorConsultationFridayOpenMinutes2;
            var friCloseHr2 = staffControllerVM.staffDoctorConsultationFridayCloseHours2;
            var friCloseMnt2 = staffControllerVM.staffDoctorConsultationFridayCloseMinutes2;

            var saturday = staffControllerVM.staffDoctorConsultationSaturday;
            var satOpenHr1 = staffControllerVM.staffDoctorConsultationSaturdayOpenHours1;
            var satOpenMnt1 = staffControllerVM.staffDoctorConsultationSaturdayOpenMinutes1;
            var satCloseHr1 = staffControllerVM.staffDoctorConsultationSaturdayCloseHours1;
            var satCloseMnt1 = staffControllerVM.staffDoctorConsultationSaturdayCloseMinutes1;
            var satOpenHr2 = staffControllerVM.staffDoctorConsultationSaturdayOpenHours2;
            var satOpenMnt2 = staffControllerVM.staffDoctorConsultationSaturdayOpenMinutes2;
            var satCloseHr2 = staffControllerVM.staffDoctorConsultationSaturdayCloseHours2;
            var satCloseMnt2 = staffControllerVM.staffDoctorConsultationSaturdayCloseMinutes2;

            var sunday = staffControllerVM.staffDoctorConsultationSunday;
            var sunOpenHr1 = staffControllerVM.staffDoctorConsultationSundayOpenHours1;
            var sunOpenMnt1 = staffControllerVM.staffDoctorConsultationSundayOpenMinutes1;
            var sunCloseHr1 = staffControllerVM.staffDoctorConsultationSundayCloseHours1;
            var sunCloseMnt1 = staffControllerVM.staffDoctorConsultationSundayCloseMinutes1;
            var sunOpenHr2 = staffControllerVM.staffDoctorConsultationSundayOpenHours2;
            var sunOpenMnt2 = staffControllerVM.staffDoctorConsultationSundayOpenMinutes2;
            var sunCloseHr2 = staffControllerVM.staffDoctorConsultationSundayCloseHours2;
            var sunCloseMnt2 = staffControllerVM.staffDoctorConsultationSundayCloseMinutes2;
            $scope.startSpin();
            
            staffService.addStaffDoctorConsultation({
                consultationFee: fee, consultationDuration: duration, providerId:providerId,
                monday: mondy, monOpenHour1: monOpenHr1, monOpenMinute1: monOpenMnt1, monCloseHours1: monCloseHr1, monCloseMinutes1: monCloseMnt1,
                monOpenHour2: monOpenHr2, monOpenMinute2: monOpenMnt2, monCloseHours2: monCloseHr2, monCloseMinutes2: monCloseMnt2,
                tuesday: tuesday, tueOpenHour1: tueOpenHr1, tueOpenMinute1: tueOpenMnt1, tueCloseHours1: tueCloseHr1, tueCloseMinutes1: tueCloseMnt1,
                tueOpenHour2: tueOpenHr2, tueOpenMinute2: tueOpenMnt2, tueCloseHours2: tueCloseHr2, tueCloseMinutes2: tueCloseMnt2,
                wednesday: wednesday, wedOpenHour1: wedOpenHr1, wedOpenMinute1: wedOpenMnt1, wedCloseHours1: wedCloseHr1, wedCloseMinutes1: wedCloseMnt1,
                wedOpenHour2: wedOpenHr2, wedOpenMinute2: wedOpenMnt2, wedCloseHours2: wedCloseHr2, wedCloseMinutes2: wedCloseMnt2,
                thursday: thursday, thuOpenHour1: thuOpenHr1, thuOpenMinute1: thuOpenMnt1, thuCloseHours1: thuCloseHr1, thuCloseMinutes1: thuCloseMnt1,
                thuOpenHour2: thuOpenHr2, thuOpenMinute2: thuOpenMnt2, thuCloseHours2: thuCloseHr2, thuCloseMinutes2: thuCloseMnt2,
                friday: friday, friOpenHour1: friOpenHr1, friOpenMinute1: friOpenMnt1, friCloseHours1: friCloseHr1, friCloseMinutes1: friCloseMnt1,
                friOpenHour2: friOpenHr2, friOpenMinute2: friOpenMnt2, friCloseHours2: friCloseHr2, friCloseMinutes2: friCloseMnt2,
                saturday: saturday, satOpenHour1: satOpenHr1, satOpenMinute1: satOpenMnt1, satCloseHours1: satCloseHr1, satCloseMinutes1: satCloseMnt1,
                satOpenHour2: satOpenHr2, satOpenMinute2: satOpenMnt2, satCloseHours2: satCloseHr2, satCloseMinutes2: satCloseMnt2,
                sunday: sunday, sunOpenHour1: sunOpenHr1, sunOpenMinute1: sunOpenMnt1, sunCloseHours1: sunCloseHr1, sunCloseMinutes1: sunCloseMnt1,
                sunOpenHour2: sunOpenHr2, sunOpenMinute2: sunOpenMnt2, sunCloseHours2: sunCloseHr2, sunCloseMinutes2: sunCloseMnt2
            }).then(function (data) {                
                var response = data.results;
                $scope.reset();                
                $scope.stopSpin();
                staffControllerVM.getStaffDoctorConsultation(providerId);
                successAlert(response);
            });

            staffControllerVM.staffDoctorConsultationMondayOpenHours1 = '';
            staffControllerVM.staffDoctorConsultationMondayOpenMinutes1 = '';
            staffControllerVM.staffDoctorConsultationMondayCloseHours1 = '';
            staffControllerVM.staffDoctorConsultationMondayCloseMinutes1 = '';
            staffControllerVM.staffDoctorConsultationMondayOpenHours2 = '';
            staffControllerVM.staffDoctorConsultationMondayOpenMinutes2 = '';
            staffControllerVM.staffDoctorConsultationMondayCloseHours2 = '';
            staffControllerVM.staffDoctorConsultationMondayCloseMinutes2 = '';
            staffControllerVM.staffDoctorConsultationTuesdayOpenHours1 = '';
            staffControllerVM.staffDoctorConsultationTuesdayOpenMinutes1 = '';
            staffControllerVM.staffDoctorConsultationTuesdayCloseHours1 = '';
            staffControllerVM.staffDoctorConsultationTuesdayCloseMinutes1 = '';
            staffControllerVM.staffDoctorConsultationTuesdayOpenHours2 = '';
            staffControllerVM.staffDoctorConsultationTuesdayOpenMinutes2 = '';
            staffControllerVM.staffDoctorConsultationTuesdayCloseHours2 = '';
            staffControllerVM.staffDoctorConsultationTuesdayCloseMinutes2 = '';
            staffControllerVM.staffDoctorConsultationWednesdayOpenHours1 = '';
            staffControllerVM.staffDoctorConsultationWednesdayOpenMinutes1 = '';
            staffControllerVM.staffDoctorConsultationWednesdayCloseHours1 = '';
            staffControllerVM.staffDoctorConsultationWednesdayCloseMinutes1 = '';
            staffControllerVM.staffDoctorConsultationWednesdayOpenHours2 = '';
            staffControllerVM.staffDoctorConsultationWednesdayOpenMinutes2 = '';
            staffControllerVM.staffDoctorConsultationWednesdayCloseHours2 = '';
            staffControllerVM.staffDoctorConsultationWednesdayCloseMinutes2 = '';
            staffControllerVM.staffDoctorConsultationThursdayOpenHours1 = '';
            staffControllerVM.staffDoctorConsultationThursdayOpenMinutes1 = '';
            staffControllerVM.staffDoctorConsultationThursdayCloseHours1 = '';
            staffControllerVM.staffDoctorConsultationThursdayCloseMinutes1 = '';
            staffControllerVM.staffDoctorConsultationThursdayOpenHours2 = '';
            staffControllerVM.staffDoctorConsultationThursdayOpenMinutes2 = '';
            staffControllerVM.staffDoctorConsultationThursdayCloseHours2 = '';
            staffControllerVM.staffDoctorConsultationThursdayCloseMinutes2 = '';
            staffControllerVM.staffDoctorConsultationFridayOpenHours1 = '';
            staffControllerVM.staffDoctorConsultationFridayOpenMinutes1 = '';
            staffControllerVM.staffDoctorConsultationFridayCloseHours1 = '';
            staffControllerVM.staffDoctorConsultationFridayCloseMinutes1 = '';
            staffControllerVM.staffDoctorConsultationFridayOpenHours2 = '';
            staffControllerVM.staffDoctorConsultationFridayOpenMinutes2 = '';
            staffControllerVM.staffDoctorConsultationFridayCloseHours2 = '';
            staffControllerVM.staffDoctorConsultationFridayCloseMinutes2 = '';
            staffControllerVM.staffDoctorConsultationSaturdayOpenHours1 = '';
            staffControllerVM.staffDoctorConsultationSaturdayOpenMinutes1 = '';
            staffControllerVM.staffDoctorConsultationSaturdayCloseHours1 = '';
            staffControllerVM.staffDoctorConsultationSaturdayCloseMinutes1 = '';
            staffControllerVM.staffDoctorConsultationSaturdayOpenHours2 = '';
            staffControllerVM.staffDoctorConsultationSaturdayOpenMinutes2 = '';
            staffControllerVM.staffDoctorConsultationSaturdayCloseHours2 = '';
            staffControllerVM.staffDoctorConsultationSaturdayCloseMinutes2 = '';
            staffControllerVM.staffDoctorConsultationSundayOpenHours1 = '';
            staffControllerVM.staffDoctorConsultationSundayOpenMinutes1 = '';
            staffControllerVM.staffDoctorConsultationSundayCloseHours1 = '';
            staffControllerVM.staffDoctorConsultationSundayCloseMinutes1 = '';
            staffControllerVM.staffDoctorConsultationSundayOpenHours2 = '';
            staffControllerVM.staffDoctorConsultationSundayOpenMinutes2 = '';
            staffControllerVM.staffDoctorConsultationSundayCloseHours2 = '';
            staffControllerVM.staffDoctorConsultationSundayCloseMinutes2 = '';
        }
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
        function getSpecializations() {            
            var specialization = staffControllerVM.staffDoctorSpecializationsSpecializationName;
            $scope.startSpin();            
            return staffService.getSpecializations().then(function (data) {
                var response = data.results;                
                staffControllerVM.specializationsList = response;                                
                $scope.reset();                
                $scope.stopSpin();
                return staffControllerVM.specializationsList;
            });
            staffControllerVM.staffDoctorSpecializationsSpecializationName = '';
        }

        function addDoctorSpecializations() {
            var specialization = staffControllerVM.staffDoctorSpecializationsSpecializationName.trim();
            var preLength = parseInt(staffControllerVM.specializationsList.length);
            $scope.startSpin();
            staffService.addDoctorSpecializations({ name: specialization }).then(function (data) {
                var response = data.results;
                var newLength = data.results.length;
                staffControllerVM.specializationsList = response;
                $scope.reset();
                $scope.stopSpin();
                if (newLength > preLength)
                { successAlert("Specialization added successfully.");}
                return staffControllerVM.specializationsList;
            });
            staffControllerVM.staffDoctorSpecializationsSpecializationName = '';
        }

        function addToDoctorSpecializations(providerId) {
            var specialization = staffControllerVM.staffDoctorSpecializationsSpecializationName;
            $scope.startSpin();
            var specializationId = '';
            for (var i = 0; i < staffControllerVM.specializationsList.length; i++) {
                if (staffControllerVM.specializationsList[i].title == specialization) {
                    specializationId = parseInt(staffControllerVM.specializationsList[i].specialtyId);
                    break;
                }
            }            
            staffService.addToDoctorSpecializations({ specialtyId: specializationId, providerId: providerId }).then(function (data) {
                var response = data.results;                
                $scope.reset();
                $scope.stopSpin();
                staffControllerVM.getAddedSpecializations(providerId);
                successAlert(response);
                return staffControllerVM.addedSpecializationsList;
            });            
            staffControllerVM.staffDoctorSpecializationsSpecializationName = '';            
        }        

        function getAddedSpecializations(providerId) {
            
            $scope.startSpin();            
            return staffService.getAddedSpecializations({ providerId: providerId }).then(function (data) {
                var response = data.results;                
                staffControllerVM.addedSpecializationsList = response;                             
                $scope.stopSpin();
                return staffControllerVM.addedSpecializationsList;
            });
        }
        function removeDoctorSpecializations(specializationId) {
            var providerId = staffControllerVM.editProviderProviderId;
            if (providerId == "" || providerId == null)
            { providerId = 0;}
            $scope.startSpin();
            staffService.removeDoctorSpecializations({ specialtyId: specializationId, providerId: providerId }).then(function (data) {
                var response = data.results;
                $scope.reset();                
                $scope.stopSpin();
                staffControllerVM.getAddedSpecializations(providerId);
                successAlert(response);
            });
            
        }
        function loadMoreSpecializations() {
            if (staffControllerVM.addedSpecializationsListCount < staffControllerVM.addedSpecializationsList.length)
            { staffControllerVM.addedSpecializationsListCount += 5; }
        }

        function getLanguages() {            
            $scope.startSpin();
            return staffService.getLanguages().then(function (data) {
                var response = data.results;
                staffControllerVM.languagesList = response;
                $scope.reset();                
                $scope.stopSpin();
                return staffControllerVM.languagesList;
            });
            staffControllerVM.staffDoctorLanguagesLanguageName = '';
        }

        function getAddedLanguages(providerId) {
            debugger;
            $scope.startSpin();
            return staffService.getAddedLanguages({ providerId: providerId }).then(function (data) {
                var response = data.results;
                staffControllerVM.addedLanguagesList = response;                              
                $scope.stopSpin();
                return staffControllerVM.addedLanguagesList;
            });
        }

        function loadMoreLanguages() {
            if (staffControllerVM.addedLanguagesListCount < staffControllerVM.addedLanguagesList.length)
            { staffControllerVM.addedLanguagesListCount += 5; }
        }        

        function addDoctorLanguages() {
            debugger;
            var preLength = parseInt(staffControllerVM.languagesList.length);                  
            var language = staffControllerVM.staffDoctorLanguagesLanguageName.trim();
            $scope.startSpin();
            staffService.addDoctorLanguages({ name: language }).then(function (data) {                
                var response = data.results;
                var newLength = parseInt(data.results.length);
                staffControllerVM.languagesList = response;                
                $scope.reset();               
                $scope.stopSpin();
                if (newLength > preLength) {
                    successAlert("Language added successfully.");
                }
            });                
            staffControllerVM.staffDoctorLanguagesLanguageName = '';            
        }

        function addToDoctorLanguages(providerId) {
            debugger;
            var language = staffControllerVM.staffDoctorLanguagesLanguageName;
            $scope.startSpin();
            var languageId = '';
            for (var i = 0; i < staffControllerVM.languagesList.length; i++) {
                if (staffControllerVM.languagesList[i].name == language) {
                    languageId = parseInt(staffControllerVM.languagesList[i].languageId);
                    break;
                }
            }
            staffService.addToDoctorLanguages({ languageId: languageId, providerId: providerId }).then(function (data) {
                var response = data.results;                                
                $scope.reset();
                $scope.stopSpin();
                staffControllerVM.getAddedLanguages(providerId);
                successAlert(response);
                return staffControllerVM.addedLanguagesList;
            });            
            staffControllerVM.staffDoctorLanguagesLanguageName = '';
        }

        function removeDoctorLanguages(languageId) {
            var providerId = staffControllerVM.editProviderProviderId;
            if (providerId == "" || providerId == null)
            { providerId = 0; }
            $scope.startSpin();
            staffService.removeDoctorLanguages({ languageId: languageId, providerId: providerId }).then(function (data) {
                var response = data.results;
                $scope.reset();                
                $scope.stopSpin();
                staffControllerVM.getAddedLanguages(providerId);
                successAlert(response);
            });            
        }
        
        function getTreatments() {            
            $scope.startSpin();
            return staffService.getTreatments().then(function (data) {
                var response = data.results;
                staffControllerVM.staffDoctorDetailsTreatmentsList = response;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }

        function getParentTreatments() {            
            $scope.startSpin();
            return staffService.getParentTreatments().then(function (data) {
                var response = data.results;
                staffControllerVM.staffDoctorDetailsParentTreatmentsList = response;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }
        
        function getAddedTreatments(providerId) {
            $scope.startSpin();
            return staffService.getAddedTreatments({ providerId: providerId }).then(function (data) {
                var response = data.results;
                staffControllerVM.staffDoctorDetailsAddedTreatmentsList = response;                
                $scope.stopSpin();
                return response;
            });
        }        

        function addDoctorTreatments(providerId) {
            var preLength = parseInt(staffControllerVM.staffDoctorDetailsTreatmentsList.length);
            var name = staffControllerVM.staffDoctorTreatmentsTreatmentName;
            var cost = parseInt(staffControllerVM.staffDoctorTreatmentsTreatmentCost);
            var tax = parseInt(staffControllerVM.staffDoctorTreatmentsTax);
            var existing = staffControllerVM.staffDoctorTreatmentsExistingTreatment;
            var notes = staffControllerVM.staffDoctorTreatmentsTreatmentNotes;

            var treatmentId = '';
            for (var i = 0; i < staffControllerVM.staffDoctorDetailsTreatmentsList.length; i++) {
                if (staffControllerVM.staffDoctorDetailsTreatmentsList[i].name == existing) {
                    treatmentId = parseInt(staffControllerVM.staffDoctorDetailsTreatmentsList[i].treatmentId);
                    break;
                }
            }

            $scope.startSpin();            
            staffService.addDoctorTreatments({ treatmentName: name, treatmentCost: cost, tax: tax, subcatecogyOf: treatmentId, providerId:providerId, notes: notes }).then(function (data) {                
                var response = data.results;
                var newLength = parseInt(data.results.length);                
                $scope.reset();                
                $scope.stopSpin();
                staffControllerVM.getAddedTreatments(providerId);
                staffControllerVM.getTreatments();
                if (newLength > preLength) {
                    successAlert("Treatment added successfully.");
                }               
            });

            staffControllerVM.staffDoctorTreatmentsTreatmentName = '';
            staffControllerVM.staffDoctorTreatmentsTreatmentCost = '';
            staffControllerVM.staffDoctorTreatmentsTax = '';            
            staffControllerVM.staffDoctorTreatmentsExistingTreatment = '';
            staffControllerVM.staffDoctorTreatmentsTreatmentNotes = '';
        }
        
        function setDoctorTreatments(id, name, cost, tax, notes, parent) {

            staffControllerVM.isVisibleAddSaveTreatment = false;
            staffControllerVM.staffDoctorTreatmentsTreatmentId = id;
            staffControllerVM.staffDoctorTreatmentsTreatmentName = name;
            staffControllerVM.staffDoctorTreatmentsTreatmentCost = cost;
            staffControllerVM.staffDoctorTreatmentsTax = tax;
            staffControllerVM.staffDoctorTreatmentsTreatmentNotes = notes;
            staffControllerVM.staffDoctorTreatmentsExistingTreatment = parent;

            if (parent != 0) {
                staffControllerVM.staffDoctorTreatmentsSubcategory = true;
            }
            else { staffControllerVM.staffDoctorTreatmentsSubcategory = false; }
        }

        function editDoctorTreatments() {
            $scope.reset();
            var id = staffControllerVM.staffDoctorTreatmentsTreatmentId;
            var name = staffControllerVM.staffDoctorTreatmentsTreatmentName;
            var cost = staffControllerVM.staffDoctorTreatmentsTreatmentCost;
            var tax = staffControllerVM.staffDoctorTreatmentsTax;
            var notes = staffControllerVM.staffDoctorTreatmentsTreatmentNotes;
            var parent = staffControllerVM.staffDoctorTreatmentsExistingTreatment;                                   

            $scope.startSpin();
            staffService.editDoctorTreatments({ treatmentId: id, treatmentName: name, treatmentCost: cost, tax: tax, subcatecogyOf: parent, notes: notes }).then(function (data) {
                var response = data.results;
                $scope.reset();                
                $scope.stopSpin();
                staffControllerVM.getAddedTreatments(providerId);
                successAlert(response);
            });

            staffControllerVM.staffDoctorTreatmentsTreatmentId = '';
            staffControllerVM.staffDoctorTreatmentsTreatmentName = '';
            staffControllerVM.staffDoctorTreatmentsTreatmentCost = '';
            staffControllerVM.staffDoctorTreatmentsTax = '';
            staffControllerVM.staffDoctorTreatmentsTreatmentNotes = '';
            staffControllerVM.staffDoctorTreatmentsExistingTreatment = '';
            staffControllerVM.staffDoctorTreatmentsSubcategory = false;
            staffControllerVM.isVisibleAddSaveTreatment = true;
        }

        function removeDoctorTreatments(treatmentId) {
            var providerId = staffControllerVM.editProviderProviderId;
            if (providerId == "" || providerId == null)
            { providerId = 0; }
            $scope.startSpin();
            staffService.removeDoctorTreatments({ treatmentId: treatmentId, providerId: providerId }).then(function (data) {
                var response = data.results;
                $scope.reset();                
                $scope.stopSpin();
                staffControllerVM.getAddedTreatments(providerId);
                successAlert(response);
            });
        }             
      
        function getAddedEducation(providerId) {
            $scope.startSpin();
            return staffService.getAddedEducation({ providerId: providerId }).then(function (data) {
                var response = data.results;
                staffControllerVM.staffDoctorDetailsProfessionalDetailsEducationList = response;                                
                $scope.stopSpin();
                return response;
            });
        }

        function getAddedExperience(providerId) {
            $scope.startSpin();
            return staffService.getAddedExperience({ providerId: providerId }).then(function (data) {
                var response = data.results;
                staffControllerVM.staffDoctorDetailsProfessionalDetailsExperienceList = response;                               
                $scope.stopSpin();
                return response;
            });
        }

        function getAddedAffiliations(providerId) {
            $scope.startSpin();
            return staffService.getAddedAffiliations({ providerId: providerId }).then(function (data) {
                var response = data.results;
                staffControllerVM.staffDoctorDetailsProfessionalDetailsAffiliationsList = response;                                
                $scope.stopSpin();
                return response;
            });
        }

        function getAddedAwards(providerId) {
            $scope.startSpin();
            return staffService.getAddedAwards({ providerId: providerId }).then(function (data) {
                var response = data.results;
                staffControllerVM.staffDoctorDetailsProfessionalDetailsAwardsList = response;                                
                $scope.stopSpin();
                return response;
            });
        }

        function getDegrees() {
            $scope.startSpin();
            return staffService.getDegrees().then(function (data) {
                var response = data.results;
                staffControllerVM.staffDoctorDetailsDegreesList = response;                
                $scope.stopSpin();
                return response;
            });
        }

        function getColleges() {
            $scope.startSpin();
            return staffService.getColleges().then(function (data) {
                var response = data.results;
                staffControllerVM.staffDoctorDetailsCollegesList = response;                
                $scope.stopSpin();
                return response;
            });
        }

        function getAffiliations() {
            $scope.startSpin();
            return staffService.getAffiliations().then(function (data) {
                var response = data.results;
                staffControllerVM.staffDoctorDetailsAffiliationsList = response;                
                $scope.stopSpin();
                return response;
            });
        }

        function getAwards() {
            $scope.startSpin();
            return staffService.getAwards().then(function (data) {
                var response = data.results;
                staffControllerVM.staffDoctorDetailsAwardsList = response;                
                $scope.stopSpin();
                return response;
            });
        }

        function addMoreDegrees() {
            staffControllerVM.isVisibleEducationAddMoreDegrees = false;
            staffControllerVM.isVisibleEducationSaveDegrees = true;
            staffControllerVM.isVisibleNewDegreeRow = true;
        
        }
      
        function addMoreExperiences() {
            staffControllerVM.isVisibleEducationAddMoreExperience = false;
            staffControllerVM.isVisibleEducationSaveExperience = true;
            staffControllerVM.isVisibleNewExperienceRow = true;

        }      

        function addMoreAffiliation() {
            staffControllerVM.isVisibleEducationAddMoreAffiliation = false;
            staffControllerVM.isVisibleEducationSaveAffiliation = true;
            staffControllerVM.isVisibleNewAffiliationRow = true;
        }

        function addMoreAwards() {
            staffControllerVM.isVisibleEducationAddMoreAwards = false;
            staffControllerVM.isVisibleEducationSaveAwards = true;
            staffControllerVM.isVisibleNewAwardRow = true;
        }
       
        function removeDoctorEducation(degreeTitle, schoolTitle) {
            var providerId = staffControllerVM.editProviderProviderId;
            if (providerId == "" || providerId == null)
            { providerId = 0; }
            $scope.startSpin();
            staffService.removeDoctorEducation({ degreeTitle: degreeTitle, schoolTitle: schoolTitle, providerId: providerId }).then(function (data) {
                var response = data.results;
                $scope.reset();                
                $scope.stopSpin();
                staffControllerVM.getAddedEducation(providerId);
                successAlert(response);
            });
        }
        function removeDoctorExperience(designation, organization, cityId) {
            var providerId = staffControllerVM.editProviderProviderId;
            if (providerId == "" || providerId == null)
            { providerId = 0; }
            $scope.startSpin();
            staffService.removeDoctorExperience({ designation: designation, organization: organization, cityId: cityId, providerId: providerId }).then(function (data) {
                var response = data.results;
                $scope.reset();                
                $scope.stopSpin();
                staffControllerVM.getAddedExperience(providerId);
                successAlert(response);
            });
        }
        function removeDoctorAffiliations(affiliationId) {
            var providerId = staffControllerVM.editProviderProviderId;
            if (providerId == "" || providerId == null)
            { providerId = 0; }
            $scope.startSpin();
            staffService.removeDoctorAffiliations({ affiliationId: affiliationId, providerId: providerId }).then(function (data) {
                var response = data.results;
                $scope.reset();                
                $scope.stopSpin();
                staffControllerVM.getAddedAffiliations(providerId);
                successAlert(response);
            });
        }
        function removeDoctorAwards(awardId) {
            var providerId = staffControllerVM.editProviderProviderId;
            if (providerId == "" || providerId == null)
            { providerId = 0; }
            $scope.startSpin();
            staffService.removeDoctorAwards({ awardId: awardId, providerId: providerId }).then(function (data) {
                var response = data.results;
                $scope.reset();                
                $scope.stopSpin();
                staffControllerVM.getAddedAwards(providerId);
                successAlert(response);
            });
        }
        function getProfileDetails() {            
            $scope.startSpin();        
            return staffService.getProfileDetails().then(function (data) {
                var response = data.results;
                staffControllerVM.editProfileProfileDetailsList = response;                
                $scope.stopSpin();
                setProfileDetails();
                return response;
            });            
        }
        
        function addDoctorEducation(providerId) {
            var degree = staffControllerVM.staffDoctorProfessionalDetailsEducationAddDegreeName;
            var college = staffControllerVM.staffDoctorProfessionalDetailsEducationAddCollegeName;
            var year = parseInt(staffControllerVM.staffDoctorDetailsAddDegreeYear);

            $scope.startSpin();
            staffService.addDoctorEducation({ degreeTitle: degree, degreeYear: year,providerId:providerId, schoolTitle: college }).then(function (data) {
                var response = data.results;
                $scope.reset();                
                $scope.stopSpin();
                staffControllerVM.getAddedEducation(providerId);
                successAlert(response);
            });
            staffControllerVM.isVisibleEducationAddMoreDegrees = true;
            staffControllerVM.isVisibleEducationSaveDegrees = false;

            staffControllerVM.staffDoctorProfessionalDetailsEducationAddDegreeName = '';
            staffControllerVM.staffDoctorProfessionalDetailsEducationAddCollegeName = '';
            staffControllerVM.staffDoctorDetailsAddDegreeYear = '';            
        }
        
        function addDoctorExperience(providerId) {
            var designation = staffControllerVM.staffDoctorProfessionalDetailsExperienceAddDesignation;
            var organization = staffControllerVM.staffDoctorProfessionalDetailsExperienceAddOrganization;
            var city = staffControllerVM.staffDoctorProfessionalDetailsExperienceAddCityName;
            var startYear = parseInt(staffControllerVM.staffDoctorProfessionalDetailsExperienceAddStartYear);
            var endYear = parseInt(staffControllerVM.staffDoctorProfessionalDetailsExperienceAddEndYear);

            var cityId = '';
            for (var i = 0; i < staffControllerVM.editProfileCitiesList.length; i++) {
                if (staffControllerVM.editProfileCitiesList[i].name == city) {
                    cityId = parseInt(staffControllerVM.editProfileCitiesList[i].cityId);
                    break;
                }
            }

            $scope.startSpin();
            staffService.addDoctorExperience({ cityId: cityId, startYear: startYear, endYear: endYear,providerId:providerId, designation: designation, organization: organization }).then(function (data) {
                var response = data.results;
                $scope.reset();                
                $scope.stopSpin();
                staffControllerVM.getAddedExperience(providerId);
                successAlert(response);
            });
            staffControllerVM.isVisibleEducationAddMoreExperience = true;
            staffControllerVM.isVisibleEducationSaveExperience = false;

            staffControllerVM.staffDoctorProfessionalDetailsExperienceAddDesignation = '';
            staffControllerVM.staffDoctorProfessionalDetailsExperienceAddOrganization = '';
            staffControllerVM.staffDoctorProfessionalDetailsExperienceAddCityName = '';
            staffControllerVM.staffDoctorProfessionalDetailsExperienceAddStartYear = '';
            staffControllerVM.staffDoctorProfessionalDetailsExperienceAddEndYear = '';
        }
        
        function addDoctorAffiliations(providerId) {
            var name = staffControllerVM.staffDoctorProfessionalDetailsAffiliationAddAffiliationName;
            var year = parseInt(staffControllerVM.staffDoctorProfessionalDetailsAffiliationAddYear);           

            var affiliationId = '';
            for (var i = 0; i < staffControllerVM.staffDoctorDetailsAffiliationsList.length; i++) {
                if (staffControllerVM.staffDoctorDetailsAffiliationsList[i].name == name) {
                    affiliationId = parseInt(staffControllerVM.staffDoctorDetailsAffiliationsList[i].affiliationId);
                    break;
                }
            }

            $scope.startSpin();
            staffService.addDoctorAffiliations({ affiliationId: affiliationId, year: year, providerId: providerId }).then(function (data) {
                var response = data.results;
                $scope.reset();                
                $scope.stopSpin();
                staffControllerVM.getAddedAffiliations(providerId);
                successAlert(response);
            });
            staffControllerVM.isVisibleEducationAddMoreAffiliation = true;
            staffControllerVM.isVisibleEducationSaveAffiliation = false;

            staffControllerVM.staffDoctorProfessionalDetailsAffiliationAddAffiliationName = '';
            staffControllerVM.staffDoctorProfessionalDetailsAffiliationAddYear = '';            
        }
        
        function addDoctorAwards(providerId) {
            var name = staffControllerVM.staffDoctorProfessionalDetailsAwardsAddAwardName;
            var year = parseInt(staffControllerVM.staffDoctorProfessionalDetailsAwardsAddYear);

            var awardId = '';
            for (var i = 0; i < staffControllerVM.staffDoctorDetailsAwardsList.length; i++) {
                if (staffControllerVM.staffDoctorDetailsAwardsList[i].name == name) {
                    awardId = parseInt(staffControllerVM.staffDoctorDetailsAwardsList[i].awardId);
                    break;
                }
            }

            $scope.startSpin();
            staffService.addDoctorAwards({ awardId: awardId, year: year, providerId: providerId }).then(function (data) {
                var response = data.results;
                $scope.reset();                
                $scope.stopSpin();
                staffControllerVM.getAddedAwards(providerId);
                successAlert(response);
            });
            staffControllerVM.isVisibleEducationAddMoreAwards = true;
            staffControllerVM.isVisibleEducationSaveAwards = false;

            staffControllerVM.staffDoctorProfessionalDetailsAwardsAddAwardName = '';
            staffControllerVM.staffDoctorProfessionalDetailsAwardsAddYear = '';            
        }        

        function setProfileDetails() {
            if (staffControllerVM.editProfileProfileDetailsList.length > 0) {
                staffControllerVM.editProfileProviderId = staffControllerVM.editProfileProfileDetailsList[0].providerId;
                staffControllerVM.editProfileFullName = staffControllerVM.editProfileProfileDetailsList[0].firstName + " " + staffControllerVM.editProfileProfileDetailsList[0].lastName;
                staffControllerVM.editProfileGender = staffControllerVM.editProfileProfileDetailsList[0].gender;
                staffControllerVM.editProfileEmail = staffControllerVM.editProfileProfileDetailsList[0].email;
                staffControllerVM.editProfileDOB = staffControllerVM.editProfileProfileDetailsList[0].dob;
                staffControllerVM.editProfileBloodGroup = staffControllerVM.editProfileProfileDetailsList[0].bloodGroup;
                staffControllerVM.editProfileTimeZone = staffControllerVM.editProfileProfileDetailsList[0].timeZone;
                staffControllerVM.editProfileMobileNumber = staffControllerVM.editProfileProfileDetailsList[0].mobileNumber;
                staffControllerVM.editProfileCountryId = staffControllerVM.editProfileProfileDetailsList[0].countryId;
                staffControllerVM.editProfileStateId = staffControllerVM.editProfileProfileDetailsList[0].stateId;
                staffControllerVM.editProfileCityId = staffControllerVM.editProfileProfileDetailsList[0].cityId;
                staffControllerVM.editProfileLocalityId = staffControllerVM.editProfileProfileDetailsList[0].localityId;
                staffControllerVM.editProfileZipCode = staffControllerVM.editProfileProfileDetailsList[0].zipCode;
            }
        }
        function getRegistrationCouncils() {
            $scope.startSpin();
            return staffService.getRegistrationCouncils().then(function (data) {
                var response = data.results;
                staffControllerVM.staffDoctorDetailsRegistrationCouncilsList = response;                
                $scope.reset();
                $scope.stopSpin();        
                return response;
            });
        }
        function getCountries() {
            $scope.startSpin();
            return staffService.getCountries().then(function (data) {
                var response = data.results;
                staffControllerVM.editProfileCountriesList = response;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }
        function getStates() {
            $scope.startSpin();
            return staffService.getStates().then(function (data) {
                var response = data.results;
                staffControllerVM.editProfileStatesList = response;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }
       
        function getCities() {
            $scope.startSpin();
            return staffService.getCities().then(function (data) {
                var response = data.results;
                staffControllerVM.editProfileCitiesList = response;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }

        function getLocalities() {
            $scope.startSpin();
            return staffService.getLocalities().then(function (data) {
                var response = data.results;
                staffControllerVM.editProfileLocalitiesList = response;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }
        
        function getPracticeDoctors() {
            debugger;
            $scope.startSpin();
            return staffService.getPracticeDoctors().then(function (data) {
                var response = data.results;
                staffControllerVM.staffPracticeDoctorsList = response;
                $scope.stopSpin();
                return response;
            });
        }
        
        function getPracticeStaff() {
            debugger;
            $scope.startSpin();
            return staffService.getPracticeStaff().then(function (data) {
                var response = data.results;
                staffControllerVM.staffPracticeStaffList = response;
                $scope.stopSpin();
                return response;
            });
        }

        function removeProvider(providerId) {
            $scope.startSpin();
            staffService.removeProvider({ providerId: providerId }).then(function (data) {
                var response = data.results;
                $scope.reset();
                $scope.stopSpin();
                staffControllerVM.getPracticeDoctors();
                staffControllerVM.getPracticeStaff();
                successAlert(response);
            });
        }
    }
})();
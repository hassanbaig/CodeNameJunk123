/***
 * Controller/ViewModel: practices 
 *
 * Handles fetch and save of data
 *
 ***/
(function () {
    'use strict';

    var controllerId = 'practicesController';
    angular.module('app').controller(controllerId,
    ['practicesService', 'logger', '$scope', '$location', 'usSpinnerService', '$rootScope', 'alertsManager', practicesController]);

    function practicesController(practicesService, logger, $scope, $location, usSpinnerService, $rootScope, alertsManager) {
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

        $scope.launch = function (which) {
            var dlg = null;
            switch (which) {

                // Confirm Dialog
                case 'confirm':
                    dlg = $dialogs.confirm('Delete Languages', 'Are you sure you want to delete');
                    dlg.result.then(function (btn) {
                        $scope.confirmed = 'Language is deleted';
                    }, function (btn) {
                        $scope.confirmed = '';
                    });
                    break;


            }; // end switch
        }; // end launch

        //
        $scope.confirmed = 'You have yet to be confirmed!';

        // ViewModel
        var practicesControllerVM = this;
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // ViewModel variables    
        // Visibility variables
        practicesControllerVM.isVisiblePracticeDetails = true;
        practicesControllerVM.isVisiblePracticeLocation = false;
        practicesControllerVM.isVisiblePracticeContants = false;
        practicesControllerVM.isVisiblePracticeTimings = false;
        practicesControllerVM.isVisiblePracticeServices = false;
        practicesControllerVM.isVisiblePracticePictures = false;
        practicesControllerVM.isVisiblePracticeVideos = false;
        practicesControllerVM.isVisiblePracticePremises = false;
        practicesControllerVM.isVisiblePracticeLanguages = false;
        practicesControllerVM.isVisiblePracticeAccreditations = false;
        practicesControllerVM.isVisiblePracticeInsurances = false;
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Practice details variables
        practicesControllerVM.practiceDetailsName = '';
        practicesControllerVM.practiceDetailsTagLine = '';
        practicesControllerVM.practiceDetailsDescription = '';
        practicesControllerVM.practiceDetailsBillingCurrency = '';
        practicesControllerVM.practiceDetailsType = '';
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Pratice location variables
        practicesControllerVM.practiceLocationStreetAddress = '';
        practicesControllerVM.practiceLocationLandmark = '';
        practicesControllerVM.practiceLocationLocality = '';
        practicesControllerVM.practiceLocationCity = '';
        practicesControllerVM.practiceLocationState = '';
        practicesControllerVM.practiceLocationZipcode = '';
        practicesControllerVM.practiceLocationCountry = '';
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Practice contacts variables
        practicesControllerVM.isVisibleSecondaryPhone = false;
        practicesControllerVM.isVisibleSecondaryEmailId = false;
        practicesControllerVM.practiceContactsPrimaryPhone = '';
        practicesControllerVM.practiceContactsSecondaryPhone = '';
        practicesControllerVM.practiceContactsPrimaryEmailId = '';
        practicesControllerVM.practiceContactsSecondaryEmailId = '';
        practicesControllerVM.practiceContactsWebsiteAddress = '';
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Practice timings variables
        $scope.hoursArray = ['None', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 am', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm', '12 pm'];
        $scope.minutesArray = ['None', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];

        practicesControllerVM.practiceTimingsLunchBreak = false;
        practicesControllerVM.practiceTimingsMonday = false;
        practicesControllerVM.practiceTimingsTuesday = false;
        practicesControllerVM.practiceTimingsWednesday = false;
        practicesControllerVM.practiceTimingsThursday = false;
        practicesControllerVM.practiceTimingsFriday = false;
        practicesControllerVM.practiceTimingsSaturday = false;
        practicesControllerVM.practiceTimingsSunday = false;

        practicesControllerVM.practiceTimingsClose1Open2Visible = false;

        practicesControllerVM.practiceTimingsMondayOpenHours1 = '';
        practicesControllerVM.practiceTimingsMondayOpenMinutes1 = '';
        practicesControllerVM.practiceTimingsMondayCloseHours1 = '';
        practicesControllerVM.practiceTimingsMondayCloseMinutes1 = '';
        practicesControllerVM.practiceTimingsMondayOpenHours2 = '';
        practicesControllerVM.practiceTimingsMondayOpenMinutes2 = '';
        practicesControllerVM.practiceTimingsMondayCloseHours2 = '';
        practicesControllerVM.practiceTimingsMondayCloseMinutes2 = '';
        practicesControllerVM.practiceTimingsTuesdayOpenHours1 = '';
        practicesControllerVM.practiceTimingsTuesdayOpenMinutes1 = '';
        practicesControllerVM.practiceTimingsTuesdayCloseHours1 = '';
        practicesControllerVM.practiceTimingsTuesdayCloseMinutes1 = '';
        practicesControllerVM.practiceTimingsTuesdayOpenHours2 = '';
        practicesControllerVM.practiceTimingsTuesdayOpenMinutes2 = '';
        practicesControllerVM.practiceTimingsTuesdayCloseHours2 = '';
        practicesControllerVM.practiceTimingsTuesdayCloseMinutes2 = '';
        practicesControllerVM.practiceTimingsWednesdayOpenHours1 = '';
        practicesControllerVM.practiceTimingsWednesdayOpenMinutes1 = '';
        practicesControllerVM.practiceTimingsWednesdayCloseHours1 = '';
        practicesControllerVM.practiceTimingsWednesdayCloseMinutes1 = '';
        practicesControllerVM.practiceTimingsWednesdayOpenHours2 = '';
        practicesControllerVM.practiceTimingsWednesdayOpenMinutes2 = '';
        practicesControllerVM.practiceTimingsWednesdayCloseHours2 = '';
        practicesControllerVM.practiceTimingsWednesdayCloseMinutes2 = '';
        practicesControllerVM.practiceTimingsThursdayOpenHours1 = '';
        practicesControllerVM.practiceTimingsThursdayOpenMinutes1 = '';
        practicesControllerVM.practiceTimingsThursdayCloseHours1 = '';
        practicesControllerVM.practiceTimingsThursdayCloseMinutes1 = '';
        practicesControllerVM.practiceTimingsThursdayOpenHours2 = '';
        practicesControllerVM.practiceTimingsThursdayOpenMinutes2 = '';
        practicesControllerVM.practiceTimingsThursdayCloseHours2 = '';
        practicesControllerVM.practiceTimingsThursdayCloseMinutes2 = '';
        practicesControllerVM.practiceTimingsFridayOpenHours1 = '';
        practicesControllerVM.practiceTimingsFridayOpenMinutes1 = '';
        practicesControllerVM.practiceTimingsFridayCloseHours1 = '';
        practicesControllerVM.practiceTimingsFridayCloseMinutes1 = '';
        practicesControllerVM.practiceTimingsFridayOpenHours2 = '';
        practicesControllerVM.practiceTimingsFridayOpenMinutes2 = '';
        practicesControllerVM.practiceTimingsFridayCloseHours2 = '';
        practicesControllerVM.practiceTimingsFridayCloseMinutes2 = '';
        practicesControllerVM.practiceTimingsSaturdayOpenHours1 = '';
        practicesControllerVM.practiceTimingsSaturdayOpenMinutes1 = '';
        practicesControllerVM.practiceTimingsSaturdayCloseHours1 = '';
        practicesControllerVM.practiceTimingsSaturdayCloseMinutes1 = '';
        practicesControllerVM.practiceTimingsSaturdayOpenHours2 = '';
        practicesControllerVM.practiceTimingsSaturdayOpenMinutes2 = '';
        practicesControllerVM.practiceTimingsSaturdayCloseHours2 = '';
        practicesControllerVM.practiceTimingsSaturdayCloseMinutes2 = '';
        practicesControllerVM.practiceTimingsSundayOpenHours1 = '';
        practicesControllerVM.practiceTimingsSundayOpenMinutes1 = '';
        practicesControllerVM.practiceTimingsSundayCloseHours1 = '';
        practicesControllerVM.practiceTimingsSundayCloseMinutes1 = '';
        practicesControllerVM.practiceTimingsSundayOpenHours2 = '';
        practicesControllerVM.practiceTimingsSundayOpenMinutes2 = '';
        practicesControllerVM.practiceTimingsSundayCloseHours2 = '';
        practicesControllerVM.practiceTimingsSundayCloseMinutes2 = '';
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Practice Services variables
        practicesControllerVM.addedServicesList = [];
        practicesControllerVM.addedServicesListCount = 3;
        practicesControllerVM.servicesList = [];
        practicesControllerVM.servicesListCount = 3;
        practicesControllerVM.practiceServicesServiceName = '';

        practicesControllerVM.addedTravelServicesList = [];
        practicesControllerVM.addedTravelServicesListCount = 3;
        practicesControllerVM.travelServicesList = [];
        practicesControllerVM.travelServicesListCount = 3;
        practicesControllerVM.practiceServicesTravelServiceName = '';
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Practice Premises variables
        practicesControllerVM.addedPremisesList = [];
        practicesControllerVM.addedPremisesListCount = 3;
        practicesControllerVM.premisesList = [];
        practicesControllerVM.premisesListCount = 3;
        practicesControllerVM.practicePremisesPremisName = '';
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Practice Languages variables
        practicesControllerVM.addedLanguagesList = [];
        practicesControllerVM.addedLanguagesListCount = 3;
        practicesControllerVM.languagesList = [];
        practicesControllerVM.languagesListCount = 3;
        practicesControllerVM.practiceLanguagesLanguageName = '';
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Practice Accreditations variables
        practicesControllerVM.addedAccreditationsList = [];
        practicesControllerVM.addedAccreditationsListCount = 3;
        practicesControllerVM.accreditationsList = [];
        practicesControllerVM.accreditationsListCount = 3;
        practicesControllerVM.practiceAccreditationsAccreditationName = '';
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Practice Insurances variables
        practicesControllerVM.addedInsurancesList = [];
        practicesControllerVM.addedInsurancesListCount = 3;
        practicesControllerVM.insurancesList = [];
        practicesControllerVM.insurancesListCount = 3;
        practicesControllerVM.practiceInsurancesInsuranceName = '';
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------


        // ViewModel Methods
        // Visibility methods
        practicesControllerVM.showPracticeDetails = showPracticeDetails;
        practicesControllerVM.showPracticeLocation = showPracticeLocation;
        practicesControllerVM.showPracticeContants = showPracticeContants;
        practicesControllerVM.showPracticeTimings = showPracticeTimings;
        practicesControllerVM.showPracticeServices = showPracticeServices;
        practicesControllerVM.showPracticePictures = showPracticePictures;
        practicesControllerVM.showPracticeVideos = showPracticeVideos;
        practicesControllerVM.showPracticePremises = showPracticePremises;
        practicesControllerVM.showPracticeLanguages = showPracticeLanguages;
        practicesControllerVM.showPracticeAccreditations = showPracticeAccreditations;
        practicesControllerVM.showPracticeInsurances = showPracticeInsurances;

        practicesControllerVM.showPracticeContactsSecondaryPhone = showPracticeContactsSecondaryPhone;
        practicesControllerVM.showPracticeContactsSecondaryEmailId = showPracticeContactsSecondaryEmailId;

        practicesControllerVM.hidePracticeContactsSecondaryPhone = hidePracticeContactsSecondaryPhone;
        practicesControllerVM.hidePracticeContactsSecondaryEmailId = hidePracticeContactsSecondaryEmailId;
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Practice edit details methods
        practicesControllerVM.addPracticeDetails = addPracticeDetails;
        practicesControllerVM.addPracticeLocation = addPracticeLocation;
        practicesControllerVM.addPracticeContacts = addPracticeContacts;
        practicesControllerVM.practiceTimingsCopyToAll = practiceTimingsCopyToAll;
        practicesControllerVM.addPracticeTimings = addPracticeTimings;

        practicesControllerVM.getServices = getServices;
        practicesControllerVM.getAddedServices = getAddedServices;
        practicesControllerVM.loadMoreServices = loadMoreServices;
        practicesControllerVM.addPracticeServices = addPracticeServices;
        practicesControllerVM.addToPracticeServices = addToPracticeServices;
        practicesControllerVM.removePracticeServices = removePracticeServices;

        practicesControllerVM.getTravelServices = getTravelServices;
        practicesControllerVM.getAddedTravelServices = getAddedTravelServices;
        practicesControllerVM.loadMoreTravelServices = loadMoreTravelServices;
        practicesControllerVM.addPracticeTravelServices = addPracticeTravelServices;
        practicesControllerVM.addToPracticeTravelServices = addToPracticeTravelServices;
        practicesControllerVM.removePracticeTravelServices = removePracticeTravelServices;

        practicesControllerVM.getPremises = getPremises;
        practicesControllerVM.getAddedPremises = getAddedPremises;
        practicesControllerVM.loadMorePremises = loadMorePremises;
        practicesControllerVM.addPracticePremises = addPracticePremises;
        practicesControllerVM.addToPracticePremises = addToPracticePremises;
        practicesControllerVM.removePracticePremises = removePracticePremises;

        practicesControllerVM.getLanguages = getLanguages;
        practicesControllerVM.getAddedLanguages = getAddedLanguages;
        practicesControllerVM.loadMoreLanguages = loadMoreLanguages;
        practicesControllerVM.addPracticeLanguages = addPracticeLanguages;
        practicesControllerVM.addToPracticeLanguages = addToPracticeLanguages;
        practicesControllerVM.removePracticeLanguages = removePracticeLanguages;

        practicesControllerVM.getAccreditations = getAccreditations;
        practicesControllerVM.getAddedAccreditations = getAddedAccreditations;
        practicesControllerVM.loadMoreAccreditations = loadMoreAccreditations;
        practicesControllerVM.addPracticeAccreditations = addPracticeAccreditations;
        practicesControllerVM.addToPracticeAccreditations = addToPracticeAccreditations;
        practicesControllerVM.removePracticeAccreditations = removePracticeAccreditations;

        practicesControllerVM.getInsurances = getInsurances;
        practicesControllerVM.getAddedInsurances = getAddedInsurances;
        practicesControllerVM.loadMoreInsurances = loadMoreInsurances;
        practicesControllerVM.addPracticeInsurances = addPracticeInsurances;
        practicesControllerVM.addToPracticeInsurances = addToPracticeInsurances;
        practicesControllerVM.removePracticeInsurances = removePracticeInsurances;

        practicesControllerVM.practiceTimingsClose1Open2Visibility = practiceTimingsClose1Open2Visibility;
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //Implementation
        // Visibility methods implementation


        function showPracticeContactsSecondaryPhone() {
            practicesControllerVM.isVisibleSecondaryPhone = true;
        }

        function showPracticeContactsSecondaryEmailId() {
            practicesControllerVM.isVisibleSecondaryEmailId = true;
        }

        function hidePracticeContactsSecondaryPhone() {
            practicesControllerVM.isVisibleSecondaryPhone = false;
            practicesControllerVM.practiceContactsSecondaryPhone = '';
        }

        function hidePracticeContactsSecondaryEmailId() {
            practicesControllerVM.isVisibleSecondaryEmailId = false;
            practicesControllerVM.practiceContactsSecondaryEmailId = '';
        }

        function showPracticeDetails() {
            clearAllDivs();
            $scope.reset();
            practicesControllerVM.isVisiblePracticeDetails = true;
            document.getElementById("practiceDetailsLI").className = "active";
            document.getElementById("practiceDetailsLI2").className = "active";
        }

        function showPracticeLocation() {
            clearAllDivs();
            $scope.reset();
            practicesControllerVM.isVisiblePracticeLocation = true;
            document.getElementById("practiceLocationLI").className = "active";
            document.getElementById("practiceLocationLI2").className = "active";
            $scope.initializeMap();
        }

        function showPracticeContants() {
            clearAllDivs();
            $scope.reset();
            practicesControllerVM.isVisiblePracticeContants = true;
            document.getElementById("practiceContactsLI").className = "active";
            document.getElementById("practiceContactsLI2").className = "active";
        }

        function showPracticeTimings() {
            clearAllDivs();
            $scope.reset();
            practicesControllerVM.isVisiblePracticeTimings = true;
            document.getElementById("practiceTimingsLI").className = "active";
            document.getElementById("practiceTimingsLI2").className = "active";
        }

        function showPracticeServices() {
            clearAllDivs();
            $scope.reset();
            practicesControllerVM.isVisiblePracticeServices = true;
            document.getElementById("practiceServicesLI").className = "active";
            document.getElementById("practiceServicesLI2").className = "active";
        }

        function showPracticePictures() {
            clearAllDivs();
            $scope.reset();
            practicesControllerVM.isVisiblePracticePictures = true;
            document.getElementById("practicePicturesLI").className = "active";
            document.getElementById("practicePicturesLI2").className = "active";
        }

        function showPracticeVideos() {
            clearAllDivs();
            $scope.reset();
            practicesControllerVM.isVisiblePracticeVideos = true;
            document.getElementById("practiceVideosLI").className = "active";
            document.getElementById("practiceVideosLI2").className = "active";
        }

        function showPracticePremises() {
            clearAllDivs();
            $scope.reset();
            practicesControllerVM.isVisiblePracticePremises = true;
            document.getElementById("practicePremisesLI").className = "active";
            document.getElementById("practicePremisesLI2").className = "active";
        }

        function showPracticeLanguages() {
            clearAllDivs();
            $scope.reset();
            practicesControllerVM.isVisiblePracticeLanguages = true;
            document.getElementById("practiceLanguagesLI").className = "active";
            document.getElementById("practiceLanguagesLI2").className = "active";
        }

        function showPracticeAccreditations() {
            clearAllDivs();
            $scope.reset();
            practicesControllerVM.isVisiblePracticeAccreditations = true;
            document.getElementById("practiceAccreditationsLI").className = "active";
            document.getElementById("practiceAccreditationsLI2").className = "active";
        }

        function showPracticeInsurances() {
            clearAllDivs();
            $scope.reset();
            practicesControllerVM.isVisiblePracticeInsurances = true;
            document.getElementById("practiceInsurancesLI").className = "active";
            document.getElementById("practiceInsurancesLI2").className = "active";
        }

        function clearAllDivs() {
            practicesControllerVM.isVisiblePracticeDetails = false;
            document.getElementById("practiceDetailsLI").className = "";
            document.getElementById("practiceDetailsLI2").className = "";
            practicesControllerVM.isVisiblePracticeLocation = false;
            document.getElementById("practiceLocationLI").className = "";
            document.getElementById("practiceLocationLI2").className = "";
            practicesControllerVM.isVisiblePracticeContants = false;
            document.getElementById("practiceContactsLI").className = "";
            document.getElementById("practiceContactsLI2").className = "";
            practicesControllerVM.isVisiblePracticeTimings = false;
            document.getElementById("practiceTimingsLI").className = "";
            document.getElementById("practiceTimingsLI2").className = "";
            practicesControllerVM.isVisiblePracticeServices = false;
            document.getElementById("practiceServicesLI").className = "";
            document.getElementById("practiceServicesLI2").className = "";
            practicesControllerVM.isVisiblePracticePictures = false;
            document.getElementById("practicePicturesLI").className = "";
            document.getElementById("practicePicturesLI2").className = "";
            practicesControllerVM.isVisiblePracticeVideos = false;
            document.getElementById("practiceVideosLI").className = "";
            document.getElementById("practiceVideosLI2").className = "";
            practicesControllerVM.isVisiblePracticePremises = false;
            document.getElementById("practicePremisesLI").className = "";
            document.getElementById("practicePremisesLI2").className = "";
            practicesControllerVM.isVisiblePracticeLanguages = false;
            document.getElementById("practiceLanguagesLI").className = "";
            document.getElementById("practiceLanguagesLI2").className = "";
            practicesControllerVM.isVisiblePracticeAccreditations = false;
            document.getElementById("practiceAccreditationsLI").className = "";
            document.getElementById("practiceAccreditationsLI2").className = "";
            practicesControllerVM.isVisiblePracticeInsurances = false;
            document.getElementById("practiceInsurancesLI").className = "";
            document.getElementById("practiceInsurancesLI2").className = "";
        }

        function practiceTimingsClose1Open2Visibility() {
            if (practicesControllerVM.practiceTimingsMonday == true || practicesControllerVM.practiceTimingsTuesday == true ||
                practicesControllerVM.practiceTimingsWednesday == true || practicesControllerVM.practiceTimingsThursday == true ||
                practicesControllerVM.practiceTimingsFriday == true || practicesControllerVM.practiceTimingsSaturday == true ||
                practicesControllerVM.practiceTimingsSunday == true)
            { practicesControllerVM.practiceTimingsClose1Open2Visible = true; }
            else {
                practicesControllerVM.practiceTimingsClose1Open2Visible = false;
            }
        }
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Google map methods implementation   
        var txtCity = document.getElementById("practiceLocationCity");
        if (txtCity != null) {
            txtCity.onblur = function () {
                $scope.codeAddress();
            }
        }
        //else {
        //    txtCity.onblur = function () {
        //        $scope.codeAddress();
        //    }
        //}
        $scope.geocoder;
        var gMap;
        $scope.initializeMap = function () {

            $scope.geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(24.8600, 67.0100);
            var mapOptions = {
                zoom: 8,
                center: latlng
            }
            gMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        }

        $scope.codeAddress = function () {

            var locality = document.getElementById("practiceLocationLocality").value;
            var city = document.getElementById("practiceLocationCity").value;
            var country = document.getElementById("practiceLocationCountry").value;

            var address = locality + ', ' + city + ', ' + country;
            $scope.geocoder.geocode({ 'address': address }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var mapOptions = {
                        zoom: 8,
                        center: results[0].geometry.location,
                    }
                    gMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
                    gMap.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        gMap: gMap,
                        position: results[0].geometry.location
                    });
                } else {
                    //alert("Geocode was not successful for the following reason: " + status);
                }
            });
        }
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Practice edit details methods implementation
        function addPracticeDetails() {
            $scope.reset();
            var logo = document.getElementById('exampleInputFile').value;
            var name = practicesControllerVM.practiceDetailsName.trim();
            var tagline = practicesControllerVM.practiceDetailsTagLine.trim();
            var description = practicesControllerVM.practiceDetailsDescription.trim();
            var billingCurrency = practicesControllerVM.practiceDetailsBillingCurrency.trim();
            var type = practicesControllerVM.practiceDetailsType.trim();

            if (name != '') {
                $scope.startSpin();

                practicesService.addPracticeDetails({
                    uploadLogo: logo, name: name, tagLine: tagline, description: description, billingCurrency: billingCurrency,
                    type: type
                }).then(function (data) {
                    var response = data.results;
                    $scope.reset();
                    successAlert(response);
                    $scope.stopSpin();
                });
            }
            else { failureAlert("Practice name is required"); }

            document.getElementById('exampleInputFile').value = '';
            practicesControllerVM.practiceDetailsName = '';
            practicesControllerVM.practiceDetailsTagLine = '';
            practicesControllerVM.practiceDetailsDescription = '';
            practicesControllerVM.practiceDetailsBillingCurrency = '';
            practicesControllerVM.practiceDetailsType = '';
        }

        function addPracticeLocation() {

            var streetAddress = practicesControllerVM.practiceLocationStreetAddress.trim();
            var landmark = practicesControllerVM.practiceLocationLandmark.trim();
            var locality = practicesControllerVM.practiceLocationLocality.trim();
            var city = practicesControllerVM.practiceLocationCity.trim();
            var state = practicesControllerVM.practiceLocationState.trim();
            var zipcode = practicesControllerVM.practiceLocationZipcode.trim();
            var country = practicesControllerVM.practiceLocationCountry.trim();

            $scope.startSpin();

            practicesService.addPracticeLocation({
                streetAddress: streetAddress, landmark: landmark, locality: locality, city: city, state: state,
                zipcode: zipcode, countryId: country
            }).then(function (data) {
                var response = data.results;
                $scope.reset();
                successAlert(response);
                $scope.stopSpin();

            });
            practicesControllerVM.practiceLocationStreetAddress = '';
            practicesControllerVM.practiceLocationLandmark = '';
            practicesControllerVM.practiceLocationLocality = '';
            practicesControllerVM.practiceLocationCity = '';
            practicesControllerVM.practiceLocationState = '';
            practicesControllerVM.practiceLocationZipcode = '';
            practicesControllerVM.practiceLocationCountry = '';
        }

        function addPracticeContacts() {
            $scope.reset();
            var primaryPhone = practicesControllerVM.practiceContactsPrimaryPhone.trim();
            var secondaryPhone = practicesControllerVM.practiceContactsSecondaryPhone.trim();
            var primaryEmailId = practicesControllerVM.practiceContactsPrimaryEmailId.trim();
            var secondaryEmailId = practicesControllerVM.practiceContactsSecondaryEmailId.trim();
            var websiteAddress = practicesControllerVM.practiceContactsWebsiteAddress.trim();

            if (primaryPhone == '')
            { failureAlert("Primary phone is required."); }
            if (primaryEmailId == '')
            { failureAlert("Primary email id is required."); }
            if (practicesControllerVM.isVisibleSecondaryPhone == true && secondaryPhone == '')
            { failureAlert("Secondary phone is required."); }
            if (practicesControllerVM.isVisibleSecondaryEmailId == true && secondaryEmailId == '')
            { failureAlert("Secondary email id is required."); }

            if (primaryPhone != '' && primaryEmailId != '') {

                if (practicesControllerVM.isVisibleSecondaryPhone == false && practicesControllerVM.isVisibleSecondaryEmailId == false) {
                    $scope.startSpin();

                    practicesService.addPracticeContacts({
                        primaryPhone: primaryPhone, primaryEmailId: primaryEmailId, websiteAddress: websiteAddress, secondaryPhone: secondaryPhone,
                        secondaryEmailId: secondaryEmailId
                    }).then(function (data) {
                        var response = data.results;
                        $scope.reset();
                        successAlert(response);

                        $scope.stopSpin();
                    });
                    practicesControllerVM.practiceContactsPrimaryPhone = '';
                    practicesControllerVM.practiceContactsSecondaryPhone = '';
                    practicesControllerVM.practiceContactsPrimaryEmailId = '';
                    practicesControllerVM.practiceContactsSecondaryEmailId = '';
                    practicesControllerVM.practiceContactsWebsiteAddress = '';
                }

                if (practicesControllerVM.isVisibleSecondaryPhone == true && secondaryPhone != '') {
                    if (practicesControllerVM.isVisibleSecondaryEmailId == true) {
                        if (secondaryEmailId == '') {
                            failureAlert("Secondary email id is required.");
                        }
                        else {
                            $scope.startSpin();

                            practicesService.addPracticeContacts({
                                primaryPhone: primaryPhone, primaryEmailId: primaryEmailId, websiteAddress: websiteAddress, secondaryPhone: secondaryPhone,
                                secondaryEmailId: secondaryEmailId
                            }).then(function (data) {
                                var response = data.results;
                                $scope.reset();
                                successAlert(response);
                                $scope.stopSpin();
                            });
                            practicesControllerVM.practiceContactsPrimaryPhone = '';
                            practicesControllerVM.practiceContactsSecondaryPhone = '';
                            practicesControllerVM.practiceContactsPrimaryEmailId = '';
                            practicesControllerVM.practiceContactsSecondaryEmailId = '';
                            practicesControllerVM.practiceContactsWebsiteAddress = '';
                        }
                    }
                    else {
                        $scope.startSpin();
                        practicesService.addPracticeContacts({
                            primaryPhone: primaryPhone, primaryEmailId: primaryEmailId, websiteAddress: websiteAddress, secondaryPhone: secondaryPhone,
                            secondaryEmailId: secondaryEmailId
                        }).then(function (data) {
                            var response = data.results;
                            $scope.reset();
                            successAlert(response);
                            $scope.stopSpin();
                        });
                        practicesControllerVM.practiceContactsPrimaryPhone = '';
                        practicesControllerVM.practiceContactsSecondaryPhone = '';
                        practicesControllerVM.practiceContactsPrimaryEmailId = '';
                        practicesControllerVM.practiceContactsSecondaryEmailId = '';
                        practicesControllerVM.practiceContactsWebsiteAddress = '';
                    }
                }
                else if (practicesControllerVM.isVisibleSecondaryEmailId == true && secondaryEmailId != '') {
                    if (practicesControllerVM.isVisibleSecondaryPhone == true) {
                        if (secondaryPhone == '') {
                            failureAlert("Secondary phone is required.");
                        }
                        else {
                            $scope.startSpin();
                            practicesService.addPracticeContacts({
                                primaryPhone: primaryPhone, primaryEmailId: primaryEmailId, websiteAddress: websiteAddress, secondaryPhone: secondaryPhone,
                                secondaryEmailId: secondaryEmailId
                            }).then(function (data) {
                                var response = data.results;
                                $scope.reset();
                                successAlert(response);
                                $scope.stopSpin();
                            });
                            practicesControllerVM.practiceContactsPrimaryPhone = '';
                            practicesControllerVM.practiceContactsSecondaryPhone = '';
                            practicesControllerVM.practiceContactsPrimaryEmailId = '';
                            practicesControllerVM.practiceContactsSecondaryEmailId = '';
                            practicesControllerVM.practiceContactsWebsiteAddress = '';
                        }
                    }
                    else {
                        $scope.startSpin();
                        practicesService.addPracticeContacts({
                            primaryPhone: primaryPhone, primaryEmailId: primaryEmailId, websiteAddress: websiteAddress, secondaryPhone: secondaryPhone,
                            secondaryEmailId: secondaryEmailId
                        }).then(function (data) {
                            var response = data.results;
                            $scope.reset();
                            successAlert(response);
                            $scope.stopSpin();
                        });
                        practicesControllerVM.practiceContactsPrimaryPhone = '';
                        practicesControllerVM.practiceContactsSecondaryPhone = '';
                        practicesControllerVM.practiceContactsPrimaryEmailId = '';
                        practicesControllerVM.practiceContactsSecondaryEmailId = '';
                        practicesControllerVM.practiceContactsWebsiteAddress = '';
                    }
                }
            }
        }

        function practiceTimingsCopyToAll() {
            practicesControllerVM.practiceTimingsTuesday = practicesControllerVM.practiceTimingsMonday;
            practicesControllerVM.practiceTimingsWednesday = practicesControllerVM.practiceTimingsMonday;
            practicesControllerVM.practiceTimingsThursday = practicesControllerVM.practiceTimingsMonday;
            practicesControllerVM.practiceTimingsFriday = practicesControllerVM.practiceTimingsMonday;
            practicesControllerVM.practiceTimingsSaturday = practicesControllerVM.practiceTimingsMonday;
            practicesControllerVM.practiceTimingsSunday = practicesControllerVM.practiceTimingsMonday;

            practicesControllerVM.practiceTimingsTuesdayOpenHours1 = practicesControllerVM.practiceTimingsMondayOpenHours1;
            practicesControllerVM.practiceTimingsTuesdayOpenMinutes1 = practicesControllerVM.practiceTimingsMondayOpenMinutes1;
            practicesControllerVM.practiceTimingsTuesdayCloseHours1 = practicesControllerVM.practiceTimingsMondayCloseHours1;
            practicesControllerVM.practiceTimingsTuesdayCloseMinutes1 = practicesControllerVM.practiceTimingsMondayCloseMinutes1;
            practicesControllerVM.practiceTimingsTuesdayOpenHours2 = practicesControllerVM.practiceTimingsMondayOpenHours2;
            practicesControllerVM.practiceTimingsTuesdayOpenMinutes2 = practicesControllerVM.practiceTimingsMondayOpenMinutes2;
            practicesControllerVM.practiceTimingsTuesdayCloseHours2 = practicesControllerVM.practiceTimingsMondayCloseHours2;
            practicesControllerVM.practiceTimingsTuesdayCloseMinutes2 = practicesControllerVM.practiceTimingsMondayCloseMinutes2;
            practicesControllerVM.practiceTimingsWednesdayOpenHours1 = practicesControllerVM.practiceTimingsMondayOpenHours1;
            practicesControllerVM.practiceTimingsWednesdayOpenMinutes1 = practicesControllerVM.practiceTimingsMondayOpenMinutes1;
            practicesControllerVM.practiceTimingsWednesdayCloseHours1 = practicesControllerVM.practiceTimingsMondayCloseHours1;
            practicesControllerVM.practiceTimingsWednesdayCloseMinutes1 = practicesControllerVM.practiceTimingsMondayCloseMinutes1;
            practicesControllerVM.practiceTimingsWednesdayOpenHours2 = practicesControllerVM.practiceTimingsMondayOpenHours2;
            practicesControllerVM.practiceTimingsWednesdayOpenMinutes2 = practicesControllerVM.practiceTimingsMondayOpenMinutes2;
            practicesControllerVM.practiceTimingsWednesdayCloseHours2 = practicesControllerVM.practiceTimingsMondayCloseHours2;
            practicesControllerVM.practiceTimingsWednesdayCloseMinutes2 = practicesControllerVM.practiceTimingsMondayCloseMinutes2;
            practicesControllerVM.practiceTimingsThursdayOpenHours1 = practicesControllerVM.practiceTimingsMondayOpenHours1;
            practicesControllerVM.practiceTimingsThursdayOpenMinutes1 = practicesControllerVM.practiceTimingsMondayOpenMinutes1;
            practicesControllerVM.practiceTimingsThursdayCloseHours1 = practicesControllerVM.practiceTimingsMondayCloseHours1;
            practicesControllerVM.practiceTimingsThursdayCloseMinutes1 = practicesControllerVM.practiceTimingsMondayCloseMinutes1;
            practicesControllerVM.practiceTimingsThursdayOpenHours2 = practicesControllerVM.practiceTimingsMondayOpenHours2;
            practicesControllerVM.practiceTimingsThursdayOpenMinutes2 = practicesControllerVM.practiceTimingsMondayOpenMinutes2;
            practicesControllerVM.practiceTimingsThursdayCloseHours2 = practicesControllerVM.practiceTimingsMondayCloseHours2;
            practicesControllerVM.practiceTimingsThursdayCloseMinutes2 = practicesControllerVM.practiceTimingsMondayCloseMinutes2;
            practicesControllerVM.practiceTimingsFridayOpenHours1 = practicesControllerVM.practiceTimingsMondayOpenHours1;
            practicesControllerVM.practiceTimingsFridayOpenMinutes1 = practicesControllerVM.practiceTimingsMondayOpenMinutes1;
            practicesControllerVM.practiceTimingsFridayCloseHours1 = practicesControllerVM.practiceTimingsMondayCloseHours1;
            practicesControllerVM.practiceTimingsFridayCloseMinutes1 = practicesControllerVM.practiceTimingsMondayCloseMinutes1;
            practicesControllerVM.practiceTimingsFridayOpenHours2 = practicesControllerVM.practiceTimingsMondayOpenHours2;
            practicesControllerVM.practiceTimingsFridayOpenMinutes2 = practicesControllerVM.practiceTimingsMondayOpenMinutes2;
            practicesControllerVM.practiceTimingsFridayCloseHours2 = practicesControllerVM.practiceTimingsMondayCloseHours2;
            practicesControllerVM.practiceTimingsFridayCloseMinutes2 = practicesControllerVM.practiceTimingsMondayCloseMinutes2;
            practicesControllerVM.practiceTimingsSaturdayOpenHours1 = practicesControllerVM.practiceTimingsMondayOpenHours1;
            practicesControllerVM.practiceTimingsSaturdayOpenMinutes1 = practicesControllerVM.practiceTimingsMondayOpenMinutes1;
            practicesControllerVM.practiceTimingsSaturdayCloseHours1 = practicesControllerVM.practiceTimingsMondayCloseHours1;
            practicesControllerVM.practiceTimingsSaturdayCloseMinutes1 = practicesControllerVM.practiceTimingsMondayCloseMinutes1;
            practicesControllerVM.practiceTimingsSaturdayOpenHours2 = practicesControllerVM.practiceTimingsMondayOpenHours2;
            practicesControllerVM.practiceTimingsSaturdayOpenMinutes2 = practicesControllerVM.practiceTimingsMondayOpenMinutes2;
            practicesControllerVM.practiceTimingsSaturdayCloseHours2 = practicesControllerVM.practiceTimingsMondayCloseHours2;
            practicesControllerVM.practiceTimingsSaturdayCloseMinutes2 = practicesControllerVM.practiceTimingsMondayCloseMinutes2;
            practicesControllerVM.practiceTimingsSundayOpenHours1 = practicesControllerVM.practiceTimingsMondayOpenHours1;
            practicesControllerVM.practiceTimingsSundayOpenMinutes1 = practicesControllerVM.practiceTimingsMondayOpenMinutes1;
            practicesControllerVM.practiceTimingsSundayCloseHours1 = practicesControllerVM.practiceTimingsMondayCloseHours1;
            practicesControllerVM.practiceTimingsSundayCloseMinutes1 = practicesControllerVM.practiceTimingsMondayCloseMinutes1;
            practicesControllerVM.practiceTimingsSundayOpenHours2 = practicesControllerVM.practiceTimingsMondayOpenHours2;
            practicesControllerVM.practiceTimingsSundayOpenMinutes2 = practicesControllerVM.practiceTimingsMondayOpenMinutes2;
            practicesControllerVM.practiceTimingsSundayCloseHours2 = practicesControllerVM.practiceTimingsMondayCloseHours2;
            practicesControllerVM.practiceTimingsSundayCloseMinutes2 = practicesControllerVM.practiceTimingsMondayCloseMinutes2;
        }

        function addPracticeTimings() {

            var mondy = practicesControllerVM.practiceTimingsMonday;
            var monOpenHr1 = practicesControllerVM.practiceTimingsMondayOpenHours1.trim();
            var monOpenMnt1 = practicesControllerVM.practiceTimingsMondayOpenMinutes1.trim();
            var monCloseHr1 = practicesControllerVM.practiceTimingsMondayCloseHours1.trim();
            var monCloseMnt1 = practicesControllerVM.practiceTimingsMondayCloseMinutes1.trim();
            var monOpenHr2 = practicesControllerVM.practiceTimingsMondayOpenHours2.trim();
            var monOpenMnt2 = practicesControllerVM.practiceTimingsMondayOpenMinutes2.trim();
            var monCloseHr2 = practicesControllerVM.practiceTimingsMondayCloseHours2.trim();
            var monCloseMnt2 = practicesControllerVM.practiceTimingsMondayCloseMinutes2.trim();

            var tuesday = practicesControllerVM.practiceTimingsTuesday;
            var tueOpenHr1 = practicesControllerVM.practiceTimingsTuesdayOpenHours1.trim();
            var tueOpenMnt1 = practicesControllerVM.practiceTimingsTuesdayOpenMinutes1.trim();
            var tueCloseHr1 = practicesControllerVM.practiceTimingsTuesdayCloseHours1.trim();
            var tueCloseMnt1 = practicesControllerVM.practiceTimingsTuesdayCloseMinutes1.trim();
            var tueOpenHr2 = practicesControllerVM.practiceTimingsTuesdayOpenHours2.trim();
            var tueOpenMnt2 = practicesControllerVM.practiceTimingsTuesdayOpenMinutes2.trim();
            var tueCloseHr2 = practicesControllerVM.practiceTimingsTuesdayCloseHours2.trim();
            var tueCloseMnt2 = practicesControllerVM.practiceTimingsTuesdayCloseMinutes2.trim();

            var wednesday = practicesControllerVM.practiceTimingsWednesday;
            var wedOpenHr1 = practicesControllerVM.practiceTimingsWednesdayOpenHours1.trim();
            var wedOpenMnt1 = practicesControllerVM.practiceTimingsWednesdayOpenMinutes1.trim();
            var wedCloseHr1 = practicesControllerVM.practiceTimingsWednesdayCloseHours1.trim();
            var wedCloseMnt1 = practicesControllerVM.practiceTimingsWednesdayCloseMinutes1.trim();
            var wedOpenHr2 = practicesControllerVM.practiceTimingsWednesdayOpenHours2.trim();
            var wedOpenMnt2 = practicesControllerVM.practiceTimingsWednesdayOpenMinutes2.trim();
            var wedCloseHr2 = practicesControllerVM.practiceTimingsWednesdayCloseHours2.trim();
            var wedCloseMnt2 = practicesControllerVM.practiceTimingsWednesdayCloseMinutes2.trim();

            var thursday = practicesControllerVM.practiceTimingsThursday;
            var thuOpenHr1 = practicesControllerVM.practiceTimingsThursdayOpenHours1.trim();
            var thuOpenMnt1 = practicesControllerVM.practiceTimingsThursdayOpenMinutes1.trim();
            var thuCloseHr1 = practicesControllerVM.practiceTimingsThursdayCloseHours1.trim();
            var thuCloseMnt1 = practicesControllerVM.practiceTimingsThursdayCloseMinutes1.trim();
            var thuOpenHr2 = practicesControllerVM.practiceTimingsThursdayOpenHours2.trim();
            var thuOpenMnt2 = practicesControllerVM.practiceTimingsThursdayOpenMinutes2.trim();
            var thuCloseHr2 = practicesControllerVM.practiceTimingsThursdayCloseHours2.trim();
            var thuCloseMnt2 = practicesControllerVM.practiceTimingsThursdayCloseMinutes2.trim();

            var friday = practicesControllerVM.practiceTimingsFriday;
            var friOpenHr1 = practicesControllerVM.practiceTimingsFridayOpenHours1.trim();
            var friOpenMnt1 = practicesControllerVM.practiceTimingsFridayOpenMinutes1.trim();
            var friCloseHr1 = practicesControllerVM.practiceTimingsFridayCloseHours1.trim();
            var friCloseMnt1 = practicesControllerVM.practiceTimingsFridayCloseMinutes1.trim();
            var friOpenHr2 = practicesControllerVM.practiceTimingsFridayOpenHours2.trim();
            var friOpenMnt2 = practicesControllerVM.practiceTimingsFridayOpenMinutes2.trim();
            var friCloseHr2 = practicesControllerVM.practiceTimingsFridayCloseHours2.trim();
            var friCloseMnt2 = practicesControllerVM.practiceTimingsFridayCloseMinutes2.trim();

            var saturday = practicesControllerVM.practiceTimingsSaturday;
            var satOpenHr1 = practicesControllerVM.practiceTimingsSaturdayOpenHours1.trim();
            var satOpenMnt1 = practicesControllerVM.practiceTimingsSaturdayOpenMinutes1.trim();
            var satCloseHr1 = practicesControllerVM.practiceTimingsSaturdayCloseHours1.trim();
            var satCloseMnt1 = practicesControllerVM.practiceTimingsSaturdayCloseMinutes1.trim();
            var satOpenHr2 = practicesControllerVM.practiceTimingsSaturdayOpenHours2.trim();
            var satOpenMnt2 = practicesControllerVM.practiceTimingsSaturdayOpenMinutes2.trim();
            var satCloseHr2 = practicesControllerVM.practiceTimingsSaturdayCloseHours2.trim();
            var satCloseMnt2 = practicesControllerVM.practiceTimingsSaturdayCloseMinutes2.trim();

            var sunday = practicesControllerVM.practiceTimingsSunday;
            var sunOpenHr1 = practicesControllerVM.practiceTimingsSundayOpenHours1.trim();
            var sunOpenMnt1 = practicesControllerVM.practiceTimingsSundayOpenMinutes1.trim();
            var sunCloseHr1 = practicesControllerVM.practiceTimingsSundayCloseHours1.trim();
            var sunCloseMnt1 = practicesControllerVM.practiceTimingsSundayCloseMinutes1.trim();
            var sunOpenHr2 = practicesControllerVM.practiceTimingsSundayOpenHours2.trim();
            var sunOpenMnt2 = practicesControllerVM.practiceTimingsSundayOpenMinutes2.trim();
            var sunCloseHr2 = practicesControllerVM.practiceTimingsSundayCloseHours2.trim();
            var sunCloseMnt2 = practicesControllerVM.practiceTimingsSundayCloseMinutes2.trim();
            $scope.startSpin();

            practicesService.addPracticeTimings({
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
                successAlert(response);
                $scope.stopSpin();
            });

            practicesControllerVM.practiceTimingsMondayOpenHours1 = '';
            practicesControllerVM.practiceTimingsMondayOpenMinutes1 = '';
            practicesControllerVM.practiceTimingsMondayCloseHours1 = '';
            practicesControllerVM.practiceTimingsMondayCloseMinutes1 = '';
            practicesControllerVM.practiceTimingsMondayOpenHours2 = '';
            practicesControllerVM.practiceTimingsMondayOpenMinutes2 = '';
            practicesControllerVM.practiceTimingsMondayCloseHours2 = '';
            practicesControllerVM.practiceTimingsMondayCloseMinutes2 = '';
            practicesControllerVM.practiceTimingsTuesdayOpenHours1 = '';
            practicesControllerVM.practiceTimingsTuesdayOpenMinutes1 = '';
            practicesControllerVM.practiceTimingsTuesdayCloseHours1 = '';
            practicesControllerVM.practiceTimingsTuesdayCloseMinutes1 = '';
            practicesControllerVM.practiceTimingsTuesdayOpenHours2 = '';
            practicesControllerVM.practiceTimingsTuesdayOpenMinutes2 = '';
            practicesControllerVM.practiceTimingsTuesdayCloseHours2 = '';
            practicesControllerVM.practiceTimingsTuesdayCloseMinutes2 = '';
            practicesControllerVM.practiceTimingsWednesdayOpenHours1 = '';
            practicesControllerVM.practiceTimingsWednesdayOpenMinutes1 = '';
            practicesControllerVM.practiceTimingsWednesdayCloseHours1 = '';
            practicesControllerVM.practiceTimingsWednesdayCloseMinutes1 = '';
            practicesControllerVM.practiceTimingsWednesdayOpenHours2 = '';
            practicesControllerVM.practiceTimingsWednesdayOpenMinutes2 = '';
            practicesControllerVM.practiceTimingsWednesdayCloseHours2 = '';
            practicesControllerVM.practiceTimingsWednesdayCloseMinutes2 = '';
            practicesControllerVM.practiceTimingsThursdayOpenHours1 = '';
            practicesControllerVM.practiceTimingsThursdayOpenMinutes1 = '';
            practicesControllerVM.practiceTimingsThursdayCloseHours1 = '';
            practicesControllerVM.practiceTimingsThursdayCloseMinutes1 = '';
            practicesControllerVM.practiceTimingsThursdayOpenHours2 = '';
            practicesControllerVM.practiceTimingsThursdayOpenMinutes2 = '';
            practicesControllerVM.practiceTimingsThursdayCloseHours2 = '';
            practicesControllerVM.practiceTimingsThursdayCloseMinutes2 = '';
            practicesControllerVM.practiceTimingsFridayOpenHours1 = '';
            practicesControllerVM.practiceTimingsFridayOpenMinutes1 = '';
            practicesControllerVM.practiceTimingsFridayCloseHours1 = '';
            practicesControllerVM.practiceTimingsFridayCloseMinutes1 = '';
            practicesControllerVM.practiceTimingsFridayOpenHours2 = '';
            practicesControllerVM.practiceTimingsFridayOpenMinutes2 = '';
            practicesControllerVM.practiceTimingsFridayCloseHours2 = '';
            practicesControllerVM.practiceTimingsFridayCloseMinutes2 = '';
            practicesControllerVM.practiceTimingsSaturdayOpenHours1 = '';
            practicesControllerVM.practiceTimingsSaturdayOpenMinutes1 = '';
            practicesControllerVM.practiceTimingsSaturdayCloseHours1 = '';
            practicesControllerVM.practiceTimingsSaturdayCloseMinutes1 = '';
            practicesControllerVM.practiceTimingsSaturdayOpenHours2 = '';
            practicesControllerVM.practiceTimingsSaturdayOpenMinutes2 = '';
            practicesControllerVM.practiceTimingsSaturdayCloseHours2 = '';
            practicesControllerVM.practiceTimingsSaturdayCloseMinutes2 = '';
            practicesControllerVM.practiceTimingsSundayOpenHours1 = '';
            practicesControllerVM.practiceTimingsSundayOpenMinutes1 = '';
            practicesControllerVM.practiceTimingsSundayCloseHours1 = '';
            practicesControllerVM.practiceTimingsSundayCloseMinutes1 = '';
            practicesControllerVM.practiceTimingsSundayOpenHours2 = '';
            practicesControllerVM.practiceTimingsSundayOpenMinutes2 = '';
            practicesControllerVM.practiceTimingsSundayCloseHours2 = '';
            practicesControllerVM.practiceTimingsSundayCloseMinutes2 = '';
        }
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        function getServices() {
            var service = practicesControllerVM.practiceServicesServiceName.trim();
            $scope.startSpin();
            return practicesService.getServices().then(function (data) {
                var response = data.results;
                practicesControllerVM.servicesList = response;
                $scope.reset();
                $scope.stopSpin();
                return practicesControllerVM.servicesList;
            });

            practicesControllerVM.practiceServicesServiceName = '';
        }

        function getAddedServices() {
            $scope.startSpin();
            return practicesService.getAddedServices().then(function (data) {
                var response = data.results;
                practicesControllerVM.addedServicesList = response;
                $scope.reset();
                $scope.stopSpin();
                return practicesControllerVM.addedServicesList;
            });
        }

        function loadMoreServices() {
            if (practicesControllerVM.addedServicesListCount < practicesControllerVM.addedServicesList.length)
            { practicesControllerVM.addedServicesListCount += 5; }
        }

        function addPracticeServices() {
            var service = practicesControllerVM.practiceServicesServiceName.trim();
            $scope.startSpin();
            practicesService.addPracticeServices({ title : service }).then(function (data) {
                var response = data.results;
                $scope.reset();
                successAlert(response);
                $scope.stopSpin();
                practicesControllerVM.getServices();
            });

            practicesControllerVM.practiceServicesServiceName = '';
        }

        function addToPracticeServices() {            
            var service = practicesControllerVM.practiceServicesServiceName;            
            $scope.startSpin();
            var serviceId = '';
            for (var i = 0 ; i < practicesControllerVM.servicesList.length; i++) {
                if (practicesControllerVM.servicesList[i].title == service) {
                    serviceId = parseInt(practicesControllerVM.servicesList[i].serviceId);
                    break;
                }
            }
            practicesService.addToPracticeServices({ serviceId: serviceId }).then(function (data) {
                var response = data.results;
                successAlert(response);
                $scope.reset();
                $scope.stopSpin();
                practicesControllerVM.getAddedServices();

                return practicesControllerVM.addedServicesList;
            });
            practicesControllerVM.practiceServicesServiceName = '';
        }

        function removePracticeServices(serviceId) {
            $scope.startSpin();
            practicesService.removePracticeServices({ serviceId: serviceId }).then(function (data) {
                var response = data.results;
                $scope.reset();
                successAlert(response);
                $scope.stopSpin();
                practicesControllerVM.getAddedServices();
            });
        }

        //Travel Service
        function getTravelServices() {
            var service = practicesControllerVM.practiceServicesTravelServiceName.trim();
            $scope.startSpin();
            return practicesService.getTravelServices().then(function (data) {
                var response = data.results;
                practicesControllerVM.travelServicesList = response;
                $scope.reset();
                $scope.stopSpin();
                return practicesControllerVM.travelServicesList;
            });

            practicesControllerVM.practiceServicesTravelServiceName = '';

        }

        function getAddedTravelServices() {
            $scope.startSpin();
            return practicesService.getAddedTravelServices().then(function (data) {
                var response = data.results;
                practicesControllerVM.addedTravelServicesList = response;
                $scope.reset();
                $scope.stopSpin();
                return practicesControllerVM.addedTravelServicesList;
            });
        }

        function loadMoreTravelServices() {
            if (practicesControllerVM.addedTravelServicesListCount < practicesControllerVM.addedTravelServicesList.length)
            { practicesControllerVM.addedTravelServicesListCount += 5; }
        }

        function addPracticeTravelServices() {
            var travelService = practicesControllerVM.practiceServicesTravelServiceName.trim();
            $scope.startSpin();
            practicesService.addPracticeTravelServices({ title: travelService }).then(function (data) {
                var response = data.results;
                $scope.reset();
                successAlert(response);
                $scope.stopSpin();
                practicesControllerVM.getTravelServices();
            });

            practicesControllerVM.practiceServicesTravelServiceName = '';
        }

        function addToPracticeTravelServices() {
            debugger;
            var travelservices = practicesControllerVM.practiceServicesTravelServiceName;
            debugger;
            $scope.startSpin();
            var travelserviceId = '';
            for (var i = 0 ; i < practicesControllerVM.travelServicesList.length; i++) {
                if (practicesControllerVM.travelServicesList[i].name == travelservices) {
                    travelserviceId = parseInt(practicesControllerVM.travelServicesList[i].travelserviceId);
                    break;
                }
            }
            practicesService.addToPracticeTravelServices({ travelserviceId: travelserviceId }).then(function (data) {
                var response = data.results;
                successAlert(response);
                $scope.reset();
                $scope.stopSpin();
                practicesControllerVM.getAddedTravelServices();
                return practicesControllerVM.addedTravelServicesList;
            });
            practicesControllerVM.practiceServicesTravelServiceName = '';
        }

        function removePracticeTravelServices(travelService) {
            $scope.startSpin();
            practicesService.removePracticeTravelServices({ name: travelService }).then(function (data) {
                var response = data.results;
                $scope.reset();
                successAlert(response);
                $scope.stopSpin();
            });
        }

        // Premises
        function getPremises() {
            debugger;
            $scope.startSpin();
            return practicesService.getPremises().then(function (data) {
                var response = data.results;
                practicesControllerVM.premisesList = response;
                $scope.stopSpin();
                return practicesControllerVM.premisesList;
            });

            practicesControllerVM.practicePremisesPremisName = '';
        }

        function getAddedPremises() {
            $scope.startSpin();
            return practicesService.getAddedPremises().then(function (data) {
                var response = data.results;
                practicesControllerVM.addedPremisesList = response;
                $scope.stopSpin();
                return practicesControllerVM.addedPremisesList;
            });
        }

        function loadMorePremises() {
            if (practicesControllerVM.addedPremisesListCount < practicesControllerVM.addedPremisesList.length)
            { practicesControllerVM.addedPremisesListCount += 5; }
        }

        function addPracticePremises() {
            debugger;
            var persentlength = parseInt(practicesControllerVM.premisesList.length);

            var premises = practicesControllerVM.practicePremisesPremisName.trim();
            $scope.startSpin();
            practicesService.addPracticePremises({ name: premises }).then(function (data) {
                var response = data.results;
                var newlength1 = parseInt(data.results.length);
                practicesControllerVM.premisesList = response;
                $scope.reset();
                $scope.stopSpin();
                if (newlength1 > persentlength) {
                    successAlert("Practice Premise added successfully");

                }
            });

            practicesControllerVM.practicePremisesPremisName = '';
        }

        function addToPracticePremises() {
            debugger;
            var premises = practicesControllerVM.practicePremisesPremisName;
            debugger;
            $scope.startSpin();
            var premisesId = '';
            for (var i = 0 ; i < practicesControllerVM.premisesList.length; i++) {
                if (practicesControllerVM.premisesList[i].name == premises) {
                    premisesId = parseInt(practicesControllerVM.premisesList[i].premisesId);
                    break;
                }
            }
            practicesService.addToPracticePremises({ premisesId: premisesId }).then(function (data) {
                var response = data.results;
                successAlert(response);
                $scope.reset();
                $scope.stopSpin();
                practicesControllerVM.getAddedPremises();
                return practicesControllerVM.addedPremisesList;
            });
            practicesControllerVM.practicePremisesPremisName = '';
        }


        function removePracticePremises(premisesId) {
            debugger;
            $scope.startSpin();
            practicesService.removePracticePremises({ premisesId: premisesId }).then(function (data) {
                var response = data.results;
                $scope.reset();
                $scope.stopSpin();
                practicesControllerVM.getAddedPremises();

            });
        }

        //Languages
        function getLanguages() {
            debugger;
            $scope.startSpin();
            return practicesService.getLanguages().then(function (data) {
                var response = data.results;
                practicesControllerVM.languagesList = response;
                $scope.stopSpin();
                return practicesControllerVM.languagesList;
            });
            practicesControllerVM.practiceLanguagesLanguageName = '';
        }

        function getAddedLanguages() {
            $scope.startSpin();
            return practicesService.getAddedLanguages().then(function (data) {
                var response = data.results;
                practicesControllerVM.addedLanguagesList = response;
                //    $scope.reset();
                $scope.stopSpin();
                return practicesControllerVM.addedLanguagesList;
            });
        }

        function loadMoreLanguages() {
            if (practicesControllerVM.addedLanguagesListCount < practicesControllerVM.addedLanguagesList.length)
            { practicesControllerVM.addedLanguagesListCount += 5; }
        }

        function addPracticeLanguages() {
            debugger;
            var prelength = parseInt(practicesControllerVM.languagesList.length);
            var language = practicesControllerVM.practiceLanguagesLanguageName.trim();
            $scope.startSpin();
            practicesService.addPracticeLanguages({ name: language }).then(function (data) {
                var response = data.results;
                var newLength = parseInt(data.results.length);
                practicesControllerVM.languagesList = response;
                $scope.reset();
                $scope.stopSpin();
                if (newLength > prelength) {
                    successAlert("Practice Langauge added successfully")
                }
            });

            practicesControllerVM.practiceLanguagesLanguageName = '';
        }

        function addToPracticeLanguages() {
            debugger;
            var language = practicesControllerVM.practiceLanguagesLanguageName;
            debugger;
            $scope.startSpin();
            var languageId = '';
            for (var i = 0 ; i < practicesControllerVM.languagesList.length; i++) {
                if (practicesControllerVM.languagesList[i].name == language) {
                    languageId = parseInt(practicesControllerVM.languagesList[i].languageId);
                    break;
                }
            }
            practicesService.addToPracticeLanguages({ languageId: languageId }).then(function (data) {
                var response = data.results;
                successAlert(response);
                $scope.reset();
                $scope.stopSpin();
                practicesControllerVM.getAddedLanguages();
                //practicesService.getAddedLanguages();
                return practicesControllerVM.addedLanguagesList;
            });
            practicesControllerVM.practiceLanguagesLanguageName = '';
        }

        function removePracticeLanguages(languageId) {
            debugger;
            $scope.startSpin();
            practicesService.removePracticeLanguages({ languageId: languageId }).then(function (data) {
                var response = data.results;
                $scope.reset();
                $scope.stopSpin();
                practicesControllerVM.getAddedLanguages();
                successAlert(response);
            });
        }

        //Accreditation
        function getAccreditations() {
            debugger;
            var accreditation = practicesControllerVM.practiceAccreditationsAccreditationName.trim();
            $scope.startSpin();
            return practicesService.getAccreditations().then(function (data) {
                var response = data.results;
                practicesControllerVM.accreditationsList = response;
                $scope.reset();
                $scope.stopSpin();
                return practicesControllerVM.accreditationsList;

            });
            practicesControllerVM.practiceAccreditationsAccreditationName = '';
        }

        function getAddedAccreditations() {
            $scope.startSpin();
            return practicesService.getAddedAccreditations().then(function (data) {
                var response = data.results;
                practicesControllerVM.addedAccreditationsList = response;
                $scope.reset();
                $scope.stopSpin();
                return practicesControllerVM.addedAccreditationsList;
            });
        }

        function loadMoreAccreditations() {
            if (practicesControllerVM.addedAccreditationsListCount < practicesControllerVM.addedAccreditationsList.length)
            { practicesControllerVM.addedAccreditationsListCount += 5; }
        }

        function addPracticeAccreditations() {
            var accreditation = practicesControllerVM.practiceAccreditationsAccreditationName.trim();
            $scope.startSpin();
            practicesService.addPracticeAccreditations({ title: accreditation }).then(function (data) {
                var response = data.results;
                $scope.reset();
                successAlert(response);
                $scope.stopSpin();
                practicesControllerVM.getAccreditations();
            });

            practicesControllerVM.practiceAccreditationsAccreditationName = '';
        }

        function addToPracticeAccreditations() {
            debugger;
            var accreditation = practicesControllerVM.practiceAccreditationsAccreditationName;
            debugger;
            $scope.startSpin();
            var accreditationId = '';
            for (var i = 0 ; i < practicesControllerVM.accreditationsList.length; i++) {
                if (practicesControllerVM.accreditationsList[i].title == accreditation) {
                    accreditationId = parseInt(practicesControllerVM.accreditationsList[i].accreditationId);
                    break;
                }
            }
            practicesService.addToPracticeAccreditations({ accreditationId: accreditationId }).then(function (data) {
                var response = data.results;
                successAlert(response);
                $scope.reset();
                $scope.stopSpin();
                practicesControllerVM.getAddedAccreditations();

                return practicesControllerVM.addedAccreditationsList;
            });
            practicesControllerVM.practiceAccreditationsAccreditationName = '';
        }

        function removePracticeAccreditations(accreditationId) {
            $scope.startSpin();
            practicesService.removePracticeAccreditations({ accreditationId : accreditationId }).then(function (data) {
                var response = data.results;
                $scope.reset();
                successAlert(response);
                $scope.stopSpin();
                practicesControllerVM.getAddedAccreditations();
            });
        }

        //Insurance
        function getInsurances() {
            var insurance = practicesControllerVM.practiceInsurancesInsuranceName.trim();
            $scope.startSpin();
            return practicesService.getInsurances().then(function (data) {
                var response = data.results;
                practicesControllerVM.insurancesList = response;
                $scope.reset();
                $scope.stopSpin();
                
                return practicesControllerVM.insurancesList;
            })
            practicesControllerVM.practiceInsurancesInsuranceName = '';
        }

        function getAddedInsurances() {
            $scope.startSpin();
            return practicesService.getAddedInsurances().then(function (data) {
                var response = data.results;
                practicesControllerVM.addedInsurancesList = response;
                $scope.reset();
                $scope.stopSpin();
                return practicesControllerVM.addedInsurancesList;
            });
        }

        function loadMoreInsurances() {
            if (practicesControllerVM.addedInsurancesListCount < practicesControllerVM.addedInsurancesList.length)
            { practicesControllerVM.addedInsurancesListCount += 5; }
        }

        function addPracticeInsurances() {
            var insurance = practicesControllerVM.practiceInsurancesInsuranceName.trim();
            $scope.startSpin();
            practicesService.addPracticeInsurances({ title : insurance }).then(function (data) {
                var response = data.results;
                $scope.reset();
                successAlert(response);
                $scope.stopSpin();
                practicesControllerVM.getInsurances();
            });
            practicesControllerVM.practiceInsurancesInsuranceName = '';
        }

        function addToPracticeInsurances() {
            debugger;
            var insurance = practicesControllerVM.practiceInsurancesInsuranceName;
            debugger;
            $scope.startSpin();
            var insuranceId = '';
            for (var i = 0 ; i < practicesControllerVM.insurancesList.length; i++) {
                if (practicesControllerVM.insurancesList[i].title == insurance) {
                    insuranceId = parseInt(practicesControllerVM.insurancesList[i].insuranceId);
                    break;
                }
            }
            practicesService.addToPracticeInsurances({ insuranceId: insuranceId }).then(function (data) {
                var response = data.results;
                successAlert(response);
                $scope.reset();
                $scope.stopSpin();
                practicesControllerVM.getAddedInsurances();

                return practicesControllerVM.addedInsurancesList;
            });
            practicesControllerVM.practiceInsurancesInsuranceName = '';
        }

        function removePracticeInsurances(insuranceId) {
            $scope.startSpin();
            practicesService.removePracticeInsurances({ insuranceId: insuranceId }).then(function (data) {
                var response = data.results;
                $scope.reset();
                successAlert(response);
                $scope.stopSpin();
                practicesControllerVM.getAddedInsurances();
            });
        }
    }
})();
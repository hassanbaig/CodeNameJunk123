/***
 * Controller/ViewModel: practices 
 *
 * Handles fetch and save of data
 *
 ***/
(function () {
    'use strict';

    var controllerId = 'searchController';
    angular.module('app').controller(controllerId,
    ['searchService', 'logger', '$scope', '$location', 'usSpinnerService', '$rootScope', 'alertsManager', searchController]);

    function searchController(searchService, logger, $scope, $location, usSpinnerService, $rootScope, alertsManager) {
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
        var searchControllerVM = this;
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // ViewModel variables  

        searchControllerVM.isVisibleResultsFound = false;
        searchControllerVM.isVisibleProviders = true;
        searchControllerVM.isVisiblePractices = false;
        searchControllerVM.doctorsSearchSpecialty = '';
        searchControllerVM.doctorsSearchLocality = '';
        searchControllerVM.doctorsSearchDoctor = '';
        searchControllerVM.doctorsSearchHospital = '';
        searchControllerVM.doctorsSearchLab = '';
        searchControllerVM.doctorsSearchPharmacist = '';
        searchControllerVM.doctorsSearchNurse = '';
        searchControllerVM.doctorsSearchTreatment = '';

        searchControllerVM.feeMin = 0;
        searchControllerVM.feeMax = 2000;
        searchControllerVM.userFeeMin = 0;
        searchControllerVM.userFeeMax = 2000;
        searchControllerVM.feeCurrency = 'PKR ';

        $scope.timeFormat = '';

        searchControllerVM.timeMin = 0;
        searchControllerVM.timeMax = 1410;
        searchControllerVM.userTimeMin = 0;
        searchControllerVM.userTimeMax = 1410;

        searchControllerVM.searchFee = searchControllerVM.userMax - searchControllerVM.userMin;

        $scope.providersList = [];
        searchControllerVM.providersListCount = 0;

        $scope.practicesList = [];
        searchControllerVM.practicesListCount = 0;               

        searchControllerVM.searchSelectedCityName = 'City';
        searchControllerVM.searchSelectedCityId = '';
        searchControllerVM.searchSelectedCityCountryId = '';
        searchControllerVM.searchSelectedCountryName = '';
        searchControllerVM.searchSelectedRole = 'Role';

        searchControllerVM.searchSelectedLocalities = [];

        searchControllerVM.countriesList = [];
        searchControllerVM.citiesList = [];
        searchControllerVM.localitiesList = [];
        searchControllerVM.specialtiesList = [];
        searchControllerVM.doctorsList = [];
        searchControllerVM.hospitalsList = [];
        searchControllerVM.labsList = [];
        searchControllerVM.pharmacistsList = [];
        searchControllerVM.nursesList = [];
        searchControllerVM.treatmentsList = [];
        
        searchControllerVM.doctorsSearchMonDay = 'Monday';
        searchControllerVM.doctorsSearchTueDay = 'Tuesday';
        searchControllerVM.doctorsSearchWedDay = 'Wednesday';
        searchControllerVM.doctorsSearchThuDay = 'Thursday';
        searchControllerVM.doctorsSearchFriDay = 'Friday';
        searchControllerVM.doctorsSearchSatDay = 'Saturday';
        searchControllerVM.doctorsSearchSunDay = 'Sunday';

        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------              

        // ViewModel Methods        
        // Doctors search method
        searchControllerVM.searchProviderOnLoad = searchProviderOnLoad;
        searchControllerVM.searchProvider = searchProvider;
        searchControllerVM.navigateToSearchPage = navigateToSearchPage;        
        searchControllerVM.searchPractice = searchPractice;
        searchControllerVM.getCountries = getCountries;
        searchControllerVM.getCities = getCities;
        searchControllerVM.getLocalities = getLocalities;
        searchControllerVM.getSpecialties = getSpecialties;
        searchControllerVM.getDoctors = getDoctors;
        searchControllerVM.getHospitals = getHospitals;
        searchControllerVM.getLabs = getLabs;
        searchControllerVM.getPharmacists = getPharmacists;
        searchControllerVM.getNurses = getNurses;
        searchControllerVM.getTreatments = getTreatments;

        searchControllerVM.setCityCountry = setCityCountry;
        searchControllerVM.setRole = setRole;
        searchControllerVM.getDays = getDays;
        searchControllerVM.getTime = getTime;

        searchControllerVM.ToggleAnyDays = ToggleAnyDays;
        searchControllerVM.ToggleMonDays = ToggleMonDays;
        searchControllerVM.ToggleTueDays = ToggleTueDays;
        searchControllerVM.ToggleWedDays = ToggleWedDays;
        searchControllerVM.ToggleThuDays = ToggleThuDays;
        searchControllerVM.ToggleFriDays = ToggleFriDays;
        searchControllerVM.ToggleSatDays = ToggleSatDays;
        searchControllerVM.ToggleSunDays = ToggleSunDays;
        
        searchControllerVM.selectedLocalities = selectedLocalities;
        searchControllerVM.removeSelectedLocalities = removeSelectedLocalities;

        
        searchControllerVM.clearAll = clearAll;
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //Implementation     

        function searchProviderOnLoad() {
            debugger;

            var url = document.URL;            
            var myUrl = new String(url);            
            var separatedByQuestionMark = myUrl.split('?');
            if (separatedByQuestionMark.length > 1) {
                var separatedByEquals = separatedByQuestionMark[1].split('=');
                var tempCountry = separatedByEquals[1].split('&');
                var country = tempCountry[0];
                var tempCity = separatedByEquals[2].split('&');
                var city = tempCity[0];
                var tempLocality = separatedByEquals[3].split('&');
                var locality = tempLocality[0].split('%20').join(' ');
                var tempSpecialty = separatedByEquals[4].split('&');
                var specialty = tempSpecialty[0].split('%20').join(' ');
                var tempDoctor = separatedByEquals[5].split('&');
                var doctor = tempDoctor[0].split('%20').join(' ');
                var tempHospital = separatedByEquals[6].split('&');
                var hospital = tempHospital[0].split('%20').join(' ');
                var tempLab = separatedByEquals[7].split('&');
                var lab = tempLab[0].split('%20').join(' ');
                var tempPharmacist = separatedByEquals[8].split('&');
                var pharmacist = tempPharmacist[0].split('%20').join(' ');
                var tempNurse = separatedByEquals[9].split('&');
                var nurse = tempNurse[0].split('%20').join(' ');
                var tempTreatment = separatedByEquals[10].split('&');
                var treatment = tempTreatment[0].split('%20').join(' ');
                var type = separatedByEquals[11];

                searchControllerVM.isVisibleResultsFound = false;
                searchControllerVM.isVisibleProviders = true;
                searchControllerVM.isVisiblePractices = false;
                $scope.providersList = '';
                searchControllerVM.providersListCount = $scope.providersList.length;
                $scope.practicesList = '';
                searchControllerVM.practicesListCount = $scope.practicesList.length;

                $scope.startSpin();

                searchService.searchProvider({
                    city: city, locality: locality, specialty: specialty, doctor: doctor, hospital: hospital, lab: lab,
                    pharmacist: pharmacist, nurse: nurse, treatment: treatment, searchType: type
                }).then(function (data) {
                    var response = data.results;
                    $scope.providersList = response;
                    searchControllerVM.providersListCount = $scope.providersList.length;
                    $scope.reset();
                    $scope.stopSpin();
                    return response;
                });

                searchControllerVM.doctorsSearchLocality = '';
                searchControllerVM.doctorsSearchSpecialty = '';
                searchControllerVM.doctorsSearchDoctor = '';
                searchControllerVM.doctorsSearchHospital = '';
                searchControllerVM.doctorsSearchLab = '';
                searchControllerVM.doctorsSearchPharmacist = '';
                searchControllerVM.doctorsSearchNurse = '';
                searchControllerVM.doctorsSearchTreatment = '';
                searchControllerVM.isVisibleResultsFound = true;
            }
        }

        function searchProvider(searchType) {
            debugger;
            var city = searchControllerVM.searchSelectedCityId;
            var locality = searchControllerVM.doctorsSearchLocality;
            var specialty = searchControllerVM.doctorsSearchSpecialty;
            var doctor = searchControllerVM.doctorsSearchDoctor;
            var hospital = searchControllerVM.doctorsSearchHospital;
            var lab = searchControllerVM.doctorsSearchLab;
            var pharmacist = searchControllerVM.doctorsSearchPharmacist;
            var nurse = searchControllerVM.doctorsSearchNurse;
            var treatment = searchControllerVM.doctorsSearchTreatment;
            var type = searchType;

            searchControllerVM.isVisibleResultsFound = false;
            searchControllerVM.isVisibleProviders = true;
            searchControllerVM.isVisiblePractices = false;
            $scope.providersList = '';
            searchControllerVM.providersListCount = $scope.providersList.length;
            $scope.practicesList = '';
            searchControllerVM.practicesListCount = $scope.practicesList.length;

            if (city == null || city == "")
            { city = 1; }
            if (locality == null || locality == "" || locality.length == 0)
            { locality = "null"; }
            if (specialty == null || specialty == "" || specialty.length == 0)
            { specialty = "null"; }
            if (doctor == null || doctor == "" || doctor.length == 0)
            { doctor = "null"; }
            if (hospital == null || hospital == "" || hospital.length == 0)
            { hospital = "null"; }
            if (lab == null || lab == "" || lab.length == 0)
            { lab = "null"; }
            if (pharmacist == null || pharmacist == "" || pharmacist.length == 0)
            { pharmacist = "null"; }
            if (nurse == null || nurse == "" || nurse.length == 0)
            { nurse = "null"; }
            if (treatment == null || treatment == "" || treatment.length == 0)
            { treatment = "null"; }


            if (type == 1) {
                searchControllerVM.searchSelectedRole = specialty;
                if (locality.length > 0 && locality != "null") {
                    type = 2;
                }
            }
            else if (type == 3) {
                searchControllerVM.searchSelectedRole = doctor;
                if (locality.length > 0 && locality != "null") {
                    type = 4;
                }
            }
            else if (type == 5) {
                searchControllerVM.searchSelectedRole = hospital;
                if (locality.length > 0 && locality != "null") {
                    type = 6;
                }
            }
            else if (type == 7) {
                searchControllerVM.searchSelectedRole = lab;
                if (locality.length > 0 && locality != "null") {
                    type = 8;
                }
            }
            else if (type == 9) {
                searchControllerVM.searchSelectedRole = pharmacist;
                if (locality.length > 0 && locality != "null") {
                    type = 10;
                }
            }
            else if (type == 11) {
                searchControllerVM.searchSelectedRole = nurse;
                if (locality.length > 0 && locality != "null") {
                    type = 12;
                }
            }
            else if (type == 13) {
                searchControllerVM.searchSelectedRole = treatment;
                if (locality.length > 0 && locality != "null") {
                    type = 14;
                }
            }

            $scope.startSpin();

            searchService.searchProvider({
                city: city, locality: locality, specialty: specialty, doctor: doctor, hospital: hospital, lab: lab,
                pharmacist: pharmacist, nurse: nurse, treatment: treatment, searchType: type
            }).then(function (data) {
                var response = data.results;
                $scope.providersList = response;
                searchControllerVM.providersListCount = $scope.providersList.length;
                $scope.reset();
                $scope.stopSpin();                
                return response;
            });

            searchControllerVM.doctorsSearchLocality = '';
            searchControllerVM.doctorsSearchSpecialty = '';
            searchControllerVM.doctorsSearchDoctor = '';
            searchControllerVM.doctorsSearchHospital = '';
            searchControllerVM.doctorsSearchLab = '';
            searchControllerVM.doctorsSearchPharmacist = '';
            searchControllerVM.doctorsSearchNurse = '';
            searchControllerVM.doctorsSearchTreatment = '';
            searchControllerVM.isVisibleResultsFound = true;
        }
        
        function searchPractice(searchType) {
            debugger;
            var city = searchControllerVM.searchSelectedCityId;
            var locality = searchControllerVM.doctorsSearchLocality;
            var hospital = searchControllerVM.practicesSearchHospital;
            var lab = searchControllerVM.practicesSearchLab.trim();
            var type = searchType;

            searchControllerVM.isVisibleResultsFound = false;
            searchControllerVM.isVisibleProviders = false;
            searchControllerVM.isVisiblePractices = true;
            $scope.providersList = '';
            searchControllerVM.providersListCount = $scope.providersList.length;
            $scope.practicesList = '';
            searchControllerVM.practicesListCount = $scope.practicesList.length;

            if (city == null || city == "")
            { city = 1; }
            if (locality == null || locality == "" || locality.length == 0)
            { locality = "null"; }
            if (hospital == null || hospital == "" || hospital.length == 0)
            { hospital = "null"; }
            if (lab == null || lab == "" || lab.length == 0)
            { lab = "null"; }


            if (type == 1) {
                searchControllerVM.searchSelectedRole = hospital;
                if (locality.length > 0 && locality != "null") {
                    type = 2;
                }
            }
            else if (type == 3) {
                searchControllerVM.searchSelectedRole = lab;
                if (locality.length > 0 && locality != "null") {
                    type = 4;
                }
            }


            $scope.startSpin();

            searchService.searchPractice({
                city: city, locality: locality, hospital: hospital,
                lab: lab, searchType: type
            }).then(function (data) {
                var response = data.results;
                $scope.practicesList = response;
                searchControllerVM.practicesListCount = $scope.practicesList.length;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });

            searchControllerVM.doctorsSearchLocality = '';
            searchControllerVM.practicesSearchHospital = '';
            searchControllerVM.practicesSearchLab = '';
            searchControllerVM.isVisibleResultsFound = true;
        }

        function navigateToSearchPage(searchType) {
            debugger;
            var country = searchControllerVM.searchSelectedCityCountryId;
            var city = searchControllerVM.searchSelectedCityId;
            var locality = searchControllerVM.doctorsSearchLocality;
            var specialty = searchControllerVM.doctorsSearchSpecialty;
            var doctor = searchControllerVM.doctorsSearchDoctor;
            var hospital = searchControllerVM.doctorsSearchHospital;
            var lab = searchControllerVM.doctorsSearchLab;
            var pharmacist = searchControllerVM.doctorsSearchPharmacist;
            var nurse = searchControllerVM.doctorsSearchNurse;
            var treatment = searchControllerVM.doctorsSearchTreatment;
            var type = searchType;

            $scope.providersList = '';
            searchControllerVM.providersListCount = $scope.providersList.length;
            $scope.practicesList = '';
            searchControllerVM.practicesListCount = $scope.practicesList.length;

            if (city == null || city == "")
            { city = 1; }
            if (locality == null || locality == "" || locality.length == 0)
            { locality = "null"; }
            if (specialty == null || specialty == "" || specialty.length == 0)
            { specialty = "null"; }
            if (doctor == null || doctor == "" || doctor.length == 0)
            { doctor = "null"; }
            if (hospital == null || hospital == "" || hospital.length == 0)
            { hospital = "null"; }
            if (lab == null || lab == "" || lab.length == 0)
            { lab = "null"; }
            if (pharmacist == null || pharmacist == "" || pharmacist.length == 0)
            { pharmacist = "null"; }
            if (nurse == null || nurse == "" || nurse.length == 0)
            { nurse = "null"; }
            if (treatment == null || treatment == "" || treatment.length == 0)
            { treatment = "null"; }


            if (type == 1) {
                searchControllerVM.searchSelectedRole = specialty;
                if (locality.length > 0 && locality != "null") {
                    type = 2;
                }
            }
            else if (type == 3) {
                searchControllerVM.searchSelectedRole = doctor;
                if (locality.length > 0 && locality != "null") {
                    type = 4;
                }
            }
            else if (type == 5) {
                searchControllerVM.searchSelectedRole = hospital;
                if (locality.length > 0 && locality != "null") {
                    type = 6;
                }
            }
            else if (type == 7) {
                searchControllerVM.searchSelectedRole = lab;
                if (locality.length > 0 && locality != "null") {
                    type = 8;
                }
            }
            else if (type == 9) {
                searchControllerVM.searchSelectedRole = pharmacist;
                if (locality.length > 0 && locality != "null") {
                    type = 10;
                }
            }
            else if (type == 11) {
                searchControllerVM.searchSelectedRole = nurse;
                if (locality.length > 0 && locality != "null") {
                    type = 12;
                }
            }
            else if (type == 13) {
                searchControllerVM.searchSelectedRole = treatment;
                if (locality.length > 0 && locality != "null") {
                    type = 14;
                }
            }                 

            window.location = "Search.html?country=" + country + "&city=" + city + "&locality=" + locality + "&specialty=" + specialty + "&doctor=" + doctor + "&hospital=" + hospital + "&lab=" + lab + "&pharmacist=" + pharmacist + "&nurse=" + nurse + "&treatment=" + treatment + "&searchType=" + type;

            searchControllerVM.doctorsSearchLocality = '';
            searchControllerVM.doctorsSearchSpecialty = '';
            searchControllerVM.doctorsSearchDoctor = '';
            searchControllerVM.doctorsSearchHospital = '';
            searchControllerVM.doctorsSearchLab = '';
            searchControllerVM.doctorsSearchPharmacist = '';
            searchControllerVM.doctorsSearchNurse = '';
            searchControllerVM.doctorsSearchTreatment = '';            
        }

        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------                

        function getCountries() {
            $scope.startSpin();
            return searchService.getCountries().then(function (data) {
                var response = data.results;
                searchControllerVM.countriesList = response;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }

        function getSpecialties() {
            $scope.startSpin();
            return searchService.getSpecialties().then(function (data) {

                var response = data.results;
                searchControllerVM.specialtiesList = response;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }

        function getDoctors() {
            $scope.startSpin();
            return searchService.getDoctors().then(function (data) {

                var response = data.results;
                searchControllerVM.doctorsList = response;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }

        function getHospitals() {
            $scope.startSpin();
            return searchService.getHospitals().then(function (data) {

                var response = data.results;
                searchControllerVM.hospitalsList = response;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }

        function getLabs() {
            $scope.startSpin();
            return searchService.getLabs().then(function (data) {

                var response = data.results;
                searchControllerVM.labsList = response;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }

        function getPharmacists() {
            $scope.startSpin();
            return searchService.getPharmacists().then(function (data) {

                var response = data.results;
                searchControllerVM.pharmacistsList = response;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }

        function getNurses() {
            $scope.startSpin();
            return searchService.getNurses().then(function (data) {

                var response = data.results;
                searchControllerVM.nursesList = response;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }

        function getTreatments() {
            $scope.startSpin();
            return searchService.getTreatments().then(function (data) {

                var response = data.results;
                searchControllerVM.treatmentsList = response;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }

        function getCities(countryId) {
            $scope.startSpin();
            debugger;
            return searchService.getCities({ country: countryId, searchType: 15 }).then(function (data) {

                var response = data.results;
                searchControllerVM.citiesList = response;                
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }

        function getLocalities(countryId, cityId) {
            $scope.startSpin();
            return searchService.getLocalities({ country: countryId, city: cityId, searchType: 16 }).then(function (data) {

                var response = data.results;
                searchControllerVM.localitiesList = response;
                searchControllerVM.searchSelectedLocalities.length = 0;
                $scope.reset();
                $scope.stopSpin();
                return response;
            });
        }

        function setCityCountry(selectedCityName, selectedCityId, selectedCityCountryId,selectedCityCountryName) {
            searchControllerVM.searchSelectedCityName = selectedCityName;
            searchControllerVM.searchSelectedCityId = selectedCityId;
            searchControllerVM.searchSelectedCityCountryId = selectedCityCountryId;
            searchControllerVM.searchSelectedCountryName = selectedCityCountryName;
        }      

        function setRole(selectedRole) {
            // searchControllerVM.searchSelectedRole = selectedRole;
        }

        function getDays(days) {
            var splitedArray = [];
            //searchControllerVM.providersSchedulesList.length = 0;
            //searchControllerVM.providersSchedulesList.splice(0, searchControllerVM.providersSchedulesList.length);
            //while (searchControllerVM.providersSchedulesList.length > 0) {
            //    searchControllerVM.providersSchedulesList.pop();
            //}
            var d = days.split(',');
            //var t = timings.split('$');

            for (var index = 0; index < d.length; ++index) {
                splitedArray.push(d[index]);
                //splitedArray.push(t[index]);
            }
            //filteredArray = searchControllerVM.providersSchedulesList;
            return splitedArray;
        }
        function getTime(timings) {

            var splitedArray = [];

            var t = timings.split('$');

            for (var index = 0; index < t.length; ++index) {
                splitedArray.push(t[index]);
            }
            return splitedArray;
        }

        function clearAll() {
            searchControllerVM.doctorsSearchSpecialty = '';
            searchControllerVM.doctorsSearchLocality = '';
            searchControllerVM.doctorsSearchDoctor = '';
            searchControllerVM.doctorsSearchHospital = '';
            searchControllerVM.doctorsSearchLab = '';
            searchControllerVM.doctorsSearchPharmacist = '';
            searchControllerVM.doctorsSearchNurse = '';
            searchControllerVM.doctorsSearchTreatment = '';
        }       

        function ToggleAnyDays() {
            var btnAny = document.getElementById("btnAnyDay");
            if (btnAny.className == "btn btn-default") {
                btnAny.className = "btn btn-primary";                
                searchControllerVM.doctorsSearchMonDay = 'Monday';
                searchControllerVM.doctorsSearchTueDay = 'Tuesday';
                searchControllerVM.doctorsSearchWedDay = 'Wednesday';
                searchControllerVM.doctorsSearchThuDay = 'Thursday';
                searchControllerVM.doctorsSearchFriDay = 'Friday';
                searchControllerVM.doctorsSearchSatDay = 'Saturday';
                searchControllerVM.doctorsSearchSunDay = 'Sunday';
            }
            else {
                btnAny.className = "btn btn-default";        
            }
        }
        function ToggleMonDays() {
            var btnMon = document.getElementById("btnMonDay");
            if (btnMon.className == "btn btn-default") {
                btnMon.className = "btn btn-primary";
                searchControllerVM.doctorsSearchMonDay = 'Monday';
            }
            else {
                btnMon.className = "btn btn-default";
                searchControllerVM.doctorsSearchMonDay = '';
            }
        }
        function ToggleTueDays() {
            var btnTue = document.getElementById("btnTueDay");
            if (btnTue.className == "btn btn-default") {
                btnTue.className = "btn btn-primary";
                searchControllerVM.doctorsSearchTueDay = 'Tuesday';
            }
            else {
                btnTue.className = "btn btn-default";
                searchControllerVM.doctorsSearchTueDay = '';
            }
        }
        function ToggleWedDays() {
            var btnWed = document.getElementById("btnWedDay");
            if (btnWed.className == "btn btn-default") {
                btnWed.className = "btn btn-primary";
                searchControllerVM.doctorsSearchWedDay = 'Wednesday';
            }
            else {
                btnWed.className = "btn btn-default";
                searchControllerVM.doctorsSearchWedDay = '';
            }
        }
        function ToggleThuDays() {
            var btnThu = document.getElementById("btnThuDay");
            if (btnThu.className == "btn btn-default") {
                btnThu.className = "btn btn-primary";
                searchControllerVM.doctorsSearchThuDay = 'Thursday';
            }
            else {
                btnThu.className = "btn btn-default";
                searchControllerVM.doctorsSearchThuDay = '';
            }
        }
        function ToggleFriDays() {
            var btnFri = document.getElementById("btnFriDay");
            if (btnFri.className == "btn btn-default") {
                btnFri.className = "btn btn-primary";
                searchControllerVM.doctorsSearchFriDay = 'Friday';
            }
            else {
                btnFri.className = "btn btn-default";
                searchControllerVM.doctorsSearchFriDay = '';
            }
        }
        function ToggleSatDays() {
            var btnSat = document.getElementById("btnSatDay");
            if (btnSat.className == "btn btn-default") {
                btnSat.className = "btn btn-primary";
                searchControllerVM.doctorsSearchSatDay = 'Saturday';
            }
            else {
                btnSat.className = "btn btn-default";
                searchControllerVM.doctorsSearchSatDay = '';
            }
        }
        function ToggleSunDays() {
            var btnSun = document.getElementById("btnSunDay");
            if (btnSun.className == "btn btn-default") {
                btnSun.className = "btn btn-primary";
                searchControllerVM.doctorsSearchSunDay = 'Sunday';
            }
            else {
                btnSun.className = "btn btn-default";
                searchControllerVM.doctorsSearchSunDay = '';
            }
        }       

        function removeSelectedLocalities(locality) {
            if (searchControllerVM.searchSelectedLocalities.indexOf(locality) > -1) {
                searchControllerVM.searchSelectedLocalities.splice(searchControllerVM.searchSelectedLocalities.indexOf(locality));
            }
            else {
                searchControllerVM.searchSelectedLocalities.push(locality);
            }
        }

        function selectedLocalities(locality) {
            if (searchControllerVM.searchSelectedLocalities.indexOf(locality) > -1) {
                searchControllerVM.searchSelectedLocalities.splice(searchControllerVM.searchSelectedLocalities.indexOf(locality));                
            }
            else {
                searchControllerVM.searchSelectedLocalities.push(locality);                
            }
        }

        //function getParameterByName(name) {
        //    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        //    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        //        results = regex.exec(location.search);
        //    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        //}

        //document.getElementById("priceValue").onchange = function () {
        //    searchControllerVM.searchFee = document.getElementById("priceValue").value;           
        //}

        //$scope.filterFunction = function () {            
        //    return searchControllerVM.searchFee;
        //};        
    }
})();
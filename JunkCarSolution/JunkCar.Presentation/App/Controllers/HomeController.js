(function () {
    'use strict';

    angular.module('app').controller('homeController', ['homeService', '$scope', '$location', 'usSpinnerService', '$rootScope', 'alertsManager', homeController]);

    function homeController(homeService, $scope, $location, usSpinnerService, $rootScope, alertsManager) {

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
        var homeControllerVM = this;

        // ViewModel variables 

        // Index page variables
        homeControllerVM.registrationYearsList = [];
        homeControllerVM.makesList = [];
        homeControllerVM.modelsList = [];
        homeControllerVM.statesList = [];
        homeControllerVM.citiesList = [];
        homeControllerVM.questionnaireList = [];
        homeControllerVM.drivetrainQuestionnaireList = [];
        homeControllerVM.interiorExteriorQuestionnaireList = [];             
        
        homeControllerVM.homeSelectedRegistrationYear = '';
        homeControllerVM.homeSelectedMake = '';        
        homeControllerVM.homeSelectedModel = '';
        homeControllerVM.homeZipCode = '';
        homeControllerVM.homeBetterOfferName = '';
        homeControllerVM.homeBetterOfferAddress = '';
        homeControllerVM.homeBetterOfferCity = '';        
        homeControllerVM.homeBetterOfferState = '';
        homeControllerVM.homeBetterOfferPhone = '';
        homeControllerVM.homeBetterOfferEmail = '';

        homeControllerVM.offerPrice = '';

        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
               

        // Home controller methods
        homeControllerVM.getRegistrationYears = getRegistrationYears;
        homeControllerVM.getMakesByYear = getMakesByYear;
        homeControllerVM.getModelsByYearMake = getModelsByYearMake;
        homeControllerVM.checkZipCode = checkZipCode;
        homeControllerVM.getAnOffer = getAnOffer;
        homeControllerVM.getABetterOffer = getABetterOffer;
        homeControllerVM.getStates = getStates;
        homeControllerVM.getCities = getCities;
        homeControllerVM.getQuestionnaire = getQuestionnaire;
        homeControllerVM.saveYearData = saveYearData;
        homeControllerVM.saveMakeData = saveMakeData;
        homeControllerVM.saveModelData = saveModelData;
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

       
        
        //$scope.redirectLogin = function () {
        //    $location.path('/Login');
        //    window.location = "Login.html";
        //}

        //function isValidEmail(emailAddress) {
        //    return homeService.isValidEmail(emailAddress);
        //}
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
        // Local cache management
        // cache year
        function saveYearData() {
            var year = homeControllerVM.homeSelectedRegistrationYear;
            localStorage.setItem('selectedYear', year);
            //var tempYear = localStorage.getItem('selectedYear');
            //homeControllerVM.homeSelectedRegistrationYear = tempYear;
        }
        //var tempYear = localStorage.getItem('selectedYear');
        //homeControllerVM.homeSelectedRegistrationYear = tempYear;

        // cache make
        function saveMakeData() {
            var make = homeControllerVM.homeSelectedMake;
            var makeId = '';            
            for (var i = 0; i < homeControllerVM.makesList.length; i++) {
                if (homeControllerVM.makesList[i].Make_Name == make) {
                    makeId = parseInt(homeControllerVM.makesList[i].Make_Id);
                    break;
                }
            }            
            localStorage.setItem('selectedMake', makeId);
            //var tempMake = localStorage.getItem('selectedMake');
            //homeControllerVM.homeSelectedMake = tempMake;
        }
        //var tempMake = localStorage.getItem('selectedMake');
        //homeControllerVM.homeSelectedMake = tempMake;

        // cache model
        function saveModelData() {
            var model = homeControllerVM.homeSelectedModel;
            var modelId = '';
            for (var i = 0; i < homeControllerVM.modelsList.length; i++) {
                if (homeControllerVM.modelsList[i].Model_Name == model) {
                    modelId = parseInt(homeControllerVM.modelsList[i].Model_Id);
                    break;
                }
            }
            localStorage.setItem('selectedModel', modelId);
            //var tempModel = localStorage.getItem('selectedModel');
            //homeControllerVM.homeSelectedModel = tempModel;
        }
        //var tempModel = localStorage.getItem('selectedModel');
        //homeControllerVM.homeSelectedModel = tempModel;

        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        
        function getRegistrationYears() {
            debugger;
            $scope.startSpin();
            return homeService.getRegistrationYears()
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;
                    homeControllerVM.registrationYearsList = response;
                    $scope.reset();
                    $scope.stopSpin();
                    return homeControllerVM.registrationYearsList;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });
        }
        
        function getMakesByYear()
        {
            var regYear = parseInt(homeControllerVM.homeSelectedRegistrationYear);
            $scope.startSpin();
            return homeService.getMakesByYear({ year: regYear })
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;
                    homeControllerVM.makesList = response;
                    $scope.reset();
                    $scope.stopSpin();
                    return homeControllerVM.makesList;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });
        }

        function getModelsByYearMake() {
            var regYear = parseInt(homeControllerVM.homeSelectedRegistrationYear);
            var make = homeControllerVM.homeSelectedMake;
            $scope.startSpin();
            var makeId = '';
            for (var i = 0; i < homeControllerVM.makesList.length; i++) {
                if (homeControllerVM.makesList[i].Make_Name == make) {
                    makeId = parseInt(homeControllerVM.makesList[i].Make_Id);
                    break;
                }
            }
            return homeService.getModelsByYearMake({ year: regYear, makeId: makeId })
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;
                    homeControllerVM.modelsList = response;
                    $scope.reset();
                    $scope.stopSpin();
                    return homeControllerVM.modelsList;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });
        }
        
        function checkZipCode() {
            var zipCode = homeControllerVM.homeZipCode;
            if (zipCode.length != 0) {
                $scope.startSpin();
                return homeService.checkZipCode({ zipCode: zipCode })
                    .then(function (serviceResponse) {
                        var response = serviceResponse.data;
                        if (response == false) {
                            homeControllerVM.homeZipCode = '';
                            alert("Please enter a valid zipcode")
                        }
                        else { getAnOffer(); }
                        $scope.reset();
                        $scope.stopSpin();
                        return response;
                    }).catch(function (serviceError) {
                        failureAlert(serviceError.data);
                        console.log(serviceError.data);
                        return null;
                    });
            }
        }

        function getStates() {
            debugger;
            $scope.startSpin();
            return homeService.getStates()
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;
                    homeControllerVM.statesList = response;                    
                    $scope.reset();
                    $scope.stopSpin();
                    return homeControllerVM.statesList;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });
        }

        function getCities() {
            var state = homeControllerVM.homeBetterOfferState;
            var stateId = '';
            for (var i = 0; i < homeControllerVM.statesList.length; i++) {
                if (homeControllerVM.statesList[i].State_Name == state) {
                    stateId = parseInt(homeControllerVM.statesList[i].State_Id);
                    break;
                }
            }
            $scope.startSpin();
            return homeService.getCities({ stateId: stateId })
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;
                    homeControllerVM.citiesList = response;
                    $scope.reset();
                    $scope.stopSpin();
                    return homeControllerVM.citiesList = response;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });
        }

        function getAnOffer() {
            debugger;
            var year = homeControllerVM.homeSelectedRegistrationYear;
            var make = homeControllerVM.homeSelectedMake;
            var model = homeControllerVM.homeSelectedModel;
            var zipcode = homeControllerVM.homeZipCode;

            var makeId = '';
            var modelId = '';

            for (var i = 0; i < homeControllerVM.makesList.length; i++) {
                if (homeControllerVM.makesList[i].Make_Name == make) {
                    makeId = parseInt(homeControllerVM.makesList[i].Make_Id);
                    break;
                }
            }

            for (var i = 0; i < homeControllerVM.modelsList.length; i++) {
                if (homeControllerVM.modelsList[i].Model_Name == model) {
                    modelId = parseInt(homeControllerVM.modelsList[i].Model_Id);
                    break;
                }
            }

            $scope.startSpin();
            return homeService.getAnOffer({ makeId: makeId, modelId: modelId, year: year, zipCode: zipcode })
                .then(function (serviceResponse) {
                    homeControllerVM.offerPrice = serviceResponse.data;                     
                    alert(homeControllerVM.offerPrice);
                    $scope.reset();
                    $scope.stopSpin();
                    return homeControllerVM.offerPrice;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });
        }       

        function getABetterOffer() {
            debugger;
            var year = parseInt(localStorage.getItem('selectedYear'));
            var make = parseInt(localStorage.getItem('selectedMake'));
            var model = parseInt(localStorage.getItem('selectedModel'));

            var name = homeControllerVM.homeBetterOfferName;
            var address = homeControllerVM.homeBetterOfferAddress;
            var city = homeControllerVM.homeBetterOfferCity;
            var zipCode = homeControllerVM.homeZipCode;
            var state = homeControllerVM.homeBetterOfferState;
            var phone = homeControllerVM.homeBetterOfferPhone;
            var email = homeControllerVM.homeBetterOfferEmail;              

            var stateId = '';
            var cityId = '';
           
            for (var i = 0; i < homeControllerVM.statesList.length; i++) {
                if (homeControllerVM.statesList[i].State_Name == state) {
                    stateId = parseInt(homeControllerVM.statesList[i].State_Id);
                    break;
                }
            }

            for (var i = 0; i < homeControllerVM.citiesList.length; i++) {
                if (homeControllerVM.citiesList[i].City_Name == city) {
                    cityId = parseInt(homeControllerVM.citiesList[i].City_Id);
                    break;
                }
            }             

            $scope.startSpin();
            return homeService.getABetterOffer({ address: address, cityId: cityId, emailAddress: email, selectedMakeId: make, selectedModelId: model, name: name, phone: phone, stateId: stateId, selectedYear: year, zipCode: zipCode })
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;

                    $scope.reset();
                    $scope.stopSpin();
                    return response;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });
        }

        function getQuestionnaire() {          
            $scope.startSpin();
            return homeService.getQuestionnaire()
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;
                    homeControllerVM.questionnaireList = response;
                    fillQuestionnairesLists();
                    $scope.reset();
                    $scope.stopSpin();
                    return homeControllerVM.questionnaireList = response;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });
        }

        function fillQuestionnairesLists() {
            for (var i = 0; i < homeControllerVM.questionnaireList.length; i++) {
                if (homeControllerVM.questionnaireList[i].Sub_Questionnaire_Id == 2) {
                    homeControllerVM.drivetrainQuestionnaireList.push(homeControllerVM.questionnaireList[i]);
                }
                else if (homeControllerVM.questionnaireList[i].Sub_Questionnaire_Id == 3)
                { homeControllerVM.interiorExteriorQuestionnaireList.push(homeControllerVM.questionnaireList[i]); }
            }
            console.log(homeControllerVM.questionnaireList);
        }
                
    }
})();
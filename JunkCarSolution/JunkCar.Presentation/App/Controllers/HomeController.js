(function () {
    'use strict';

    angular.module('app').controller('homeController', ['homeService', '$scope', '$location', 'usSpinnerService', '$rootScope', 'alertsManager', homeController]);
    //'$modal',
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

        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------



        //var modalInstance = '';
        //$scope.open = function () {

        //    modalInstance = $modal.open({
        //        templateUrl: 'myModalForPopup.html',
        //        controller: 'homeController',
        //        resolve: {
        //            isSetItems: function () {
        //                setInput();
        //                return true;
        //            }
        //        }
        //    });

        //    modalInstance.result.then(function () {                
        //        setInput();           
        //    });
        //};       

        //$rootScope.ok = function () {            
        //    homeControllerVM.close();
        //};








        //$scope.close = function () {
        //    modalInstance = $modal.hide({
        //        templateUrl: 'myModalForPopup.html',
        //        controller: 'homeController',
        //        resolve: {
        //            isSetItems: function () {
        //                setInput();
        //                return true;
        //            }
        //        }
        //    });

        //    modalInstance.result.then(function () {
        //        setInput();
        //    });
        //};
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------







        // ViewModel
        var homeControllerVM = this;

        // ViewModel variables 

        // Index page variables
        $rootScope.registrationYearsList = [];
        $rootScope.makesList = [];
        $rootScope.modelsList = [];

        homeControllerVM.statesList = [];
        homeControllerVM.citiesList = [];
        $rootScope.questionnaireList = [];
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

        homeControllerVM.offerTabNegotiationMessage = '';

        $rootScope.offerPrice = '';
        $rootScope.contactNo = '';
        $rootScope.questionnaireResult = '';
        var isValidZipCode = false;
        

        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
               

        // Home controller methods
        homeControllerVM.getRegistrationYears = getRegistrationYears;
        homeControllerVM.getMakesByYear = getMakesByYear;
        homeControllerVM.getModelsByYearMake = getModelsByYearMake;
        homeControllerVM.checkZipCode = checkZipCode;
        homeControllerVM.checkForCustomerInfoPopup = checkForCustomerInfoPopup;
        homeControllerVM.getAnOffer = getAnOffer;
        homeControllerVM.getABetterOffer = getABetterOffer;
        homeControllerVM.getAnOfferWithQuestionnaire = getAnOfferWithQuestionnaire;
        homeControllerVM.getStates = getStates;
        homeControllerVM.getCities = getCities;
        homeControllerVM.getQuestionnaire = getQuestionnaire;
        //homeControllerVM.postQuestionnaire = postQuestionnaire;
        homeControllerVM.saveYearData = saveYearData;
        homeControllerVM.saveMakeData = saveMakeData;
        homeControllerVM.saveModelData = saveModelData;
        homeControllerVM.saveZipCodeData = saveZipCodeData;
        homeControllerVM.confirmOffer = confirmOffer;
        homeControllerVM.confirmOfferWithQuestionnaire = confirmOfferWithQuestionnaire;
        homeControllerVM.updateYear = updateYear;
        homeControllerVM.updateMake = updateMake;
        homeControllerVM.updateModel = updateModel;         
        homeControllerVM.setInput = setInput;
        homeControllerVM.clearMake = clearMake;
        homeControllerVM.clearModel = clearModel;
        homeControllerVM.navigateToQuestionnaire = navigateToQuestionnaire;
        homeControllerVM.navigatePrevious = navigatePrevious;
        homeControllerVM.navigateNext = navigateNext;
        //homeControllerVM.figureoutUrl = figureoutUrl;

        homeControllerVM.close = function () {
            setInput();
        }

        $rootScope.onKeyPress = function (event) {
            if (event.which === 13) {
                homeControllerVM.homeZipCode = document.getElementById("callUsZipCode").value;                
                checkZipCode();
                //alert("Enter");                
            }
            else {
                //alert("Other key pressed");
            }
        }
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
              
        
        //$scope.redirectLogin = function () {
        //    $location.path('/Login');
        //    window.location = "Login.html";
        //}

        //function isValidEmail(emailAddress) {
        //    return homeService.isValidEmail(emailAddress);
        //}
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // check url        

        //figureoutUrl();
        //function figureoutUrl()
        //{
        //    debugger;
        //    var url = document.URL;
        //    var mystring = new String(url);
        //    var separatedByPeriod = mystring.split('.');
        //    if (separatedByPeriod.length > 0) {
        //        if (separatedByPeriod[0] == 'www')
        //        { url = 'www.junkcartrader.com/API/API/'; }
        //        else if (separatedByPeriod[0] == 'http://www')
        //        { url = 'www.junkcartrader.com/API/API/'; }                
        //        else if (separatedByPeriod[0] == 'junkcartrader')
        //        { url = 'junkcartrader.com/API/API/'; }
        //        else if (separatedByPeriod[0] == 'http://junkcartrader')
        //        { url = 'junkcartrader.com/API/API/'; }
        //        mystring = new String(url);                
        //        localStorage.setItem('url', mystring);
        //        //homeService.figureoutUrl(mystring);
        //    }
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
            for (var i = 0; i < $rootScope.makesList.length; i++) {
                if ($rootScope.makesList[i].Make_Name == make) {
                    makeId = parseInt($rootScope.makesList[i].Make_Id);
                    break;
                }
            }
            localStorage.setItem('selectedMake', make);
            localStorage.setItem('selectedMakeId', makeId);         
        }
      

        // cache model
        function saveModelData() {
            var model = homeControllerVM.homeSelectedModel;
            var modelId = '';
            for (var i = 0; i < $rootScope.modelsList.length; i++) {
                if ($rootScope.modelsList[i].Model_Name == model) {
                    modelId = parseInt($rootScope.modelsList[i].Model_Id);
                    break;
                }
            }
            localStorage.setItem('selectedModel', model);
            localStorage.setItem('selectedModelId', modelId);        
        }        

        // cache zipcode
        function saveZipCodeData() {
            var zipCode = homeControllerVM.homeZipCode;
            localStorage.setItem('selectedZipCode', zipCode);
            homeControllerVM.homeZipCode = localStorage.getItem('selectedZipCode');            
        }
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        
        function getRegistrationYears() {
            debugger;
            $scope.startSpin();
            return homeService.getRegistrationYears()
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;                   
                    $rootScope.registrationYearsList = response;
                    $scope.reset();
                    $scope.stopSpin();
                    return $rootScope.registrationYearsList;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });            
        }
        
        function getMakesByYear()
        {
            var regYear = parseInt(homeControllerVM.homeSelectedRegistrationYear);
            homeControllerVM.updateYear(regYear);
            homeControllerVM.clearMake();
            homeControllerVM.clearModel();
            $scope.startSpin();
            return homeService.getMakesByYear({ year: regYear })
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;
                    $rootScope.makesList = response;
                    $scope.reset();
                    $scope.stopSpin();
                    return $rootScope.makesList;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });            
        }

        function getModelsByYearMake() {
            var regYear = parseInt(homeControllerVM.homeSelectedRegistrationYear);            
            var make = homeControllerVM.homeSelectedMake;

            homeControllerVM.updateMake(make);
            homeControllerVM.clearModel();

            $scope.startSpin();
            var makeId = '';
            for (var i = 0; i < $rootScope.makesList.length; i++) {
                if ($rootScope.makesList[i].Make_Name == make) {
                    makeId = parseInt($rootScope.makesList[i].Make_Id);
                    break;
                }
            }

            return homeService.getModelsByYearMake({ year: regYear, makeId: makeId })
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;
                    $rootScope.modelsList = response;
                    $scope.reset();
                    $scope.stopSpin();
                    return $rootScope.modelsList;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });
        }

        function checkForCustomerInfoPopup() {
            debugger;
            checkZipCode();
            if (localStorage.getItem("isValidZipCode") != null) {
                var v = localStorage.getItem("isValidZipCode").toString();
                if (v == "true")
                { showCustomerInfoPopup(); }
            }
        }

        function checkZipCode() {
            debugger;           
            var zipCode = homeControllerVM.homeZipCode;            
            if (zipCode.length != 0) {
                $scope.startSpin();
                return homeService.checkZipCode({ zipCode: zipCode })
                    .then(function (serviceResponse) {
                        var response = serviceResponse.data;
                        localStorage.setItem("isValidZipCode", response.Is_Valid_Zip_Code);
                        if (response.Is_Valid_Zip_Code == false) {                            
                            $rootScope.contactNo = '';                            
                            homeControllerVM.homeZipCode = '';
                            alert("Please enter a valid zipcode")                                                        
                        }
                        else {                            
                            homeControllerVM.saveZipCodeData();                                                                                
                            $rootScope.contactNo = response.Contact_No;
                            if ($rootScope.contactNo.length > 0)
                            {                              
                                homeControllerVM.offerTabNegotiationMessage = 'Please call for negotiation';
                            }                           
                        }
                        $scope.reset();
                        $scope.stopSpin();                        
                    }).catch(function (serviceError) {
                        failureAlert(serviceError.data);
                        console.log(serviceError.data);                       
                    });
            }
            else {
                alert("Enter zipcode");
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
            $rootScope.questionnaireResult = '';
            var year = homeControllerVM.homeSelectedRegistrationYear;
            var make = homeControllerVM.homeSelectedMake;
            var model = homeControllerVM.homeSelectedModel;
            var zipcode = homeControllerVM.homeZipCode;

            var makeId = '';
            var modelId = '';

            for (var i = 0; i < $rootScope.makesList.length; i++) {
                if ($rootScope.makesList[i].Make_Name == make) {
                    makeId = parseInt($rootScope.makesList[i].Make_Id);
                    break;
                }
            }

            for (var i = 0; i < $rootScope.modelsList.length; i++) {
                if ($rootScope.modelsList[i].Model_Name == model) {
                    modelId = parseInt($rootScope.modelsList[i].Model_Id);
                    break;
                }
            }

            $scope.startSpin();
            return homeService.getAnOffer({ makeId: makeId, modelId: modelId, year: year, zipCode: zipcode })
                .then(function (serviceResponse) {
                    $rootScope.offerPrice = '$';
                    $rootScope.offerPrice += serviceResponse.data;
                    if ($rootScope.offerPrice.length > 0)
                    {
                        offerTab();
                        //document.getElementById("tabOfferAnchor").click();
                    }
                        $scope.reset();
                    $scope.stopSpin();
                    return $rootScope.offerPrice;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });
            
        }

        function getAnOfferWithQuestionnaire() {

            $rootScope.questionnaireResult = '';
            var questionnaireResult = checkQuestionnaire();

            debugger;
            var year = parseInt(localStorage.getItem('selectedYear'));
            var makeId = parseInt(localStorage.getItem('selectedMakeId'));
            var modelId = parseInt(localStorage.getItem('selectedModelId'));
            var make = localStorage.getItem('selectedMake');
            var model = localStorage.getItem('selectedModel');
            var name = homeControllerVM.homeBetterOfferName;
            var address = homeControllerVM.homeBetterOfferAddress;
            var city = homeControllerVM.homeBetterOfferCity;
            var zipCode = localStorage.getItem('selectedZipCode');
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
            return homeService.getAnOfferWithQuestionnaire({ address: address, cityId: cityId, emailAddress: email, make: make, model: model, name: name, phone: phone,questionnaire:questionnaireResult, selectedMakeId: makeId, selectedModelId: modelId, selectedYear: year, stateId: stateId, zipCode: zipCode })
                .then(function (serviceResponse) {
                    $rootScope.offerPrice = '$';
                    $rootScope.offerPrice += serviceResponse.data;
                    if ($rootScope.offerPrice.length > 0)
                    {
                        offerTab();
                        //document.getElementById("tabOfferAnchor").click();
                    }
                    $scope.reset();
                    $scope.stopSpin();
                    return $rootScope.offerPrice;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });
        }

        function checkQuestionnaire()
        {
            $rootScope.questionnaireResult = '';
            for (var i = 0; i < $rootScope.questionnaireList.length; i++) {
                if (i == 0) {
                    $rootScope.questionnaireResult += $rootScope.questionnaireList[i].Question_Id + ',';
                    var ddl = document.getElementById("ddQ" + $rootScope.questionnaireList[i].Question_Id);
                    var val = parseInt(ddl.options[ddl.selectedIndex].value);
                    $rootScope.questionnaireResult += val;
                } else {
                    $rootScope.questionnaireResult += ',' + $rootScope.questionnaireList[i].Question_Id + ',';
                    var ddl = document.getElementById("ddQ" + $rootScope.questionnaireList[i].Question_Id);
                    var val = parseInt(ddl.options[ddl.selectedIndex].value);
                    $rootScope.questionnaireResult += val;
                }
            }

            if ($rootScope.questionnaireResult.indexOf("NaN") != -1) {
                $rootScope.questionnaireResult = '';
            }
            return $rootScope.questionnaireResult;
        }

        function getABetterOffer() {
            debugger;

            $rootScope.questionnaireResult = '';
            var questionnaireResult = checkQuestionnaire();
            
            var year = parseInt(localStorage.getItem('selectedYear'));
            var makeId = parseInt(localStorage.getItem('selectedMakeId'));
            var modelId = parseInt(localStorage.getItem('selectedModelId'));
            var make = localStorage.getItem('selectedMake');
            var model = localStorage.getItem('selectedModel');
            var name = homeControllerVM.homeBetterOfferName;
            var address = homeControllerVM.homeBetterOfferAddress;
            var city = homeControllerVM.homeBetterOfferCity;
            var zipCode = localStorage.getItem('selectedZipCode');
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

            localStorage.setItem('Name', name);
            localStorage.setItem('Address', address);
            localStorage.setItem('CityId', cityId);
            localStorage.setItem('StateId', stateId);
            localStorage.setItem('Phone', phone);
            localStorage.setItem('Email', email);

            $scope.startSpin();
            
            if (questionnaireResult.length > 0) {
                getAnOfferWithQuestionnaire();
            }
            else {
                return homeService.getABetterOffer({ address: address, cityId: cityId, emailAddress: email, make: make, model: model, name: name, phone: phone, selectedMakeId: makeId, selectedModelId: modelId, selectedYear: year, stateId: stateId, zipCode: zipCode })
                    .then(function (serviceResponse) {
                        $rootScope.offerPrice = '$';
                        $rootScope.offerPrice += serviceResponse.data;
                        localStorage.setItem('Price', $rootScope.offerPrice);
                        if ($rootScope.offerPrice.length > 0) {
                            $rootScope.offerPrice = getOfferPrice();
                            offerTab();
                            //document.getElementById("tabOfferAnchor").click();                        
                        }

                        $scope.reset();
                        $scope.stopSpin();
                        return $rootScope.offerPrice;
                    }).catch(function (serviceError) {
                        failureAlert(serviceError.data);
                        console.log(serviceError.data);
                        return null;
                    });
            }
        }
        
        function getQuestionnaire() {          
            $scope.startSpin();
            return homeService.getQuestionnaire()
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;
                    $rootScope.questionnaireList = response;                    
                    fillQuestionnairesLists();                    
                    $scope.reset();
                    $scope.stopSpin();
                    return $rootScope.questionnaireList = response;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });
        }

        function fillQuestionnairesLists() {
            for (var i = 0; i < $rootScope.questionnaireList.length; i++) {
                if ($rootScope.questionnaireList[i].Sub_Questionnaire_Id == 2) {
                    homeControllerVM.drivetrainQuestionnaireList.push($rootScope.questionnaireList[i]);
                }
                else if ($rootScope.questionnaireList[i].Sub_Questionnaire_Id == 3)
                { homeControllerVM.interiorExteriorQuestionnaireList.push($rootScope.questionnaireList[i]); }
            }            
        }

        //function postQuestionnaire()
        //{
        //    debugger;
        //    var questionnaire = '';
        //    for (var i = 0; i < $rootScope.questionnaireList.length; i++) {
        //        if (i == 0) {
        //            questionnaire += $rootScope.questionnaireList[i].Question.Question + ",";
        //            var ddl = document.getElementById("ddQ" + $rootScope.questionnaireList[i].Question_Id);
        //            var val = ddl.options[ddl.selectedIndex].text;
        //            questionnaire += val;
        //        }
        //        else {
        //            questionnaire += "," + $rootScope.questionnaireList[i].Question.Question;
        //            var ddl = document.getElementById("ddQ" + $rootScope.questionnaireList[i].Question_Id);
        //            var val = ddl.options[ddl.selectedIndex].text;
        //            questionnaire += val;
        //        }
        //    }           

        //    console.log(questionnaire);
            
        //    return homeService.postQuestionnaire({ questionnaire: questionnaire })
        //       .then(function (serviceResponse) {
        //           var response = serviceResponse.data;                  
        //           return response;
        //       }).catch(function (serviceError) {
        //           failureAlert(serviceError.data);
        //           console.log(serviceError.data);
        //           return null;
        //       });
        //}

        function confirmOffer() {
            debugger;          
            $rootScope.questionnaireResult = checkQuestionnaire();
            var year = parseInt(localStorage.getItem('selectedYear'));
            var makeId = parseInt(localStorage.getItem('selectedMakeId'));
            var modelId = parseInt(localStorage.getItem('selectedModelId'));
            var make = localStorage.getItem('selectedMake');
            var model = localStorage.getItem('selectedModel');
            var name = localStorage.getItem('Name');
            var address = localStorage.getItem('Address');
            var cityId = localStorage.getItem('CityId');
            var zipCode = homeControllerVM.homeZipCode;
            var stateId = localStorage.getItem('StateId');
            var phone = localStorage.getItem('Phone');
            var email = localStorage.getItem('Email');
            var price = $rootScope.offerPrice;
            var contactNo = $rootScope.contactNo;

            //var stateId = '';
            //var cityId = '';

            //for (var i = 0; i < homeControllerVM.statesList.length; i++) {
            //    if (homeControllerVM.statesList[i].State_Name == state) {
            //        stateId = parseInt(homeControllerVM.statesList[i].State_Id);
            //        break;
            //    }
            //}

            //for (var i = 0; i < homeControllerVM.citiesList.length; i++) {
            //    if (homeControllerVM.citiesList[i].City_Name == city) {
            //        cityId = parseInt(homeControllerVM.citiesList[i].City_Id);
            //        break;
            //    }
            //}            

            $scope.startSpin();
            if ($rootScope.questionnaireResult.length > 0) {
                confirmOfferWithQuestionnaire();
            }
            else {
                return homeService.confirmOffer({ address: address, cityId: cityId, contactNo: contactNo, emailAddress: email, make: make, model: model, name: name, phone: phone, price: price, selectedMakeId: makeId, selectedModelId: modelId, selectedYear: year, stateId: stateId, zipCode: zipCode })
                    .then(function (serviceResponse) {
                        var response = serviceResponse.data;
                        if (response == "Confirmed") {
                            $scope.reset();
                            $scope.stopSpin();
                            alert("Thank you for your business! someone will contact you shortly to arrange a suitable appointment that fits your schedule");
                            localStorage.clear();
                            clearAllData();
                            clearCustomerInfoPopup();
                            carMakeModelTab();
                        }
                        else {
                            $scope.reset();
                            $scope.stopSpin();
                        }
                        return response;
                    }).catch(function (serviceError) {
                        failureAlert(serviceError.data);
                        console.log(serviceError.data);
                        return null;
                    });
            }
        } 

        function confirmOfferWithQuestionnaire()
        {
            debugger;            
            $rootScope.questionnaireResult = checkQuestionnaire();
            var year = parseInt(localStorage.getItem('selectedYear'));
            var makeId = parseInt(localStorage.getItem('selectedMakeId'));
            var modelId = parseInt(localStorage.getItem('selectedModelId'));
            var make = localStorage.getItem('selectedMake');
            var model = localStorage.getItem('selectedModel');
            var name = localStorage.getItem('Name');
            var address = localStorage.getItem('Address');
            var cityId = localStorage.getItem('CityId');
            var zipCode = homeControllerVM.homeZipCode;
            var stateId = localStorage.getItem('StateId');
            var phone = localStorage.getItem('Phone');
            var email = localStorage.getItem('Email');
            var price = $rootScope.offerPrice;
            var contactNo = $rootScope.contactNo;

            //var stateId = '';
            //var cityId = '';

            //for (var i = 0; i < homeControllerVM.statesList.length; i++) {
            //    if (homeControllerVM.statesList[i].State_Name == state) {
            //        stateId = parseInt(homeControllerVM.statesList[i].State_Id);
            //        break;
            //    }
            //}

            //for (var i = 0; i < homeControllerVM.citiesList.length; i++) {
            //    if (homeControllerVM.citiesList[i].City_Name == city) {
            //        cityId = parseInt(homeControllerVM.citiesList[i].City_Id);
            //        break;
            //    }
            //}            

            $scope.startSpin();
            return homeService.confirmOfferWithQuestionnaire({ address: address, cityId: cityId, contactNo: contactNo, emailAddress: email, make: make, model: model, name: name, phone: phone, price: price, questionnaire: $rootScope.questionnaireResult, selectedMakeId: makeId, selectedModelId: modelId, selectedYear: year, stateId: stateId, zipCode: zipCode })
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;
                    if (response == "Confirmed") {
                        $scope.reset();
                        $scope.stopSpin();
                        alert("Thank you for your business! someone will contact you shortly to arrange a suitable appointment that fits your schedule");
                        localStorage.clear();
                        clearAllData();
                        clearCustomerInfoPopup();
                        carMakeModelTab();
                    }
                    else {
                        $scope.reset();
                        $scope.stopSpin();
                    }
                    return response;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });
        }

        function updateYear(year)
        {
            debugger;
            homeControllerVM.homeSelectedRegistrationYear = year;
            localStorage.setItem('selectedYear', year);
            //clearMake();
            //clearModel();
        }

        function updateMake(make)
        {
            debugger;
            homeControllerVM.homeSelectedMake = make;           
            var makeId = '';
            for (var i = 0; i < $rootScope.makesList.length; i++) {
                if ($rootScope.makesList[i].Make_Name == make) {
                    makeId = parseInt($rootScope.makesList[i].Make_Id);
                    break;
                }
            }
            localStorage.setItem('selectedMake', make);
            localStorage.setItem('selectedMakeId', makeId);
            //clearModel();
        }          

        function updateModel(model)
        {
            debugger;
            homeControllerVM.homeSelectedModel = model;
            var modelId = '';
            for (var i = 0; i < $rootScope.modelsList.length; i++) {
                if ($rootScope.modelsList[i].Model_Name == model) {
                    modelId = parseInt($rootScope.modelsList[i].Model_Id);
                    break;
                }
            }
            localStorage.setItem('selectedModel', model);
            localStorage.setItem('selectedModelId', modelId);
        }

        function getOfferPrice()
        {            
            return localStorage.getItem('Price');
        }

        function setInput()
        {            
            homeControllerVM.homeSelectedRegistrationYear = localStorage.getItem('selectedYear');
            homeControllerVM.homeSelectedMake = localStorage.getItem('selectedMake');
            homeControllerVM.homeSelectedModel = localStorage.getItem('selectedModel');
        }
        
        function clearMake()
        {       
            homeControllerVM.homeSelectedMake = '';
            localStorage.setItem('selectedMake', '');
            localStorage.setItem('selectedMakeId', '');            
        }

        function clearModel()
        {     
            homeControllerVM.homeSelectedModel = '';
            localStorage.setItem('selectedModel', '');
            localStorage.setItem('selectedModelId', '');
        }

        function clearAllData()
        {
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

            homeControllerVM.offerTabNegotiationMessage = '';                  

            for (var i = 0; i < $rootScope.questionnaireList.length; i++) {                    
                    var ddl = document.getElementById("ddQ" + $rootScope.questionnaireList[i].Question_Id);
                    ddl.selectedIndex = 0;
            }
        }

        function clearCustomerInfoPopup()
        {
            $rootScope.offerPrice = '';
            $rootScope.contactNo = '';
            
            document.getElementById("callUsZipCode").value = '';

            document.getElementById("basicModalName").value = '';
            document.getElementById("basicModalAddress").value = '';
            document.getElementById("basicModalState").value = '';
            document.getElementById("basicModalCity").value = '';
            document.getElementById("basicModalZipCode").value = '';
            document.getElementById("basicModalPhone").value = '';
            document.getElementById("basicModalEmail").value = '';          
        }

        function navigateToQuestionnaire()
        {
            questionnaireTab();
        }

        function navigatePrevious()
        {
            tabPrev();
        }
        function navigateNext()
        {
            tabNext();
        }
        
    }
})();
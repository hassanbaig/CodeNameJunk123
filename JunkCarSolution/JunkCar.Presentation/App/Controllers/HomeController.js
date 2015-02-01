(function () {
    'use strict';

    angular.module('app').controller('homeController', ['homeService', '$scope', '$location', 'usSpinnerService', '$rootScope', 'alertsManager', '$http', '$timeout', '$upload', homeController]);
    //'$modal',    
    function homeController(homeService, $scope, $location, usSpinnerService, $rootScope, alertsManager, $http, $timeout, $upload) {
        
        /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ============================================================ Home Controller ===========================================================
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]------------------------------------------------------ Configuration ---------------------------------------------------------
        $('#myTab li a').click(function (event) {
            event.preventDefault();
        });

        $('.btnNext').click(function () {
            $('.nav-tabs > .active').next('li').find('a').trigger('click');
        });

        $('.btnPrevious').click(function () {
            $('.nav-tabs > .active').prev('li').find('a').trigger('click');
        });

        var showCustomerInfoPopup = function () {
            $("#basicModal").modal("show");
            var zipCode = $("#locationTabZipCode").val();
            $("#basicModalZipCode").val(zipCode);
            $("#editZipCode").val(zipCode);
            $("#callUsZipCode").val(zipCode);
        }
        
        var myTabs, myTabsActive, tabNext, tabPrev, carMakeModelTab, locationTab, questionnaireTab, photoTab, offerTab;
        $(function () {
            myTabs = $('#myTab li').length;
            myTabsActive = 0; //or yours active tab                   

            tabNext = function () {
                var year = $("#carMakeModelYear").val();
                var make = $("#carMakeModelMake").val();
                var model = $("#carMakeModelModel").val();
                var cylinder = $("#carMakeModelCylinder").val();

                if (year.length != 0 && make.length != 0 && model.length != 0 && cylinder.length != 0) {
                    if (myTabsActive < 3) {
                        var index = myTabsActive + 1;
                        index = index >= myTabs ? 0 : index;

                        //$('#myTab a[href="#tab' + index + '"]').tab('show');
                        $('#myTab li:eq(' + index + ') a').tab('show');
                        //$('#myTab li:eq(' + index + ') a').attr('href', '#tab' + index);
                        //$('#myTab li:eq(' + index + ') a').attr('data-toggle', 'tab');

                        myTabsActive = index;
                        if (myTabsActive == 3)
                        { showCustomerInfoPopup(); }
                    }
                }
                else {
                    alert("Please enter year, make, model and cylinders");
                }
            }

            tabPrev = function () {
                var year = $("#carMakeModelYear").val();
                var make = $("#carMakeModelMake").val();
                var model = $("#carMakeModelModel").val();
                var cylinder = $("#carMakeModelCylinder").val();
                if (year.length != 0 && make.length != 0 && model.length != 0 && cylinder.length != 0) {
                    if (myTabsActive > 0) {
                        var index = myTabsActive - 1;
                        index = index < 0 ? myTabs - 1 : index;

                        //$('#myTab a[href="#tab' + index + '"]').tab('show');
                        $('#myTab li:eq(' + index + ') a').tab('show');
                        //$('#myTab li:eq(' + index + ') a').attr('href', '#tab' + index);
                        //$('#myTab li:eq(' + index + ') a').attr('data-toggle', 'tab');                                
                        myTabsActive = index;
                    }
                }
                else {
                    alert("Please enter year, make, model and cylinders");
                }
            }

            carMakeModelTab = function () {
                $('#myTab li:eq(0) a').tab('show');
                myTabsActive = 0;
            }

            locationTab = function () {
                $('#myTab li:eq(1) a').tab('show');
                myTabsActive = 1;
            }

            questionnaireTab = function () {
                $('#myTab li:eq(2) a').tab('show');
                myTabsActive = 2;
            }

            photoTab = function () {
                $('#myTab li:eq(3) a').tab('show');
                myTabsActive = 3;
            }

            offerTab = function () {
                $('#myTab li:eq(4) a').tab('show');
                myTabsActive = 4;
            }
        });
        //[End]------------------------------------------------------ Configuration ---------------------------------------------------------

        /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ============================================================ Home Controller ===========================================================
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]------------------------------------------------------ Home variables ----------------------------------------------------------
        var allFiles = [];
        $scope.upload = [];

        //---------------------------------------------------------- ViewModel variables --------------------------------------------------------        
        var homeControllerVM = this;        
        
        homeControllerVM.statesList = [];
        homeControllerVM.citiesList = [];        
        homeControllerVM.drivetrainQuestionnaireList = [];
        homeControllerVM.interiorExteriorQuestionnaireList = [];

        homeControllerVM.homeSelectedRegistrationYear = '';
        homeControllerVM.homeSelectedMake = '';
        homeControllerVM.homeSelectedModel = '';
        homeControllerVM.homeSelectedCylinders = '';
        homeControllerVM.homeZipCode = '';
        homeControllerVM.homeBetterOfferName = '';
        homeControllerVM.homeBetterOfferAddress = '';
        homeControllerVM.homeBetterOfferCity = '';
        homeControllerVM.homeBetterOfferState = '';
        homeControllerVM.homeBetterOfferPhone = '';
        homeControllerVM.homeBetterOfferEmail = '';

        homeControllerVM.offerTabNegotiationMessage = '';

        homeControllerVM.isValidZipCode = false;
        //---------------------------------------------------------- $rootScope variables ----------------------------------------------------------                
        $rootScope.questionnaireList = [];
        $rootScope.registrationYearsList = [];
        $rootScope.makesList = [];
        $rootScope.modelsList = [];
        $rootScope.cylindersList = [];
        $rootScope.offerPrice = '';
        $rootScope.contactNo = '';
        $rootScope.questionnaireResult = '';
        $rootScope.operationType = 0;
        //---------------------------------------------------------- $scope variables ----------------------------------------------------------        
        $scope.isDisableGetAnOfferButton = false;
        $scope.isDisableGetABetterOfferButton = false;
        //[End]------------------------------------------------------ Home variables ----------------------------------------------------------

        /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ============================================================ Home Controller ===========================================================
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]------------------------------------------------------ Setup ------------------------------------------------------------------        
        //---------------------------------------------------------- Alerts setup --------------------------------------------------------------        
        $scope.alerts = alertsManager.alerts;

        $scope.successAlert = successAlert;
        $scope.failureAlert = failureAlert;

        // Success alert
        function successAlert(message) {
            alertsManager.addAlert(message, 'alert-success');
        }

        // Failure alert
        function failureAlert(message) {
            alertsManager.addAlert(message, 'alert-danger');
        };

        // Reset alerts
        $scope.reset = function () {
            alertsManager.clearAlerts();
        };
        //---------------------------------------------------------- Spinner setup ----------------------------------------------------------                      
        // Start spin
        $scope.startSpin = function () {
            if (!$scope.spinneractive) {
                usSpinnerService.spin('spinner-1');
            }
        };

        // Stop spin
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
        //[End]------------------------------------------------------ Setup ----------------------------------------------------------

        /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ============================================================ Home Controller ===========================================================
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
        
        //[Start]--------------------------------------------------- Methods definition ---------------------------------------------------------
        //---------------------------------------------------------- ViewModel Methods ----------------------------------------------------------        
        homeControllerVM.getRegistrationYears = getRegistrationYears;
        homeControllerVM.getMakesByYear = getMakesByYear;
        homeControllerVM.getModelsByYearMake = getModelsByYearMake;
        homeControllerVM.getCylinders = getCylinders;
        homeControllerVM.checkZipCode = checkZipCode;
        homeControllerVM.checkForCustomerInfoPopupOnGetAnOffer = checkForCustomerInfoPopupOnGetAnOffer;
        homeControllerVM.checkZipCodeBeforeQuestionnaireOnGetABetterOffer = checkZipCodeBeforeQuestionnaireOnGetABetterOffer;
        homeControllerVM.checkZipCodeOnSaveEdit = checkZipCodeOnSaveEdit;
        homeControllerVM.getAnOffer = getAnOffer;
        homeControllerVM.getABetterOffer = getABetterOffer;
        homeControllerVM.getStates = getStates;
        homeControllerVM.getCities = getCities;
        homeControllerVM.getQuestionnaire = getQuestionnaire;
        homeControllerVM.saveYearData = saveYearData;
        homeControllerVM.saveMakeData = saveMakeData;
        homeControllerVM.saveModelData = saveModelData;
        homeControllerVM.saveCylinderData = saveCylinderData;
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
        homeControllerVM.checkOfferType = checkOfferType;
        homeControllerVM.closeSaveEdit = closeSaveEdit;
        //[End]--------------------------------------------------- Methods definition ---------------------------------------------------------

        /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ============================================================ Home Controller ===========================================================
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]------------------------------------------------------ Methods implementation ----------------------------------------------------------
        //------------------------------------------------------------- $rootScope Methods --------------------------------------------------------------
        // Add each file in "allFiles" on select 
        $rootScope.onEachFileSelect = function ($files) {
            allFiles.push($files);
        }
        
        //$scope.fileUploadObj = { testString1: "Test string 1", testString2: "Test string 2" };

        // Upload photos on upload button click
        $rootScope.onFileSelect = function () {
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < allFiles.length; i++) {
                var $file = allFiles[i];
                (function (index) {
                    $scope.upload[index] = $upload.upload({
                        url: 'http://localhost/JunkCarWebAPI/API/Home/Upload', // webapi url
                        //url: 'API/API/Home/Upload', // webapi url
                        method: 'POST',                        
                        file: $file
                    }).progress(function (evt) {
                        // get upload percentage
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function (data, status, headers, config) {                        // file is uploaded successfully                                                                                                                    
                        console.log(data);
                    }).error(function (data, status, headers, config) {
                        // file failed to upload
                        console.log(data);
                    });
                })(i);
            }
            // clear allFiles after upload
            allFiles.length = 0;
            document.getElementById("fileUpload1").value = null;
            document.getElementById("file1Name").value = null;
            document.getElementById("fileUpload2").value = null;
            document.getElementById("file2Name").value = null;
            document.getElementById("fileUpload3").value = null;
            document.getElementById("file3Name").value = null;
            document.getElementById("fileUpload4").value = null;
            document.getElementById("file4Name").value = null;
            document.getElementById("fileUpload5").value = null;
            document.getElementById("file5Name").value = null;

            if (allFiles.length <= 0) {
                alert("All files uploaded successfully");
            }
        }
        $scope.abortUpload = function (index) {
            $scope.upload[index].abort();
        }       

        // Clear file 1 data
        $rootScope.clearFile1 = function () {
            document.getElementById("fileUpload1").value = null;
            document.getElementById("file1Name").value = null;
            allFiles.splice(0, 1);
        }
        // Clear file 2 data
        $rootScope.clearFile2 = function () {
            document.getElementById("fileUpload2").value = null;
            document.getElementById("file2Name").value = null;
            allFiles.splice(1, 1);
        }
        // Clear file 3 data
        $rootScope.clearFile3 = function () {
            document.getElementById("fileUpload3").value = null;
            document.getElementById("file3Name").value = null;
            allFiles.splice(2, 1);
        }
        // Clear file 4 data
        $rootScope.clearFile4 = function () {
            document.getElementById("fileUpload4").value = null;
            document.getElementById("file4Name").value = null;
            allFiles.splice(3, 1);
        }
        // Clear file 5 data
        $rootScope.clearFile5 = function () {
            document.getElementById("fileUpload5").value = null;
            document.getElementById("file5Name").value = null;
            allFiles.splice(4, 1);
        }
        // Disable offer buttons
        $rootScope.disableButtons = function () {
            $scope.isDisableGetAnOfferButton = true;
            $scope.isDisableGetABetterOfferButton = true;
        }
        // Enable offer buttons
        $rootScope.enableButtons = function () {
            $scope.isDisableGetAnOfferButton = false;
            $scope.isDisableGetABetterOfferButton = false;
        }

        $rootScope.onKeyPress = function (event, zipCode) {
            if (event.which === 13) {
                $rootScope.operationType = 4;
                debugger;
                var zc = $("#callUsZipCode").val();
                checkZipCode(zc);
                homeControllerVM.homeZipCode = zc;
            }
            else {
            }
        }
        //------------------------------------------------------------- Methods --------------------------------------------------------------
        // Local storage management        

        // Save year to local storage
        function saveYearData() {
            var year = homeControllerVM.homeSelectedRegistrationYear;
            localStorage.setItem('selectedYear', year);
            //var tempYear = localStorage.getItem('selectedYear');
            //homeControllerVM.homeSelectedRegistrationYear = tempYear;
        }
        // Save make to local storage
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
        // Save model to local storage
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
        // Save cylinders to local storage
        function saveCylinderData() {
            var cylinders = homeControllerVM.homeSelectedCylinders;
            localStorage.setItem('selectedCylinders', cylinders);
        }
        // Save zipcode to local storage
        function saveZipCodeData() {
            var zipCode = homeControllerVM.homeZipCode;
            localStorage.setItem('selectedZipCode', zipCode);            
        }
        // Update year in local storage
        function updateYear(year) {
            homeControllerVM.homeSelectedRegistrationYear = year;
            localStorage.setItem('selectedYear', year);
        }
        // Update make in local storage
        function updateMake(make) {
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
        }
        // Update model in local storage
        function updateModel(model) {
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
        // Get offer price from local storage
        function getOfferPrice() {
            return localStorage.getItem('Price');
        }
        // Get year, make and model from local storage, set data
        function setInput() {
            homeControllerVM.homeSelectedRegistrationYear = localStorage.getItem('selectedYear');
            homeControllerVM.homeSelectedMake = localStorage.getItem('selectedMake');
            homeControllerVM.homeSelectedModel = localStorage.getItem('selectedModel');
        }
        // Clear make
        function clearMake() {
            homeControllerVM.homeSelectedMake = '';
            localStorage.setItem('selectedMake', '');
            localStorage.setItem('selectedMakeId', '');
        }
        // Clear model
        function clearModel() {
            homeControllerVM.homeSelectedModel = '';
            localStorage.setItem('selectedModel', '');
            localStorage.setItem('selectedModelId', '');
        }
        // Close save edit
        function closeSaveEdit() {
            setInput();
        }
        // Get registration years list
        function getRegistrationYears() {            
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
        // Get makes list by selected year
        function getMakesByYear() {
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
        // Get models list by selected year and make
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
        // Get cylinders list
        function getCylinders() {       
            $scope.startSpin();
            return homeService.getCylinders()
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;
                    $rootScope.cylindersList = response;
                    $scope.reset();
                    $scope.stopSpin();
                    return $rootScope.cylindersList;
                }).catch(function (serviceError) {
                    failureAlert(serviceError.data);
                    console.log(serviceError.data);
                    return null;
                });
        }
        // Check zip-code on get an offer button click
        function checkForCustomerInfoPopupOnGetAnOffer(zipCode) {         
            $rootScope.disableButtons();
            $rootScope.operationType = 1;
            var zc = $("#locationTabZipCode").val();
            checkZipCode(zc);
            $rootScope.enableButtons();
        }
        // Check zip-code on get a better offer button click
        function checkZipCodeBeforeQuestionnaireOnGetABetterOffer(zipCode) {
            $rootScope.disableButtons();
            $rootScope.operationType = 2;
            var zc = $("#locationTabZipCode").val();
            checkZipCode(zc);
            homeControllerVM.homeZipCode = zc;
            $rootScope.enableButtons();
        }
        // Check zip-code on save edit button click
        function checkZipCodeOnSaveEdit(zipCode) {
            $rootScope.disableButtons();
            $rootScope.operationType = 3;
            var zc = $("#editZipCode").val();
            checkZipCode(zc);
            homeControllerVM.homeZipCode = zc;
            $rootScope.enableButtons();
        }        
        // Check zip-code
        function checkZipCode(zipCode) {            
            if (zipCode.length != 0) {
                $scope.startSpin();
                return homeService.checkZipCode({ zipCode: zipCode })
                    .then(function (serviceResponse) {
                        var response = serviceResponse.data;
                        if (response.Is_Valid_Zip_Code == false) {
                            homeControllerVM.isValidZipCode = false;
                            $rootScope.contactNo = '';
                            $("#locationTabZipCode").val('');
                            $("#basicModalZipCode").val('');
                            $("#editZipCode").val('');
                            $("#callUsZipCode").val('');
                            homeControllerVM.homeZipCode = '';
                            alert("Please enter a valid zipcode")
                        }
                        else {
                            homeControllerVM.isValidZipCode = true;
                            $rootScope.contactNo = response.Contact_No;
                            switch ($rootScope.operationType) {
                                case 1:
                                    //Get an offer click
                                    showCustomerInfoPopup();
                                    $("#basicModalZipCode").val(zipCode);
                                    $("#editZipCode").val(zipCode);
                                    $("#callUsZipCode").val(zipCode);
                                    homeControllerVM.homeZipCode = zipCode;
                                    break;
                                case 2:
                                    // Get a better offer click
                                    navigateToQuestionnaire();
                                    $("#basicModalZipCode").val(zipCode);
                                    $("#editZipCode").val(zipCode);
                                    $("#callUsZipCode").val(zipCode);
                                    homeControllerVM.homeZipCode = zipCode;
                                    break;
                                case 3:
                                    // Save edit "Save" click
                                    var carYear = $("#editYear").val();
                                    var carMake = $("#editMake").val();
                                    var carModel = $("#editModel").val();

                                    $("#carMakeModelYear").val(carYear);
                                    $("#carMakeModelMake").val(carMake);
                                    $("#carMakeModelModel").val(carModel);

                                    $("#basicModalZipCode").val(zipCode);
                                    $("#locationTabZipCode").val(zipCode);
                                    $("#callUsZipCode").val(zipCode);
                                    homeControllerVM.homeZipCode = zipCode;
                                    break;
                                case 4:
                                    // Call us enter keypress
                                    $("#basicModalZipCode").val(zipCode);
                                    $("#locationTabZipCode").val(zipCode);
                                    $("#editZipCode").val(zipCode);
                                    homeControllerVM.homeZipCode = zipCode;
                                    break;
                                default:
                                    break;
                            }
                            if ($rootScope.contactNo.length > 0) {
                                homeControllerVM.offerTabNegotiationMessage = 'Please call for negotiation';
                            }
                        }
                        $scope.reset();
                        $scope.stopSpin();
                    }).catch(function (serviceError) {
                        $rootScope.contactNo = '';
                        homeControllerVM.homeZipCode = '';
                        failureAlert(serviceError.data);
                        console.log(serviceError.data);
                    });
            }
            else {
                alert("Enter zipcode");
            }
            $rootScope.operationType = 0;
        }
        // Get states list
        function getStates() {            
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
        // Get cities list
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
        // Check and create questionnaire string
        function checkQuestionnaire() {
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
        // Check offer type
        function checkOfferType() {
            switch ($rootScope.operationType) {
                case 1:
                    getAnOffer();
                    break;
                case 2:
                    getABetterOffer();
                    break;
                default:
                    break;
            }

        }
        // Get an offer 
        function getAnOffer() {
            var address = $("#basicModalAddress").val();
            var city = $("#basicModalCity").val();
            var email = $("#basicModalEmail").val();
            var name = $("#basicModalName").val();
            var phone = $("#basicModalPhone").val();
            var state = $("#basicModalState").val();
            var year = $("#carMakeModelYear").val();
            var make = $("#carMakeModelMake").val();
            var model = $("#carMakeModelModel").val();
            var zipcode = $("#basicModalZipCode").val();
            var cylinders = $("#carMakeModelCylinder").val();

            var makeId = '';
            var modelId = '';
            var stateId = '';
            var cityId = '';


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
            return homeService.getAnOffer({ address: address, cityId: cityId, cylinders: cylinders, emailAddress: email, make: make, model: model, name: name, phone: phone, selectedMakeId: makeId, selectedModelId: modelId, selectedYear: year, stateId: stateId, zipCode: zipcode })
                .then(function (serviceResponse) {
                    $rootScope.offerPrice = '$';
                    $rootScope.offerPrice += serviceResponse.data;
                    if ($rootScope.offerPrice.length > 0) {
                        offerTab();
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
        // Get a better offer
        function getABetterOffer() {
            $rootScope.questionnaireResult = '';
            var questionnaireResult = checkQuestionnaire();

            var address = $("#basicModalAddress").val();
            var city = $("#basicModalCity").val();
            var email = $("#basicModalEmail").val();
            var name = $("#basicModalName").val();
            var phone = $("#basicModalPhone").val();
            var state = $("#basicModalState").val();
            var year = $("#carMakeModelYear").val();
            var make = $("#carMakeModelMake").val();
            var model = $("#carMakeModelModel").val();
            var zipCode = $("#basicModalZipCode").val();
            var cylinders = $("#carMakeModelCylinder").val();

            var makeId = '';
            var modelId = '';
            var stateId = '';
            var cityId = '';


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
            return homeService.getABetterOffer({ address: address, cityId: cityId, cylinders: cylinders, emailAddress: email, make: make, model: model, name: name, phone: phone, questionnaire: questionnaireResult, selectedMakeId: makeId, selectedModelId: modelId, selectedYear: year, stateId: stateId, zipCode: zipCode })
            .then(function (serviceResponse) {
                $rootScope.offerPrice = '$';
                $rootScope.offerPrice += serviceResponse.data;
                localStorage.setItem('Price', $rootScope.offerPrice);
                if ($rootScope.offerPrice.length > 0) {
                    $rootScope.offerPrice = getOfferPrice();
                    offerTab();
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
        // Get questionnaire 
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
        // Populate different questionnaire lists
        function fillQuestionnairesLists() {
            for (var i = 0; i < $rootScope.questionnaireList.length; i++) {
                if ($rootScope.questionnaireList[i].Sub_Questionnaire_Id == 2) {
                    homeControllerVM.drivetrainQuestionnaireList.push($rootScope.questionnaireList[i]);
                }
                else if ($rootScope.questionnaireList[i].Sub_Questionnaire_Id == 3)
                { homeControllerVM.interiorExteriorQuestionnaireList.push($rootScope.questionnaireList[i]); }
            }
        }
        // Confirm offer without questionnaire
        function confirmOffer() {       
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
        // Confirm offer with questionnaire
        function confirmOfferWithQuestionnaire() {         
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
        // Clear all data
        function clearAllData() {
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
        // Clear customer information
        function clearCustomerInfoPopup() {
            $rootScope.offerPrice = '';
            $rootScope.contactNo = '';
            $("#editYear").val('');
            $("#editMake").val('');
            $("#editModel").val('');
            $("#editZipCode").val('');
            $("#carMakeModelYear").val('');
            $("#carMakeModelMake").val('');
            $("#carMakeModelModel").val('');
            $("#carMakeModelCylinder").val('');
            $("#locationTabZipCode").val('');
            $("#callUsZipCode").val('');
            $("#basicModalName").val('');
            $("#basicModalAddress").val('');
            $("#basicModalState").val('');
            $("#basicModalCity").val('');
            $("#basicModalZipCode").val('');
            $("#basicModalPhone").val('');
            $("#basicModalEmail").val('');
            $rootScope.clearFile1();
            $rootScope.clearFile2();
            $rootScope.clearFile3();
            $rootScope.clearFile4();
            $rootScope.clearFile5();
        }
        // Navigate to questionnaire
        function navigateToQuestionnaire() {
            questionnaireTab();
        }
        // Previous tab
        function navigatePrevious() {
            tabPrev();
        }
        // Next tab
        function navigateNext() {
            tabNext();
        }
        //[End]------------------------------------------------------ Methods implementation ----------------------------------------------------------






        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //$scope.redirectLogin = function () {
        //    $location.path('/Login');
        //    window.location = "Login.html";
        //}

        //function isValidEmail(emailAddress) {
        //    return homeService.isValidEmail(emailAddress);
        //}
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
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
    }
})();
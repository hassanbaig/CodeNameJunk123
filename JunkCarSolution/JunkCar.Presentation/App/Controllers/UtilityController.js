     /* ________________________________________________________________________________________________________
       | Company         | ShinerSoft Private Limited                                                          |
       |_________________|_____________________________________________________________________________________|       
       | File            |  UtilityController.js                                                                  |
       |_________________|_____________________________________________________________________________________|
       | Description     |   * Controller/ViewModel: todolists                                                 |
       |                 |   * Support a view of all TodoLists                                                 |
       |                 |   * Handles fetch and save of these lists                                           |
       |_________________|_____________________________________________________________________________________|
       | Created By      |  HASSAN MUSTAFA BAIG                                                                |
       |_________________|_____________________________________________________________________________________|
       | Date Created    |  06 Feb 2015                                                                        |
       |_________________|_____________________________________________________________________________________|
       | Modified By     |                                                                                     | 
       |_________________|_____________________________________________________________________________________|
       | Date Modified   |  06 Feb 2015                                                                        |
       |_________________|_____________________________________________________________________________________|*/

(function () {
    'use strict';   
    angular.module('app').controller('utilityController', ['utilityService', '$scope', '$location', 'usSpinnerService', '$rootScope', 'alertsManager', utilityController]);

    function utilityController(utilityService, $scope, $location, usSpinnerService, $rootScope, alertsManager) {

       /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ========================================================== Utility Controller ==========================================================
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]--------------------------------------------------- Accounts variables ------------------------------------------------------
        //---------------------------------------------------------- ViewModel variables --------------------------------------------------------        
        var utilityControllerVM = this;
                
        utilityControllerVM.contactUsName = '';
        utilityControllerVM.contactUsEmail = '';
        utilityControllerVM.contactUsPhone = '';
        utilityControllerVM.contactUsSubject = '';
        utilityControllerVM.contactUsMessage = '';

        utilityControllerVM.zipCode = '';

        utilityControllerVM.isValidName = true;
        utilityControllerVM.isValidEmail = true;
        utilityControllerVM.isValidPhone = true;
        utilityControllerVM.isValidSubject = true;
        utilityControllerVM.isValidMessage = true;
        //---------------------------------------------------------- $rootScope variables ----------------------------------------------------------                
        $rootScope.contactNo = '';        
        //[End]------------------------------------------------------ Accounts variables ------------------------------------------------------

        /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ========================================================== Utility Controller ==========================================================
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]------------------------------------------------------ Setup --------------------------------------------------------------------        
        //---------------------------------------------------------- Alerts setup ----------------------------------------------------------------        
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
          ========================================================== Utility Controller ==========================================================
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]--------------------------------------------------- Methods definition ---------------------------------------------------------
        //---------------------------------------------------------- ViewModel Methods ----------------------------------------------------------
        utilityControllerVM.redirectIndex = redirectIndex;
        utilityControllerVM.redirectHowItWorks = redirectHowItWorks;
        utilityControllerVM.redirectAboutUs = redirectAboutUs;
        utilityControllerVM.redirectContactUs = redirectContactUs;
        utilityControllerVM.redirectSignUp = redirectSignUp;
        utilityControllerVM.redirectLogin = redirectLogin;
        utilityControllerVM.contactEmailSend = contactEmailSend;
        utilityControllerVM.checkZipCode = checkZipCode;
        //[End]----------------------------------------------------- Methods definition ---------------------------------------------------------

        /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ========================================================== Utility Controller ==========================================================
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]------------------------------------------------------ Methods implementation ----------------------------------------------------------
        //------------------------------------------------------------- $scope Methods --------------------------------------------------------------        
       // // Check email validation
       // $scope.checkEmail = function () {
       //return utilityService.checkEmail(utilityControllerVM.signupEmailAddress);
       //     //    var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{0,4}$/;
       //     //    if (!filter.test(value)) {
       //     //        return false;
       //     //    }
       //     //    return true;
       // }
       // $scope.checkUserNameEmail = function () {
       //     return utilityService.checkEmail(utilityControllerVM.signupName);
       //     //    var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{0,4}$/;
       //     //    if (!filter.test(value)) {
       //     //        return false;
       //     //    }
       //     //    return true;
        // }
        //------------------------------------------------------------- $rootScope Methods --------------------------------------------------------------
        // On key press, check zip-code
        $rootScope.onKeyPress = function (event) {
            if (event.which === 13) {                
                debugger;
                var zc = $("#callUsZipCode").val();
                checkZipCode(zc);
                utilityControllerVM.zipCode = zc;
            }
            else {
            }
        }
        //------------------------------------------------------------- Methods --------------------------------------------------------------
        // Navigate to "Home"
        function redirectIndex() {
            utilityService.redirectIndex();
        }
        // Navigate to "How it works"
        function redirectHowItWorks() {
            utilityService.redirectHowItWorks();
        }
        // Navigate to "About us"
        function redirectAboutUs() {
            utilityService.redirectAboutUs();
        }
        // Navigate to "Contact us"
        function redirectContactUs() {
            utilityService.redirectContactUs();
        }
        // Navigate to "Sign up"
        function redirectSignUp() {
            utilityService.redirectSignUp();
        }
        // Navigate to "Login"
        function redirectLogin() {
            utilityService.redirectLogin();
        }

        // Authenticate user
        function contactEmailSend() {            
            var name = utilityControllerVM.contactUsName;
            var email = utilityControllerVM.contactUsEmail;
            var phone = utilityControllerVM.contactUsPhone;
            var subject = utilityControllerVM.contactUsSubject;
            var message = utilityControllerVM.contactUsMessage;
                       
            if (name.length <= 0)
            {                utilityControllerVM.isValidName = true;         }
            else
            {utilityControllerVM.isValidName = false;}

            if (email.length <= 0) {
                utilityControllerVM.isValidEmail = true;
            }
            else
            {utilityControllerVM.isValidEmail = false;}


            if (phone.length <= 0) {
                utilityControllerVM.isValidPhone = true;
            }
            else { utilityControllerVM.isValidPhone = false; }


            if (subject.length <= 0) {
                utilityControllerVM.isValidSubject = true;
            }
            else {
                utilityControllerVM.isValidSubject = false;
            }
            if (message.length <= 0) {
                utilityControllerVM.isValidMessage = true;
            }
            else{utilityControllerVM.isValidMessage = false;}
            
            if (name.length > 0 && email.length > 0 && phone.length > 0 && subject.length > 0 && message.length > 0) {
                $scope.reset();
                $scope.startSpin();
                utilityControllerVM.isValidName = false;
                utilityControllerVM.isValidEmail = false;
                utilityControllerVM.isValidPhone = false;
                utilityControllerVM.isValidSubject = false;
                utilityControllerVM.isValidMessage = false;
                utilityService.contactEmailSend({ email: email, message: message, name: name, phone: phone, subject: subject }).then(function (data) {
                    var response = data.results;
                    $scope.stopSpin();
                    alert("Message sent successfully");
                    //$scope.redirectMain();               
                });
                utilityControllerVM.contactUsName = '';
                utilityControllerVM.contactUsEmail = '';
                utilityControllerVM.contactUsPhone = '';
                utilityControllerVM.contactUsSubject = '';
                utilityControllerVM.contactUsMessage = '';
            }               
        }        
        // Check zip-code
        function checkZipCode(zipCode) {
            if (zipCode.length != 0) {
                $scope.startSpin();
                return utilityService.checkZipCode({ zipCode: zipCode })
                    .then(function (serviceResponse) {
                        var response = serviceResponse.data;
                        if (response.Is_Valid_Zip_Code == false) {                            
                            $rootScope.contactNo = '';                            
                            $("#callUsZipCode").val('');
                            utilityControllerVM.zipCode = '';
                            alert("Please enter a valid zipcode")
                        }
                        else {                            
                            $rootScope.contactNo = response.Contact_No;                           
                        }
                        $scope.reset();
                        $scope.stopSpin();
                    }).catch(function (serviceError) {
                        $rootScope.contactNo = '';
                        utilityControllerVM.zipCode = '';
                        failureAlert(serviceError.data);
                        console.log(serviceError.data);
                    });
            }
            else {
                alert("Enter zipcode");
            }           
        }
        //[End]------------------------------------------------------ Methods implementation ----------------------------------------------------------
    }
})();
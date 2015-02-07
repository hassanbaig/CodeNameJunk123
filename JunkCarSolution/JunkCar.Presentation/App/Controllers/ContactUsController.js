     /* ________________________________________________________________________________________________________
       | Company         | ShinerSoft Private Limited                                                          |
       |_________________|_____________________________________________________________________________________|       
       | File            |  ContactUsController.js                                                                  |
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
    angular.module('app').controller('contactUsController', ['contactUsService', '$scope', '$location', 'usSpinnerService', '$rootScope', 'alertsManager', contactUsController]);

    function contactUsController(contactUsService, $scope, $location, usSpinnerService, $rootScope, alertsManager) {

       /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ========================================================== Contact us Controller =======================================================
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]--------------------------------------------------- Accounts variables ------------------------------------------------------
        //---------------------------------------------------------- ViewModel variables --------------------------------------------------------        
        var contactUsControllerVM = this;
                
        contactUsControllerVM.contactUsName = '';
        contactUsControllerVM.contactUsEmail = '';
        contactUsControllerVM.contactUsPhone = '';
        contactUsControllerVM.contactUsSubject = '';
        contactUsControllerVM.contactUsMessage = '';

        contactUsControllerVM.isValidName = true;
        contactUsControllerVM.isValidEmail = true;
        contactUsControllerVM.isValidPhone = true;
        contactUsControllerVM.isValidSubject = true;
        contactUsControllerVM.isValidMessage = true;
        //[End]------------------------------------------------------ Accounts variables ------------------------------------------------------

       /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ========================================================== Contact us Controller =======================================================
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
         ========================================================== Contact us Controller =======================================================
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]--------------------------------------------------- Methods definition ---------------------------------------------------------
        //---------------------------------------------------------- ViewModel Methods ----------------------------------------------------------
        contactUsControllerVM.contactEmailSend = contactEmailSend;        
        //[End]----------------------------------------------------- Methods definition ---------------------------------------------------------

       /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ========================================================== Contact us Controller =======================================================
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]------------------------------------------------------ Methods implementation ----------------------------------------------------------
        //------------------------------------------------------------- $scope Methods --------------------------------------------------------------
        // Navigate to Change Password
        $scope.redirectChangePassword = function () {
            window.location = "ChangePassword.html";
        }
        // Navigate to Main
        $scope.redirectMain = function () {
            //$location.path('/Login');
            window.location = "Index.html";
        }
        // Navigate to Login
        $scope.redirectLogin = function () {
            //$location.path('/Login');
            window.location = "Login.html";
        }
        // Navigate to Signup
        $scope.redirectSignup = function () {
            //$location.path('/Login');
            window.location = "Signup.html";
        }
       // // Check email validation
       // $scope.checkEmail = function () {
       //return contactUsService.checkEmail(contactUsControllerVM.signupEmailAddress);
       //     //    var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{0,4}$/;
       //     //    if (!filter.test(value)) {
       //     //        return false;
       //     //    }
       //     //    return true;
       // }
       // $scope.checkUserNameEmail = function () {
       //     return contactUsService.checkEmail(contactUsControllerVM.signupName);
       //     //    var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{0,4}$/;
       //     //    if (!filter.test(value)) {
       //     //        return false;
       //     //    }
       //     //    return true;
       // }
        //------------------------------------------------------------- Methods --------------------------------------------------------------
        // Authenticate user
        function contactEmailSend() {            
            var name = contactUsControllerVM.contactUsName;
            var email = contactUsControllerVM.contactUsEmail;
            var phone = contactUsControllerVM.contactUsPhone;
            var subject = contactUsControllerVM.contactUsSubject;
            var message = contactUsControllerVM.contactUsMessage;
                       
            if (name.length <= 0)
            {                contactUsControllerVM.isValidName = true;         }
            else
            {contactUsControllerVM.isValidName = false;}

            if (email.length <= 0) {
                contactUsControllerVM.isValidEmail = true;
            }
            else
            {contactUsControllerVM.isValidEmail = false;}


            if (phone.length <= 0) {
                contactUsControllerVM.isValidPhone = true;
            }
            else { contactUsControllerVM.isValidPhone = false; }


            if (subject.length <= 0) {
                contactUsControllerVM.isValidSubject = true;
            }
            else {
                contactUsControllerVM.isValidSubject = false;
            }
            if (message.length <= 0) {
                contactUsControllerVM.isValidMessage = true;
            }
            else{contactUsControllerVM.isValidMessage = false;}
            
            if (name.length > 0 && email.length > 0 && phone.length > 0 && subject.length > 0 && message.length > 0) {
                $scope.reset();
                $scope.startSpin();
                contactUsControllerVM.isValidName = false;
                contactUsControllerVM.isValidEmail = false;
                contactUsControllerVM.isValidPhone = false;
                contactUsControllerVM.isValidSubject = false;
                contactUsControllerVM.isValidMessage = false;
                contactUsService.contactEmailSend({ email: email, message: message, name: name, phone: phone, subject: subject }).then(function (data) {
                    var response = data.results;
                    $scope.stopSpin();
                    alert("Message sent successfully");
                    //$scope.redirectMain();               
                });
                contactUsControllerVM.contactUsName = '';
                contactUsControllerVM.contactUsEmail = '';
                contactUsControllerVM.contactUsPhone = '';
                contactUsControllerVM.contactUsSubject = '';
                contactUsControllerVM.contactUsMessage = '';
            }               
        }       
        //[End]------------------------------------------------------ Methods implementation ----------------------------------------------------------
    }
})();
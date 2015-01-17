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
    angular.module('app').controller('accountsController', ['accountsService', '$scope', '$location', 'usSpinnerService', '$rootScope', 'alertsManager', accountsController]);

    function accountsController(accountsService, $scope, $location, usSpinnerService, $rootScope, alertsManager) {           
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
        var accountsControllerVM = this;

        // ViewModel variables
        accountsControllerVM.signupEmail = '';
        accountsControllerVM.signupPassword = '';
        accountsControllerVM.signupReTypePassword = '';
        accountsControllerVM.signupZipCode = '';
        accountsControllerVM.signupName = '';
        accountsControllerVM.signupAddress = '';
        accountsControllerVM.signupPhone = '';        

        accountsControllerVM.changePasswordNewPassword = '';
        accountsControllerVM.changePasswordConfirmPassword = '';

        accountsControllerVM.forgotPasswordEmail = '';
        accountsControllerVM.forgotPasswordNewPassword = '';
        accountsControllerVM.forgotPasswordConfirmPassword = '';

        accountsControllerVM.isMismatch = false;
        accountsControllerVM.isVisible = true;

        // ViewModel Methods
        accountsControllerVM.authenticateUser = authenticateUser;
        accountsControllerVM.signup = signup;
        accountsControllerVM.changePassword = changePassword;
        accountsControllerVM.forgotPassword = forgotPassword;        
        accountsControllerVM.logout = logout;
                
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

        $scope.checkEmail = function () {

       return accountsService.checkEmail(accountsControllerVM.signupEmailAddress);
            //    var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{0,4}$/;
            //    if (!filter.test(value)) {
            //        return false;
            //    }
            //    return true;
        }
        $scope.checkUserNameEmail = function () {

            return accountsService.checkEmail(accountsControllerVM.signupName);
            //    var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{0,4}$/;
            //    if (!filter.test(value)) {
            //        return false;
            //    }
            //    return true;
        }

        function authenticateUser() {
            $scope.reset();
            $scope.startSpin();
            var id = accountsControllerVM.signupEmail;
            var pass = accountsControllerVM.signupPassword;
            accountsService.authenticateUser({ userId: id, password: pass }).then(function (data) {              
                var response = data.results;                

                var mystring = new String(response);
                mystring = mystring.substring(1, mystring.length - 1);                

                if (mystring == "Valid") {
                    $scope.stopSpin();
                    $scope.redirectPracticeEditDetails();
                }
                else {
                    $scope.stopSpin();
                    failureAlert(response);
                }
                
            });           
            accountsControllerVM.signupEmail = '';
            accountsControllerVM.signupPassword = '';
        }

        function forgotPassword() {
            $scope.startSpin();
            $scope.reset();
            var userId = accountsControllerVM.forgotPasswordUserId;
            if (userId == null || userId == '') {
                failureAlert("Please input user id and then proceed.");
                $scope.stopSpin();
            }
            accountsControllerVM.isMismatch = forgotPasswordCheckMismatch();
            if (accountsControllerVM.isMismatch == true) {
                successAlert("New password and confirm password mis match.");
                $scope.stopSpin();
            }
            else {                
                var newPass = accountsControllerVM.forgotPasswordNewPassword.trim();
                accountsService.forgotPassword({ newPassword: newPass, userId: userId }).then(function (data) {
                    
                    
                    var response = data.results;                

                    var mystring = new String(response);
                    mystring = mystring.substring(1, mystring.length - 1);                
                    if (mystring == "New password has been sent successfully")
                    {
                        successAlert(mystring);
                        $scope.redirectLogin();
                    }
                    else
                    {
                        failureAlert(mystring);
                    }
                    $scope.stopSpin();
                });                
            }
            accountsControllerVM.forgotPasswordUserId = '';
            accountsControllerVM.forgotPasswordNewPassword = '';
            accountsControllerVM.forgotPasswordConfirmPassword = '';
        }

        function changePassword() {
            $scope.startSpin();
            $scope.reset();
            var userId = accountsControllerVM.changePasswordUserId;
            if (userId == null || userId == '')
            {
                failureAlert("Please input user id and then proceed.");
                $scope.stopSpin();
            }
            var currentPass = accountsControllerVM.changePasswordCurrentPassword.trim();
            accountsControllerVM.isMismatch = changePasswordCheckMismatch();
            if (accountsControllerVM.isMismatch == true) {
                successAlert("New password and confirm password mis match.");
                $scope.stopSpin();
            }
            else {
                var newPass = accountsControllerVM.changePasswordNewPassword.trim();
                accountsService.changePassword({ currentPassword: currentPass, newPassword: newPass, userId: userId }).then(function (data) {
                    var response = data.results;

                    var mystring = new String(response);
                    mystring = mystring.substring(1, mystring.length - 1);
                    if (mystring == "Password changed successfully") {
                        successAlert(mystring);
                        $scope.redirectMain();
                    }
                    else {
                        failureAlert(mystring);
                    }
                    $scope.stopSpin();
                });
            }
            accountsControllerVM.changePasswordUserId = '';
            accountsControllerVM.changePasswordCurrentPassword = '';
            accountsControllerVM.changePasswordNewPassword = '';
            accountsControllerVM.changePasswordConfirmPassword = '';
        }

        function forgotPasswordCheckMismatch() {
            var result = false;
            var newPass = accountsControllerVM.forgotPasswordNewPassword;
            var confirmPass = accountsControllerVM.forgotPasswordConfirmPassword;
            if (newPass == confirmPass)
            { result = false; }
            else { result = true; }
            return result;
        }

        function changePasswordCheckMismatch()
        {            
            var result = false;
            var newPass = accountsControllerVM.changePasswordNewPassword;
            var confirmPass = accountsControllerVM.changePasswordConfirmPassword;
            if (newPass == confirmPass)
            { result = false; }
            else { result = true; }
            return result;
        }

        function signupCheckMismatch() {            
            var result = false;
            var pass = accountsControllerVM.signupPassword;
            var retype = accountsControllerVM.signupRetypePassword;
            if (pass == retype)
            { result = false; }
            else { result = true; }
            return result;
        }     

        function logout()
        {           
            $scope.startSpin();

            return accountsService.logout().then(function (data) {
                var response = data.results;
                var mystring = new String(response);
                mystring = mystring.substring(1, mystring.length - 1);

                $scope.stopSpin();
                if (mystring == 'Logout successfully') {
                    $scope.redirectLogin();
                }               
            });
        }

        function signup() {            
            var email = accountsControllerVM.signupEmail;
            var password = accountsControllerVM.signupPassword;
            var retypePassword = accountsControllerVM.signupReTypePassword;
            var zipCode = accountsControllerVM.signupZipCode;
            var name = accountsControllerVM.signupName;
            var address = accountsControllerVM.signupAddress;
            var phone = accountsControllerVM.signupPhone;   

            $scope.reset();

            if (email == '')
            { failureAlert("Email address required."); }

            if (password == '')
            { failureAlert("Password required."); }

            if (retypePassword == '')
            { failureAlert("Re-type password required."); }

            if (zipCode == '') {
                failureAlert("Zip-code required.");
            }            
            
            if (email != '' && password != '' && retypePassword != '' && zipCode != '') {
                $scope.startSpin();
                return accountsService.signup({ address:address, email: email, name:name, password: password, phone:phone, zipCode: zipCode })
                    .then(function (serviceResponse) {
                        var response = serviceResponse.data;
                    successAlert(response);
                    //var mystring = new String(response);
                    //mystring = mystring.substring(1, mystring.length - 1);
                        //alert(mystring);
                    debugger;
                    if (response == 'Registration is successful') {
                        $scope.stopSpin();
                        $scope.redirectMain();
                    }
                    }).catch(function (serviceError) {
                        failureAlert(serviceError.data);
                        console.log(serviceError.data);
                        return null;
                    });

                accountsControllerVM.signupEmail = '';
                accountsControllerVM.signupPassword = '';
                accountsControllerVM.signupReTypePassword = '';
                accountsControllerVM.signupZipCode = '';
                accountsControllerVM.signupName = '';
                accountsControllerVM.signupAddress = '';
                accountsControllerVM.signupPhone = '';
            }
        }      
    }
})();
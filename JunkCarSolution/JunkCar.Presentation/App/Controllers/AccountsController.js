     /* ________________________________________________________________________________________________________
       | Company         | ShinerSoft Private Limited                                                          |
       |_________________|_____________________________________________________________________________________|       
       | File            |  HomeController.js                                                                  |
       |_________________|_____________________________________________________________________________________|
       | Description     |   * Controller/ViewModel: todolists                                                 |
       |                 |   * Support a view of all TodoLists                                                 |
       |                 |   * Handles fetch and save of these lists                                           |
       |_________________|_____________________________________________________________________________________|
       | Created By      |  HASSAN MUSTAFA BAIG                                                                |
       |_________________|_____________________________________________________________________________________|
       | Date Created    |  01 Feb 2015                                                                        |
       |_________________|_____________________________________________________________________________________|
       | Modified By     |                                                                                     | 
       |_________________|_____________________________________________________________________________________|
       | Date Modified   |  01 Feb 2015                                                                        |
       |_________________|_____________________________________________________________________________________|*/

(function () {
    'use strict';   
    angular.module('app').controller('accountsController', ['accountsService', '$scope', '$location', 'usSpinnerService', '$rootScope', 'alertsManager', accountsController]);

    function accountsController(accountsService, $scope, $location, usSpinnerService, $rootScope, alertsManager) {

       /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ========================================================== Accounts Controller =========================================================
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]--------------------------------------------------- Accounts variables ------------------------------------------------------
        //---------------------------------------------------------- ViewModel variables --------------------------------------------------------        
        var accountsControllerVM = this;
                
        accountsControllerVM.pageTitle = "Log-in";
        accountsControllerVM.isVisibleLoginTextBoxes = true;
         
        accountsControllerVM.signupEmail = '';
        accountsControllerVM.signupPassword = '';
        accountsControllerVM.signupReTypePassword = '';
        accountsControllerVM.signupZipCode = '';
        accountsControllerVM.signupName = '';
        accountsControllerVM.signupAddress = '';
        accountsControllerVM.signupPhone = '';

        accountsControllerVM.loginEmail = '';
        accountsControllerVM.loginPassword = '';

        accountsControllerVM.changePasswordOldPassword = '';
        accountsControllerVM.changePasswordNewPassword = '';
        accountsControllerVM.changePasswordConfirmPassword = '';
        accountsControllerVM.changePasswordEmail = '';

        accountsControllerVM.isVisibleVerificationCode = false;

        accountsControllerVM.forgotPasswordVerificationCode = '';

        accountsControllerVM.isVisibleSecurityQuestion = false;
        accountsControllerVM.forgotPasswordSecurityQuestion = '';
        accountsControllerVM.forgotPasswordSecurityQuestionId = '';
        accountsControllerVM.forgotPasswordSecurityQuestionAnswer = '';

        accountsControllerVM.isVisibleResetPasswordTextBoxes = false;
        accountsControllerVM.forgotPasswordNewPassword = '';
        accountsControllerVM.forgotPasswordConfirmPassword = '';
               

        accountsControllerVM.isMismatch = false;
        accountsControllerVM.isVisible = true;
        accountsControllerVM.isLoggedIn = false;
        //---------------------------------------------------------- $scope variables ----------------------------------------------------------       
        $scope.liun = '';

        //[End]------------------------------------------------------ Accounts variables ------------------------------------------------------

        /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ========================================================== Accounts Controller =========================================================
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
          ========================================================== Accounts Controller =========================================================
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]--------------------------------------------------- Methods definition ---------------------------------------------------------
        //---------------------------------------------------------- ViewModel Methods ----------------------------------------------------------
        accountsControllerVM.authenticateUser = authenticateUser;
        accountsControllerVM.getUserName = getUserName;
        accountsControllerVM.signup = signup;
        accountsControllerVM.changePassword = changePassword;
        accountsControllerVM.forgotPassword = forgotPassword;        
        accountsControllerVM.logout = logout;        
        accountsControllerVM.getSecurityQuestion = getSecurityQuestion;
        accountsControllerVM.checkSecurityQuestionAnswer = checkSecurityQuestionAnswer;
        accountsControllerVM.checkVerificationCode = checkVerificationCode;
        accountsControllerVM.resetPassword = resetPassword;
        accountsControllerVM.checkUserId = checkUserId;
        //[End]----------------------------------------------------- Methods definition ---------------------------------------------------------

        /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ========================================================== Accounts Controller =========================================================
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
        // Check email validation
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
        //------------------------------------------------------------- Methods --------------------------------------------------------------
        // Get logged in user name
        function getUserName() {
            var userName = localStorage.getItem("UserName");  
            $scope.liun = userName;
            if (userName.length > 0) {
                accountsControllerVM.isLoggedIn = true;
            }
            else {
                accountsControllerVM.isLoggedIn = false;
            }
            
            
            
        }
        // Authenticate user
        function authenticateUser() {
            $scope.reset();
            $scope.startSpin();            
            var email = accountsControllerVM.loginEmail;
            var pass = accountsControllerVM.loginPassword;
            accountsService.authenticateUser({ userId: email, password: pass })
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;
                    console.log(response);
                    if (response.IsAuthenticated === true) {
                        localStorage.setItem("UserName",response.Name);
                    $scope.stopSpin();
                    $scope.redirectMain();
                }
                else {
                    alert("Invalid password or username does not exist");
                    $scope.stopSpin();
                    failureAlert(response);
                }
                
            });           
            accountsControllerVM.loginEmail = '';
            accountsControllerVM.loginPassword = '';
        }
        // Forgot password
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
                    if (mystring == "New password has been sent successfully") {
                        successAlert(mystring);
                        $scope.redirectLogin();
                    }
                    else { failureAlert(mystring); }
                    $scope.stopSpin();
                });                
            }
            accountsControllerVM.forgotPasswordUserId = '';
            accountsControllerVM.forgotPasswordNewPassword = '';
            accountsControllerVM.forgotPasswordConfirmPassword = '';
        }
        // Change password
        function changePassword() {
            var oldPassword = accountsControllerVM.changePasswordOldPassword;
            var newPassword = accountsControllerVM.changePasswordNewPassword;
            var confirmPassword = accountsControllerVM.changePasswordConfirmPassword;
            var email = accountsControllerVM.changePasswordEmail;

            if (oldPassword.length <= 0||newPassword.length<=0||confirmPassword.length<=0)
            {
                alert("Please input the password.");
                
            }
            else {
                $scope.reset();
                if (newPassword == confirmPassword) {
                    $scope.startSpin();
                    return accountsService.changePassword({ currentPassword: oldPassword, newPassword: newPassword })
                        .then(function (serviceResponse) {
                            var response = serviceResponse.data;
                            if (response == "Successful") {
                                //accountsControllerVM.pageTitle = "Log-in";
                                //accountsControllerVM.isVisibleResetPasswordTextBoxes = false;
                                //accountsControllerVM.isVisibleLoginTextBoxes = true;
                                $scope.redirectLogin();
                            }
                            else { }
                            $scope.stopSpin();
                        }).catch(function (serviceError) {
                            failureAlert(serviceError.data);
                            console.log(serviceError.data);
                            return null;
                        });

                }
                else { alert("Password mis-match"); }
            }
            //if (newPassword != confirmPassword) {
            //    alert("New password and confirm password mis match");
                
            //}
            //if ((oldPassword.length > 0 && newPass.length > 0 && confirmPass.length > 0) && (newPass != confirmPass))
            //    {
            //    var newPass = accountsControllerVM.changePasswordNewPassword;
            //        $scope.startSpin();
            //        accountsService.changePassword({ currentPassword: currentPass, newPassword: newPass })
            //            .then(function (data) {
            //                var response = data.results;
            //                var mystring = new String(response);
            //                mystring = mystring.substring(1, mystring.length - 1);
            //                if (mystring == "Password changed successfully") {
            //                    successAlert(mystring);
            //                    $scope.redirectMain();
            //                }
            //                else { failureAlert(mystring); }
            //                $scope.stopSpin();
            //            });
            //    }
        }
        // Check mis-match on Forgot Password
        function forgotPasswordCheckMismatch() {
            var result = false;
            var newPass = accountsControllerVM.forgotPasswordNewPassword;
            var confirmPass = accountsControllerVM.forgotPasswordConfirmPassword;
            if (newPass == confirmPass)
            { result = false; }
            else { result = true; }
            return result;
        }
        // Check mis-match on Change Password
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
        // Check mis-match on User registration/Signup
        function signupCheckMismatch() {            
            var result = false;
            var pass = accountsControllerVM.signupPassword;
            var retype = accountsControllerVM.signupRetypePassword;
            if (pass == retype)
            { result = false; }
            else { result = true; }
            return result;
        }     
        // Logout
        function logout()
        {           
            $scope.startSpin();

            return accountsService.logout().then(function (serviceResponse) {
                var response = serviceResponse.data;             
                if (response == "Logout successfully")
                {
                    localStorage.setItem("UserName", '');
                    $scope.redirectMain();
                }
                $scope.stopSpin();                          
            });
        }
        // User Signup/Registration
        function signup() {            
            var email = accountsControllerVM.signupEmail;
            var password = accountsControllerVM.signupPassword;
            var retypePassword = accountsControllerVM.signupReTypePassword;
            var zipCode = accountsControllerVM.signupZipCode;
            var name = accountsControllerVM.signupName;
            var address = accountsControllerVM.signupAddress;
            var phone = accountsControllerVM.signupPhone;   

            $scope.reset();

            if (email.length <= 0)
            { alert("Email address required."); }

            if (password.length <= 0)
            { alert("Password required."); }

            if (retypePassword.length <= 0)
            { alert("Re-type password required."); }

            if (zipCode.length <= 0) {
                alert("Zip-code required.");
            }            
            
            if (email.length > 0 && password.length > 0 && retypePassword.length > 0 && zipCode.length > 0) {
                $scope.startSpin();
                return accountsService.signup({ address:address, email: email, name:name, password: password, phone:phone, zipCode: zipCode })
                    .then(function (serviceResponse) {
                        var response = serviceResponse.data;
                    alert(response);                                        
                    if (response == 'Your account has been created successfully and you will receive an email shortly with the details') {
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
        function getSecurityQuestion() {
            var email = accountsControllerVM.loginEmail;
            $scope.reset();
            if (email.length > 0) {
                $scope.startSpin();
                return accountsService.getSecurityQuestion({ userId: email })
                    .then(function (serviceResponse) {
                        var response = serviceResponse.data;                     
                        accountsControllerVM.forgotPasswordSecurityQuestion = response.Question;
                        accountsControllerVM.forgotPasswordSecurityQuestionId = response.Password_Question_Id;
                        $scope.stopSpin();

                    }).catch(function (serviceError) {
                        failureAlert(serviceError.data);
                        console.log(serviceError.data);
                        return null;
                    });
            }
            else { alert("Please enter user id"); }
        }

        function checkUserId() {
            // Check email address existance, required validation
            var email = accountsControllerVM.loginEmail
            $scope.reset();
            if (email.length > 0) {
                $scope.startSpin();
                return accountsService.checkUserId({ userId: email })
                    .then(function (serviceResponse) {
                        var response = serviceResponse.data;
                        alert(response);
                        if (response == "Valid") {
                         
                            accountsControllerVM.pageTitle = "Account-Verification";
                            accountsControllerVM.isVisibleLoginTextBoxes = false;
                            accountsControllerVM.isVisibleSecurityQuestion = true;
                            getSecurityQuestion();
                        }
                    }).catch(function (serviceError) {
                        failureAlert(serviceError.data);
                        console.log(serviceError.data);
                        return null;
                    });
            }
            else { alert("Please enter valid user id");}
        }

        function checkSecurityQuestionAnswer()
        {            
            var questionId = accountsControllerVM.forgotPasswordSecurityQuestionId;
            var answer = accountsControllerVM.forgotPasswordSecurityQuestionAnswer;
            var email = accountsControllerVM.loginEmail;
            $scope.reset();
            if (answer.length > 0) {
                $scope.startSpin();
                return accountsService.checkSecurityQuestionAnswer({ answer: answer, questionId: questionId, userId: email })
                    .then(function (serviceResponse) {
                        var response = serviceResponse.data;
                        if (response == "Valid")
                        {
                            alert("Verification code has been sent to your email address");
                            accountsControllerVM.pageTitle = "Verification-Code";
                            accountsControllerVM.isVisibleSecurityQuestion = false;
                            accountsControllerVM.isVisibleVerificationCode = true;
                        }
                        $scope.stopSpin();

                    }).catch(function (serviceError) {
                        failureAlert(serviceError.data);
                        console.log(serviceError.data);
                        return null;
                    });
            }
            else { alert("Please enter answer"); }
        }
       
        function checkVerificationCode()
        {
            var code = accountsControllerVM.forgotPasswordVerificationCode;
          
            $scope.reset();
            if (code.length > 0) {
                $scope.startSpin();
                return accountsService.checkVerificationCode({ verificationCode: code })
                    .then(function (serviceResponse) {
                        var response = serviceResponse.data;
                        if (response == "Valid") {
                            accountsControllerVM.pageTitle = "Reset-Password";
                            accountsControllerVM.isVisibleVerificationCode = false;
                            accountsControllerVM.isVisibleResetPasswordTextBoxes = true;
                        }
                        else { alert("Invalid verification code");}
                        $scope.stopSpin();
                    }).catch(function (serviceError) {
                        failureAlert(serviceError.data);
                        console.log(serviceError.data);
                        return null;
                    });
            }
            else { alert("Please enter verification code"); }
            
        }
        function resetPassword()
        {
            var email = accountsControllerVM.loginEmail;
            var newPassword = accountsControllerVM.forgotPasswordNewPassword;
            var confirmPassword = accountsControllerVM.forgotPasswordConfirmPassword;
            if (newPassword.length <= 0 || confirmPassword.length <= 0) {
           
                alert("Please enter password");
            }
            else {
                $scope.reset();
                if (newPassword == confirmPassword) {
                    $scope.startSpin();
                    return accountsService.resetPassword({ newPassword: newPassword, userId: email })
                        .then(function (serviceResponse) {
                            var response = serviceResponse.data;
                            if (response == "Successful") {
                                accountsControllerVM.pageTitle = "Log-in";                                
                                accountsControllerVM.isVisibleResetPasswordTextBoxes = false;
                                accountsControllerVM.isVisibleLoginTextBoxes = true;
                            }
                            else {  }
                            $scope.stopSpin();
                        }).catch(function (serviceError) {
                            failureAlert(serviceError.data);
                            console.log(serviceError.data);
                            return null;
                        });

                }
                else { alert("Password mis-match"); }
            }
        }

        //[End]------------------------------------------------------ Methods implementation ----------------------------------------------------------
    }
})();
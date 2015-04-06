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
        accountsControllerVM.signupAllSecurityQuestions = '';
        accountsControllerVM.signupSecurityAnswer = '';
       

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

        accountsControllerVM.editProfileName = '';
        accountsControllerVM.editProfileAddress = '';
        accountsControllerVM.editProfilePhone = '';
        accountsControllerVM.editProfileZipCode = '';
        accountsControllerVM.editProfileAllSecurityQuestions = '';
        accountsControllerVM.editProfileSecurityQuestion = '';
        accountsControllerVM.editProfileSecurityAnswer = '';

        accountsControllerVM.userInfo = '';

        accountsControllerVM.isMismatch = false;
        accountsControllerVM.isVisible = true;
        accountsControllerVM.isLoggedIn = false;
        
        //---------------------------------------------------------- $scope variables ----------------------------------------------------------       
        $scope.liun = '';
        $rootScope.allSecurityQuestionsList = [];
        

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
        accountsControllerVM.getAllSecurityQuestions = getAllSecurityQuestions;
        accountsControllerVM.checkSecurityQuestionAnswer = checkSecurityQuestionAnswer;
        accountsControllerVM.checkVerificationCode = checkVerificationCode;
        accountsControllerVM.resetPassword = resetPassword;
        accountsControllerVM.checkUserId = checkUserId;
        accountsControllerVM.getUserInfo = getUserInfo;
        accountsControllerVM.editProfile = editProfile;
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
                    if (response.IsAuthenticated === true) {
                        localStorage.setItem("UserName",response.Name);
                        $scope.stopSpin();
                        $scope.redirectMain();
                    }
                    else {
                        alert("Invalid password or username does not exist");
                        $scope.stopSpin();                    
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
                alert("Please input user id and then proceed.");
                $scope.stopSpin();
            }
            accountsControllerVM.isMismatch = forgotPasswordCheckMismatch();
            if (accountsControllerVM.isMismatch == true) {
                alert("New password and confirm password mis match.");
                $scope.stopSpin();
            }
            else {                
                var newPass = accountsControllerVM.forgotPasswordNewPassword.trim();
                accountsService.forgotPassword({ newPassword: newPass, userId: userId }).then(function (data) {                   
                    var response = data.results;                
                    var mystring = new String(response);
                    mystring = mystring.substring(1, mystring.length - 1);                
                    if (mystring == "New password has been sent successfully") {
                        alert(mystring);
                        $scope.redirectLogin();
                    }
                    else { alert(mystring); }
                    $scope.stopSpin();
                });                
            }
            accountsControllerVM.forgotPasswordUserId = '';
            accountsControllerVM.forgotPasswordNewPassword = '';
            accountsControllerVM.forgotPasswordConfirmPassword = '';
        }
        // Change password
        function changePassword() {
            debugger;
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
                            if (response == "Valid") {
                                alert("Password has been changed successfully");
                                $scope.redirectMain();
                            }
                            else { alert("There is someting wrong"); }
                            $scope.stopSpin();
                        }).catch(function (serviceError) {
                            alert("There is someting wrong");
                            console.log(serviceError.data);
                            return null;
                        });
                }
                else { alert("Password mis-match"); }
            }
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
            debugger;
            var email = accountsControllerVM.signupEmail;
            var password = accountsControllerVM.signupPassword;
            var retypePassword = accountsControllerVM.signupReTypePassword;
            var zipCode = accountsControllerVM.signupZipCode;
            var name = accountsControllerVM.signupName;
            var address = accountsControllerVM.signupAddress;
            var phone = accountsControllerVM.signupPhone;
            var question = accountsControllerVM.signupAllSecurityQuestions;
            var questionId = '';
            for (var i = 0; i < $rootScope.allSecurityQuestionsList.$values.length; i++) {
                if ($rootScope.allSecurityQuestionsList.$values[i].Question == question) {
                    questionId = parseInt($rootScope.allSecurityQuestionsList.$values[i].Password_Question_Id);
                    break;
                }
            }
            var answer = accountsControllerVM.signupSecurityAnswer;

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
            if (question.length <= 0)
            { alert("Please select a Security Question"); }
            if (answer.length <= 0)
            { alert("Please enter an answer against the selected question"); }
            
            if (email.length > 0 && password.length > 0 && retypePassword.length > 0 && zipCode.length > 0 && question.length>0 && answer.length>0) {
                $scope.startSpin();
                return accountsService.signup({ address: address, email: email, name: name, password: password, phone: phone, zipCode: zipCode, questionId: questionId, answer: answer })
                    .then(function (serviceResponse) {
                        var response = serviceResponse.data;                                                         
                        if (response == 'Your account has been created successfully and you will receive an email shortly with the details') {
                            alert(response);
                            $scope.stopSpin();
                            $scope.redirectMain();
                        }
                    }).catch(function (serviceError) {
                        alert("There is something wrong");
                        return null;
                    });

                accountsControllerVM.signupEmail = '';
                accountsControllerVM.signupPassword = '';
                accountsControllerVM.signupReTypePassword = '';
                accountsControllerVM.signupZipCode = '';
                accountsControllerVM.signupName = '';
                accountsControllerVM.signupAddress = '';
                accountsControllerVM.signupPhone = '';
                accountsControllerVM.signupgetAllSecurityQuestions = '';
                accountsControllerVM.signupSecurityAnswer = '';
            }
        }
        // User Security Question
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
                        alert("There is something wrong");
                        return null;
                    });
            }
            else { alert("Please enter user id"); }
        }
        // All Security Questions
        function getAllSecurityQuestions() {
            $scope.startSpin();
            return accountsService.getAllSecurityQuestions()
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;
                    console.log(response);
                    $rootScope.allSecurityQuestionsList = response;
                    $scope.reset();
                    $scope.stopSpin();
                    return $rootScope.allSecurityQuestionsList;
                }).catch(function (serviceError) {
                    alert("There is something wrong");
                    return null;
                });
        }
        // Retrieve User Information
        function getUserInfo() {
            debugger;
            $scope.startSpin();
            return accountsService.getUserInfo()
                .then(function (serviceResponse) {
                    var response = serviceResponse.data;
                    console.log(response);
                    accountsControllerVM.userInfo = response;
                    setUserDetails();
                    return accountsControllerVM.userInfo;
                }).catch(function (serviceError) {
                    alert("There is something wrong");
                    return null;
                });
        }
        // Set User Information
        function setUserDetails() {
            debugger;
            var question = '';
            var questionId = accountsControllerVM.userInfo.userProfile.QuestionId;
            for (var i = 0; i < $rootScope.allSecurityQuestionsList.$values.length; i++) {
                if ($rootScope.allSecurityQuestionsList.$values[i].Password_Question_Id == questionId) {
                    question = String($rootScope.allSecurityQuestionsList.$values[i].Question);
                    break;
                }
            }
            
            if (accountsControllerVM.userInfo.UserId.length > 0) {
                accountsControllerVM.editProfileName = accountsControllerVM.userInfo.userProfile.Name;
                accountsControllerVM.editProfileAddress = accountsControllerVM.userInfo.userProfile.Address;
                accountsControllerVM.editProfilePhone = accountsControllerVM.userInfo.userProfile.Phone;
                accountsControllerVM.editProfileZipCode = accountsControllerVM.userInfo.userProfile.ZipCode;
                accountsControllerVM.editProfileAllSecurityQuestions = question;
                accountsControllerVM.editProfileSecurityAnswer = accountsControllerVM.userInfo.userProfile.Answer;
                //Jquery has been used below
                //$("#allSecurityQuestion").val(question);
            }
        }
        // Edit User Information
        function editProfile() {
            debugger;
            var name = accountsControllerVM.editProfileName;
            var address = accountsControllerVM.editProfileAddress;
            var phone = accountsControllerVM.editProfilePhone;
            var zipCode = accountsControllerVM.editProfileZipCode;
            var question = accountsControllerVM.editProfileAllSecurityQuestions;
            var questionId = '';
            for (var i = 0; i < $rootScope.allSecurityQuestionsList.$values.length; i++) {
                if ($rootScope.allSecurityQuestionsList.$values[i].Question == question) {
                    questionId = parseInt($rootScope.allSecurityQuestionsList.$values[i].Password_Question_Id);
                    break;
                }
            }
                var answer = accountsControllerVM.editProfileSecurityAnswer;
            
                if (name.length <= 0) {
                    alert("Please enter the name");
                }
                else if (address.length <= 0) {
                    alert("Please enter the address");
                }
                else if (phone.length <= 0) {
                    alert("Please enter the phone number");
                }
                else if (zipCode.length <= 0) {
                    alert("Please enter the zip code");
                }
                else if (answer.length <= 0) {
                    alert("Please enter the answer");
                }
                else {
                    $scope.startSpin();
                    return accountsService.editProfile({ name: name , address:address, phone:phone , zipCode:zipCode , questionId:questionId, answer:answer })
                    .then(function (serviceResponse) {
                        debugger;
                        console.log(serviceResponse.data);
                        $scope.stopSpin();
                        alert("Profile successfully edited");
                        $scope.redirectMain();
                    }).catch(function (serviceError) {
                        debugger;
                        alert("There is something wrong");
                        console.log(serviceError.data);
                        $scope.stopSpin();
                        return null;
                    });
                }
            }
            // Check email address existance, required validation
            function checkUserId() {
                var email = accountsControllerVM.loginEmail
                $scope.reset();
                if (email.length > 0) {
                    $scope.startSpin();
                    return accountsService.checkUserId({ userId: email })
                        .then(function (serviceResponse) {
                            var response = serviceResponse.data;                        
                            if (response == "Valid") {

                                accountsControllerVM.pageTitle = "Account-Verification";
                                accountsControllerVM.isVisibleLoginTextBoxes = false;
                                accountsControllerVM.isVisibleSecurityQuestion = true;
                                getSecurityQuestion();
                            }
                            else { alert("Please enter a valid user id");}
                            $scope.stopSpin();
                        }).catch(function (serviceError) {
                            alert("There is something wrong");                        
                            return null;
                        });
                }
                else { alert("Please enter valid user id");}
            }
            // Check User Security Answer
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
                            alert("There is something wrong");
                            return null;
                        });
                }
                else { alert("Please enter answer"); }
            }
            // Check Verification Code
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
                            alert("There is something wrong");                        
                            return null;
                        });
                }
                else { alert("Please enter verification code"); }
            }
            // Reset User Password
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
                                alert("There is something wrong");
                                return null;
                            });

                    }
                    else { alert("Password mis-match"); }
                }
            }

            //[End]------------------------------------------------------ Methods implementation ----------------------------------------------------------
        }
    })();
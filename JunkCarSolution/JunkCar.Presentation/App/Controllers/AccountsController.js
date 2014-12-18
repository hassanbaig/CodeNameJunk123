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

    var controllerId = 'accountsController';
    angular.module('app').controller(controllerId,
    ['accountsService', 'logger', '$scope', '$location', 'usSpinnerService', '$rootScope', 'alertsManager', accountsController]);

    function accountsController(accountsService, logger, $scope, $location, usSpinnerService, $rootScope, alertsManager) {
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
        var accountsControllerVM = this;

        // ViewModel variables
        accountsControllerVM.userId = '';
        accountsControllerVM.password = '';

        accountsControllerVM.changePasswordUserId = '';
        accountsControllerVM.changePasswordCurrentPassword = '';
        accountsControllerVM.changePasswordNewPassword = '';
        accountsControllerVM.changePasswordConfirmPassword = '';

        accountsControllerVM.forgotPasswordUserId = '';
        accountsControllerVM.forgotPasswordNewPassword = '';
        accountsControllerVM.forgotPasswordConfirmPassword = '';

        accountsControllerVM.isMismatch = false;
        accountsControllerVM.isVisible = true;

        accountsControllerVM.signupName = '';
        accountsControllerVM.signupGender = '';
        accountsControllerVM.signupPhoneNumber = '';
        accountsControllerVM.signupEmailAddress = '';
        accountsControllerVM.signupPassword = '';
        accountsControllerVM.signupRetypePassword = '';

        accountsControllerVM.signupClinicName = '';
        accountsControllerVM.signupMajorSpecialty = '';
        accountsControllerVM.signupCountry = '';
        accountsControllerVM.signupCity = '';
        accountsControllerVM.signupArea = '';
        accountsControllerVM.signupClinicAddress = '';

        accountsControllerVM.specialtiesList = '';
        accountsControllerVM.countriesList = '';
        accountsControllerVM.citiesList = '';
        accountsControllerVM.localitiesList = '';

        // ViewModel Methods
        accountsControllerVM.authenticateUser = authenticateUser;
        accountsControllerVM.changePassword = changePassword;
        accountsControllerVM.getSpecialties = getSpecialties;
        accountsControllerVM.getCountries = getCountries;
        accountsControllerVM.getCities = getCities;
        accountsControllerVM.getLocalities = getLocalities;
        accountsControllerVM.providerRegistration = providerRegistration;
        accountsControllerVM.setVisibility = setVisibility;
        accountsControllerVM.logout = logout;
        accountsControllerVM.forgotPassword = forgotPassword;

        //$scope.redirect = function () {
        //    $location.path('/Login');            
        //    window.location = "../Index.html";
        //}              
        $scope.redirectPracticeEditDetails = function () {
            debugger;
            window.location = "PracticeEditDetails.html";
        }
        $scope.redirectEditProfile = function () {
            window.location = "EditProfile.html";
        }
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
        $scope.redirectDoctorEditDetails = function () {
            //$location.path('/Login');
            window.location = "DoctorEditDetails.html";
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
            var id = accountsControllerVM.userId;
            var pass = accountsControllerVM.password;
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
            accountsControllerVM.userId = '';
            accountsControllerVM.password = '';
        }       

        function setVisibility() {

            var name = accountsControllerVM.signupName;
            var gender = accountsControllerVM.signupGender;
            var email = accountsControllerVM.signupEmailAddress;
            var password = accountsControllerVM.signupPassword;            
            var isValidEmail = $scope.checkEmail();
            var isValidUserNameEmail = $scope.checkUserNameEmail();
            var isMisMatch = signupCheckMismatch();
            $scope.reset();

            if (name == '')
            { failureAlert("User name is required."); }
            else if (isValidUserNameEmail == false) {
                failureAlert("User name should be a valid email address.");
                accountsControllerVM.isVisible = true;
            }

            if (gender == '')
            { failureAlert("Gender required."); }

            if (email == '')
            { failureAlert("Email required."); }
            else if (isValidEmail == false) {
                failureAlert("Invalid email address.");
                accountsControllerVM.isVisible = true;
            }

            if (password == '')
            { failureAlert("Password required."); }
            else if (isMisMatch == true)
            { failureAlert("Mis match password."); }
            
            if (name != '' && isValidUserNameEmail ==true && gender != '' && email != '' && isValidEmail == true && password != '' && isMisMatch != true)
            {                
                accountsControllerVM.isVisible = false; 
            }
            
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

        function getSpecialties() {
            $scope.startSpin();
            return accountsService.getSpecialties().then(function (data) {    
                var response = data.results;
                accountsControllerVM.specialtiesList = data.results;                                
                $scope.stopSpin();
                return accountsControllerVM.specialtiesList;
            });
        }

        function getCountries() {
            $scope.startSpin();
            return accountsService.getCountries().then(function (data) {
                var response = data.results;
                accountsControllerVM.countriesList = data.results;                
                $scope.stopSpin();
                return accountsControllerVM.countriesList;
            });
        }

        function getCities() {
            $scope.startSpin();
            return accountsService.getCities().then(function (data) {
                var response = data.results;
                accountsControllerVM.citiesList = data.results;                
                $scope.stopSpin();
                return accountsControllerVM.citiesList;                               
            });
        }

        function getLocalities() {
            $scope.startSpin();
            return accountsService.getLocalities().then(function (data) {
                var response = data.results;
                accountsControllerVM.localitiesList = data.results;                
                $scope.stopSpin();
                return accountsControllerVM.localitiesList;
            });
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

        function providerRegistration() {
            var name = accountsControllerVM.signupName;
            var gender = accountsControllerVM.signupGender;
            var phone = accountsControllerVM.signupPhoneNumber;
            var email = accountsControllerVM.signupEmailAddress;
            var password = accountsControllerVM.signupPassword;
            var clinic = accountsControllerVM.signupClinicName;
            var specialty = accountsControllerVM.signupMajorSpecialty;
            var country = accountsControllerVM.signupCountry;
            var city = accountsControllerVM.signupCity;
            var area = accountsControllerVM.signupArea;
            var address = accountsControllerVM.signupClinicAddress;

            $scope.reset();

            if (clinic == '')
            { failureAlert("Clinic name required."); }

            if (specialty == '')
            { failureAlert("Specialty required."); }

            if (country == '')
            { failureAlert("Country required."); }

            if (city == '') {
                failureAlert("City required.");
            }

            if (area == '')
            { failureAlert("Area required."); }

            if (address == '')
            { failureAlert("Address required"); }

            if (clinic != '' && specialty != '' && country != '' && city != '' && area != '' && address != '') {
                accountsService.providerRegistration({ name: name, gender: gender, phone: phone, email: email, password: password, clinicName: clinic, majorSpecialty: specialty, country: country, city: city, area: area, clinicAddress: address }).then(function (data) {
                    var response = data.results;
                    //response.replace('[', '');
                    //response.replace(/"/gi, '');                   
                    //response.replace(/\"/gi, '');
                    //response.replace(']', '');
                    successAlert(response);
                    var mystring = new String(response);
                    mystring = mystring.substring(1, mystring.length - 1);
                    alert(mystring);
                    if (mystring == 'Registration is successful') {
                        $scope.redirectLogin();
                    }
                });

                accountsControllerVM.signupName = '';
                accountsControllerVM.signupGender = '';
                accountsControllerVM.signupPhoneNumber = '';
                accountsControllerVM.signupEmailAddress = '';
                accountsControllerVM.signupPassword = '';
                accountsControllerVM.signupClinicName = '';
                accountsControllerVM.signupMajorSpecialty = '';
                accountsControllerVM.signupCountry = '';
                accountsControllerVM.signupCity = '';
                accountsControllerVM.signupArea = '';
                accountsControllerVM.signupClinicAddress = '';
            }
        }

        function querySucceeded(data) {
         
            data.results.forEach(function (item) {                
                accountsControllerVM.users.push(item);
            });            
        }
               

        //function updateCity() {            
        //    var key = vm.cityKey.trim();
        //    var cName = vm.cityName.trim();
        //    var couId = vm.countryId.trim();
        //    if (name) {
        //        var key = datacontext.updateCity({ key: key, Name: cName, CountryId:couId });
        //        vm.cities.unshift(key);
        //        vm.cityKey = '';
        //        vm.cityName = '';
        //        vm.countryId = '';
        //        vm.sa = s;
        //    }
        //}

        //function MySaveTest() {
        //    datacontext.SaveTest();
        //}

        //function s() {
        //    var key = vm.cityKey.trim();
        //    var name = vm.newCityName.trim();
        //    var countryId = vm.countryId.trim();
        //    ajaxImpl = breeze.config.getAdapterInstance("ajax");
        //    ajaxImpl.ajax({
        //        type: "POST",
        //        url: "http://localhost:9683/OData/City",
        //        data: { key: key,CountryId:countryId, Name: name }
        //    }).done(function (msg) {
        //        alert("Data Saved: " + msg);
        //    });
        //}

        //function getCities() {
        //    return datacontext.getCitiesLists().then(function (data) {
        //        console.log(data);
        //        return vm.citiesLists = data;
        //    });
        //}

        //function save() {
        //    isSaving = true;
        //    return datacontext.save()
        //        .then("Successful")
        //        .catch("Failed")
        //            // Todo: more sophisticated recovery. 
        //            // Here we just blew it all away and start over
        //            //refresh();                
        //        .finally(function () {
        //            isSaving = false;
        //        });
        //}

        //function myDeleteCity(city) {
        //    var ix = vm.cities.indexOf(city);
        //    if (ix > -1) {
        //        // remove from the list
        //        vm.cities.splice(ix, 1);
        //        // mark for delete but do not save
        //        datacontext.deleteCity(city);
        //    }
        //}
    }
})();
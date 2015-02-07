     /* ________________________________________________________________________________________________________
       | Company         | ShinerSoft Private Limited                                                          |
       |_________________|_____________________________________________________________________________________|       
       | File            |  HomeService.js                                                                     |
       |_________________|_____________________________________________________________________________________|
       | Description     |  Service: datacontext   ( Handles all persistence and creation/deletion of app )    |
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
       
    angular.module('app').factory('accountsService', ['$http', '$location', accountsService]);

    function accountsService($http, $location) {           
                       
        /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ============================================================ Accounts Service ==========================================================
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]------------------------------------------------------ Service definition ----------------------------------------------------------
        var service = {
            checkEmail: checkEmail,
            authenticateUser: authenticateUser,
            signup: signup,
            changePassword: changePassword,
            forgotPassword: forgotPassword,                  
            logout: logout
        };

        return service;               
        //[End]------------------------------------------------------ Service definition ----------------------------------------------------------

       /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ============================================================ Accounts Service ==========================================================
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]------------------------------------------------------ Methods implementation ----------------------------------------------------------
        // Check email validation
        function checkEmail(emailField) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var isValid = false;
            if (re.test(emailField) == false) {                
                isValid = false;
            }
            else {                
                isValid = true;
            }
            return isValid;
        }
        // Authenticate user
        function authenticateUser(params) {
             var response = '';
             var promise = $http({
                 method: 'GET',
                 params: params,                 
                 url: getBaseUrl() + 'Accounts/Authenticate'
             }).success(function (data, status, headers) {
                 response = data;
                 return response;
             })
             .error(function (data, status, headers) {
                 response = data;
                 return response;
             });
             return promise;
         }
        // User Signup/Registration 
        function signup(params) {
            var response = '';
            var promise = $http({
                method: 'GET',
                params: params,                
                url: getBaseUrl() + 'Accounts/Signup'
            }).success(function (data, status, headers) {
                response = data;
                return response;
            })
            .error(function (data, status, headers) {
                response = data;
                return response;
            });
            return promise;
        }
        //  Change password     
        function changePassword(params) {
            var response = '';
            var promise = $http({
                method: 'GET',
                params: params,                
                url: getBaseUrl() + 'Accounts/ChangePassword'
            }).success(function (data, status, headers) {
                response = data;
                return response;
            })
            .error(function (data, status, headers) {
                response = data;
                return response;
            });
            return promise;
        }
        // Forgot password
        function forgotPassword(params) {
            var response = '';
            var promise = $http({
                method: 'GET',
                params: params,                
                url: getBaseUrl() + 'Accounts/ForgotPassword'                
            }).success(function (data, status, headers) {
                response = data;
                return response;
            })
            .error(function (data, status, headers) {
                response = data;
                return response;
            });
            return promise;
        }        
       // Logout user
        function logout()
        {
            var response = '';
            var promise = $http({
                method: 'GET',
                params: params,
                url: getBaseUrl() + 'Accounts/Logout'                
            }).success(function (data, status, headers) {
                response = data;
                return response;
            })
            .error(function (data, status, headers) {
                response = data;
                return response;
            });
            return promise;
        }
        // Get base url
        function getBaseUrl() {
            var liveBaseUrl = 'API/API/';
            var localBaseUrl = 'http://localhost/JunkCarWebAPI/API/';
            return localBaseUrl;
        }
        //[End]------------------------------------------------------ Methods implementation ----------------------------------------------------------
    }    
}
)();
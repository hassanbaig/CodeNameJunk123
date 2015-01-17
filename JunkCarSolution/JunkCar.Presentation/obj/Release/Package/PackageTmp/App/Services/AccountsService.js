/***
 * Service: datacontext 
 *
 * Handles all persistence and creation/deletion of app entities
 * using BreezeJS.
 *
 ***/
(function () {
    'use strict';
       
    angular.module('app').factory('accountsService', ['$http', '$location', accountsService]);

    function accountsService($http, $location) {           
                       
        var service = {
            checkEmail: checkEmail,
            authenticateUser: authenticateUser,
            signup: signup,
            changePassword: changePassword,
            forgotPassword: forgotPassword,                  
            logout: logout
        };

        return service;                
       
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
        
         function authenticateUser(initialValues) {
             var response = '';
             var promise = $http({
                 method: 'GET',
                 params: params,
                 url: 'http://localhost/JunkCarWebAPI/junkcar.v1/Accounts/AuthenticateUser'
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

        function signup(params) {
            var response = '';
            var promise = $http({
                method: 'GET',
                params: params,
                url: 'http://localhost/JunkCarWebAPI/junkcar.v1/Accounts/Signup'
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
              
        function changePassword(initialValues) {
            var response = '';
            var promise = $http({
                method: 'GET',
                params: params,
                url: 'http://localhost/JunkCarWebAPI/junkcar.v1/Accounts/ChangePassword'
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

        function forgotPassword(initialValues) {
            var response = '';
            var promise = $http({
                method: 'GET',
                params: params,
                url: 'http://localhost/JunkCarWebAPI/junkcar.v1/Accounts/ForgotPassword'
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
       
        function logout()
        {
            var response = '';
            var promise = $http({
                method: 'GET',
                params: params,
                url: 'http://localhost/JunkCarWebAPI/junkcar.v1/Accounts/Logout'
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
    }    
}
)();
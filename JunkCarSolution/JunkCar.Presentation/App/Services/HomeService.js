(function () {
    'use strict';
        
    angular.module('app').factory('homeService', ['$http', '$location', homeService]);

    function homeService($http,$location) {

        /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ============================================================ Home Service ==============================================================
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]------------------------------------------------------ Service definition ----------------------------------------------------------
        var service = {
            getRegistrationYears: getRegistrationYears,
            getCylinders: getCylinders,
            getMakesByYear: getMakesByYear,
            getModelsByYearMake: getModelsByYearMake,
            checkZipCode:checkZipCode,
            getStates: getStates,
            getCities: getCities,
            getQuestionnaire: getQuestionnaire,
            getAnOffer:getAnOffer,
            getABetterOffer: getABetterOffer,            
            confirmOffer: confirmOffer,
            confirmOfferWithQuestionnaire: confirmOfferWithQuestionnaire,
            getCookie:getCookie,
            setCookie:setCookie
        };
        return service;
        //[End]------------------------------------------------------ Service definition ----------------------------------------------------------

        /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ============================================================ Home Service ==============================================================
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]------------------------------------------------------ Methods implementation ----------------------------------------------------------
        // Check email validation
        function isValidEmail(emailField) {
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
        // Get registration years list
        function getRegistrationYears() {           
            var response = '';            
            var promise = $http({
                method: 'GET',                
                url: getBaseUrl() + 'Home/GetRegistrationYears'
            }).success(function (data, status, headers) {
                response = data;
                return response;
            })
            .error(function (data,status,headers){
                response = data;
                return response;
            });
            return promise;
        }
        // Get cylinders list
        function getCylinders() {
            var response = '';
            var promise = $http({
                method: 'GET',
                url: getBaseUrl() + 'Home/GetCylinders'
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
        // Get makes list by year
        function getMakesByYear(params) {
            var response = '';                        
            var promise = $http({
                method: 'GET',
                params:params,                
                url: getBaseUrl() + 'Home/GetMakes'
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
        // Get models list by selected year and make
        function getModelsByYearMake(params) {
            var response = '';            
            var promise = $http({
                method: 'GET',
                params: params,                
                url: getBaseUrl() + 'Home/GetModels'
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
        // Check zip-code
        function checkZipCode(params) {
            var response = '';            
            var promise = $http({
                method: 'GET',
                params: params,
                url: getBaseUrl() + 'Home/CheckZipCode'
            }).success(function (data, status, headers) {
                response = data;
                setCookie("zipcode", response.Is_Valid_Zip_Code, 365);
                return response;
            })
            .error(function (data, status, headers) {
                response = data;
                return response;
            });
            return promise;
        }
        // Get states list
        function getStates() {
            var response = '';            
            var promise = $http({
                method: 'GET',                
                url: getBaseUrl() + 'Home/GetStates'
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
        // Get cities list
        function getCities(params) {
            var response = '';            
            var promise = $http({
                method: 'GET',
                params: params,                
                url: getBaseUrl() + 'Home/GetCities'
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
        // Get questionnaire
        function getQuestionnaire() {
            var response = '';            
            var promise = $http({
                method: 'GET',                
                url: getBaseUrl() + 'Home/GetQuestionnaire'
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
        // Get an offer
        function getAnOffer(params) {
            var response = '';            
            var promise = $http({
                method: 'GET',
                params: params,                
                url: getBaseUrl() + 'Home/GetAnOffer'
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
        // Get a better offer
        function getABetterOffer(params) {
            var response = '';            
            var promise = $http({
                method: 'GET',
                params: params,                
                url: getBaseUrl() + 'Home/GetABetterOffer'
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
        // Confirm offer without questionnaire
        function confirmOffer(params) {
            var response = '';            
            var promise = $http({
                method: 'GET',
                params: params,
                url: getBaseUrl() + 'Home/ConfirmOffer'
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
        // Confirm offer with questionnaire
        function confirmOfferWithQuestionnaire(params)
        {
            var response = '';
            var promise = $http({
                method: 'GET',
                params: params,
                url: getBaseUrl() + 'Home/ConfirmOfferWithQuestionnaire'
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
        // Set cookie
        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        }
        // Get cookie
        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
        }
        //[End]------------------------------------------------------ Methods implementation ----------------------------------------------------------
    }
}
)();
(function () {
    'use strict';
        
    angular.module('app').factory('homeService', ['$http', '$location', homeService]);

    function homeService($http,$location) {

        var service = {
            getRegistrationYears: getRegistrationYears,
            getMakesByYear: getMakesByYear,
            getModelsByYearMake: getModelsByYearMake,
            checkZipCode:checkZipCode,
            getStates: getStates,
            getCities: getCities,
            getQuestionnaire: getQuestionnaire,
            getAnOffer:getAnOffer,
            getABetterOffer: getABetterOffer,
            getAnOfferWithQuestionnaire: getAnOfferWithQuestionnaire,
            //postQuestionnaire:postQuestionnaire,
            confirmOffer: confirmOffer,
            confirmOfferWithQuestionnaire: confirmOfferWithQuestionnaire
        };
        return service;
        
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

        function checkZipCode(params) {
            var response = '';            
            var promise = $http({
                method: 'GET',
                params: params,
                url: getBaseUrl() + 'Home/CheckZipCode'
            }).success(function (data, status, headers) {
                response = data;
                var isValid = data.Is_Valid_Zip_Code;
                localStorage.setItem("isValidZipCode", isValid);
                return response;
            })
            .error(function (data, status, headers) {
                response = data;
                return response;
            });
            return promise;
        }

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
        function getAnOfferWithQuestionnaire(params) {
            var response = '';            
            var promise = $http({
                method: 'GET',                
                params: params,                
                url: getBaseUrl() + 'Home/GetAnOfferWithQuestionnaire'
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

        //function postQuestionnaire(params) {
        //    var response = '';
        //    var promise = $http({
        //        method: 'POST',
        //        params: params,              
        //        //url: 'API/API/Home/ConfirmOffer'
        //        url: 'http://localhost/JunkCarWebAPI/API/Home/ReceiveQuestionnaire'
        //    }).success(function (data, status, headers) {
        //        response = data;
        //        return response;
        //    })
        //    .error(function (data, status, headers) {
        //        response = data;
        //        return response;
        //    });
        //    return promise;
        //}

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

        function getBaseUrl() {            
            var liveBaseUrl = 'API/API/';
            var localBaseUrl = 'http://localhost/JunkCarWebAPI/API/';
            return liveBaseUrl;
        }
    }
}
)();
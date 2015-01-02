(function () {
    'use strict';

    var serviceId = 'homeService';
    angular.module('app').factory(serviceId, ['$http', '$location', homeService]);

    function homeService($http,$location) {

        var service = {
            getRegistrationYears: getRegistrationYears,
            getMakesByYear: getMakesByYear,
            getModelsByYearMake: getModelsByYearMake,
            checkZipCode:checkZipCode,
            getStates: getStates,
            getCities: getCities,
            getQuestionnaire: getQuestionnaire
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
                url: 'http://localhost/JunkCarWebAPI/junkcar.v1/Home/GetRegistrationYears'
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
                url: 'http://localhost/JunkCarWebAPI/junkcar.v1/Home/GetMakes'
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
                url: 'http://localhost/JunkCarWebAPI/junkcar.v1/Home/GetModels'
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
                url: 'http://localhost/JunkCarWebAPI/junkcar.v1/Home/CheckZipCode'
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

        function getStates() {
            var response = '';
            var promise = $http({
                method: 'GET',
                url: 'http://localhost/JunkCarWebAPI/junkcar.v1/Home/GetStates'
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
                url: 'http://localhost/JunkCarWebAPI/junkcar.v1/Home/GetCities'
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
                url: 'http://localhost/JunkCarWebAPI/junkcar.v1/Home/GetQuestionnaire'
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
                url: 'http://localhost/JunkCarWebAPI/junkcar.v1/Home/GetAnOffer'
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
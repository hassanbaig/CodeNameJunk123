(function () {
    'use strict';

    var serviceId = 'homeService';
    angular.module('app').factory(serviceId, ['$http', '$location', homeService]);

    function homeService($http,$location) {

        var service = {
            getRegistrationYears: getRegistrationYears,
            getRegistrationMakesByYear: getRegistrationMakesByYear
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

        function getRegistrationMakesByYear(params) {
            var response = '';
            var promise = $http({
                method: 'GET',
                params:params,
                url: 'http://localhost/JunkCarWebAPI/junkcar.v1/Home/GetRegistrationModels'
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
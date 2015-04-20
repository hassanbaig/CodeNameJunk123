     /* ________________________________________________________________________________________________________
       | Company         | ShinerSoft Private Limited                                                          |
       |_________________|_____________________________________________________________________________________|       
       | File            |  UtilityService.js                                                                  |
       |_________________|_____________________________________________________________________________________|
       | Description     |  Service: datacontext   ( Handles all persistence and creation/deletion of app )    |
       |_________________|_____________________________________________________________________________________|
       | Created By      |  HASSAN MUSTAFA BAIG                                                                |
       |_________________|_____________________________________________________________________________________|
       | Date Created    |  06 Feb 2015                                                                        |
       |_________________|_____________________________________________________________________________________|
       | Modified By     |                                                                                     | 
       |_________________|_____________________________________________________________________________________|
       | Date Modified   |  06 Feb 2015                                                                        |
       |_________________|_____________________________________________________________________________________|*/

(function () {
    'use strict';
       
    angular.module('app').factory('utilityService', ['$http', '$location', utilityService]);

    function utilityService($http, $location) {
                       
        /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ============================================================ Utility Service ==========================================================
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]------------------------------------------------------ Service definition ----------------------------------------------------------
        var service = {
            redirectIndex: redirectIndex,
            redirectHowItWorks: redirectHowItWorks,
            redirectAboutUs: redirectAboutUs,
            redirectContactUs: redirectContactUs,
            redirectSignUp: redirectSignUp,
            redirectLogin: redirectLogin,
            contactEmailSend: contactEmailSend,
            checkZipCode: checkZipCode
        };

        return service;               
        //[End]------------------------------------------------------ Service definition ----------------------------------------------------------

        /*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ============================================================ Utility Service ==========================================================
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
         ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

        //[Start]------------------------------------------------------ Methods implementation ----------------------------------------------------------        
        //------------------------------------------------------------- Redirection methods -------------------------------------------------------------
        function redirectIndex() {
            $location.path('/Index');
            window.location = "Index.html";
        }
        function redirectHowItWorks() {
            $location.path('/Howitworks');
            window.location = "Howitworks.html";
        }
        function redirectAboutUs() {
            $location.path('/Aboutus');
            window.location = "Aboutus.html";
        }
        function redirectContactUs() {
            $location.path('/Contactus');
            window.location = "Contactus.html";
        }
        function redirectSignUp() {
            $location.path('/Signup');
            window.location = "Signup.html";
        }
        function redirectLogin() {
            $location.path('/Login');
            window.location = "Login.html";
        }
        // Contact us email
        function contactEmailSend(params) {
            var response = '';
            var promise = $http({
                method: 'GET',
                params: params,                
                url: getBaseUrl() + 'ContactUs/ContactEmailMessage'
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
                url: getBaseUrl() + 'ContactUs/CheckZipCode'
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
            return liveBaseUrl;
        }
        //[End]------------------------------------------------------ Methods implementation ----------------------------------------------------------
    }    
}
)();
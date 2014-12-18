var app = angular.module('app', []);

app.controller('utilityController', ['$scope', '$http', function ($scope, $http) {  

    // Scope methods implementation
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
   
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
}]);


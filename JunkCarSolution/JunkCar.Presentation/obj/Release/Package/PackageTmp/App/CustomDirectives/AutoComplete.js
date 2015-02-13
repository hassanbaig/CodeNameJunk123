var app = angular.module('myApp', []);

app.controller('MainCtrl', function ($scope) {
    $scope.titles = ["Action Comics", "Detective Comics", "Superman", "Fantastic Four", "Amazing Spider-Man"];
    $scope.addItem = function (item) {
        if (!_.contains($scope.titles, item.title)) {
            $scope.titles.push(item.title);
        }
        $scope.item = {};
    }
});
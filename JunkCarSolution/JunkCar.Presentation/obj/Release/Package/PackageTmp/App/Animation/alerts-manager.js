angular.module('app').factory('alertsManager', function () {
    return {
        alerts: {},
        addAlert: function (message, type) {
            this.alerts[type] = this.alerts[type] || [];
            this.alerts[type].push(message);
        },
        clearAlerts: function () {
            for (var x in this.alerts) {
                delete this.alerts[x];
            }
        }
    };
});

//angular.module('app', ['ui.bootstrap']);
//angular.module('app').controller('AlertController', function ($scope) {
//    $scope.alerts = [
//      { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
//      { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
//    ];

//    $scope.addAlert = function () {
//        $scope.alerts.push({ msg: 'Another alert!' });
//    };

//    $scope.closeAlert = function (index) {
//        $scope.alerts.splice(index, 1);
//    };
//});
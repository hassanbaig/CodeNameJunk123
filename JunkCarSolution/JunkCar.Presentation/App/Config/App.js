(function () {
    'use strict';
    
    //var app = angular.module('app', [
    //    // Angular modules 
    //    //'ngAnimate',        // animations
    //    //'ngRoute',          // routing
    //    //'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)

    //    // Breeze Modules
    //      'breeze.angular',   // Breeze service

    //    //'breeze.angular.q' // tells breeze to use $q instead of Q.js

    //    // Custom modules 
    //    //'common',           // common functions, logger, spinner
    //    //'common.bootstrap', // bootstrap dialog wrapper functions

    //    // 3rd Party Modules
    //    //'ui.bootstrap'      // ui-bootstrap (ex: carousel, pagination, dialog)
    //]);


    //app.run(['breeze', function () { }]);

    angular.module('app', ['breeze.angular', 'angularSpinner', 'ngAnimate', 'filters', 'rangeFilters', 'timeRangeFilters', 'ui-rangeSlider'])
           // merely depending on the 'breeze' service configures Breeze for Angular
           .run(['breeze', function () {/* noop - unless you want do do something */ }]);

    //app.run(['$q', 'use$q', function ($q, use$q) {
    //    use$q($q);
    //}]);
})();
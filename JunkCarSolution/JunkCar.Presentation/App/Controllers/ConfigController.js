/***
 * Controller/ViewModel: todolists 
 *
 * Support a view of all TodoLists
 *
 * Handles fetch and save of these lists
 *
 ***/
(function () {
    'use strict';

    var controllerId = 'configController';
    angular.module('app').controller(controllerId,
    ['configService', 'logger', '$scope', '$location', configController]);

    function configController(configService, logger, $scope, $location) {
        logger = logger.forSource(controllerId);
        var logError = logger.logError;
        var logSuccess = logger.logSuccess;        

        // ViewModel
        var configControllerVM = this;

        // ViewModel variables                
        configControllerVM.specialtiesList = '';

        // ViewModel Methods        
        configControllerVM.getSpecialties = getSpecialties;

      
        //$scope.getSpecialties = getSpecialties;


        function getSpecialties()
        {
            debugger;
            return configService.getSpecialties().then(function (data) {
                alert(data.results);
                return configControllerVM.specialtiesList = data.results;
            });
        }             
    }
})();
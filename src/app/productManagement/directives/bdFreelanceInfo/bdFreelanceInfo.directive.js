(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .directive('bdFreelanceInfo', bdFreelanceInfo)
    ;

    function bdFreelanceInfo() {

        return {
            scope: {
                freelance: '=',
                isNew: '='
            },
            restrict: 'AE',
            templateUrl: 'productManagement/directives/bdFreelanceInfo/bdFreelanceInfo.tpl.html',
            controller: 'BdFreelanceInfoCtrl'
        };
    }
})();
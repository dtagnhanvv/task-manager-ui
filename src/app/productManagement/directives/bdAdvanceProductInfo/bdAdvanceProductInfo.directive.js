(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .directive('bdAdvanceProductInfo', bdAdvanceProductInfo)
    ;

    function bdAdvanceProductInfo() {

        return {
            scope: {
                advance: '=',
                isNew: '='
            },
            restrict: 'AE',
            templateUrl: 'productManagement/directives/bdAdvanceProductInfo/bdAdvanceProductInfo.tpl.html',
            controller: 'BdAdvanceProductInfoCtrl'
        };
    }
})();
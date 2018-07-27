(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .directive('bdBasicProductInfo', bdBasicProductInfo)
    ;

    function bdBasicProductInfo() {

        return {
            scope: {
                basic: '=',
                isNew: '='
            },
            restrict: 'AE',
            templateUrl: 'productManagement/directives/bdBasicProductInfo/bdBasicProductInfo.tpl.html',
            controller: 'BdBasicProductInfoCtrl'
        };
    }
})();
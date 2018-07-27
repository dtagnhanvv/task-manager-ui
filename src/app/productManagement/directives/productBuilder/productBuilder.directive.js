(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .directive('bdProductBuilder', bdProductBuilder)
    ;

    function bdProductBuilder() {

        return {
            scope: {
                type: '=',
                model: '=',
                tempAuction: '=',
                accounts: '=',
                serviceManager: '=',
                historyTypePath: '=',
            },
            restrict: 'AE',
            templateUrl: 'productManagement/directives/productBuilder/productBuilder.tpl.html',
            controller: 'ProductBuilderCtrl'
        };
    }
})();
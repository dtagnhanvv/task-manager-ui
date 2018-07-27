(function () {
    'use strict';

    angular.module('biddy.userManagement')
        .directive('bdSaleList', bdSaleList)
    ;

    function bdSaleList() {

        return {
            scope: {
                role: '=',
                sales: '=',
                restAngularManager: '='
            },
            restrict: 'AE',
            templateUrl: 'userManagement/directives/bdSaleList/bdSaleList.tpl.html',
            controller: 'BdSaleList'
        };
    }
})();
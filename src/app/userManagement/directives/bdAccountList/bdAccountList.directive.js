(function () {
    'use strict';

    angular.module('biddy.userManagement')
        .directive('bdAccountList', bdAccountList)
    ;

    function bdAccountList() {

        return {
            scope: {
                role: '=',
                accounts: '=',
                restAngularManager: '='
            },
            restrict: 'AE',
            templateUrl: 'userManagement/directives/bdAccountList/bdAccountList.tpl.html',
            controller: 'BdAccountList'
        };
    }
})();
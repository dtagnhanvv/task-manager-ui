(function () {
    'use strict';

    angular.module('biddy.userManagement')
        .directive('bdAccount', bdAccount)
    ;

    function bdAccount() {

        return {
            scope: {
                role: '=',
                account: '=',
                isNew: '='
            },
            restrict: 'AE',
            templateUrl: 'userManagement/directives/bdAccount/bdAccount.tpl.html',
            controller: 'BdAccount'
        };
    }
})();
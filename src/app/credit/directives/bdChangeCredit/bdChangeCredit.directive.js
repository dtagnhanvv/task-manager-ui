(function () {
    'use strict';

    angular.module('biddy.credit')
        .directive('bdChangeCredit', bdChangeCredit)
    ;

    function bdChangeCredit() {

        return {
            scope: {
                role: '=',
                account: '=',
                wallets: '='
            },
            restrict: 'AE',
            templateUrl: 'credit/directives/bdChangeCredit/bdChangeCredit.tpl.html',
            controller: 'BdChangeCredit'
        };
    }
})();
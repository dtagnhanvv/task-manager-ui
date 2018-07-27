(function () {
    'use strict';

    angular.module('biddy.credit.creditTransaction')
        .directive('bdCreditTransactions', bdCreditTransactions)
    ;

    function bdCreditTransactions() {

        return {
            scope: {
                role: '=',
                creditTransactions: '=',
                restAngularManager: '=',
                account: '='
            },
            restrict: 'AE',
            templateUrl: 'credit/directives/bdCreditTransaction/bdCreditTransaction.tpl.html',
            controller: 'BdCreditTransactions'
        };
    }
})();
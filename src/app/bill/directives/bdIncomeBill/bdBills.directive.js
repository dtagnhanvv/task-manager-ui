(function () {
    'use strict';

    angular.module('biddy.bid')
        .directive('bdBills', bdBills)
    ;

    function bdBills() {

        return {
            scope: {
                billConfig: '=',
                billService: '=',
                count: '=',
                color: '=?',
            },
            restrict: 'AE',
            templateUrl: 'bill/directives/bdIncomeBill/bdBills.tpl.html',
            controller: 'BdBills'
        };
    }
})();
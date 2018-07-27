(function () {
    'use strict';

    angular.module('biddy.bid')
        .directive('bdBidForm', bdBidForm)
    ;

    function bdBidForm() {

        return {
            scope: {
                product: '=',
                auction: '=',
                currentUser: '='
            },
            restrict: 'AE',
            templateUrl: 'bid/directives/bdBidForm/bdBidForm.tpl.html',
            controller: 'BdBidForm'
        };
    }
})();
(function () {
    'use strict';

    angular.module('biddy.credit.creditTransaction')
        .controller('CreditTransactions', CreditTransactions);

    function CreditTransactions($scope, creditTransactions, account) {
        $scope.creditTransactions = creditTransactions;
        $scope.account = account;

    }
})();
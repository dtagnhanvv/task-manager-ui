(function () {
    'use strict';

    angular
        .module('biddy.sale.accountManagement')
        .controller('SaleAccountsList', AccountList)
    ;

    function AccountList($scope, accounts, USER_ROLES, saleUserManager) {
        $scope.role = {
            name: USER_ROLES.admin
        };
        $scope.accounts = accounts;
        $scope.restAngularManager = saleUserManager;
    }
})();
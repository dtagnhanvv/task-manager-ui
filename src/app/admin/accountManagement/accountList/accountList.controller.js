(function () {
    'use strict';

    angular
        .module('biddy.admin.accountManagement')
        .controller('AccountList', AccountList)
    ;

    function AccountList($scope, accounts, USER_ROLES, adminUserManager) {
        $scope.role = {
            name: USER_ROLES.admin
        };
        $scope.accounts = accounts;
        $scope.restAngularManager = adminUserManager;
    }
})();
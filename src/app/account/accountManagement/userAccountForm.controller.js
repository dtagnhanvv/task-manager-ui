(function () {
    'use strict';

    angular
        .module('biddy.account.accountManagement').controller('UserAccountForm', UserAccountForm);

    function UserAccountForm($scope, account, USER_ROLES) {
        $scope.role = {
            name: USER_ROLES.account
        };
        $scope.isNew = false;
        $scope.account = account;
    }
})();
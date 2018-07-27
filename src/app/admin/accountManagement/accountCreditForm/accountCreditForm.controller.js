(function () {
    'use strict';

    angular
        .module('biddy.admin.accountManagement')
        .controller('AccountCreditForm', AccountCreditForm)
    ;

    function AccountCreditForm($scope, account, wallets, USER_ROLES) {
        $scope.role = {
            name: USER_ROLES.admin
        };
        $scope.account = account || {
            username: null,
            plainPassword: null,
            email: null,
            firstName: null,
            lastName: null,
            phone: null,
            userType: null,
            enabled: true,
            enabledModules: ['MODULE_PRODUCT', 'MODULE_COMMENT']
        };

        $scope.wallets = wallets;
    }
})();
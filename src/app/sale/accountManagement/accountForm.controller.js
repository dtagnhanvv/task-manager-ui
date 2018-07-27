(function () {
    'use strict';

    angular
        .module('biddy.sale.accountManagement')
        .controller('SaleAccountForm', SaleAccountForm)
    ;

    function SaleAccountForm($scope, account,USER_ROLES) {
        $scope.role = {
            name: USER_ROLES.sale
        };
        $scope.isNew = account == null;
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
    }
})();
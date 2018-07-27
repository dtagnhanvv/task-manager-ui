(function () {
    'use strict';

    angular
        .module('biddy.admin.saleManagement')
        .controller('AdminSaleCreditForm', AdminSaleCreditForm)
    ;

    function AdminSaleCreditForm($scope, historyStorage, HISTORY_TYPE_PATH, sale, USER_ROLES, wallets) {
        $scope.role = {
            name: USER_ROLES.admin
        };
        $scope.sale = sale || {
            username: null,
            plainPassword: null,
            email: null,
            firstName: null,
            lastName: null,
            phone: null,
            enabled: true,
            enabledModules: ['MODULE_CREDIT', 'MODULE_USER']
        };

        $scope.wallets = wallets;
    }
})();
(function () {
    'use strict';

    angular
        .module('biddy.admin.saleManagement')
        .controller('SaleForm', SaleForm)
    ;

    function SaleForm($scope, historyStorage, HISTORY_TYPE_PATH, sale, USER_ROLES) {
        $scope.role = {
            name: USER_ROLES.sale
        };
        $scope.isNew = sale == null;
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

    }
})();
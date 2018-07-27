(function () {
    'use strict';

    angular
        .module('biddy.admin.saleManagement')
        .controller('AdminSaleForm', AdminSaleForm)
    ;

    function AdminSaleForm($scope, historyStorage, HISTORY_TYPE_PATH, sale, USER_ROLES) {
        $scope.role = {
            name: USER_ROLES.admin
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
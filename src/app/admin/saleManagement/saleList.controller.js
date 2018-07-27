(function () {
    'use strict';
    angular.module('biddy.admin.saleManagement').controller('SaleList', SaleList);

    function SaleList($scope, sales, USER_ROLES, adminSaleManager) {
        $scope.role = {
            name: USER_ROLES.admin
        };
        $scope.sales = sales;
        $scope.restAngularManager = adminSaleManager;
    }
})();
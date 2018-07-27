(function () {
    'use strict';

    angular.module('biddy.productManagement.product')
        .controller('ProductList', ProductList);

    function ProductList($scope, accounts, products, PRODUCT_TYPES, GeneralProductHelper) {
        $scope.products = products;
        $scope.accounts = accounts;
        $scope.type = PRODUCT_TYPES.GENERAL;
        $scope.serviceManager = GeneralProductHelper;
    }
})();
(function () {
    'use strict';

    angular.module('biddy.productManagement.freelanceProduct')
        .controller('FreelanceProductListCtrl', FreelanceProductListCtrl);

    function FreelanceProductListCtrl($scope, accounts, products, PRODUCT_TYPES, GeneralProductHelper) {
        $scope.products = products;
        $scope.accounts = accounts;
        $scope.type = PRODUCT_TYPES.FREELANCE;
        $scope.serviceManager = GeneralProductHelper;
    }
})();
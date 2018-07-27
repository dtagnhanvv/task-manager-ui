(function () {
    'use strict';

    angular.module('biddy.productManagement.product')
        .controller('ProductBuilder', ProductBuilder);

    function ProductBuilder($scope, accounts, tempAuction, product, PRODUCT_TYPES, GeneralProductHelper, HISTORY_TYPE_PATH) {
        $scope.product = product;
        $scope.accounts = accounts;
        $scope.type = PRODUCT_TYPES.GENERAL;
        $scope.tempAuction = tempAuction;
        $scope.serviceManager = GeneralProductHelper;
        $scope.historyTypePath = HISTORY_TYPE_PATH.product;
    }
})();
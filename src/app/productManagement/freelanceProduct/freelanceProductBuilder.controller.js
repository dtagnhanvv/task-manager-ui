(function () {
    'use strict';

    angular.module('biddy.productManagement.freelanceProduct')
        .controller('FreelanceProductBuilder', FreelanceProductBuilder);

    function FreelanceProductBuilder($scope, accounts, tempAuction, product, PRODUCT_TYPES, GeneralProductHelper, HISTORY_TYPE_PATH) {
        $scope.product = product;
        $scope.accounts = accounts;
        $scope.type = PRODUCT_TYPES.FREELANCE;
        $scope.tempAuction = tempAuction;
        $scope.serviceManager = GeneralProductHelper;
        $scope.historyTypePath = HISTORY_TYPE_PATH.freelance;
    }
})();
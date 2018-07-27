(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .directive('bdProductList', bdProductList)
    ;

    function bdProductList() {

        return {
            scope: {
                type: '=',
                products: '=',
                serviceManager: '=',
                accounts: '=',
            },
            restrict: 'AE',
            templateUrl: 'productManagement/directives/productList/productList.tpl.html',
            controller: 'ProductListCtrl'
        };
    }
})();
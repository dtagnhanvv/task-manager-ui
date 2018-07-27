(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .filter('filterSellerNotHasProduct', filterSellerNotHasProduct)
    ;

    function filterSellerNotHasProduct() {
        return function (items, productId) {
            if (angular.isObject(productId) && productId.id) {
                // allow user to pass in a account object
                productId = productId.id;
            }

            productId = parseInt(productId, 10);

            if (!productId) {
                return items;
            }

            var filtered = [];

            angular.forEach(items, function (item) {
                if (!angular.isObject(item)) {
                    return;
                }
                try {
                    if (productId !== item.id) {
                        filtered.push(item);
                    }
                } catch (e) {
                }
            });
            return filtered;
        }
    }
})();
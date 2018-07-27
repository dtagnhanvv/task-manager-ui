(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .filter('filterOrderByAccount', filterOrderByAccount)
    ;

    function filterOrderByAccount() {
        return function (items, accountId) {
            if (angular.isObject(accountId) && accountId.id) {
                // allow user to pass in a account object
                accountId = accountId.id;
            }

            accountId = parseInt(accountId, 10);

            if (!accountId) {
                return items;
            }

            var filtered = [];

            angular.forEach(items, function (item) {
                if (!angular.isObject(item)) {
                    return;
                }
                try {
                    if (accountId !== item.buyer.id) {
                        filtered.push(item);
                    }
                } catch (e) {
                }
            });
            return filtered;
        }
    }
})();
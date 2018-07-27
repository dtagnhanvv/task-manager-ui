(function () {
    'use strict';

    angular.module('biddy.blocks.misc')
        .filter('selectedAccount', selectedAccount)
    ;

    function selectedAccount(Auth) {
        return function (items, accountId) {
            if(Auth.isSubAccount()) {
                return items;
            }

            if (angular.isObject(accountId) && accountId.id) {
                // allow user to pass in a account object
                accountId = accountId.id;
            }

            accountId = parseInt(accountId, 10);

            if (!accountId) {
                return items;
            }

            var filtered = [];

            angular.forEach(items, function(item) {
                if (!angular.isObject(item)) {
                    return;
                }

                try {
                    // we use item.id == null for the option to indicate 'All" at the moment
                    if (item.id == null || accountId === item.account.id) {
                        filtered.push(item);
                    }
                } catch (e) {}
            });

            return filtered;
        }
    }
})();
(function () {
   'use strict';

    angular
        .module('biddy.account.accountManagement')
        .factory('accountManager', accountManager)
    ;

    function accountManager(accountRestangular) {
        var RESOURCE_NAME = 'accounts/current';

        accountRestangular.addRequestInterceptor(function(element, operation, what) {
            if (what !== RESOURCE_NAME) {
                return element;
            }

            if (['put', 'patch', 'post'].indexOf(operation) > -1) {
                delete element.lastLogin;
            }

            return element;
        });

        return accountRestangular.service(RESOURCE_NAME);
    }
})();
(function () {
   'use strict';

    angular
        .module('biddy.sale.accountManagement')
        .factory('saleUserManager', saleUserManager)
    ;

    function saleUserManager(saleRestangular) {
        var RESOURCE_NAME = 'users';

        saleRestangular.addRequestInterceptor(function(element, operation, what) {
            if (what !== RESOURCE_NAME) {
                return element;
            }

            if (['put', 'patch', 'post'].indexOf(operation) > -1) {
                delete element.lastLogin;
            }

            return element;
        });

        return saleRestangular.service(RESOURCE_NAME);
    }
})();
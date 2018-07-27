(function () {
   'use strict';

    angular
        .module('biddy.admin.saleManagement')
        .factory('adminSaleManager', adminSaleManager)
    ;

    function adminSaleManager(adminRestangular) {
        var RESOURCE_NAME = 'sales';

        adminRestangular.addRequestInterceptor(function(element, operation, what) {
            if (what !== RESOURCE_NAME) {
                return element;
            }

            if (['put', 'patch', 'post'].indexOf(operation) > -1) {
                delete element.lastLogin;
            }

            return element;
        });

        return adminRestangular.service(RESOURCE_NAME);
    }
})();
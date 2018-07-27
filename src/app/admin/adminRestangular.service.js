(function () {
    'use strict';

    angular
        .module('biddy.admin')
        .factory('adminRestangular', adminRestangular)
    ;

    function adminRestangular(Restangular, API_ADMIN_BASE_URL) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(API_ADMIN_BASE_URL);
        });
    }

})();
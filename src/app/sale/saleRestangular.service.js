(function () {
    'use strict';

    angular
        .module('biddy.sale')
        .factory('saleRestangular', saleRestangular)
    ;

    function saleRestangular(Restangular, API_SALE_BASE_URL) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(API_SALE_BASE_URL);
        });
    }

})();
(function () {
    'use strict';

    angular
        .module('biddy.admin')
        .factory('productRestAngular', productRestAngular)
    ;

    function productRestAngular(Restangular, API_BASE_URL) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(API_BASE_URL);
        });
    }
})();
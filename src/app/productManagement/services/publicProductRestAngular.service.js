(function () {
    'use strict';

    angular
        .module('biddy.admin')
        .factory('publicProductRestAngular', publicProductRestAngular)
    ;

    function publicProductRestAngular(Restangular, PUBLIC_API_BASE_URL) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(PUBLIC_API_BASE_URL);
        });
    }
})();
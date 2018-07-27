(function () {
    'use strict';

    angular
        .module('biddy.core')
        .factory('publicRestangular', publicRestangular)
    ;

    function publicRestangular(Restangular, API_PUBLIC_BASE_URL) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(API_PUBLIC_BASE_URL);
        });
    }

})();
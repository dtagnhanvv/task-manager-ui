(function () {
    'use strict';

    angular
        .module('biddy.admin')
        .factory('reportRestangular', reportRestangular)
    ;

    function reportRestangular(Restangular, API_COMPARISION_BASE_URL) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(API_COMPARISION_BASE_URL);
        });
    }

})();
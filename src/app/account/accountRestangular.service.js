(function () {
    'use strict';

    angular
        .module('biddy.account')
        .factory('accountRestangular', accountRestangular)
    ;

    function accountRestangular(Restangular, API_ACCOUNT_BASE_URL) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(API_ACCOUNT_BASE_URL);
        });
    }

})();
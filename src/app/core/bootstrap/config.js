(function () {
    'use strict';

    angular.module('biddy.core.bootstrap')
        .constant('API_END_POINT', 'http://api.biddy-dev.test/app_dev.php/api')
        .constant('PUBLIC_API_END_POINT', 'http://api.biddy.test/app_dev.php/api/public')

        .provider('API_BASE_URL', {
            $get: function(API_END_POINT) {
                return API_END_POINT + '/v1';
            }
        })
        .provider('PUBLIC_API_BASE_URL', {
            $get: function(PUBLIC_API_END_POINT) {
                return PUBLIC_API_END_POINT + '/v1';
            }
        })
    ;
})();
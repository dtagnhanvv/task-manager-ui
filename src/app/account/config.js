(function () {
    'use strict';

    angular
        .module('biddy.account')
        .provider('API_ACCOUNT_BASE_URL', {
            $get: function(API_END_POINT) {
                return API_END_POINT + '/account/v1';
            }
        })
    ;

})();
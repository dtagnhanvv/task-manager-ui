(function () {
    'use strict';

    angular
        .module('biddy.admin')
        .constant('USER_TYPES',[
            { key: 'BIDDER', label : 'Bidder', value: 'Bidder'},
            { key: 'TENDER', label : 'Tender', value: 'Tender'},
            // { key: 'ADMIN', label : 'Admin', value: 'Admin'},
        ])
        .provider('API_ADMIN_BASE_URL', {
            $get: function(API_END_POINT) {
                return API_END_POINT + '/admin/v1';
            }
        })
    ;

})();
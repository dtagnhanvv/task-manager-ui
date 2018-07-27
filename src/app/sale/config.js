(function () {
    'use strict';

    angular
        .module('biddy.sale')
        .constant('USER_TYPES',[
            { key: 'BIDDER', label : 'Bidder', value: 'Bidder'},
            { key: 'TENDER', label : 'Tender', value: 'Tender'},
            // { key: 'SALE', label : 'Admin', value: 'Admin'},
        ])
        .provider('API_SALE_BASE_URL', {
            $get: function(API_END_POINT) {
                return API_END_POINT + '/sale/v1';
            }
        })
    ;

})();
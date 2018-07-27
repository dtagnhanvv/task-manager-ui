(function () {
    'use strict';

    angular.module('biddy.auction')
        .constant('AUCTION_TYPE', {
            MANUAL: 'manual',
            AUTO: 'automated'
        })
        .constant('AUCTION_OBJECTIVE', {
            LOWEST_PRICE: 'lowest_price',
            HIGHEST_PRICE: 'highest_price'
        })
        .constant('AUCTION_INCREMENT_TYPE', {
            PERCENT: 'percent',
            CREDIT: 'credit'
        })
        .constant('AUCTION_PAYMENT_TYPE', {
            OFFLINE: 'offline',
            CREDIT: 'credit'
        })

})();
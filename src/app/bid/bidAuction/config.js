(function () {
    'use strict';

    angular.module('biddy.bid.bidAuction')
        .constant('BID_STATUS', {
            PENDING: 'pending',
            BIDDING: 'bidding',
            INVALID: 'invalid',
            WIN: 'win',
            LOOSE: 'loose',
            CANCEL: 'cancel'
        })
})();
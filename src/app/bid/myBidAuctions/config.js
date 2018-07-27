(function () {
    'use strict';

    angular.module('biddy.bid.myBidAuctions')
        .constant("AUCTION_STATUS", {
            BIDDING: 'bidding',
            CLOSED: 'closed'
        })
})();
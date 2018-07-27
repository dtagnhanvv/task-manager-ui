(function () {
    'use strict';

    angular.module('biddy.bid.bidAuction')
        .factory('biddingProducts', biddingProducts)
    ;

    function biddingProducts(productManager) {
        return {
            getList: getList,
            cancel: cancel
        };

        function getList(query) {
            return productManager.one().one('buyers').customPOST(query);
        }

        function cancel(id) {
            return productManager.one(id).one('bids').one('cancel').customPOST()
        }

    }
})();
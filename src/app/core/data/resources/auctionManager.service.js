(function () {
    'use strict';

    angular
        .module('biddy.core.data.resources')
        .factory('auctionManager', auctionManager)
    ;

    function auctionManager(productRestAngular) {
        var RESOURCE_NAME = 'auctions';
        return productRestAngular.service(RESOURCE_NAME);
    }
})();
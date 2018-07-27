(function () {
    'use strict';

    angular
        .module('biddy.core.data.resources')
        .factory('biddingManager', biddingManager)
    ;

    function biddingManager(productRestAngular) {
        var RESOURCE_NAME = 'bids';
        return productRestAngular.service(RESOURCE_NAME);
    }
})();
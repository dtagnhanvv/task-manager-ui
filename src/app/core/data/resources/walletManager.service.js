(function () {
    'use strict';

    angular
        .module('biddy.core.data.resources')
        .factory('walletManager', walletManager)
    ;

    function walletManager(productRestAngular) {
        var RESOURCE_NAME = 'wallets';
        return productRestAngular.service(RESOURCE_NAME);
    }
})();
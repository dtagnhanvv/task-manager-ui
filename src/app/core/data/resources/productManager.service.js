(function () {
    'use strict';

    angular
        .module('biddy.core.data.resources')
        .factory('productManager', productManager)
    ;

    function productManager(productRestAngular) {
        var RESOURCE_NAME = 'products';
        return productRestAngular.service(RESOURCE_NAME);
    }
})();
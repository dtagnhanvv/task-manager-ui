(function () {
    'use strict';

    angular
        .module('biddy.core.data.resources')
        .factory('billManager', billManager)
    ;

    function billManager(productRestAngular) {
        var RESOURCE_NAME = 'bills';
        return productRestAngular.service(RESOURCE_NAME);
    }
})();
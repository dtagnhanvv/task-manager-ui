(function () {
    'use strict';

    angular
        .module('biddy.core.data.resources')
        .factory('alertManager', alertManager)
    ;

    function alertManager(productRestAngular) {
        var RESOURCE_NAME = 'alerts';
        return productRestAngular.service(RESOURCE_NAME);
    }
})();
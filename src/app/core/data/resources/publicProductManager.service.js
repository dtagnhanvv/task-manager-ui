(function () {
    'use strict';

    angular
        .module('biddy.core.data.resources')
        .factory('publicProductManager', publicProductManager)
    ;

    function publicProductManager(publicProductRestAngular) {
        var RESOURCE_NAME = 'products';
        return publicProductRestAngular.service(RESOURCE_NAME);
    }
})();
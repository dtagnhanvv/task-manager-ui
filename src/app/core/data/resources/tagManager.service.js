(function () {
    'use strict';

    angular
        .module('biddy.core.data.resources')
        .factory('tagManager', tagManager)
    ;

    function tagManager(productRestAngular) {
        var RESOURCE_NAME = 'tags';
        return productRestAngular.service(RESOURCE_NAME);
    }
})();
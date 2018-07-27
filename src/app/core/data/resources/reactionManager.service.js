(function () {
    'use strict';

    angular
        .module('biddy.core.data.resources')
        .factory('reactionManager', reactionManager)
    ;

    function reactionManager(productRestAngular) {
        var RESOURCE_NAME = 'reactions';
        return productRestAngular.service(RESOURCE_NAME);
    }
})();
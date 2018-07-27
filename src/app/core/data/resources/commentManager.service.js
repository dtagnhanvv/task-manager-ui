(function () {
    'use strict';

    angular
        .module('biddy.core.data.resources')
        .factory('commentManager', commentManager)
    ;

    function commentManager(productRestAngular) {
        var RESOURCE_NAME = 'comments';
        return productRestAngular.service(RESOURCE_NAME);
    }
})();
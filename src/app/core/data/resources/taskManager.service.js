(function () {
    'use strict';

    angular
        .module('biddy.core.data.resources')
        .factory('taskManager', taskManager)
    ;

    function taskManager(productRestAngular) {
        var RESOURCE_NAME = 'tasks';
        return productRestAngular.service(RESOURCE_NAME);
    }
})();
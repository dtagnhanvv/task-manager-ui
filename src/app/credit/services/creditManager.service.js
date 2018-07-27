(function () {
    'use strict';

    angular
        .module('biddy.core.data.resources')
        .factory('creditManager', creditManager)
    ;

    function creditManager(userRestAngular) {
        var RESOURCE_NAME = 'credittransactions';
        return userRestAngular.service(RESOURCE_NAME);
    }
})();
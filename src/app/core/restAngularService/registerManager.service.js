(function () {
    'use strict';

    angular
        .module('biddy.core.data.resources')
        .factory('registerManager', registerManager)
    ;

    function registerManager(publicRestangular) {
        var RESOURCE_NAME = 'register';
        return publicRestangular.service(RESOURCE_NAME);
    }
})();
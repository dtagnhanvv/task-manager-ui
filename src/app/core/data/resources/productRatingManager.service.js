(function () {
    'use strict';

    angular
        .module('biddy.core.data.resources')
        .factory('productRatingManager', productRatingManager)
    ;

    function productRatingManager(productRestAngular) {
        var RESOURCE_NAME = 'productratings';
        return productRestAngular.service(RESOURCE_NAME);
    }
})();
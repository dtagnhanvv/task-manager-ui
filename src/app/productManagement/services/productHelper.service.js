(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .factory('GeneralProductHelper', GeneralProductHelper)
    ;

    function GeneralProductHelper(productManager) {
        return {
            newModel: newModel,
            getList: getList,
            saveModel: saveModel,
        };

        function newModel(id, params) {
            return productManager.one(id).patch(params)
        }

        function saveModel(params) {
            return productManager.post(params);
        }

        function getList(params) {
            return productManager.one('list').customPOST(params)
                .then(function (product) {
                    return product.plain();
                });
        }
    }
})();
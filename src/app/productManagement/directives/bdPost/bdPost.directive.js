(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .directive('bdPost', bdPost)
    ;

    function bdPost() {

        return {
            scope: {
                product: '=',
                watchManager: '='
            },
            restrict: 'AE',
            templateUrl: 'productManagement/directives/bdPost/bdPost.tpl.html',
            controller: 'BdPost'
        };
    }
})();
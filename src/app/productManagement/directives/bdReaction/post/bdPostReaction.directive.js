(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .directive('bdPostReaction', bdPostReaction)
    ;

    function bdPostReaction() {

        return {
            scope: {
                commentCount: '@',
                reactionsData: '=',
                watchManager: '='
            },
            restrict: 'AE',
            templateUrl: 'productManagement/directives/bdReaction/post/bdPostReaction.tpl.html',
            controller: 'BdReaction'
        };
    }
})();
(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .directive('bdCommentReaction', bdCommentReaction)
    ;

    function bdCommentReaction() {

        return {
            scope: {
                commentCount: '@',
                reactionsData: '=',
                watchManager: '=',
                isChild: '='
            },
            restrict: 'AE',
            templateUrl: 'productManagement/directives/bdReaction/comment/bdCommentReaction.tpl.html',
            controller: 'BdReaction'
        };
    }
})();
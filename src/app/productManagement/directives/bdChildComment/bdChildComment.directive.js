(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .directive('bdChildComment', bdChildComment)
    ;

    function bdChildComment() {
        return {
            scope: {
                comment: '=',
                product: '=',
                watchManager: '=',
                isChild: "=",
                parent: '='
            },
            restrict: 'AE',
            templateUrl: 'productManagement/directives/bdChildComment/bdChildComment.tpl.html',
            controller: 'BdComment'
        };
    }
})();
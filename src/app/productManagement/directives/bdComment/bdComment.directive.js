(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .directive('bdComment', bdComment)
    ;

    function bdComment() {

        return {
            scope: {
                comment: '=',
                product: '=',
                watchManager: '=',
                isShowChild: '='
            },
            restrict: 'AE',
            templateUrl: 'productManagement/directives/bdComment/bdComment.tpl.html',
            controller: 'BdComment'
        };
    }
})();
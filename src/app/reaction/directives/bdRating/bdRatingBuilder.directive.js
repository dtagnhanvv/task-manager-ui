(function () {
    'use strict';

    angular.module('biddy.reaction')
        .directive('bdRatingBuilder', bdRatingBuilder)
    ;

    function bdRatingBuilder() {

        return {
            scope: {
                productId: '@',
                billId: '@',
                rateModel: '=',
                watchManager: '='
            },
            restrict: 'AE',
            templateUrl: 'reaction/directives/bdRating/bdRatingBuilder.tpl.html',
            controller: 'BdRatingBuilder'
        };
    }
})();
(function () {
    'use strict';

    angular.module('biddy.reaction')
        .directive('bdRatingList', bdRatingList)
    ;

    function bdRatingList() {

        return {
            scope: {
                productId: '@',
                rateModelList: '=',
                rateSummary: '='
            },
            restrict: 'AE',
            templateUrl: 'reaction/directives/bdRating/bdRatingList.tpl.html',
            controller: 'BdRatingList'
        };
    }
})();
(function () {
    'use strict';

    angular.module('biddy.reaction')
        .directive('bdRatingSummary', bdRatingSummary)
    ;

    function bdRatingSummary() {

        return {
            scope: {
                ratingSummary: '='
            },
            restrict: 'AE',
            templateUrl: 'reaction/directives/bdRating/bdRatingSummary.tpl.html',
            controller: 'BdRatingSummary'
        };
    }
})();
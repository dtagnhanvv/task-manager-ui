(function () {
    'use strict';

    angular.module('biddy.reaction')
        .controller('BdRatingSummary', BdRatingSummary);

    function BdRatingSummary($scope, RATING_OPTION) {
        $scope.startColor = {
            5: 'progress-bar-success',
            4: 'progress-bar-warning',
            3: 'progress-bar-info',
            2: 'progress-bar-danger',
            1: 'progress-bar-primary'
        };
        $scope.self = {
            ratingOptions: angular.copy(RATING_OPTION)
        };

        $scope.self.ratingOptions.readonly = true;
        $scope.ratingSummary.stars = Math.round($scope.ratingSummary.average);
    }

})();
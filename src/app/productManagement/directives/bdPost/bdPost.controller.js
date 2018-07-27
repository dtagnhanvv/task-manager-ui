(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .controller('BdPost', BdPost)
    ;

    function BdPost($scope, DEFAULT_DATE_FORMAT, REACTION_SOURCE, BdProductUtil, $timeout, NgMap) {
        $scope.DEFAULT_DATE_FORMAT = DEFAULT_DATE_FORMAT;
        $scope.reactionData = {
            type: REACTION_SOURCE['POST'],
            emotions: $scope.product.reactions.emotion,
            total: $scope.product.reactions.total,
            sourceId: $scope.product.id,
            rating: $scope.product.rating
        };
        $scope.froalaOptions = {
            toolbarInline: true,
            charCounterCount: false,
            toolbarVisibleWithoutSelection: true,
            toolbarButtons: [] // Actually, editor is always in view mode, so toolbar is not displayed
        };
        $scope.self = {
            timePeriodSinceCreatedProduct: _getTimePeriodSinceCreated($scope.product.createdDate),
            summaryMode: true,
            tooSmall: false,
            showMap: $scope.product.latitude && $scope.product.longitude
        };

        $scope.initialize = function (initControls) {
            $scope.initControls = initControls;
            $scope.initControls.initialize();
            $timeout(function () {
                $scope.initControls.destroy();

                var editorContainer = document.getElementById('post-content');
                if (editorContainer) {
                    if (editorContainer.offsetHeight < 200) {
                        $scope.self.tooSmall = true;
                    }
                }
            }, 0);
        };

        // map
        $scope.mapConfig = {
            center: {lat: $scope.product.latitude, lng: $scope.product.longitude},
            zoom: 10,
            marker: {lat: $scope.product.latitude, lng: $scope.product.longitude}
        };

        NgMap.getMap().then(function (map) {
            $scope.map = map;
        });

        $scope.changeSummaryMode = changeSummaryMode;

        function changeSummaryMode(isSummary) {
            $scope.self.summaryMode = isSummary;
        }

        function _getTimePeriodSinceCreated(createdDate) {
            return BdProductUtil.getTimePeriodSinceCreated(createdDate);
        }
    }
})();
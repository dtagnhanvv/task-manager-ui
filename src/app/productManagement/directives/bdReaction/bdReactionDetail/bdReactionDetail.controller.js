(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .controller('BdReactionDetail', BdReactionDetail)
    ;

    function BdReactionDetail($scope, reactionsData, REACTION_TYPE, $translate, reactionManager, BdProductUtil) {
        $scope.SHOWING = 'isShowing';
        $scope.reactionType = REACTION_TYPE;
        const DEFAULT_EMOTION = null;

        $scope.self = {
            currentEmotion: DEFAULT_EMOTION,
            reactionsData: reactionsData,
            reactionDetailData: {},
            param: {
                page: 1,
                limit: 10,
                searches: {
                    emotion: DEFAULT_EMOTION //total
                }
            },
            page: 1,
            emotionPage: {},
            cacheReactionData: {},//not used yet
            allowNextPage: true
        };
        _init();

        $scope.changeReactionType = changeReactionType;
        $scope.loadMoreReaction = loadMoreReaction;
        $scope.getIconByReactionType = BdProductUtil.getIconByReactionType;
        $scope.isActive = isActive;

        function _init() {
            getReactionDetail(true);
        }

        function isActive(emotion) {
            return emotion === $scope.self.currentEmotion;
        }

        function _buildParam(param, emotion) {
            param.searches = {};
            var type = $scope.self.reactionsData.type;
            param.searches[type] = $scope.self.reactionsData.sourceId;
            param.searches.emotion = $scope.self.currentEmotion;
            param.page = _getCurrentPageByEmotion(emotion);

            return param;
        }

        function _getCurrentPageByEmotion(emotion) {
            return $scope.self.page;
        }

        function _nextPageByEmotion(emotion) {
            $scope.self.page = $scope.self.page + 1;
        }

        function loadMoreReaction() {
            _nextPageByEmotion($scope.self.currentEmotion);
            getReactionDetail(false);
        }

        function _updateAllowLoadMore() {
            var total = 0;
            if ($scope.self.currentEmotion == null) {
                total = $scope.self.reactionsData.total;
            } else {
                total = $scope.self.reactionsData.emotions[$scope.self.currentEmotion]
            }

            // Do not change == to ===
            if ($scope.self.reactionDetailData.records.length == total) {
                $scope.self.allowNextPage = false;
            }
        }

        function getReactionDetail(IsChangeEmotion) {
            var param = _buildParam($scope.self.param, $scope.self.currentEmotion);

            reactionManager.one('list').customPOST(param)
                .then(function (reactionDetailData) {
                    if (!reactionDetailData)
                        return;

                    if (IsChangeEmotion) {
                        $scope.self.reactionDetailData = reactionDetailData.plain();
                    } else {
                        if (!$scope.self.reactionDetailData || !$scope.self.reactionDetailData.records) {
                            $scope.self.reactionDetailData.records = [];
                        }
                        $scope.self.allowNextPage = true;
                        $scope.self.reactionDetailData.records = $scope.self.reactionDetailData.records.concat(reactionDetailData.records);
                    }
                    _updateAllowLoadMore();
                }, function (err) {

                })
        }

        function changeReactionType(type) {
            if ($scope.self.currentEmotion === type) {
                return;
            }
            $scope.self.allowNextPage = true;
            $scope.self.currentEmotion = type;
            $scope.self.page = 1;
            getReactionDetail(true);
        }

    }
})();
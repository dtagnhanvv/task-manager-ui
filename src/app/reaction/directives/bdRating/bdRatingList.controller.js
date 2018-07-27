(function () {
    'use strict';

    angular.module('biddy.reaction')
        .controller('BdRatingList', BdRatingList);

    function BdRatingList($scope, RATING_OPTION_SMALL, productManager, BdProductUtil) {
        $scope.self = {
            modelList: $scope.rateModelList ? $scope.rateModelList.records : [],
            totalRecord: $scope.rateModelList ? $scope.rateModelList.totalRecord : 0,
            page: 1,
            ratingOptions: angular.copy(RATING_OPTION_SMALL),
            allowNextPage: false
        };

        $scope.loadMore = loadMore;
        $scope.getTimePeriodSinceCreated = getTimePeriodSinceCreated;

        _init();

        function _init() {
            _updateAllowLoadMore($scope.self.totalRecord);
        }

        function getTimePeriodSinceCreated(createdDate) {
            return BdProductUtil.getTimePeriodSinceCreated(createdDate);
        }

        function _buildParam() {
            return {
                limit: 10,
                page: $scope.self.page,
                orderBy: 'desc',
                sortField: 'createdDate'
            };
        }

        function _nextPageByEmotion(emotion) {
            $scope.self.page = $scope.self.page + 1;
        }

        function loadMore() {
            _nextPageByEmotion($scope.self.currentEmotion);
            getRatingList(false);
        }

        function _updateAllowLoadMore(totalRecord) {
            $scope.self.allowNextPage = $scope.self.modelList.length < Number(totalRecord);
        }

        function getRatingList() {
            var params = _buildParam();

            productManager.one($scope.productId).one('product').one('rating').get(params)
                .then(function (rating) {
                    if (!rating || !rating.records) {
                        $scope.self.modelList = []
                    }
                    $scope.self.modelList = $scope.self.modelList.concat(rating.records);
                    _updateAllowLoadMore(rating.totalRecord);
                }, function (error) {

                });
        }
    }
})();
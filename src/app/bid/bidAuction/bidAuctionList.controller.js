(function () {
    'use strict';

    angular.module('biddy.bid.bidAuction')
        .controller('BidAuctionList', BidAuctionList);

    function BidAuctionList($scope, bidAuctions, $stateParams, $modal, $translate, MODES, ITEMS_PER_PAGE,
                            productManager, auctionManager, AtSortableService, historyStorage, HISTORY_TYPE_PATH, EVENT_ACTION_SORTABLE) {
        $scope.bidProducts = bidAuctions;
        $scope.itemsPerPageList = ITEMS_PER_PAGE;
        $scope.tableConfig = {
            itemsPerPage: 10,
            maxPages: 10,
            totalItems: Number($scope.bidProducts.totalRecord)
        };
        $scope.pagingOptions = {
            currentPage: $stateParams.page || 1,
            pageSize: 10
        };
        $scope.self = {
            modelList: $scope.bidProducts
        };

        var stateParams = $stateParams;
        var getDataSet;

        $scope.showPagination = showPagination;
        $scope.confirmCancel = confirmCancel;
        $scope.searchData = searchData;
        $scope.changePage = changePage;
        $scope.onItemPerPageChange = onItemPerPageChange;
        $scope.hasData = hasData;

        function hasData() {
            return $scope.self.modelList && $scope.self.modelList.records && $scope.self.modelList.records.length > 0;
        }

        function confirmCancel(model, index) {
            var modalInstance = $modal.open({
                templateUrl: 'productManagement/confirmCancelation.tpl.html'
            });

            modalInstance.result.then(function () {
                return auctionManager.one(model.id).one('bids').one('cancel').customPOST()
                    .then(function () {
                            getModelList(stateParams);
                        }, function (response) {
                            if (!!response && !!response.data && !!response.data.message) {

                            }
                        }
                    );
            });
        }

        function showPagination() {
            return $scope.self.modelList.totalRecord > $scope.tableConfig.itemsPerPage;
        }

        $scope.$on('$locationChangeSuccess', function () {
            historyStorage.setParamsHistoryCurrent(HISTORY_TYPE_PATH.bidAuction)
        });

        function searchData() {
            var query = {searchKey: $scope.selectData.query || ''};
            stateParams = angular.extend(stateParams, query);
            getModelList(stateParams, 500);
        }

        $scope.$on(EVENT_ACTION_SORTABLE, function (event, query) {
            stateParams = angular.extend(stateParams, query);
            getModelList(stateParams);
        });

        function changePage(currentPage) {
            stateParams = angular.extend(stateParams, {page: currentPage});
            getModelList(stateParams);
        }

        function onItemPerPageChange() {
            $scope.pagingOptions.currentPage = 1;
            stateParams = angular.extend(stateParams, {limit: $scope.tableConfig.itemsPerPage, page: 1});
            getModelList(stateParams);
        }

        function getModelList(query, ms) {
            clearTimeout(getDataSet);
            getDataSet = setTimeout(function () {
                stateParams = query;
                return productManager.one().one('buyers').customPOST(query)
                    .then(function (modelList) {
                        AtSortableService.insertParamForUrl(query);
                        $scope.self.modelList = modelList;
                        $scope.tableConfig.totalItems = Number(modelList.totalRecord);
                        $scope.pagingOptions.currentPage = Number(query.page);
                    });
            }, ms || 0);
        }
    }
})();
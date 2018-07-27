(function () {
    'use strict';

    angular.module('biddy.bid.myBidAuctions')
        .controller('MyBidAuctions', MyBidAuctions);

    function MyBidAuctions($scope, bidProducts, $stateParams, $modal, Notification, $translate, MODES, ITEMS_PER_PAGE,
                           productManager, AtSortableService, historyStorage, HISTORY_TYPE_PATH, EVENT_ACTION_SORTABLE,
                           AUCTION_STATUS, Auth, auctionManager) {

        $scope.AUCTION_STATUS = AUCTION_STATUS;
        $scope.bidProducts = bidProducts;
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
            modelList: $scope.bidProducts,
            isAdmin: Auth.isAdmin(),
            isSale: Auth.isSale()
        };

        var stateParams = $stateParams;
        var getDataSet;

        $scope.showPagination = showPagination;
        $scope.confirmCancel = confirmCancel;
        $scope.searchData = searchData;
        $scope.changePage = changePage;
        $scope.onItemPerPageChange = onItemPerPageChange;
        $scope.hasData = hasData;
        $scope.showListBidder = showListBidder;
        $scope.isAllowFinishAuction = isAllowFinishAuction;
        $scope.finishAuctionEarly = finishAuctionEarly;
        $scope.finishWithoutWinner = finishWithoutWinner;

        function finishWithoutWinner(auction) {
            var modalInstance = $modal.open({
                templateUrl: 'bid/modals/cancelAuction.tpl.html'
            });

            modalInstance.result.then(function () {
                var params = {ruleType: 'cancel'};
                auctionManager.one(auction.id).one('closes').customPOST(params)
                    .then(function (success) {
                            Notification.success({
                                message: $translate.instant('BID_AUCTION.FINISH_BIDDING_OK')
                            });
                            getModelList(stateParams, 0);
                        },
                        function (error) {
                            Notification.error({
                                message: error.data.message
                            });
                        })
            });
        }

        function finishAuctionEarly(auction) {
            auctionManager.one(auction.id).one('closes').customPOST()
                .then(function (success) {
                        Notification.success({message: $translate.instant('BIDDING.FINISH_AUCTION_OK')});
                        getModelList(stateParams, 0);
                    },
                    function (error) {
                        Notification.error({message: error.data.message});
                    })
        }
        function isAllowFinishAuction(auction) {
            return auction.status !== AUCTION_STATUS.CLOSED && !$scope.self.isSale && !$scope.self.isAdmin;
        }

        function showListBidder(auction) {
            var modalInstance = $modal.open({
                templateUrl: 'bid/modals/finishBidding/finishBidding.tpl.html',
                size: 'lg',
                controller: 'FinishBidding',
                resolve: {
                    bidProducts: function (auctionManager) {
                        var params = {
                            page: 1,
                            orderBy: 'desc',
                            sortField: 'createdDate',
                            account: $scope.currentUser.id,
                            limit: 10
                        };

                        return auctionManager.one(auction.id).one('buyers').customPOST(params)
                            .then(function (products) {
                                return products.plain();
                            });
                    },
                    auction: auction
                }
            });
            modalInstance.result.then(function (bidItem) {
                if (bidItem) {
                    auction.status = AUCTION_STATUS.CLOSED;
                }
            });
        }

        function hasData() {
            return $scope.self.modelList && $scope.self.modelList.records && $scope.self.modelList.records.length > 0;
        }

        function confirmCancel(auto, index) {
            var modalInstance = $modal.open({
                templateUrl: 'productManagement/confirmCancelation.tpl.html'
            });

            modalInstance.result.then(function () {
                return productManager.one().one('actives').customPOST(query)
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
                return productManager.one().one('actives').customPOST(query)
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
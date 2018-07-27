(function () {
    'use strict';

    angular.module('biddy.bid')
        .controller('FinishBidding', FinishBidding)
    ;

    function FinishBidding($scope, $timeout, $modalInstance, bidProducts, auction,
                           $modal, $translate, MODES, ITEMS_PER_PAGE, sessionStorage,
                           productManager, AtSortableService, historyStorage, auctionManager,
                           HISTORY_TYPE_PATH, AUCTION_STATUS, DEFAULT_DATETIME_FORMAT) {

        var modalCallbackData = {
            withoutWinner: false
        };
        $scope.AUCTION_STATUS = AUCTION_STATUS;
        $scope.auction = auction;
        $scope.bidProducts = bidProducts;

        $scope.itemsPerPageList = ITEMS_PER_PAGE;
        $scope.tableConfig = {
            itemsPerPage: 10,
            maxPages: 10,
            totalItems: Number($scope.bidProducts.totalRecord)
        };
        $scope.pagingOptions = {
            currentPage: 1,
            pageSize: 10
        };
        $scope.self = {
            modelList: $scope.bidProducts,
            DEFAULT_DATETIME_FORMAT: DEFAULT_DATETIME_FORMAT,
            sortConfig: _initSortConfig(),
            winner: null,
            disableSelectWinner: false
        };
        $scope.selectData = {
            query: null
        };

        $scope.message = {
            saveError: null,
            saveOk: null
        };

        var stateParams = {
            page: $scope.pagingOptions.currentPage,
            orderBy: 'desc',
            limit: 10,
            sortField: 'createdDate',
            account: Number(sessionStorage.getUserId())
        };
        var getDataSet;

        $scope.showPagination = showPagination;
        $scope.searchData = searchData;
        $scope.changePage = changePage;
        $scope.onItemPerPageChange = onItemPerPageChange;
        $scope.hasData = hasData;
        $scope.onSort = onSort;
        $scope.onChooseWinner = onChooseWinner;
        $scope.closeModal = closeModal;
        $scope.finishWithoutWinner = finishWithoutWinner;

        function finishWithoutWinner() {
            var modalInstance = $modal.open({
                templateUrl: 'bid/modals/cancelAuction.tpl.html'
            });

            modalInstance.result.then(function () {
                $scope.self.disableSelectWinner = true;
                var params = {ruleType: 'cancel'};
                auctionManager.one($scope.auction.id).one('closes').customPOST(params)
                    .then(function (success) {
                            $scope.message.saveError = null;
                            $scope.message.saveOk = $translate.instant('BIDDING.CHOOSE_WINNER_OK');
                            modalCallbackData.withoutWinner = true;
                            $timeout(function () {
                                closeModal(modalCallbackData.withoutWinner);
                            }, 2000);
                        },
                        function (error) {
                            $scope.message.saveOk = null;
                            $scope.message.saveError = error.data.message;
                            $scope.self.disableSelectWinner = false;
                        })
            });
        }

        function onChooseWinner(item) {
            var modalInstance = $modal.open({
                templateUrl: 'bid/modals/confirmWinner.tpl.html',
                resolve: {
                    bidItem: function () {
                        return item;
                    }
                },
                controller: function ($scope, bidItem) {
                    $scope.bidItem = bidItem;
                }
            });

            modalInstance.result.then(function () {
                $scope.self.disableSelectWinner = true;
                var params = {
                    bidId: item.id,
                    ruleType: 'manual'
                };
                auctionManager.one($scope.auction.id).one('closes').customPOST(params)
                    .then(function (success) {
                            $scope.message.saveError = null;
                            $scope.message.saveOk = $translate.instant('BIDDING.CHOOSE_WINNER_OK');
                            $scope.self.winner = item;
                            $timeout(function () {
                                closeModal($scope.self.winner);
                            }, 2000);
                        },
                        function (error) {
                            $scope.message.saveOk = null;
                            $scope.message.saveError = error.data.message;
                            $scope.self.disableSelectWinner = false;
                        })
            });
        }

        function hasData() {
            return $scope.self.modelList && $scope.self.modelList.records && $scope.self.modelList.records.length > 0;
        }

        function showPagination() {
            return $scope.self.modelList.totalRecord > $scope.tableConfig.itemsPerPage;
        }

        function searchData() {
            var query = {searchKey: $scope.selectData.query || ''};
            stateParams = angular.extend(stateParams, query);
            getModelList(stateParams, 500);
        }

        function changePage(currentPage) {
            stateParams = angular.extend(stateParams, {page: currentPage});
            getModelList(stateParams);
        }

        function onItemPerPageChange() {
            $scope.pagingOptions.currentPage = 1;
            stateParams = angular.extend(stateParams, {limit: $scope.tableConfig.itemsPerPage, page: 1});
            getModelList(stateParams);
        }

        function onSort(field) {

            stateParams.orderBy = _updateSortData(field);
            stateParams.sortField = field;

            getModelList(stateParams, 500);
        }

        function getModelList(query, ms) {
            clearTimeout(getDataSet);
            getDataSet = setTimeout(function () {
                stateParams = query;
                return auctionManager.one($scope.auction.id).one('buyers').customPOST(query)
                    .then(function (modelList) {
                        $scope.self.modelList = modelList;
                        $scope.tableConfig.totalItems = Number(modelList.totalRecord);
                        $scope.pagingOptions.currentPage = Number(query.page);
                    });
            }, ms || 0);
        }

        function _updateSortData(field) {
            var currentOrder = $scope.self.sortConfig[field];
            currentOrder = _switchSortDirection(currentOrder);
            $scope.self.sortConfig = _initSortConfig();
            $scope.self.sortConfig[field] = currentOrder;
            return currentOrder;
        }

        function _initSortConfig() {
            return {
                id: null,
                buyer: null,
                price: null,
                createdDate: null
            }
        }

        function _switchSortDirection(sortDirection) {
            if (sortDirection == null) {
                return 'asc';
            }
            if (sortDirection === 'asc') {
                return 'desc'
            }
            if (sortDirection === 'desc') {
                return 'asc';
            }
            return null;
        }

        $scope.$on('modal.closing', function (event, data) {
            console.log(data);
            if (data == 'backdrop click') {
                event.preventDefault();
                $scope.closeModal();
            }
        });

        function closeModal(data) {
            $modalInstance.close(data);
        }
    }
})();
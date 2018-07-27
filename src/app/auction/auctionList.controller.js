(function () {
    'use strict';

    angular.module('biddy.auction')
        .controller('AuctionList', AuctionList);

    function AuctionList($scope, $stateParams, $modal, Notification, $translate, auctions, MODES,
                         ITEMS_PER_PAGE, publicProductManager, AUCTION_STATUS, AtSortableService,
                         historyStorage, HISTORY_TYPE_PATH, EVENT_ACTION_SORTABLE, VALIDATION_TIME,
                         BUSINESS_SETTINGS, activeAuction) {

        $scope.AUCTION_STATUS = AUCTION_STATUS;
        $scope.stateParams = $stateParams;
        $scope.itemsPerPageList = ITEMS_PER_PAGE;
        $scope.tableConfig = {
            itemsPerPage: 10,
            maxPages: 10,
            totalItems: Number(auctions.totalRecord)
        };
        $scope.pagingOptions = {
            currentPage: $stateParams.page || 1,
            pageSize: 10
        };
        $scope.self = {
            bills: auctions,
            activeAuction: activeAuction
        };
        console.log($scope.self.activeAuction);
        var stateParams = $stateParams;
        var getDataSet;

        $scope.showPagination = showPagination;
        // $scope.confirmDeletion = confirmDeletion;
        $scope.searchData = searchData;
        $scope.changePage = changePage;
        $scope.onItemPerPageChange = onItemPerPageChange;
        $scope.hasData = hasData;
        $scope.getValidationTimeTranslatedLabel = getValidationTimeTranslatedLabel;
        $scope.getBusinessSettingTranslatedLabel = getBusinessSettingTranslatedLabel;
        $scope.getModeTranslatedLabel = getModeTranslatedLabel;

        function getModeTranslatedLabel(value) {
            return getTranslatedLabelFromString(value, MODES);
        }

        function getBusinessSettingTranslatedLabel(value) {
            return getTranslatedLabelFromString(value, BUSINESS_SETTINGS);
        }

        function getValidationTimeTranslatedLabel(value) {
            return getTranslatedLabelFromString(value, VALIDATION_TIME);
        }

        function getTranslatedLabelFromString(value, options) {
            var found = options.find(function (option) {
                return option.value === value;
            });
            if (found) {
                return found.label;
            }
            return '';
        }

        function hasData() {
            return $scope.self.bills && $scope.self.bills.records && $scope.self.bills.records.length > 0;
        }
/*

        function confirmDeletion(auto, index) {
            var modalInstance = $modal.open({
                templateUrl: 'productManagement/confirmDeletion.tpl.html'
            });

            modalInstance.result.then(function () {
                return auctionManager.one(auto.id).remove()
                    .then(
                        function () {
                            _getAuctions(stateParams);
                            Notification.success({
                                message: $translate.instant('PRODUCT_ORDER.DELETE_SUCCESS')
                            });
                        },
                        function (response) {
                            if (!!response && !!response.data && !!response.data.message) {
                                Notification.error({
                                    message: response.data.message
                                });
                            }
                        }
                    );
            });
        }

*/
        function showPagination() {
            return $scope.self.bills.totalRecord > $scope.tableConfig.itemsPerPage;
        }

        $scope.$on('$locationChangeSuccess', function () {
            historyStorage.setParamsHistoryCurrent(HISTORY_TYPE_PATH.billList)
        });

        function searchData() {
            var query = {searchKey: $scope.selectData.query || ''};
            stateParams = angular.extend(stateParams, query);
            _getAuctions(stateParams, 500);
        }

        $scope.$on(EVENT_ACTION_SORTABLE, function (event, query) {
            stateParams = angular.extend(stateParams, query);
            _getAuctions(stateParams);
        });

        function changePage(currentPage) {
            stateParams = angular.extend(stateParams, {page: currentPage});
            _getAuctions(stateParams);
        }

        function onItemPerPageChange() {
            $scope.pagingOptions.currentPage = 1;
            stateParams = angular.extend(stateParams, {limit: $scope.tableConfig.itemsPerPage, page: 1});
            _getAuctions(stateParams);
        }

        function _getAuctions(query, ms) {
            clearTimeout(getDataSet);
            getDataSet = setTimeout(function () {
                stateParams = query;
                return publicProductManager.one().one($stateParams.productId).one('auctions').get(query)
                    .then(function (bills) {
                        AtSortableService.insertParamForUrl(query);
                        $scope.self.bills = bills;
                        $scope.tableConfig.totalItems = Number(bills.totalRecord);
                        $scope.pagingOptions.currentPage = Number(query.page);
                    });
            }, ms || 0);
        }

    }
})();
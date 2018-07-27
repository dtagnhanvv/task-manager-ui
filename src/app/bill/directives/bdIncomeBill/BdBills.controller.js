(function () {
    'use strict';

    angular.module('biddy.bill')
        .controller('BdBills', BdBills)
    ;

    function BdBills($scope, $rootScope, $stateParams, $modal, AlertService, $translate, MODES, ITEMS_PER_PAGE, billManager, sessionStorage,
                     AtSortableService, historyStorage, HISTORY_TYPE_PATH, EVENT_ACTION_SORTABLE, VALIDATION_TIME, BILL_STATUS,
                     DEFAULT_DATETIME_FORMAT, Notification, BILL_GROUP, BILL_TAB, AUCTION_PAYMENT_TYPE, Auth) {

        $scope.DEFAULT_DATETIME_FORMAT = DEFAULT_DATETIME_FORMAT;
        $scope.AUCTION_PAYMENT_TYPE = AUCTION_PAYMENT_TYPE;
        var bills = $scope.bills = {
            totalRecord: 0
        };

        $scope.itemsPerPageList = ITEMS_PER_PAGE;
        $scope.tableConfig = {
            itemsPerPage: 10,
            maxPages: 10,
            totalItems: Number(bills.totalRecord)
        };
        $scope.pagingOptions = {
            currentPage: 1,
            pageSize: 10
        };
        $scope.self = {
            bills: bills
        };
        var stateParams = $stateParams;
        var getBills;

        $scope.showPagination = showPagination;
        $scope.searchData = searchData;
        $scope.changePage = changePage;
        $scope.onItemPerPageChange = onItemPerPageChange;
        $scope.hasData = hasData;
        $scope.getValidationTimeTranslatedLabel = getValidationTimeTranslatedLabel;
        $scope.getBusinessSettingTranslatedLabel = getBusinessSettingTranslatedLabel;
        $scope.getModeTranslatedLabel = getModeTranslatedLabel;
        $scope.getStatusTranslatedLabel = getStatusTranslatedLabel;
        $scope.confirm = confirm;
        $scope.reject = reject;
        $scope.rate = rate;

        //For tabs only
        $scope.isEnableConfirm = isEnableConfirm;
        $scope.isEnableReject = isEnableReject;
        $scope.isEnableRating = isEnableRating;
        $scope.getColor = getColor;


        _init();

        function _init() {
            stateParams.page = 1;
            stateParams.limit = 10;
            stateParams.sortField = 'createdDate';
            stateParams.orderBy = 'desc';

            _getModels(stateParams);
        }

        function getColor(item) {
            if (item.seller.username === sessionStorage.getUsername()) {
                return 'green-row';
            }

            if (item.buyer.username === sessionStorage.getUsername()) {
                return 'red-row';
            }

            return 'black-row';
        }

        function isEnableRating(_transaction) {
            if(Auth.isAdmin() || Auth.isSale()) return false;
            if (!_transaction) return false;
            return $scope.billConfig.group === BILL_GROUP['BUY_RENT'] &&
                (_transaction.status === BILL_TAB['CONFIRMED'] || _transaction.status === BILL_TAB['REJECTED']);
        }

        function rate(_transaction) {
            if(!_transaction || !_transaction.product || !_transaction.product.id) return;

            $modal.open({
                templateUrl: 'bill/modals/billRatingPopup/billRatingPopup.tpl.html',
                controller: 'BillRatingPopup',
                size: 'md',
                resolve: {
                    postId: _transaction.product.id,
                    billId: _transaction.id,
                    rateModel: function (productRatingManager) {
                        var params = {
                            bill: _transaction.id
                        };
                        return productRatingManager.one('list').get(params)
                            .then(function (rating) {
                                if (!rating || rating.length === 0) return null;
                                return rating[0];
                            }, function (error) {
                                return null;
                            });

                    }
                }
            })
            ;
        }

        function isEnableReject(item) {
            if (!item) return false;
            return $scope.billConfig.group === BILL_GROUP['BUY_RENT'] && item.status === BILL_TAB['NEED_CONFIRM'];
        }

        function isEnableConfirm(item) {
            if (!item) return false;
            return $scope.billConfig.group === BILL_GROUP['BUY_RENT'] && item.status === BILL_TAB['NEED_CONFIRM'];
        }

        function getStatusTranslatedLabel(value) {
            return getTranslatedLabelFromString(value, BILL_STATUS);
        }


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

        function doRating(item) {
            if(Auth.isAdmin() || Auth.isSale()) return;
            rate(item);
        }

        function reject(item) {
            var modalInstance = $modal.open({
                templateUrl: 'bill/modals/rejectBill.tpl.html'
            });

            modalInstance.result.then(function () {
                return billManager.one(item.id).patch({status: BILL_TAB['REJECTED']}).then(
                    function () {
                        _getModels(stateParams);
                        Notification.success({message: $translate.instant('BILL.REJECT_DONE')});
                        doRating(item)
                    },
                    function (response) {
                        if (!!response && !!response.data && !!response.data.message) {
                            Notification.error({message: response.data.message});
                        }
                    }
                );
            });
        }

        function confirm(item) {
            var modalInstance = $modal.open({
                templateUrl: 'bill/modals/confirmBill.tpl.html'
            });

            modalInstance.result.then(function () {
                return billManager.one(item.id).patch({status: BILL_TAB['CONFIRMED']}).then(
                    function () {
                        _getModels(stateParams);
                        Notification.success({message: $translate.instant('BILL.CONFIRM_DONE')});
                        doRating(item)
                    },
                    function (response) {
                        if (!!response && !!response.data && !!response.data.message) {
                            Notification.error({message: response.data.message});
                        }
                    }
                );
            });
        }

        function showPagination() {
            return $scope.self.bills.totalRecord > $scope.tableConfig.itemsPerPage;
        }

        $scope.$on('$locationChangeSuccess', function () {
            historyStorage.setParamsHistoryCurrent(HISTORY_TYPE_PATH.billList)
        });

        function searchData() {
            var query = {searchKey: $scope.selectData.query || ''};
            stateParams = angular.extend(stateParams, query);
            _getModels(stateParams, 500);
        }

        $scope.$on(EVENT_ACTION_SORTABLE, function (event, query) {
            stateParams = angular.extend(stateParams, query);
            _getModels(stateParams);
        });

        function changePage(currentPage) {
            stateParams = angular.extend(stateParams, {page: currentPage});
            _getModels(stateParams);
        }

        function onItemPerPageChange() {
            $scope.pagingOptions.currentPage = 1;
            stateParams = angular.extend(stateParams, {limit: $scope.tableConfig.itemsPerPage, page: 1});
            _getModels(stateParams);
        }

        function _updateCount(summary) {
            $scope.count.confirmed = summary.confirmed;
            $scope.count.unconfirmed = summary.unconfirmed;
            $scope.count.rejected = summary.rejected;

            if ($scope.billConfig.group === BILL_GROUP['BUY_RENT']) {
                $rootScope.$broadcast('NEED_CONFIRMED_TRANSACTION_COUNT_CHANGED', {count: $scope.count});
            } else if ($scope.billConfig.group === BILL_GROUP['SELL_LEASE']) {
                $rootScope.$broadcast('WAIT_CONFIRMED_TRANSACTION_COUNT_CHANGED', {count: $scope.count});
            }
        }

        function _getModels(query, ms) {
            clearTimeout(getBills);
            getBills = setTimeout(function () {
                stateParams = query;

                if (!$scope.billService) return;
                query.status = $scope.billConfig.tab;

                return $scope.billService.getList(query)
                    .then(function (bills) {
                            AtSortableService.insertParamForUrl(query);
                            $scope.self.bills = bills;
                            $scope.tableConfig.totalItems = Number(bills.totalRecord);
                            $scope.pagingOptions.currentPage = Number(query.page);
                            _updateCount(bills.summary);
                        },
                        function (error) {
                            Notification.error({message: error.data.message});
                        });
            }, ms || 0);
        }

    }
})();
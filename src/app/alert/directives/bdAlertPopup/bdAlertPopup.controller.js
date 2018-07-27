(function () {
    'use strict';

    angular.module('biddy.alert')
        .controller('BdAlertPopup', BdAlertPopup)
    ;

    function BdAlertPopup($scope, _, $rootScope, $state, alertManager, ALERT_TARGET_TYPE, DateFormatter, historyStorage, HISTORY_TYPE_PATH,
                          ALERT_TARGET_TYPE_ROUTER_MAP, Auth) {
        $scope.ALERT_TARGET_TYPE = ALERT_TARGET_TYPE;

        $scope.formProcessing = false;
        $scope.isShowGetMore = false;
        $scope.unread = null;
        $scope.model = {
            list: [],
            page: 1,
            limit: 10,
            total: 0
        };
        var getAlerts;

        $scope.$on('CLICK_ALERT', _onClickGetAlert);
        $scope.$on('MARK_ALL_AS_READ', _markAllAsRead);

        $scope.nextPage = nextPage;
        $scope.getTimePeriodSinceCreated = getTimePeriodSinceCreated;
        $scope.goToDetail = goToDetail;
        $scope.markAllAsRead = markAllAsRead;
        $scope.markAsRead = markAsRead;
        _init();

        function _init() {
            _getTotalUnread();
        }

        function markAllAsRead() {
            if(!$scope.model.total > 0) return; //skip if there is no alert

            alertManager.one('markreads').customPOST().then(
                function (success) {
                    $scope.unread = null;
                    angular.forEach($scope.model.list, function (_alert) {
                        _alert.isRead = true;
                    });
                    $rootScope.$broadcast('ALERT_UNREAD_UPDATE', {value: $scope.unread});
                },
                function (error) {
                }
            );
        }

        function markAsRead(_alert) {
            var params = {
                isRead: true
            };
            alertManager.one(_alert.id).patch(params).then(
                function (success) {
                    _alert.isRead = true;
                    $scope.unread = Number($scope.unread) - 1;
                    $rootScope.$broadcast('ALERT_UNREAD_UPDATE', {value: $scope.unread});
                },
                function (error) {
                }
            )
        }

        function _getTotalUnread() {
            alertManager.one('unread').get().then(
                function (data) {
                    $scope.unread = data;
                    $rootScope.$broadcast('ALERT_UNREAD_UPDATE', {value: data});
                },
                function (error) {
                }
            );
        }

        function goToDetail(_alert) {
            if (!_alert) return;
            markAsRead(_alert);
            switch (_alert.targetType) {
                case ALERT_TARGET_TYPE.PRODUCT:
                    return _goToProductDetail(_alert);
                case ALERT_TARGET_TYPE.PRODUCT_AUCTION:
                    return _goToProductAuction(_alert);
                case ALERT_TARGET_TYPE.BILL:
                    return _goToBill(_alert);
                case ALERT_TARGET_TYPE.AUCTION:
                    return _goToAuction(_alert);
                case ALERT_TARGET_TYPE.CREDIT:
                    return _goToCredit(_alert);
                case ALERT_TARGET_TYPE.PROFILE:
                    return _goToProfile(_alert);
            }
        }

        function _goTo(historicalPath, state, targetState, params) {
            return historyStorage.getLocationPath(
                historicalPath,
                historyStorage.concatBaseState(state.current.name, targetState),
                params
            );
        }

        function _goToProductDetail(_alert) {
            return _goTo(HISTORY_TYPE_PATH.productDetail, $state, ALERT_TARGET_TYPE_ROUTER_MAP.product,
                {
                    productId: _alert.targetId,
                    auctionId: 0
                });
        }

        function _goToProductAuction(_alert) {
            return _goTo(HISTORY_TYPE_PATH.productDetail, $state, ALERT_TARGET_TYPE_ROUTER_MAP.product,
                {
                    auctionId: _alert.targetId,
                    productId: _alert.product
                });
        }

        function _goToBill(_alert) {
            return; // build form's removed already
            return _goTo(HISTORY_TYPE_PATH.bill, $state, ALERT_TARGET_TYPE_ROUTER_MAP.bill,
                {
                    id: _alert.targetId
                });
        }

        function _goToAuction(_alert) {
            return _goTo(HISTORY_TYPE_PATH.auction, $state, ALERT_TARGET_TYPE_ROUTER_MAP.auction,
                {
                    id: _alert.targetId,
                    productId: _alert.product
                });
        }

        function _goToCredit(_alert) {
            return _goTo(HISTORY_TYPE_PATH.creditTransactions, $state, ALERT_TARGET_TYPE_ROUTER_MAP.credit);
        }

        function _goToProfile(_alert) {
            if (Auth.isAccount()) {
                return _goTo(HISTORY_TYPE_PATH.account, $state, ALERT_TARGET_TYPE_ROUTER_MAP.profile);
            } else if (Auth.isSale()) {
                return _goTo(HISTORY_TYPE_PATH.sale, $state, ALERT_TARGET_TYPE_ROUTER_MAP.saleProfile);
            }

        }

        function getTimePeriodSinceCreated(date) {
            return DateFormatter.getTimePeriodSinceCreated(date)
        }

        function nextPage() {
            _getAlerts(_buildParams(), 500, false);
        }

        function _resetData() {
            $scope.model.page = 0;
            $scope.model.limit = 10;
            $scope.isShowGetMore = false;
            $scope.model.list = [];
        }

        function _onClickGetAlert() {
            _resetData();
            _getAlerts(_buildParams(), 500, true);
        }

        function _markAllAsRead() {

        }

        function _buildParams() {
            $scope.model.page = Number($scope.model.page) + 1;
            return {
                page: $scope.model.page,
                limit: $scope.model.limit
            }
        }

        function _updateIsShowGetMore() {
            $scope.isShowGetMore = false;

            if ($scope.model.list && $scope.model.list.length >= $scope.model.total) {
                $scope.isShowGetMore = false;
                return;
            }
            $scope.isShowGetMore = true;
        }

        function _getAlerts(params, miniSecond, noConcatRecord) {
            clearTimeout(getAlerts);
            getAlerts = setTimeout(function () {

                $scope.formProcessing = true;
                alertManager.one().get(params).then(
                    function (alertData) {
                        if (!noConcatRecord) {
                            $scope.model.list = $scope.model.list.concat(alertData.records);
                        } else {
                            $scope.model.list = alertData.records;
                        }

                        $scope.model.total = alertData.totalRecord;
                        _updateIsShowGetMore();
                        $scope.unread = alertData.totalUnread;
                        $scope.formProcessing = false;
                        $rootScope.$broadcast('ALERT_UNREAD_UPDATE', {value: $scope.unread});
                    },
                    function (error) {
                        $scope.formProcessing = false;
                    }
                )
            }, miniSecond || 0);
        }
    }
})();
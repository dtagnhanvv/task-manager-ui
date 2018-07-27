(function () {
    'use strict';

    angular
        .module('biddy.core.sideBar')
        .controller('SideBar', SideBar)
    ;

    function SideBar($scope, IncomeBillHelper, OutBillHelper, sessionStorage) {
        $scope.accountId = sessionStorage.getUserId();
        $scope.needConfirmedTransactionCount = null;
        $scope.waitConfirmedTransactionCount = null;

        $scope.$on('NEED_CONFIRMED_TRANSACTION_COUNT_CHANGED', _onNeedConfirmedTransactionCountChanged);
        $scope.$on('WAIT_CONFIRMED_TRANSACTION_COUNT_CHANGED', _onWaitConfirmedTransactionCountChanged);

        $scope.getTotalUnconfirmedTransaction = getTotalUnconfirmedTransaction;

        _init();

        function getTotalUnconfirmedTransaction() {
            if (!$scope.needConfirmedTransactionCount || !$scope.waitConfirmedTransactionCount) return null;
            return Number($scope.needConfirmedTransactionCount) + Number($scope.waitConfirmedTransactionCount);
        }

        function _onNeedConfirmedTransactionCountChanged(event, data) {
            $scope.needConfirmedTransactionCount = data.count.unconfirmed;
        }

        function _onWaitConfirmedTransactionCountChanged(event, data) {
            $scope.waitConfirmedTransactionCount = data.count.unconfirmed;
        }

        function _init() {
            var params = {
                page: 1,
                limit: 1
            };
            _initNeedConfirmedTransactionCount(params);
            _initWaitConfirmedTransactionCount(params);
        }

        function _initNeedConfirmedTransactionCount(query) {
            IncomeBillHelper.getList(query).then(function (bills) {
                    if (bills) {
                        $scope.needConfirmedTransactionCount = bills.summary.unconfirmed;
                    }
                },
                function (error) {
                    Notification.error({message: error.data.message});
                });
        }

        function _initWaitConfirmedTransactionCount(query) {
            OutBillHelper.getList(query).then(function (bills) {
                    if (bills) {
                        $scope.waitConfirmedTransactionCount = bills.summary.unconfirmed;
                    }
                },
                function (error) {
                    Notification.error({message: error.data.message});
                });
        }


    }
})();
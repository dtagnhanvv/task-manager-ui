(function () {
    'use strict';

    angular.module('biddy.bill')
        .controller('OutBills', OutBills);

    function OutBills($scope, bills, OutBillHelper, BILL_GROUP, BILL_TAB) {
        $scope.bills = bills;
        $scope.OutBillHelper = OutBillHelper;
        $scope.currentTab = BILL_TAB['WAIT_CONFIRM'];

        $scope.waitConfirmBillConfig = {
            tab: BILL_TAB['WAIT_CONFIRM'],
            group: BILL_GROUP['SELL_LEASE'],
        };
        $scope.rejectedBillConfig = {
            tab: BILL_TAB['REJECTED'],
            group: BILL_GROUP['SELL_LEASE'],
        };
        $scope.confirmedBillConfig = {
            tab: BILL_TAB['CONFIRMED'],
            group: BILL_GROUP['SELL_LEASE'],
        };

        $scope.count = {
            confirmed: null,
            unconfirmed: null,
            rejected: null
        };

        $scope.changeTab = changeTab;
        $scope.isShowWaitConfirmTab = isShowWaitConfirmTab;
        $scope.isShowConfirmedTab = isShowConfirmedTab;
        $scope.isShowRejectedTab = isShowRejectedTab;

        function isShowRejectedTab() {
            return $scope.currentTab === BILL_TAB['REJECTED'];
        }

        function isShowConfirmedTab() {
            return $scope.currentTab === BILL_TAB['CONFIRMED'];
        }

        function isShowWaitConfirmTab() {
            return $scope.currentTab === BILL_TAB['WAIT_CONFIRM'];
        }

        function changeTab(tab) {
            if ($scope.currentTab === BILL_TAB[tab]) return;

            $scope.currentTab = BILL_TAB[tab];
        }
    }
})();
(function () {
    'use strict';

    angular.module('biddy.bill')
        .controller('IncomeBills', IncomeBills);

    function IncomeBills($scope, bills, IncomeBillHelper, BILL_GROUP, BILL_TAB) {
        $scope.bills = bills;
        $scope.IncomeBillHelper = IncomeBillHelper;
        $scope.currentTab = BILL_TAB['NEED_CONFIRM'];

        $scope.needConfirmBillConfig = {
            tab: BILL_TAB['NEED_CONFIRM'],
            group: BILL_GROUP['BUY_RENT'],
        };
        $scope.rejectedBillConfig = {
            tab: BILL_TAB['REJECTED'],
            group: BILL_GROUP['BUY_RENT'],
        };
        $scope.confirmedBillConfig = {
            tab: BILL_TAB['CONFIRMED'],
            group: BILL_GROUP['BUY_RENT'],
        };

        $scope.count = {
            confirmed: null,
            unconfirmed: null,
            rejected: null
        };
        $scope.changeTab = changeTab;
        $scope.isShowNeedConfirmTab = isShowNeedConfirmTab;
        $scope.isShowConfirmedTab = isShowConfirmedTab;
        $scope.isShowRejectedTab = isShowRejectedTab;

        function isShowRejectedTab() {
            return $scope.currentTab === BILL_TAB['REJECTED'];
        }

        function isShowConfirmedTab() {
            return $scope.currentTab === BILL_TAB['CONFIRMED'];
        }

        function isShowNeedConfirmTab() {
            return $scope.currentTab === BILL_TAB['NEED_CONFIRM'];
        }

        function changeTab(tab) {
            if ($scope.currentTab === BILL_TAB[tab]) return;

            $scope.currentTab = BILL_TAB[tab];
        }
    }
})();
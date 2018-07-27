(function () {
    'use strict';

    angular.module('biddy.bill')
        .controller('BillRatingPopup', BillRatingPopup)
    ;

    function BillRatingPopup($scope, postId, billId, rateModel, Auth, $modalInstance) {

        $scope.watchManager = {
            onSubmitDone: -1
        };

        $scope.self = {
            currentTab: 'new',
            postId: postId,
            billId: billId,
            rateModel: rateModel,
            isAdmin: Auth.isAdmin(),
            tab: {
                isNewTabActive: 1,
                isListTabActive: 0
            }
        };

        $scope.onClickTab = onClickTab;
        $scope.isNewTab = isNewTab;
        _init();

        function _init() {

        }

        $scope.$watch('watchManager.onSubmitDone', _onSubmitDone);

        function isNewTab() {
            return $scope.self.currentTab === 'new';
        }

        function onClickTab(type) {
            if (type === $scope.self.currentTab) return;
            $scope.self.currentTab = type;
        }

        function _onSubmitDone(rateId) {
            // rateId: 0 -> new rate
            // rateId: > 0 -> edit rate
            if (rateId >= 0) {
                $modalInstance.close();
            }
        }
    }
})();
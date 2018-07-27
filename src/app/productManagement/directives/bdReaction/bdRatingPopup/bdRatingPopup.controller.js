(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .controller('BdRatingPopup', BdRatingPopup)
    ;

    function BdRatingPopup($scope, postId, rateModel, rateModelList, rateSummary, Auth, $modalInstance) {

        $scope.watchManager = {
            onSubmitDone: -1
        };

        $scope.self = {
            currentTab: 'list',
            postId: postId,
            rateModel: rateModel,
            rateModelList: rateModelList,
            rateSummary: rateSummary,
            isAdmin: Auth.isAdmin(),
            tab: {
                isNewTabActive: 0,
                isListTabActive: 1
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
(function () {
    'use strict';

    angular.module('biddy.reaction')
        .controller('BdRatingBuilder', BdRatingBuilder);

    function BdRatingBuilder($scope,$translate, productRatingManager, sessionStorage, RATING_OPTION, Notification) {
        $scope.self = {
            ratingOptions: angular.copy(RATING_OPTION),
            formProcessing: false,
            avatarUrl: sessionStorage.getAvatarUrl(),
            isNew: $scope.rateModel == null ? true : false
        };

        $scope.model = {
            bill: Number($scope.billId),
            product: Number($scope.productId),
            rateValue: $scope.self.isNew ? 5 : $scope.rateModel.rateValue,
            rateMessage: $scope.self.isNew ? null : $scope.rateModel.rateMessage
        };

        $scope.submit = submit;

        function _showProcessing() {
            if ($scope.self.formProcessing === false) {
                $scope.self.formProcessing = true;
            }
        }

        function _hideProcessing() {
            $scope.self.formProcessing = false;
        }

        function _buildParams() {
            return $scope.model;
        }

        function _notifySubmitDone() {
            $scope.watchManager.onSubmitDone = $scope.self.isNew ? 0 : $scope.rateModel.id;
        }

        function submit() {
            _showProcessing();
            var params = _buildParams();
            productRatingManager.one().customPOST(params)
                .then(function (elementFinders) {
                    _hideProcessing();
                    _notifySubmitDone();
                    Notification.success({message: $translate.instant('RATING.RATING_DONE')})
                }, function (error) {
                    if(error && error.data && error.data.message){
                        Notification.error({message: error.data.message})
                    }
                })
        }
    }
})();
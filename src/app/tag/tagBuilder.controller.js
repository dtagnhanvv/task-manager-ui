(function () {
    'use strict';

    angular.module('biddy.tag')
        .controller('TagBuilder', TagBuilder);

    function TagBuilder($scope, _, $timeout, $translate, tag, Auth, Notification, historyStorage, HISTORY_TYPE_PATH, tagManager) {

        $scope.keyword = '';
        $scope.formData = {};
        $scope.model = tag || {
            name: null,
            type: 'Product',
            url: null
        };
        $scope.self = {
            formProcessing: false,
            isNew: tag == null,
            isAdmin: Auth.isAdmin(),
            errorOccurred: false
        };
        // Functions
        $scope.submit = submit;
        $scope.onSelectAccount = onSelectAccount;
        $scope.isFormValid = isFormValid;
        $scope.messageUpdated = messageUpdated;

        _initForm();

        function _initForm() {
            if (!$scope.self.isNew) {
                _extractFormDataFromApi($scope.model);
            }
        }

        function messageUpdated() {
        }
        function _extractFormDataFromApi(model) {
        }

        function isFormValid() {
            return $scope.productForm.$valid;
        }

        function onSelectAccount(account) {
        }

        function refactorJson(model) {
            return {
                id: model.id,
                name: model.name,
                url: model.url,
                type: model.type
            };
        }

        function submit() {
            if ($scope.self.formProcessing) {
                return;
            }
            $scope.self.formProcessing = true;
            var apiData = refactorJson($scope.model);

            var postSave = $scope.self.isNew ? tagManager.post(apiData) : tagManager.one(apiData.id).patch(apiData);
            postSave
                .then(function () {
                    Notification.success({message: $scope.self.isNew ?
                            $translate.instant('TAG.ADD_SUCCESS') :
                            $translate.instant('TAG.SAVE_SUCCESS')
                    });

                    return historyStorage.getLocationPath(HISTORY_TYPE_PATH.tag, '^.list');
                })
                .catch(function (response) {
                    $scope.self.formProcessing = false;
                    // var message = _setMessageForSave(response);
                    var message = response.data.message;
                    if (!message) {
                        message = _setMessageForSave(response);
                    }
                    Notification.error({message: message});
                });
        }

        function _setMessageForSave(response) {
            if (response.status == 500) {
                return $scope.self.isNew ? $translate.instant('TAG.ADD_FAIL') : $translate.instant('TAG.SAVE_FAIL')
            } else {
                return response.data.message
            }
        }
    }
})();
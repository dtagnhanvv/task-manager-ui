(function () {
    'use strict';

    angular.module('biddy.task')
        .controller('TaskBuilder', TaskBuilder);

    function TaskBuilder($scope, _, $timeout, $translate, task, Auth, Notification, historyStorage, HISTORY_TYPE_PATH, taskManager) {

        $scope.keyword = '';
        $scope.formData = {};
        $scope.model = task || {
            project: "Biddy",
            url: null,
            board: null,
            cardNumber: null,
            status: null,
            releasePlan: null,
            review: null
        };
        $scope.self = {
            formProcessing: false,
            isNew: task == null,
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
                project: model.project,
                url: model.url,
                board: model.board,
                cardNumber: model.cardNumber,
                status: model.status,
                releasePlan: model.releasePlan,
                review: model.url
            };
        }

        function submit() {
            if ($scope.self.formProcessing) {
                return;
            }
            $scope.self.formProcessing = true;
            var apiData = refactorJson($scope.model);

            var postSave = $scope.self.isNew ? taskManager.post(apiData) : taskManager.one(apiData.id).patch(apiData);
            postSave
                .then(function () {
                    Notification.success({message: $scope.self.isNew ?
                            $translate.instant('TASK.ADD_SUCCESS') :
                            $translate.instant('TASK.SAVE_SUCCESS')
                    });

                    return historyStorage.getLocationPath(HISTORY_TYPE_PATH.task, '^.list');
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
                return $scope.self.isNew ? $translate.instant('TASK.ADD_FAIL') : $translate.instant('TASK.SAVE_FAIL')
            } else {
                return response.data.message
            }
        }
    }
})();
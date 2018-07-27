(function () {
    'use strict';

    angular.module('biddy.userPreference')
        .controller('UserPreferenceWrapperCtrl', UserPreferenceWrapperCtrl)
    ;

    function UserPreferenceWrapperCtrl($scope, historyStorage, HISTORY_TYPE_PATH, adminUserManager, saleUserManager,
                                       accountManager, userManager, $translate, FileUploader, Auth, Notification,
                                       UserPreferenceHelper) {

        $scope.formProcessing = false;
        _extractDataFromApiToForm();

        $scope.isFormValid = isFormValid;
        $scope.submit = submit;

        function isFormValid() {
            return true;
        }

        function _closeModal() {

        }
        function submit() {
            var params = _refactorModel($scope.account);
            $scope.formProcessing = true;

            UserPreferenceHelper.updateModel($scope.account.id, params).then(
                function () {
                    Notification.success({message: $translate.instant('USER_PREFERENCE.SAVE_SUCCESS')});
                    if (Auth.isAdmin() || Auth.isSale()) {
                        return historyStorage.getLocationPath(HISTORY_TYPE_PATH.account, '^.^.accountManagement.list');
                    }
                },
                function (error) {
                    $scope.formProcessing = false;
                    Notification.error({message: error.data.message, delay: null});
                })
        }

        function _refactorModel(model) {
            if (!model) {
                return null;
            }
            return {
                userPreferences: _buildUserPreferences(model)
            };
        }

        function _buildUserPreferences(model) {
            return model.userPreferences;
        }

        function _extractDataFromApiToForm() {

        }
    }
})();
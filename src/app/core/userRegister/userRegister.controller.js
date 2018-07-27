(function () {
    'use strict';

    angular.module('biddy.core.userRegister')
        .controller('UserRegister', UserRegister)
    ;

    function UserRegister($scope, historyStorage, HISTORY_TYPE_PATH, account, registerManager, ServerErrorProcessor, $state, $timeout, $translate) {
        $scope.formProcessing = false;
        $scope.repeatPassword = null;
        $scope.errorOccurred = false;
        $scope.registerOk = false;

        $scope.account = {
            username: null,
            plainPassword: null,
            email: null,
            firstName: null,
            lastName: null,
            phone: null,
            userType: null,
            enabled: true

        };

        $scope.isFormValid = isFormValid;
        $scope.isNotSamePassword = isNotSamePassword;
        $scope.submit = submit;

        function isFormValid() {
            if ($scope.account.plainPassword != null || $scope.repeatPassword != null) {
                return $scope.userForm.$valid && $scope.repeatPassword === $scope.account.plainPassword;
            }
            return $scope.userForm.$valid;
        }

        function isNotSamePassword() {
            var plainPasswordTouched = $scope.userForm.plainPassword.$touched;
            var inputRepeatPasswordTouched = $scope.userForm.inputRepeatPassword.$touched;
            var samePassword = $scope.repeatPassword !== $scope.account.plainPassword;

            return plainPasswordTouched && inputRepeatPasswordTouched && samePassword;
        }

        function submit() {
            var account = _refactorModel($scope.account);
            $scope.formProcessing = true;
            var saveUser = registerManager.one().customPOST(account);
            saveUser.then(
                function () {
                    $scope.errorOccurred = false;
                    $scope.registerOk = true;
                    $timeout(function () {
                        $state.go('login');
                    }, 2000);

                },
                function (response) {
                    $scope.formProcessing = false;
                    $scope.errorOccurred = response.data ? response.data.message : $translate.instant('ACCOUNT_MODULE.SAVE_ERROR');
                }
            )
        }

        // local functions
        function _refactorModel(model) {
            var account = angular.copy(model);
            if (!model) {
                return model;
            }
            if (model.userType) {
                account.userGroup = model.userType.value;
                delete  account.userType;
                delete  account.profileImageUrl;
            }
            return account;
        }
    }
})();
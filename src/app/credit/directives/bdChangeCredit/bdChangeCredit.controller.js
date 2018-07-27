(function () {
    'use strict';
    angular.module('biddy.credit').controller('BdChangeCredit', BdChangeCredit);

    function BdChangeCredit($scope, historyStorage, HISTORY_TYPE_PATH, USER_TYPES, adminUserManager, saleUserManager,
                            accountManager, sessionStorage, ServerErrorProcessor, $translate, FileUploader,
                            FILE_SERVER, PROFILE_DEFAULT, USER_ROLES, creditManager, TIMEOUT_SHORT, $timeout) {
        $scope.message = {
            uploadFail: null,
            saveOk: null
        };
        $scope.PROFILE_DEFAULT = PROFILE_DEFAULT;
        $scope.formData = {
            userTypes: USER_TYPES
        };
        $scope.model = {
            amount: null
        };

        $scope.formProcessing = false;
        $scope.errorMessage = false;
        $scope.formData = {
            userTypes: USER_TYPES,
            wallets: []
        };

        $scope.backToListAccount = backToListAccount;
        $scope.showBackToList = showBackToList;
        $scope.isFormValid = isFormValid;
        $scope.submit = submit;

        angular.forEach($scope.wallets, function (_wallet) {
            var walletLabel = {
                key: _wallet.name,
                value: _wallet.id,
                label: _wallet.name + " (Số tài khoản: " + _wallet.id + ")",
                translateLabel: _wallet.name,
                ticked: true
            }

            $scope.formData.wallets.push(walletLabel);
        });

        function showBackToList() {
            return $scope.role.name === USER_ROLES.admin || $scope.role.name === USER_ROLES.sale;
        }

        function backToListAccount() {
            return historyStorage.getLocationPath(HISTORY_TYPE_PATH.account, '^.list');
        }

        function _getRestUserManager(params) {
            return creditManager.post(params);
        }

        function _resetMessage() {
            $scope.message.saveOk = null;
        }

        function isFormValid() {
            return $scope.userForm.$valid;
        }

        function submit() {
            _resetMessage();
            var params = _refactorModel($scope.account, $scope.model);
            $scope.formProcessing = true;
            var restUserManager = _getRestUserManager(params);

            if (!restUserManager) return;

            restUserManager
                .then(function () {
                        $scope.errorMessage = false;
                        $scope.message.saveOk = $scope.isNew ? $translate.instant('ACCOUNT_MODULE.ADD_NEW_SUCCESS') : $translate.instant('ACCOUNT_MODULE.UPDATE_SUCCESS')
                        $timeout(function () {
                            if ($scope.role.name === USER_ROLES.admin || $scope.role.name === USER_ROLES.sale) {
                                return historyStorage.getLocationPath(HISTORY_TYPE_PATH.account, '^.list');
                            }
                        }, TIMEOUT_SHORT);
                    },
                    function (error) {
                        $scope.formProcessing = false;
                        $scope.errorMessage = error.data.message;
                    });
        }

        function _refactorModel(account, model) {
            if (!account) {
                return null;
            }
            return {
                fromWallet: sessionStorage.getUserBasicWallet(),
                targetWallet: model.wallet.value,
                amount: model.amount,
                detail: model.detail
            };
        }
    }
})();
(function () {
    'use strict';
    angular.module('biddy.userManagement').controller('BdAccount', BdAccount);

    function BdAccount($scope, historyStorage, HISTORY_TYPE_PATH, USER_TYPES, adminUserManager, saleUserManager, accountManager, userManager,
                       ServerErrorProcessor, $translate, FileUploader, FILE_SERVER, PROFILE_DEFAULT, USER_ROLES, Auth, Notification) {

        var uploader = $scope.uploader = new FileUploader({
            url: FILE_SERVER,
            autoUpload: true,
            removeAfterUpload: true,
            queueLimit: 1
        });
        // Filter
        uploader.filters.push(_buildSizeFilter(), _buildTypeFilter());
        // Callbacks
        uploader.onCompleteItem = _onCompleteItem;
        uploader.onWhenAddingFileFailed = _onWhenAddingFileFailed;
        uploader.onErrorItem = _onErrorItem;
        uploader.onAfterAddingFile = _onAfterAddingFile;

        $scope.message = {
            uploadFail: null,
            saveOk: null,
            saveError: null
        };

        $scope.formData = {
            userTypes: USER_TYPES
        };
        $scope.PROFILE_DEFAULT = PROFILE_DEFAULT;
        $scope.formProcessing = false;
        $scope.repeatPassword = null;

        $scope.modules = [
            {label: 'Bài viết', role: 'MODULE_PRODUCT'},
            {label: 'Bình luận', role: 'MODULE_COMMENT'},
            {label: 'Đấu giá', role: 'MODULE_BIDDING'},
            {label: 'Tín dụng', role: 'MODULE_CREDIT'}
        ];

        $scope.formData = {
            userTypes: USER_TYPES
        };

        if (!$scope.isNew) {
            _extractDataFromApiToForm();
        }

        $scope.backToListAccount = backToListAccount;
        $scope.showBackToList = showBackToList;
        $scope.isFormValid = isFormValid;
        $scope.isNotSamePassword = isNotSamePassword;
        $scope.submit = submit;
        $scope.toggleModuleRole = toggleModuleRole;
        $scope.disabledModule = disabledModule;
        $scope.hasModuleEnabled = hasModuleEnabled;
        $scope.isDisableActive = isDisableActive;

        function isDisableActive() {
            if ($scope.isNew || Auth.isAdmin()) return false;
            if ($scope.role.name === USER_ROLES.sale) return false;

            return true;
        }

        function disabledModule(module) {
            return $scope.role.name !== USER_ROLES.admin && $scope.role.name !== USER_ROLES.sale;
        }

        /**
         * check if current Account has a module enabled
         *
         * @param role
         * @return {boolean}
         */
        function hasModuleEnabled(role) {
            return $scope.account.enabledModules.indexOf(role) > -1;
        }

        /**
         * handle event toggle module roles
         *
         * @param role
         */
        function toggleModuleRole(role) {
            if (hasModuleEnabled(role)) {
                var idx = $scope.account.enabledModules.indexOf(role);
                $scope.account.enabledModules.splice(idx, 1);
            } else {
                $scope.account.enabledModules.push(role);
            }
        }

        function showBackToList() {
            return $scope.role.name === USER_ROLES.admin || $scope.role.name === USER_ROLES.sale;
        }

        function backToListAccount() {
            return historyStorage.getLocationPath(HISTORY_TYPE_PATH.account, '^.list');
        }

        function _notNullNotEmpty(value) {
            return value != null && value !== '';
        }

        function isFormValid() {
            if (_notNullNotEmpty($scope.account.plainPassword) || _notNullNotEmpty($scope.repeatPassword)) {
                return $scope.userForm.$valid && $scope.repeatPassword === $scope.account.plainPassword;
            }
            return $scope.userForm.$valid;
        }

        function isNotSamePassword() {
            var plainPasswordTouched = $scope.userForm.plainPassword.$dirty;
            var inputRepeatPasswordTouched = $scope.userForm.inputRepeatPassword.$dirty;
            var samePassword = $scope.repeatPassword != $scope.account.plainPassword; //don't change != to !===

            return plainPasswordTouched && inputRepeatPasswordTouched && samePassword;
        }

        function _getRestUserManager(role, isNew, account) {
            switch (role.name) {
                case USER_ROLES.admin:
                    return isNew ? adminUserManager.post(account) : adminUserManager.one(account.id).patch(account);
                case USER_ROLES.sale:
                    return isNew ? saleUserManager.post(account) : saleUserManager.one(account.id).patch(account);
                case USER_ROLES.account:
                    return accountManager.one().patch(account); //always edit, register is other module
                default:
                    return null;
            }
        }

        function _resetMessage() {
            $scope.message.saveOk = null;
        }

        function submit() {
            _resetMessage();
            var account = _refactorModel($scope.account);
            $scope.formProcessing = true;
            var restUserManager = _getRestUserManager($scope.role, $scope.isNew, account);

            if (!restUserManager) return;

            restUserManager.then(
                function () {
                    if (Auth.isAccount()) {
                        userManager.updateAvatarNav(account.profileImageUrl);
                    }
                    $scope.message.saveError = null;
                    $scope.message.saveOk = $scope.isNew ? $translate.instant('ACCOUNT_MODULE.ADD_NEW_SUCCESS') : $translate.instant('ACCOUNT_MODULE.UPDATE_SUCCESS');
                    Notification.success({message: $scope.message.saveOk});
                    if ($scope.role.name === USER_ROLES.admin || $scope.role.name === USER_ROLES.sale) {
                        return historyStorage.getLocationPath(HISTORY_TYPE_PATH.account, '^.list');
                    }
                },
                function (error) {
                    $scope.formProcessing = false;
                    $scope.message.saveError = error.data.message;
                    Notification.error({message: error.data.message, delay: null});
                })
        }

        // local functions
        function _refactorModel(model) {
            if (!model) {
                return null;
            }
            return {
                id: model.id,
                username: model.username,
                plainPassword: model.plainPassword,
                email: model.email,
                firstName: model.firstName,
                lastName: model.lastName,
                phone: model.phone,
                enabledModules: model.enabledModules,
                profileImageUrl: model.profileImageUrl,
                enabled: model.enabled
            };
        }

        function _extractDataFromApiToForm() {
            $scope.account.userType = _extractUserType();
        }

        function _extractUserType() {
            var userType = $scope.account.userGroup;
            if (!userType) {
                $scope.account.userType = null;
            }
            var found = $scope.formData.userTypes.find(function (type) {
                return type.value === userType;
            });
            if (found) {
                return found;
            }
            return null;
        }

        function _buildSizeFilter() {
            return {
                name: 'sizeFilter',
                message: $translate.instant('ACCOUNT_MODULE.OVER_SIZE'),
                fn: function (item /*{File|FileLikeObject}*/, options) {
                    return item.size / 1024 / 1024 <= 0.5;
                }
            }
        }

        function _buildTypeFilter() {
            return {
                name: 'typeFilter',
                message: $translate.instant('ACCOUNT_MODULE.WRONG_TYPE'),
                fn: function (item /*{File|FileLikeObject}*/, options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            }
        }

        function _onCompleteItem(fileItem, response, status, headers) {
            if (status === 200) {
                $scope.account.profileImageUrl = response.link;
            }
        }

        function _onWhenAddingFileFailed(item /*{File|FileLikeObject}*/, filter, options) {
            var message = filter.message;
            if (!message) {
                message = $translate.instant('ACCOUNT_MODULE.UP_AVATAR_ERROR');
            }
            $scope.message.uploadFail = message;
        }

        function _onErrorItem(fileItem, response, status, headers) {
            $scope.message.uploadFail = $translate.instant('ACCOUNT_MODULE.UP_AVATAR_ERROR');
        }

        function _onAfterAddingFile(fileItem) {
            $scope.message.uploadFail = null;
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('biddy.account')
        .controller('LayoutHeader', LayoutHeader)
    ;

    function LayoutHeader($scope, $rootScope, autoLogin, PROFILE_DEFAULT, sessionStorage) {
        $scope.formData = {
            PROFILE_DEFAULT: PROFILE_DEFAULT,
            avatarUrl: sessionStorage.getAvatarUrl(),
            unreadAlert: null
        };

        $scope.$on('avatar_changed', _onAvatarChanged);
        $scope.$on('ALERT_UNREAD_UPDATE', _onUnreadUpdate);

        $scope.switchBackToAdminAccount = switchBackToAdminAccount;
        $scope.showButtonSwitchBackToAdmin = showButtonSwitchBackToAdmin;
        $scope.onAlertClick = onAlertClick;
        $scope.isAvatarEmpty = isAvatarEmpty;

        function isAvatarEmpty() {
            return !$scope.formData.avatarUrl || $scope.formData.avatarUrl === 'undefined';
        }
        function switchBackToAdminAccount() {
            autoLogin.switchBackMyAccount('app.admin.accountManagement.list');
        }

        function showButtonSwitchBackToAdmin() {
            return autoLogin.showButtonSwitchBack();
        }

        function _onAvatarChanged(newAvatar) {
            $scope.formData.avatarUrl = sessionStorage.getAvatarUrl();
        }

        function _onUnreadUpdate(event, data) {
            $scope.formData.unreadAlert = data.value;
        }

        function onAlertClick() {
            $rootScope.$broadcast('CLICK_ALERT');
        }
    }
})();
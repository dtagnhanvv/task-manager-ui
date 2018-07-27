(function () {
    'use strict';

    angular
        .module('biddy.dashboard')
        .controller('Dashboard', Dashboard)
    ;

    function Dashboard($scope, $modal, UserPreferenceHelper, Auth, sessionStorage) {

        _init();

        function _init() {
            _showUserPreference();
        }

        function _showUserPreference() {
            if (Auth.isAdmin() || Auth.isSale()) return;

            var userId = sessionStorage.getUserId();
            UserPreferenceHelper.getAccount(userId).then(
                function (account) {
                    if (!account || !account.userPreferences ||
                        account.userPreferences.findServices || account.userPreferences.provideServices) {
                        return;
                    }

                    $modal.open({
                        templateUrl: 'userPreference/modal/preference.tpl.html',
                        size: 'lg',
                        controller: 'UserPreferenceBuilder',
                        resolve: {
                            account: account.plain()
                        },
                        backdrop: 'static',
                        keyboard: false
                    });
                }
            );
        }
    }
})();
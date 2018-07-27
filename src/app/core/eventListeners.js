(function () {
    'use strict';

    angular.module('biddy.core')
        .run(eventListeners)
    ;

    function eventListeners($rootScope, $translate, $state, AUTH_EVENTS, ENTRY_STATE, Notification, UserStateHelper, Auth, AlertService) {
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
            if (Auth.isAdmin()) {
                UserStateHelper.transitionRelativeToBaseState('dashboard');
            }
            else if (Auth.isAccount()) {
                UserStateHelper.transitionRelativeToBaseState('dashboard');
            }
            else if (Auth.isSale()) {
                UserStateHelper.transitionRelativeToBaseState('dashboard');
            }
            else {
                AlertService.replaceAlerts({
                    type: 'error',
                    message: $translate.instant('EVENT_LISTENER.NO_PERMISSION')
                });
            }
        });

        $rootScope.$on(AUTH_EVENTS.loginFailed, function() {
            AlertService.replaceAlerts({
                type: 'error',
                message: $translate.instant('EVENT_LISTENER.LOGIN_FAIL')
            });
        });

        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
            $state.go(ENTRY_STATE).then(function () {
                AlertService.replaceAlerts({
                    message: $translate.instant('EVENT_LISTENER.LOGOUT_SUCCESS')
                });
            });
        });

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
            $state.go(ENTRY_STATE);
        });

        $rootScope.$on(AUTH_EVENTS.sessionTimeout, function() {
            Auth.logout();
            $state.go(ENTRY_STATE).then(function() {
                AlertService.replaceAlerts({
                    type: 'error',
                    message: $translate.instant('EVENT_LISTENER.SESSION_EXPIRED')
                });
            });
        });

        $rootScope.$on(AUTH_EVENTS.notAuthorized, function() {
            console.log('not authorized');
            UserStateHelper.transitionRelativeToBaseState('error.403');
        });
    }
})();
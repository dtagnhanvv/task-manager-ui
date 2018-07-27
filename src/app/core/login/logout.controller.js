(function () {
    'use strict';

    angular.module('biddy.core.login')
        .controller('Logout', Logout)
    ;

    function Logout($rootScope, $scope, Auth, AUTH_EVENTS) {
        $scope.logout = function() {
            Auth.logout();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };
    }
})();
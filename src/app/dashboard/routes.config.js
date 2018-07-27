(function () {
    'use strict';

    angular.module('biddy.dashboard')
        .config(addStates)
    ;

    function addStates(UserStateHelperProvider) {
        UserStateHelperProvider
            .state('dashboard', {
                url: '/dashboard',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'Dashboard',
                        templateUrl: 'dashboard/dashboard.tpl.html'
                    }
                },
                resolve: {
                },
                ncyBreadcrumb: {
                    label: 'Dashboard'
                }
            })
        ;
    }
})();
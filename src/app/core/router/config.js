(function () {
    'use strict';

    angular.module('biddy.core.router')
        .config(appConfig)

        .constant('BASE_USER_URLS', {
            admin: '/adm',
            sale: '/sale',
            account: '/pub',
            subAccount: '/sub'
        })

        .constant('BASE_USER_STATES', {
            admin: 'app.admin',
            sale: 'app.sale',
            account: 'app.account',
            subAccount: 'app.subAccount'
        })

        .constant('STATUS_STATE_FOR_SUB_ACCOUNT_PERMISSION', {
            hide: 0,
            show: 1,
            auto: 2
        })
    ;

    function appConfig($urlRouterProvider) {
        $urlRouterProvider.when('', '/');

        $urlRouterProvider.otherwise(function($injector, $location) {
            var path = $location.path();

            return $injector.invoke(/* @ngInject */ function (Auth, urlPrefixService) {
                if (!Auth.isAuthenticated()) {
                    return '/';
                } else {
                    if(Auth.isSubAccount()) {
                        // todo
                        return urlPrefixService.getPrefixedUrl('/reports/unified/day');
                    }

                    return urlPrefixService.getPrefixedUrl('/dashboard');
                }

                /*if (path === '/') {
                    if(Auth.isSubAccount()) {
                        // todo
                        return urlPrefixService.getPrefixedUrl('/reports/unified/day');
                    }

                    return urlPrefixService.getPrefixedUrl('/dashboard');
                }*/

                return urlPrefixService.getPrefixedUrl('/error/404');
            });
        });
    }
})();
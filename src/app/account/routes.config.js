(function () {
    'use strict';

    angular
        .module('biddy.account')
        .config(addStates)
    ;

    function addStates($stateProvider, USER_ROLES) {
        $stateProvider
            .state('app.account', {
                abstract: true,
                views: {
                    'header@app': {
                        templateUrl: 'account/layout/header.tpl.html'
                    },
                    'nav@app': {
                        templateUrl: 'account/layout/nav.tpl.html'
                    }
                },
                url: '/pub',
                data: {
                    requiredUserRole: USER_ROLES.account
                },
                ncyBreadcrumb: {
                    skip: true
                }
            })
            .state('app.account.error', {
                abstract: true,
                url: '/error'
            })
            .state('app.account.error.404', {
                url: '/404',
                views: {
                    'content@app': {
                        controller: '404ErrorController'
                    }
                },
                ncyBreadcrumb: {
                    label: '404'
                }
            })
            .state('app.account.error.403', {
                url: '/403',
                views: {
                    'content@app': {
                        controller: '403ErrorController'
                    }
                },
                ncyBreadcrumb: {
                    label: '403'
                }
            })
            .state('app.account.error.400', {
                url: '/400',
                views: {
                    'content@app': {
                        controller: '400ErrorController'
                    }
                },
                ncyBreadcrumb: {
                    label: '400'
                }
            })
            .state('app.account.error.500', {
                url: '/500',
                views: {
                    'content@app': {
                        controller: '500ErrorController'
                    }
                },
                ncyBreadcrumb: {
                    label: '500'
                }
            })
        ;
    }
})();
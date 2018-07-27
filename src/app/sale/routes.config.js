(function () {
    'use strict';

    angular
        .module('biddy.sale')
        .config(addStates)
    ;

    function addStates($stateProvider, USER_ROLES) {
        $stateProvider
            .state('app.sale', {
                abstract: true,
                views: {
                    'header@app': {
                        templateUrl: 'sale/layout/header.tpl.html'
                    },
                    'nav@app': {
                        templateUrl: 'sale/layout/nav.tpl.html'
                    }
                },
                url: '/sale',
                data: {
                    requiredUserRole: USER_ROLES.sale
                },
                ncyBreadcrumb: {
                    skip: true
                }
            })

            .state('app.sale.error', {
                abstract: true,
                url: '/error'
            })

            .state('app.sale.error.404', {
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

            .state('app.sale.error.403', {
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

            .state('app.sale.error.400', {
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

            .state('app.sale.error.500', {
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
(function () {
    'use strict';

    angular.module('biddy.bill')
        .config(addStates)
    ;

    function addStates(UserStateHelperProvider) {
        // uniqueRequestCacheBuster is used as a work-around for reloading only the postModel state
        // currently UI-Router will reload all parent states as well, this causes problems having

        UserStateHelperProvider
            .state('bill', {
                abstract: true,
                url: '/bill',
                ncyBreadcrumb: {
                    skip: true
                }
            })
            .state('bill.listIn', {
                url: '/listIn?page&sortField&orderBy&search',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'IncomeBills',
                        templateUrl: 'bill/incomeBills/incomeBills.tpl.html'
                    }
                },
                resolve: {
                    bills: function () {
                        return [];
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'BILL.SELL_LEASE' | translate}}"
                }
            })
            .state('bill.listOut', {
                url: '/listOut?page&sortField&orderBy&search',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'OutBills',
                        templateUrl: 'bill/outBills/outBills.tpl.html'
                    }
                },
                resolve: {
                    bills: function () {
                        return [];
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'BILL.BUY_RENT' | translate}}"
                }
            })
        ;
    }
})();
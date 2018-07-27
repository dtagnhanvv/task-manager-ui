(function () {
    'use strict';

    angular.module('biddy.bid.myBidAuctions')
        .config(addStates)
    ;

    function addStates(UserStateHelperProvider) {
        // uniqueRequestCacheBuster is used as a work-around for reloading only the postModel state
        // currently UI-Router will reload all parent states as well, this causes problems having

        UserStateHelperProvider
            .state('bid.myBidAuctions', {
                abstract: true,
                url: '/myBidAuctions',
                ncyBreadcrumb: {
                    skip: true
                }
            })
            .state('bid.myBidAuctions.list', {
                url: '/list?page&sortField&orderBy&search',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'MyBidAuctions',
                        templateUrl: 'bid/myBidAuctions/myBidAuctions.tpl.html'
                    }
                },
                resolve: {
                    bidProducts: function (productManager, $stateParams, sessionStorage) {
                        $stateParams.page = !$stateParams.page ? 1 : $stateParams.page;
                        $stateParams.orderBy = !$stateParams.orderBy ? 'desc' : $stateParams.orderBy;
                        $stateParams.sortField = !$stateParams.sortField ? 'createdDate' : $stateParams.sortField;
                        $stateParams.account = Number(sessionStorage.getUserId());

                        return productManager.one().one('actives').customPOST($stateParams)
                            .then(function (products) {
                            return products.plain();
                        });
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'MY_BID_AUCTIONS.LIST' | translate}}"
                }
            });
    }
})();
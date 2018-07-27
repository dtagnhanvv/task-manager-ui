(function () {
    'use strict';

    angular.module('biddy.bid.bidAuction')
        .config(addStates)
    ;

    function addStates(UserStateHelperProvider) {
        // uniqueRequestCacheBuster is used as a work-around for reloading only the postModel state
        // currently UI-Router will reload all parent states as well, this causes problems having

        UserStateHelperProvider
            .state('bid.bidAuction', {
                abstract: true,
                url: '/bidAuction',
                ncyBreadcrumb: {
                    skip: true
                }
            })
            .state('bid.bidAuction.list', {
                url: '/list?page&sortField&orderBy&search',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'BidAuctionList',
                        templateUrl: 'bid/bidAuction/bidAuctionList.tpl.html'
                    }
                },
                resolve: {
                    bidAuctions: function (productManager, $stateParams, sessionStorage) {
                        $stateParams.page = !$stateParams.page ? 1 : $stateParams.page;
                        $stateParams.orderBy = !$stateParams.orderBy ? 'desc' : $stateParams.orderBy;
                        $stateParams.sortField = !$stateParams.sortField ? 'createdDate' : $stateParams.sortField;
                        $stateParams.account = Number(sessionStorage.getUserId());

                        return productManager.one().one('buyers').customPOST($stateParams)
                            .then(function (bidProducts) {
                                return bidProducts.plain();
                            });
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'BID_AUCTION.LIST' | translate}}"
                }
            });
    }
})();
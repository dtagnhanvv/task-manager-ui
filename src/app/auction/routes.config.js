(function () {
    'use strict';

    angular.module('biddy.auction')
        .config(addStates)
    ;

    function addStates(UserStateHelperProvider) {
        // uniqueRequestCacheBuster is used as a work-around for reloading only the postModel state
        // currently UI-Router will reload all parent states as well, this causes problems having

        UserStateHelperProvider
            .state('auction', {
                abstract: true,
                url: '/auction',
                ncyBreadcrumb: {
                    skip: true
                }
            })
            .state('auction.list', {
                url: 'product/{productId:[0-9]+}/list?page&sortField&orderBy&search',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'AuctionList',
                        templateUrl: 'auction/auctionList.tpl.html'
                    }
                },
                resolve: {
                    auctions: function (publicProductManager, $stateParams) {
                        $stateParams.page = !$stateParams.page ? 1 : $stateParams.page;
                        $stateParams.orderBy = !$stateParams.orderBy ? 'desc' : $stateParams.orderBy;
                        $stateParams.sortField = !$stateParams.sortField ? 'createdDate' : $stateParams.sortField;
                        $stateParams.limit = !$stateParams.limit ? 10 : $stateParams.limit;

                        var params = {
                            page: $stateParams.page,
                            orderBy: $stateParams.orderBy,
                            sortField: $stateParams.sortField,
                            limit: $stateParams.limit
                        };

                        return publicProductManager.one().one($stateParams.productId).one('auctions').get(params)
                            .then(function (auctions) {
                            return auctions.plain();
                        });
                    },
                    activeAuction: function (publicProductManager, $stateParams) {
                        return publicProductManager.one($stateParams.productId).one('auctions').one('active').get()
                            .then(function (auction) {
                                return true;
                            }, function (error) {
                                return null;
                            })
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'AUCTION.LIST' | translate}}"
                }
            })
            .state('auction.builder', {
                url: '/product/{productId:[0-9]+}/builder?next&minimumPrice&showBid&startDate&endDate&type&objective&incrementType&incrementValue&payment',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'AuctionBuilder',
                        templateUrl: 'auction/auctionBuilder.tpl.html'
                    }
                },
                resolve: {
                    auction: function ($stateParams) {
                        if($stateParams.next !== 'true'){
                            return null;
                        }
                        var result = {
                            minimumPrice: $stateParams.minimumPrice,
                            showBid: $stateParams.showBid,
                            startDate: $stateParams.startDate,
                            endDate: $stateParams.endDate,
                            type: $stateParams.type,
                            objective: $stateParams.objective,
                            incrementType: $stateParams.incrementType,
                            incrementValue: $stateParams.incrementValue,
                            payment: $stateParams.payment
                        };
                        return result;
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'AUCTION.ADD' | translate}}"
                }
            })
            .state('auction.edit', {
                url: '/edit?id&from',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'AuctionBuilder',
                        templateUrl: 'auction/auctionBuilder.tpl.html'
                    }
                },
                resolve: {
                    auction: function (auctionManager, $stateParams) {
                        if (!!$stateParams.id) {
                            return auctionManager.one($stateParams.id).get()
                                .then(function (auction) {
                                    $stateParams.productId = auction.plain().product.id;
                                    
                                    return auction.plain();
                                })
                        }
                        return null;
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'AUCTION.EDIT' | translate}}"
                }
            })
        ;
    }
})();
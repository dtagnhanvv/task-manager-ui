(function () {
    'use strict';

    angular.module('biddy.productManagement.productDetail')
        .config(addStates)
    ;

    function addStates(UserStateHelperProvider) {
        // uniqueRequestCacheBuster is used as a work-around for reloading only the postModel state
        // currently UI-Router will reload all parent states as well, this causes problems having

        UserStateHelperProvider
            .state('productManagement.productDetail', {
                abstract: true,
                url: '/productDetail',
                ncyBreadcrumb: {
                    skip: true
                }
            })
            .state('productManagement.productDetail.list', {
                url: '/product/{productId:[0-9]+}/auction/{auctionId:[0-9]+}?page&sortField&orderBy&search',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'ProductDetailList',
                        templateUrl: 'productManagement/productDetail/productDetailList.tpl.html'
                    }
                },
                resolve: {
                    commentPosts: function (publicProductManager, $stateParams) {
                        $stateParams.page = 1;
                        $stateParams.orderBy = 'desc';
                        $stateParams.sortField = 'createdDate';

                        var param = {
                            page: $stateParams.page,
                            orderBy: $stateParams.orderBy,
                            sortField: $stateParams.sortField
                        };
                        var postId = $stateParams.productId;

                        return publicProductManager.one(postId).one('comments').get(param).then(function (commentPosts) {
                            return commentPosts.plain();
                        });
                    },
                    product: function (publicProductManager, $stateParams) {
                        if ($stateParams.productId) {
                            return publicProductManager.one($stateParams.productId).one('shows').get()
                                .then(function (product) {
                                        return product.plain();
                                    },
                                    function (error) {
                                        return null;
                                    })
                        }
                        return null;
                    },

                    auction: function (publicProductManager, $stateParams, auctionManager) {
                        if ($stateParams.auctionId && $stateParams.auctionId > 0) {
                            return auctionManager.one($stateParams.auctionId).get()
                                .then(function (auction) {
                                        return auction.plain();
                                    },
                                    function (error) {
                                        return null;
                                    })
                        }
                        else if ($stateParams.productId) {
                            return publicProductManager.one($stateParams.productId).one('auctions').one('active').get()
                                .then(function (auction) {
                                    return auction.plain();
                                }, function (error) {
                                    return null;
                                })
                        }
                        return null;
                    },
                    currentUser: function (userManager) {
                        return userManager.getFullCurrentUser();
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'COMMENT_POST.DETAIL_POST' | translate}}"
                }
            })
        ;
    }
})();
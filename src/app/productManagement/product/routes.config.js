(function () {
    'use strict';

    angular.module('biddy.productManagement.product')
        .config(addStates)
    ;

    function addStates(UserStateHelperProvider) {
        // uniqueRequestCacheBuster is used as a work-around for reloading only the postModel state
        // currently UI-Router will reload all parent states as well, this causes problems having

        UserStateHelperProvider
            .state('productManagement.product', {
                abstract: true,
                url: '/product',
                ncyBreadcrumb: {
                    skip: true
                }
            })
            .state('productManagement.product.list', {
                url: '/list?page&sortField&orderBy&search',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'ProductList',
                        templateUrl: 'productManagement/product/productList.tpl.html'
                    }
                },
                resolve: {
                    products: function (GeneralProductHelper, $stateParams, sessionStorage, PRODUCT_TYPES) {
                        $stateParams.page = !$stateParams.page ? 1 : $stateParams.page;
                        $stateParams.orderBy = !$stateParams.orderBy ? 'desc' : $stateParams.orderBy;
                        $stateParams.sortField = !$stateParams.sortField ? 'createdDate' : $stateParams.sortField;
                        $stateParams.limit = !$stateParams.limit ? 10 : $stateParams.limit;
                        $stateParams.account = Number(sessionStorage.getUserId());
                        $stateParams.type = PRODUCT_TYPES.GENERAL;

                        return GeneralProductHelper.getList($stateParams);
                    }
                },
                customResolve: {
                    admin: {
                        accounts: function (adminUserManager) {
                            var params = {
                                page: 1,
                                orderBy: 'desc',
                                sortField: 'lastLogin',
                                limit: 10
                            };
                            return adminUserManager.one('list').customPOST(params).then(function (accounts) {
                                return accounts.plain();
                            });
                        }
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'PRODUCT_MANAGEMENT.PRODUCT.LIST' | translate}}"
                }
            })
            .state('productManagement.product.builder', {
                url: '/builder',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'ProductBuilder',
                        templateUrl: 'productManagement/product/productBuilder.tpl.html'
                    }
                },
                resolve: {
                    product: function () {
                        return null
                    },
                    tempAuction: function () {
                        return null;
                    }
                },
                customResolve: {
                    admin: {
                        accounts: function (adminUserManager) {
                            var params = {
                                page: 1,
                                orderBy: 'desc',
                                sortField: 'lastLogin',
                                limit: 10
                            };
                            return adminUserManager.one('list').customPOST(params).then(function (accounts) {
                                return accounts.plain();
                            });
                        }
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'PRODUCT_MANAGEMENT.PRODUCT.ADD' | translate}}"
                }
            })
            .state('productManagement.product.edit', {
                url: '/edit?id&next&minimumPrice&showBid&startDate&endDate&type&objective&incrementType&incrementValue&payment',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'ProductBuilder',
                        templateUrl: 'productManagement/product/productBuilder.tpl.html'
                    }
                },
                resolve: {
                    product: function (productManager, $stateParams) {
                        if (!!$stateParams.id) {
                            return productManager.one($stateParams.id).get()
                                .then(function (product) {
                                    return product.plain();
                                })
                        }
                        return null;
                    },
                    accounts: function () {
                        return null
                    },
                    tempAuction: function ($stateParams) {
                        return {
                            minimumPrice: $stateParams.minimumPrice,
                            showBid: $stateParams.showBid,
                            startDate: $stateParams.startDate,
                            endDate: $stateParams.endDate,
                            type: $stateParams.type,
                            objective: $stateParams.objective,
                            incrementType: $stateParams.incrementType,
                            incrementValue: $stateParams.incrementValue,
                            payment: $stateParams.payment,
                        }
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'PRODUCT_MANAGEMENT.PRODUCT.EDIT' | translate}}"
                }
            })
        ;
    }
})();
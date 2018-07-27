(function () {
    'use strict';

    angular
        .module('biddy.admin.saleManagement')
        .config(addStates)
    ;

    function addStates($stateProvider) {
        // uniqueRequestCacheBuster is used as a work-around for reloading only the current state
        // currently UI-Router will reload all parent states as well, this causes problems having

        $stateProvider
            .state({
                name: 'app.admin.saleManagement',
                abstract: true,
                url: '/saleManagement',
                ncyBreadcrumb: {
                    label: "{{'SALE_MODULE.MANAGEMENT' | translate}}"
                }
            })

            .state({
                name: 'app.admin.saleManagement.list',
                url: '/list?page&sortField&orderBy&search',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'SaleList',
                        templateUrl: 'admin/saleManagement/saleList.tpl.html'
                    }
                },
                resolve: {
                    sales: function (adminSaleManager, $stateParams) {
                        $stateParams.page = !$stateParams.page ? 1 : $stateParams.page;
                        $stateParams.orderBy = !$stateParams.orderBy ? 'desc' : $stateParams.orderBy;
                        $stateParams.sortField = !$stateParams.sortField ? 'lastLogin' : $stateParams.sortField;
                        $stateParams.limit = !$stateParams.limit ? 10 : $stateParams.limit;

                        return adminSaleManager.one('list').customPOST($stateParams).then(function (sales) {
                            return sales.plain();
                        });
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'SALE_MODULE.LIST' | translate}}"
                }
            })

            .state({
                name: 'app.admin.saleManagement.new',
                url: '/new',
                views: {
                    'content@app': {
                        controller: 'AdminSaleForm',
                        templateUrl: 'admin/saleManagement/saleForm.tpl.html'
                    }
                },
                resolve: {
                    sale: function() {
                        return null;
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'SALE_MODULE.NEW_SALE' | translate}}"
                }
            })

            .state({
                name: 'app.admin.saleManagement.edit',
                url: '/edit/{id:[0-9]+}',
                views: {
                    'content@app': {
                        controller: 'AdminSaleForm',
                        templateUrl: 'admin/saleManagement/saleForm.tpl.html'
                    }
                },
                resolve: {
                    sale: function($stateParams, adminSaleManager) {
                        return adminSaleManager.one($stateParams.id).get();
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'SALE_MODULE.EDIT' | translate}}" + ' - {{ sale.username }}'
                }
            })
            .state({
                name: 'app.admin.saleManagement.changeCredit',
                url: '/changeCredit/{id:[0-9]+}',
                views: {
                    'content@app': {
                        controller: 'AdminSaleCreditForm',
                        templateUrl: 'admin/saleManagement/saleCredit/adminSaleCreditForm.tpl.html'
                    }
                },
                resolve: {
                    sale: function($stateParams, adminSaleManager) {
                        return adminSaleManager.one($stateParams.id).get();
                    },
                    wallets: function($stateParams, walletManager) {
                        $stateParams.page = !$stateParams.page ? 1 : $stateParams.page;
                        $stateParams.orderBy = !$stateParams.orderBy ? 'desc' : $stateParams.orderBy;
                        $stateParams.sortField = !$stateParams.sortField ? 'lastLogin' : $stateParams.sortField;
                        $stateParams.limit = !$stateParams.limit ? 10 : $stateParams.limit;
                        $stateParams.account = $stateParams.id;

                        return walletManager.one().get($stateParams).then(function (wallets) {
                            return wallets.plain().records;
                        });
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'SALE_MODULE.CHANGE_CREDIT' | translate}}"
                }
            })
        ;
    }
})();
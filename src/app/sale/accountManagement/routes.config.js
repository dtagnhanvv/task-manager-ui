(function () {
    'use strict';

    angular
        .module('biddy.sale.accountManagement')
        .config(addStates)
    ;

    function addStates($stateProvider) {
        // uniqueRequestCacheBuster is used as a work-around for reloading only the current state
        // currently UI-Router will reload all parent states as well, this causes problems having

        $stateProvider
            .state({
                name: 'app.sale.accountManagement',
                abstract: true,
                url: '/userManagement',
                ncyBreadcrumb: {
                    label: "{{'NARBAR.ACCOUNT_MANAGEMENT' | translate}}"
                }
            })

            .state({
                name: 'app.sale.accountManagement.list',
                url: '/list?page&sortField&orderBy&search',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'SaleAccountsList',
                        templateUrl: 'sale/accountManagement/accountList.tpl.html'
                    }
                },
                resolve: {
                    accounts: function (saleUserManager, $stateParams) {
                        $stateParams.page = !$stateParams.page ? 1 : $stateParams.page;
                        $stateParams.orderBy = !$stateParams.orderBy ? 'desc' : $stateParams.orderBy;
                        $stateParams.sortField = !$stateParams.sortField ? 'lastLogin' : $stateParams.sortField;
                        $stateParams.limit = !$stateParams.limit ? 10 : $stateParams.limit;

                        return saleUserManager.one('list').customPOST($stateParams).then(function (accounts) {
                            return accounts.plain();
                        });
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'NAVBAR.ACCOUNTS' | translate}}"
                }
            })

            .state({
                name: 'app.sale.accountManagement.new',
                url: '/new',
                views: {
                    'content@app': {
                        controller: 'SaleAccountForm',
                        templateUrl: 'sale/accountManagement/accountForm.tpl.html'
                    }
                },
                resolve: {
                    account: function () {
                        return null;
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'NAVBAR.NEW_ACCOUNT' | translate}}"
                }
            })

            .state({
                name: 'app.sale.accountManagement.edit',
                url: '/edit/{id:[0-9]+}',
                views: {
                    'content@app': {
                        controller: 'SaleAccountForm',
                        templateUrl: 'sale/accountManagement/accountForm.tpl.html'
                    }
                },
                resolve: {
                    account: function ($stateParams, saleUserManager) {
                        return saleUserManager.one($stateParams.id).get();
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'NAVBAR.EDIT' | translate}}" + "- {{ account.username }}"
                }
            })
            .state({
                name: 'app.sale.accountManagement.changeCredit',
                url: '/changeCredit/{id:[0-9]+}',
                views: {
                    'content@app': {
                        controller: 'SaleAccountCreditForm',
                        templateUrl: 'sale/accountManagement/saleCredit/saleAccountCreditForm.tpl.html'
                    }
                },
                resolve: {
                    account: function ($stateParams, saleUserManager) {
                        return saleUserManager.one($stateParams.id).get();
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
                    label: "{{'ACCOUNT_MODULE.CHANGE_CREDIT' | translate}}"
                }
            })
        ;
    }
})();
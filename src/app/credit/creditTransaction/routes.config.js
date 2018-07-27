(function () {
    'use strict';

    angular.module('biddy.credit.creditTransaction')
        .config(addStates)
    ;

    function addStates(UserStateHelperProvider) {
        // uniqueRequestCacheBuster is used as a work-around for reloading only the postModel state
        // currently UI-Router will reload all parent states as well, this causes problems having

        UserStateHelperProvider
            .state('credit.creditTransaction', {
                abstract: true,
                url: '/creditTransaction',
                ncyBreadcrumb: {
                    skip: true
                }
            })
            .state('credit.creditTransaction.list', {
                url: '/list?page&sortField&orderBy&search',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'CreditTransactions',
                        templateUrl: 'credit/creditTransaction/creditTransaction.tpl.html'
                    }
                },
                resolve: {
                    account: function (accountManager, saleManager, Auth, adminUserManager) {
                        if (Auth.isSale()) {
                            return saleManager.one('current').get();
                        } else if (Auth.isAdmin()) {
                            return adminUserManager.one('current').get();
                        }
                        return accountManager.one('').get();
                    },
                    creditTransactions: function (creditManager, $stateParams, sessionStorage, calendarUtil, DateFormatter) {
                        var dateSearchModel = {
                            startDate: moment().subtract(10, 'days'),
                            endDate: moment()
                        };
                        var startDate = DateFormatter.getDateTimeString(dateSearchModel.startDate);
                        var endDate = DateFormatter.getDateTimeString(dateSearchModel.endDate);
                        var createdDate = calendarUtil.concatStartDateEndDate(startDate, endDate, ',');


                        $stateParams.account = Number(sessionStorage.getUserId());
                        $stateParams.page = !$stateParams.page ? 1 : Number($stateParams.page);
                        $stateParams.orderBy = !$stateParams.orderBy ? 'desc' : $stateParams.orderBy;
                        $stateParams.sortField = !$stateParams.sortField ? 'createdDate' : $stateParams.sortField;

                        var params = angular.copy($stateParams);
                        params.searches = {
                            createdDate: createdDate
                        };
                        return creditManager.one().one('list').customPOST(params).then(function (transactions) {
                            return transactions.plain();
                        });
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'WALLET' | translate}}"
                }
            })
        ;
    }
})();
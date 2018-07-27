(function () {
    'use strict';

    angular
        .module('biddy.account.accountManagement')
        .config(addStates)
    ;

    function addStates($stateProvider) {
        $stateProvider
            .state({
                name: 'app.account.accountManagement',
                abstract: true,
                url: '/accountManagement'
            })

            .state({
                name: 'app.account.accountManagement.edit',
                url: '/edit',
                views: {
                    'content@app': {
                        controller: 'UserAccountForm',
                        templateUrl: 'account/accountManagement/accountForm.tpl.html'
                    }
                },
                resolve: {
                    account: function(accountManager) {
                        return accountManager.one('').get();
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'ACCOUNT_MODULE.EDIT' | translate}}"
                }
            })
        ;
    }
})();
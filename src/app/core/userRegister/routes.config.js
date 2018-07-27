(function () {
    'use strict';

    angular.module('biddy.core.userRegister')
        .config(function ($stateProvider) {
            $stateProvider
                .state('userRegister', {
                    parent: 'anon',
                    url: '/register',
                    templateUrl: 'core/userRegister/userRegister.tpl.html',
                    controller: 'UserRegister',
                    data: {
                        allowAnonymous: true
                    },
                    resolve: {
                        account: function () {
                            return null;
                        }
                    }
                })
        })
        .config(function ($stateProvider) {
            $stateProvider
                .state('profile', {
                    parent: 'anon',
                    url: '/profile',
                    templateUrl: 'core/userRegister/userRegister.tpl.html',
                    controller: 'UserRegister',
                    data: {
                        allowAnonymous: true
                    },
                    resolve: {
                        account: function (accountManager) {
                            return accountManager.one('current').get();
                        }
                    }
                })
        })
    ;
})();

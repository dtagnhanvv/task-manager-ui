(function() {
    'use strict';

    angular.module('biddy.account', [
        'ui.router',
        'biddy.core',
        'biddy.account.layout',
        'biddy.account.accountManagement',
        'biddy.userManagement'
    ]);
})();
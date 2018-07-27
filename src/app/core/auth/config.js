(function () {
    'use strict';

    angular.module('biddy.core.auth')
        .constant('AUTH_TOKEN_NAME', 'tagcadeToken')
        .constant('AVATAR_URL', 'avatarUrl')
        .constant('USERNAME', 'username')
        .constant('USER_ID', 'userId')
        .constant('BASIC_WALLET', 'basicWallet')
        .constant('BASIC_WALLET_CREDIT', 'basicWalletCredit')
        .constant('PREVIOUS_AUTH_TOKEN_NAME', 'tagcadePreviousAuthTokenRaw')
        .constant('CURRENT_ACCOUNT_SETTINGS', 'tagcadeCurrentAccountSettings')

        .constant('USER_ROLES', {
            admin: 'ROLE_ADMIN',
            account: 'ROLE_ACCOUNT',
            sale: 'ROLE_SALE'
        })

        .constant('USER_MODULES', {
            user: 'MODULE_USER',
            product: 'MODULE_PRODUCT',
            comment: 'MODULE_COMMENT',
            bidding: 'MODULE_BIDDING',
            credit: 'MODULE_CREDIT',
        })

        .constant('AUTH_EVENTS', {
            loginSuccess: 'biddy.core.auth.login_success',
            loginFailed: 'biddy.core.auth.login_failed',
            logoutSuccess: 'biddy.core.auth.logout_success',
            sessionTimeout: 'biddy.core.auth.session_timeout',
            notAuthenticated: 'biddy.core.auth.not_authenticated',
            notAuthorized: 'biddy.core.auth.not_authorized'
        })

    ;

})();
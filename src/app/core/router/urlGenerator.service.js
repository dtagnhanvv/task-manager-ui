(function() {
    'use strict';

    angular.module('biddy.core.router')
        .factory('urlPrefixService', urlPrefixService)
    ;

    function urlPrefixService(USER_ROLES, BASE_USER_URLS, Auth) {
        var api = {
            getPrefixedUrl: getPrefixedUrl
        };

        return api;

        /////

        function getUrlPrefixForCurrentUser() {
            var urlPrefix;

            if (Auth.isAuthorized(USER_ROLES.admin)) {
                console.log('admin');
                urlPrefix = BASE_USER_URLS.admin;
            } else if (Auth.isAuthorized(USER_ROLES.sale)) {
                console.log('sale');
                urlPrefix = BASE_USER_URLS.sale;
            } else if (Auth.isAuthorized(USER_ROLES.account)) {
                console.log('account');
                urlPrefix = BASE_USER_URLS.account;
            } else if (Auth.isAuthorized(USER_ROLES.subAccount)) {
                console.log('subAccount');
                urlPrefix = BASE_USER_URLS.subAccount;
            }

            return urlPrefix;
        }

        function getPrefixedUrl(url) {
            if (url.indexOf('/') !== 0) {
                url = '/' + url;
            }

            return getUrlPrefixForCurrentUser() + url;
        }
    }
})();
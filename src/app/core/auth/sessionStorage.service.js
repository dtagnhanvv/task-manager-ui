(function () {
    'use strict';

    angular.module('biddy.core.auth')
        .factory('sessionStorage', sessionStorage)
    ;

    function sessionStorage($window, AUTH_TOKEN_NAME, PREVIOUS_AUTH_TOKEN_NAME, CURRENT_ACCOUNT_SETTINGS, AVATAR_URL, USERNAME,USER_ID, BASIC_WALLET, BASIC_WALLET_CREDIT) {
        var api = {
            setCurrentToken: setCurrentToken,
            getCurrentToken: getCurrentToken,

            setPreviousToken: setPreviousToken,
            getPreviousToken: getPreviousToken,

            setCurrentSettings: setCurrentSettings,
            getCurrentSettings: getCurrentSettings,

            clearStorage: clearStorage,
            clearPreviousToken: clearPreviousToken,
            setAvatarUrl: setAvatarUrl,
            setUsername: setUsername,
            getAvatarUrl: getAvatarUrl,
            getUsername: getUsername,
            getUserId: getUserId,
            setUserId: setUserId,
            setUserBasicWallet: setUserBasicWallet,
            getUserBasicWallet: getUserBasicWallet
        };

        return api;

        function getUserBasicWallet() {
            return $window.localStorage[BASIC_WALLET];
        }

        function setUserBasicWallet(wallet) {
            $window.localStorage[BASIC_WALLET] = wallet;
        }

        function getUserBasicWalletCredit() {
            return $window.localStorage[BASIC_WALLET_CREDIT];
        }

        function setUserBasicWalletCredit(credit) {
            $window.localStorage[BASIC_WALLET_CREDIT] = credit;
        }

        function getUserId() {
            return $window.localStorage[USER_ID];
        }

        function setUserId(id) {
            $window.localStorage[USER_ID] = id;
        }

        function setUsername(avatarUrl) {
            $window.localStorage[USERNAME] = avatarUrl;
        }

        function getUsername() {
            return $window.localStorage[USERNAME]
        }

        function setAvatarUrl(avatarUrl) {
            $window.localStorage[AVATAR_URL] = avatarUrl;
        }

        function getAvatarUrl() {
            var avatarUrl = $window.localStorage[AVATAR_URL];
            return avatarUrl && avatarUrl !== 'null' ? $window.localStorage[AVATAR_URL] : 'assets/images/anonymous.gif';
        }

        function setCurrentToken(CurrentAuthToken) {
            $window.localStorage[AUTH_TOKEN_NAME] = CurrentAuthToken;
        }

        function getCurrentToken() {
            return $window.localStorage[AUTH_TOKEN_NAME];
        }

        function setPreviousToken(previousAuthToken) {
            var tokenList = angular.fromJson($window.localStorage[PREVIOUS_AUTH_TOKEN_NAME]) || [];
            tokenList.push(previousAuthToken);

            $window.localStorage[PREVIOUS_AUTH_TOKEN_NAME] = angular.toJson(tokenList);
        }

        function getPreviousToken() {
            var listPreviousToken = angular.fromJson($window.localStorage[PREVIOUS_AUTH_TOKEN_NAME]);

            if (angular.isArray(listPreviousToken) && listPreviousToken.length > 0) {
                return listPreviousToken[listPreviousToken.length - 1];
            }

            return null;
        }

        function setCurrentSettings(setCurrentSettings) {
            $window.localStorage[CURRENT_ACCOUNT_SETTINGS] = angular.toJson(setCurrentSettings);
        }

        function getCurrentSettings() {
            return $window.localStorage[CURRENT_ACCOUNT_SETTINGS];
        }

        function clearStorage() {
            $window.localStorage.clear();
        }

        function clearPreviousToken() {
            var listPreviousToken = angular.fromJson($window.localStorage[PREVIOUS_AUTH_TOKEN_NAME]);

            if (angular.isArray(listPreviousToken) && listPreviousToken.length == 1) {
                $window.localStorage.removeItem(PREVIOUS_AUTH_TOKEN_NAME);
            } else {
                listPreviousToken.splice(listPreviousToken.length - 1, 1);
                $window.localStorage[PREVIOUS_AUTH_TOKEN_NAME] = angular.toJson(listPreviousToken);
            }
        }
    }
})();
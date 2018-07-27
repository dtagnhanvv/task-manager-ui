(function () {
    'use strict';

    angular
        .module('biddy.userManagement')
        .factory('UserPreferenceHelper', UserPreferenceHelper)
    ;

    function UserPreferenceHelper(accountManager, saleUserManager, adminUserManager, Auth) {

        return {
            getAccount: getAccount,
            updateModel: updateModel,

        };

        function updateModel(id, params) {
            if (Auth.isSale()) {
                return saleUserManager.one(id).patch(params);
            } else if (Auth.isAdmin()) {
                return adminUserManager.one(id).patch(params);
            }
            return accountManager.one().patch(params);
        }

        function getAccount(id) {
            if (Auth.isSale()) {
                return saleUserManager.one(id).get();
            } else if (Auth.isAdmin()) {
                return adminUserManager.one(id).get();
            }
            return accountManager.one('').get();
        }
    }
})();
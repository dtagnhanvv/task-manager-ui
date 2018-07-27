(function () {
    'use strict';

    angular
        .module('biddy.userManagement')
        .factory('userManager', userManager)
    ;

    function userManager(accountManager, saleUserManager, adminUserManager, Auth, sessionStorage, $rootScope) {

        return {
            getFullCurrentUser: getFullCurrentUser,
            updateAvatarNav: updateAvatarNav

        };

        function updateAvatarNav(profileImageUrl) {
            var currentAvatar = sessionStorage.getAvatarUrl();
            if(profileImageUrl !== currentAvatar){
                sessionStorage.setAvatarUrl(profileImageUrl);
            }
            $rootScope.$broadcast('avatar_changed');
        }

        function getFullCurrentUser() {

            if (Auth.isSale()) {
                return saleUserManager.one('current').get();
            } else if (Auth.isAdmin()) {
                return adminUserManager.one('current').get();
            }
            return accountManager.one('').get();
        }
    }
})();
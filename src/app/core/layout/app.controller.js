(function () {
    'use strict';

    angular.module('biddy.core.layout')
        .controller('AppController', App)
    ;

    function App($scope,$rootScope, Auth, userSession, USER_MODULES, DEFAULT_DATE_FORMAT, DEFAULT_DATETIME_FORMAT, $translate, amMoment) {
        $scope.currentUser = userSession;
        
        $scope.hasUserModule = userSession.hasModuleEnabled(USER_MODULES.user);
        $scope.hasProductModule = userSession.hasModuleEnabled(USER_MODULES.product);
        $scope.hasCommentModule = userSession.hasModuleEnabled(USER_MODULES.comment);
        $scope.hasBiddingModule = userSession.hasModuleEnabled(USER_MODULES.bidding);
        $scope.hasCreditModule = userSession.hasModuleEnabled(USER_MODULES.credit);

        $scope.is2ndLogin = userSession.is2ndLogin;

        $scope.isAdmin = Auth.isAdmin;
        $scope.DEFAULT_DATE_FORMAT = DEFAULT_DATE_FORMAT;
        $scope.DEFAULT_DATETIME_FORMAT = DEFAULT_DATETIME_FORMAT;
        $scope.isSubAccount = Auth.isSubAccount;
        $scope.isAccount = Auth.isAccount;
        $scope.isSale = Auth.isSale;

        $scope.admin = {
            layout: 'wide',
            menu: 'vertical',
            fixedHeader: true,
            fixedSidebar: true
        };
        amMoment.changeLocale('vi');
    }
})();
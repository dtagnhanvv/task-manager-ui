(function () {
    'use strict';

    angular
        .module('biddy.admin.accountManagement')
        .controller('AccountForm', AccountForm)
    ;

    function AccountForm($scope, account, USER_ROLES) {
        $scope.role = {
            name: USER_ROLES.admin
        };
        $scope.isNew = account == null;
        $scope.account = account || {
            username: null,
            plainPassword: null,
            email: null,
            firstName: null,
            lastName: null,
            phone: null,
            userType: null,
            enabled: true,
            enabledModules: ['MODULE_PRODUCT', 'MODULE_COMMENT']
        };
    }
})();
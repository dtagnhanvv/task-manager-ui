(function () {
    'use strict';

    angular.module('biddy.userPreference')
        .controller('UserPreferenceBuilder', UserPreferenceBuilder);

    function UserPreferenceBuilder($scope, account) {

        $scope.account = account;
    }
})();
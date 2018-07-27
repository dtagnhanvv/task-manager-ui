(function () {
    'use strict';

    angular.module('biddy.userPreference')
        .directive('userPreference', userPreference)
    ;

    function userPreference() {

        return {
            scope: {
                userPreferenceData:'='
            },
            restrict: 'AE',
            templateUrl: 'userPreference/directives/userPreference/userPreference.tpl.html',
            controller: 'UserPreferenceCtrl'
        };
    }
})();
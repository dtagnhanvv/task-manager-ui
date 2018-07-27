(function () {
    'use strict';

    angular.module('biddy.userPreference')
        .directive('userPreferenceWrapper', userPreferenceWrapper)
    ;

    function userPreferenceWrapper() {

        return {
            scope: {
                userPreferenceData:'=',
                account: '='
            },
            restrict: 'AE',
            templateUrl: 'userPreference/directives/userPreferenceWrapper/userPreferenceWrapper.tpl.html',
            controller: 'UserPreferenceWrapperCtrl'
        };
    }
})();
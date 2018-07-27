
(function() {
    'use strict';

    angular.module('biddy.userManagement')
        .config(addStates)
    ;

    function addStates(UserStateHelperProvider) {
        UserStateHelperProvider
            .state('userManagement', {
                abstract: true,
                url: '/userManagement',
                ncyBreadcrumb: {
                    label: "{{'USER_MANAGEMENT_HELPER.ROOT_BREADCRUMB' | translate}}"
                }
            })
        ;
    }
})();
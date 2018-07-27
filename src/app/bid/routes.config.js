
(function() {
    'use strict';

    angular.module('biddy.bid').config(addStates);

    function addStates(UserStateHelperProvider) {
        UserStateHelperProvider
            .state('bid', {
                abstract: true,
                url: '/bid',
                ncyBreadcrumb: {
                    label: "{{'BID_MODULE.ROOT_BREADCRUMB' | translate}}"
                }
            })
        ;
    }
})();

(function() {
    'use strict';

    angular.module('biddy.credit').config(addStates);

    function addStates(UserStateHelperProvider) {
        UserStateHelperProvider
            .state('credit', {
                abstract: true,
                url: '/credit',
                ncyBreadcrumb: {
                    label: "{{'CREDIT_MODULE.ROOT_BREADCRUMB' | translate}}"
                }
            })
        ;
    }
})();
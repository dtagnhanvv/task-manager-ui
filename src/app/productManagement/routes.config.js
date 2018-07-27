(function() {
    'use strict';

    angular.module('biddy.productManagement')
        .config(addStates)
    ;

    function addStates(UserStateHelperProvider) {
        UserStateHelperProvider
            .state('productManagement', {
                abstract: true,
                url: '/productManagement',
                ncyBreadcrumb: {
                    label: "{{'PRODUCT_MANAGEMENT.ROOT_BREADCRUMB' | translate}}"
                }
            })
        ;
    }
})();
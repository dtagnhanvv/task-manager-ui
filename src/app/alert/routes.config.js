(function () {
    'use strict';

    angular.module('biddy.alert')
        .config(addStates)
    ;

    function addStates(UserStateHelperProvider) {
        // uniqueRequestCacheBuster is used as a work-around for reloading only the postModel state
        // currently UI-Router will reload all parent states as well, this causes problems having

        UserStateHelperProvider
            .state('alert', {
                abstract: true,
                url: '/alert',
                ncyBreadcrumb: {
                    skip: true
                }
            })
        ;
    }
})();
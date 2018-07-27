(function () {
    'use strict';

    angular.module('biddy.userPreference')
        .config(addStates)
    ;

    function addStates(UserStateHelperProvider) {
        // uniqueRequestCacheBuster is used as a work-around for reloading only the postModel state
        // currently UI-Router will reload all parent states as well, this causes problems having

        UserStateHelperProvider
            .state('userPreference', {
                abstract: true,
                url: '/userPreference',
                ncyBreadcrumb: {
                    skip: true
                }
            })
            .state('userPreference.builder', {
                url: '/builder',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'UserPreferenceBuilder',
                        templateUrl: 'userPreference/userPreferenceBuilder.tpl.html'
                    }
                },
                resolve: {
                    account: function () {
                        return null
                    }

                },
                ncyBreadcrumb: {
                    label: "{{'USER_PREFERENCE.ADD' | translate}}"
                }
            })
            .state('userPreference.edit', {
                url: '/edit?id',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'UserPreferenceBuilder',
                        templateUrl: 'userPreference/userPreferenceBuilder.tpl.html'
                    }
                },
                resolve: {
                    account: function (UserPreferenceHelper, $stateParams) {
                        if (!!$stateParams.id) {
                            return UserPreferenceHelper.getAccount($stateParams.id);
                        }
                        return null;
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'USER_PREFERENCE.EDIT' | translate}}"
                }
            })
        ;
    }
})();
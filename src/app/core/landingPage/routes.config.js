(function () {
    'use strict';

    angular.module('biddy.core.landingPage')
        .config(function ($stateProvider) {
            $stateProvider
                .state('landingPage', {
                    url: '/',
                    templateUrl: 'core/landingPage/landingPage.tpl.html',
                    controller: 'LandingPage',
                    data: {
                        allowAnonymous: true
                    }
                })   
        })
    ;
})();

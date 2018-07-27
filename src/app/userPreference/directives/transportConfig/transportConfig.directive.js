(function () {
    'use strict';

    angular.module('biddy.userPreference')
        .directive('transportConfig', transportConfig)
    ;

    function transportConfig() {

        return {
            scope: {
                transportConfigData: '=',
                services: '=',
            },
            restrict: 'AE',
            templateUrl: 'userPreference/directives/transportConfig/transportConfig.tpl.html',
            controller: 'TransportConfigCtrl'
        };
    }
})();
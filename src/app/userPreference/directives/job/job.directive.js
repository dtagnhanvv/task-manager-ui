(function () {
    'use strict';

    angular.module('biddy.userPreference')
        .directive('experienceJobConfig', experienceJobConfig)
    ;

    function experienceJobConfig() {

        return {
            scope: {
                jobData: '=',

            },
            restrict: 'AE',
            templateUrl: 'userPreference/directives/job/job.tpl.html',
            controller: 'JobCtrl'
        };
    }
})();
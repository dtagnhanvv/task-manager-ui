(function () {
    'use strict';

    angular.module('biddy.blocks.errorPage')
        .controller('400ErrorController', function($translate, AlertService) {
            AlertService.replaceAlerts({
                type: 'error',
                message: $translate.instant('ERROR_PAGE.404')
            });
        })
    ;
})();
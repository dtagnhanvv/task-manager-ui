(function () {
    'use strict';

    angular.module('biddy.alert')
        .directive('bdAlertPopup', bdAlertPopup)
    ;

    function bdAlertPopup() {
        return {
            scope: {
            },
            restrict: 'AE',
            templateUrl: 'alert/directives/bdAlertPopup/bdAlertPopup.tpl.html',
            controller: 'BdAlertPopup'
        };
    }
})();
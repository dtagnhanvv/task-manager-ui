(function () {
    'use strict';

    angular.module('biddy.core.layout', [
        'ui.bootstrap',
        'ui.select'
    ])
        .config(function(uiSelectConfig) {
            uiSelectConfig.theme = 'bootstrap';
        })
    ;
})();
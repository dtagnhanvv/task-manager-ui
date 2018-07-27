(function () {
    'use strict';

    var core = angular.module('biddy.core', [
        'ui.router',

        // angular modules

        'ngAnimate',
        'ngSanitize',
        'pascalprecht.translate',
        // cached templates

        'templates-app',
        'templates-common',

        // biddy modules

        'biddy.blocks.alerts',
        'biddy.blocks.serverError',
        'biddy.blocks.errorPage',
        'biddy.blocks.misc',
        'biddy.blocks.event',
        'biddy.blocks.export',
        'biddy.blocks.searchBox',
        'biddy.blocks.queryBuilder',
        'biddy.blocks.atSortableQuery',
        'biddy.blocks.confirmClick',
        'biddy.blocks.pagination',
        'biddy.blocks.bdImageUploader',

        'biddy.core.bootstrap',
        'biddy.core.auth',
        'biddy.core.router',
        'biddy.core.layout',
        'biddy.core.widgets',
        'biddy.core.data',
        'biddy.core.login',
        'biddy.core.util',
        'biddy.core.resetPassword',
        'biddy.core.landingPage',
        'biddy.core.userRegister',
        'biddy.core.historyStorage',
        'biddy.core.cache',
        'biddy.core.language',
        'biddy.core.sideBar',

        // 3rd party modules

        'httpi',
        'underscore',
        'restangular',
        'angular-loading-bar',
        'ui.bootstrap',
        'ui.select',
        'highcharts-ng',
        'angular-table',
        'currencyFilter',
        'xeditable',
        'ui.codemirror',
        'hljs',
        'ngClipboard',
        'angularjs-dropdown-multiselect',
        'isteven-multi-select',
        'angular-cache',
        'oi.select',
        'infinite-scroll',
        'angularFileUpload',
        'ui.bootstrap-slider',
        'froala',
        'awesome-rating',
        'angularMoment',
        'daterangepicker',
        'ngMap',
        'perfect_scrollbar',
        'ui-notification',
        'swangular'
    ]);

    core.run(appRun);

    function appRun(Auth, EXISTING_SESSION) {
        // EXISTING_SESSION set by deferred angular bootstrap
        if (EXISTING_SESSION) {
            Auth.initSession(EXISTING_SESSION);
        }
    }
})();
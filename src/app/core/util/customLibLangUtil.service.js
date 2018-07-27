(function () {
    'use strict';

    angular.module('biddy.core.util')
        .factory('customLibLangUtil', customLibLangUtil)
    ;

    function customLibLangUtil($translate) {
        return {
            getTranslateLanguageMultipleSelect: getTranslateLanguageMultipleSelect
        };

        //config vietnam language for multi select
        function getTranslateLanguageMultipleSelect() {
            return {
                selectAll: $translate.instant('MULTI_SELECT.TICK_ALL'),
                selectNone: $translate.instant('MULTI_SELECT.TICK_NONE'),
                reset: $translate.instant('MULTI_SELECT.UNDO_ALL'),
                search: $translate.instant('MULTI_SELECT.TYPE_TO_SEARCH'),
                nothingSelected: $translate.instant('MULTI_SELECT.NOTHING_SELECTED'),
            };
        }

    }
})();
(function () {
    'use strict';

    angular.module('biddy.core.util')
        .factory('calendarUtil', calendarUtil)
    ;

    function calendarUtil($translate, DEFAULT_CALENDAR_DATETIME_FORMAT) {
        return {
            getLocaleConfig: getLocaleConfig,
            concatStartDateEndDate: concatStartDateEndDate
        };

        function concatStartDateEndDate(startDate, endDate, separation) {
            return startDate + separation + endDate;
        }
        function getLocaleConfig(format) {
            format = format || DEFAULT_CALENDAR_DATETIME_FORMAT;
            return {
                format: format,
                separator: '-',
                applyLabel: $translate.instant('CALENDAR.applyLabel'),
                cancelLabel: $translate.instant('CALENDAR.cancelLabel'),
                fromLabel: $translate.instant('CALENDAR.fromLabel'),
                toLabel: $translate.instant('CALENDAR.toLabel'),
                customRangeLabel: $translate.instant('CALENDAR.customRangeLabel'),
                weekLabel: $translate.instant('CALENDAR.weekLabel'),
                daysOfWeek: [
                    $translate.instant('CALENDAR.Su'),
                    $translate.instant('CALENDAR.Mo'),
                    $translate.instant('CALENDAR.Tu'),
                    $translate.instant('CALENDAR.We'),
                    $translate.instant('CALENDAR.Th'),
                    $translate.instant('CALENDAR.Fr'),
                    $translate.instant('CALENDAR.Sa'),
                ],
                monthNames: [
                    $translate.instant('CALENDAR.January'),
                    $translate.instant('CALENDAR.February'),
                    $translate.instant('CALENDAR.March'),
                    $translate.instant('CALENDAR.April'),
                    $translate.instant('CALENDAR.May'),
                    $translate.instant('CALENDAR.June'),
                    $translate.instant('CALENDAR.July'),
                    $translate.instant('CALENDAR.August'),
                    $translate.instant('CALENDAR.September'),
                    $translate.instant('CALENDAR.October'),
                    $translate.instant('CALENDAR.November'),
                    $translate.instant('CALENDAR.December')
                ],
                firstDay: 1
            }
        }
    }
})();
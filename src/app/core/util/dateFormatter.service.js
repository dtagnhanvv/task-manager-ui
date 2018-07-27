(function () {
    'use strict';

    angular.module('biddy.core.util')
        .factory('DateFormatter', DateFormatter)
    ;

    function DateFormatter(DEFAULT_CALENDAR_FORMAT, DEFAULT_CALENDAR_DATETIME_FORMAT, $translate, $filter, DEFAULT_DATE_FORMAT) {
        return {
            getTimePeriodSinceCreated: getTimePeriodSinceCreated,
            getDate: getDate,
            getDateTimeObject: getDateTimeObject,
            getFormattedDate: getFormattedDate,
            getDateTimeString: getDateTimeString,
            isValidDate: isValidDate,
            isValidDateRange: isValidDateRange,

        };

        function getDate(date) {
            if (moment.isMoment(date)) {
                return date;
            }

            if (date instanceof Date) {
                return moment(date);
            }

            if (angular.isString(date)) {
                date = moment(date, DEFAULT_CALENDAR_FORMAT, true);

                if (date.isValid()) {
                    return date;
                }
            }

            return false;
        }

        function getDateTimeObject(date) {
            if (angular.isString(date)) {
                date = moment(date, DEFAULT_CALENDAR_DATETIME_FORMAT);
                if (date.isValid()) {
                    return date;
                }
            }
            return null;
        }

        function getFormattedDate(date, format) {
            date = this.getDate(date);

            if (date === false) {
                return null;
            }

            format = format || DEFAULT_CALENDAR_FORMAT;

            return date.format(format);
        }

        function getDateTimeString(date, format) {
            var switchDate = this.getDate(date);
            if (switchDate === false) {
                return date.startDate._i;
            }

            format = format || DEFAULT_CALENDAR_DATETIME_FORMAT;

            return switchDate.format(format);
        }

        function isValidDate(date) {
            return moment.isMoment(date) && date.isValid();
        }

        function isValidDateRange(startDate, endDate) {
            startDate = this.getDate(startDate);
            endDate = this.getDate(endDate);

            if (!this.isValidDate(startDate) || !this.isValidDate(endDate)) {
                return false;
            }

            return startDate.isBefore(endDate) || startDate.isSame(endDate);
        }

        /**
         *
         * @param datepart
         * @param fromdate
         * @param todate
         * @returns {number}
         */
        function dateDiff(datepart, fromdate, todate) {
            datepart = datepart.toLowerCase();
            var diff = todate - fromdate;
            // date part: 'y', 'm', 'w', 'd', 'h', 'n', 's'
            var divideBy = {
                w: 604800000,
                d: 86400000,
                h: 3600000,
                n: 60000,
                s: 1000
            };

            return Math.floor(diff / divideBy[datepart]);
        }

        function getTimePeriodSinceCreated(createdDateTime) {
            var nowObject = new Date();
            var now = nowObject.getTime();

            var createdDateTimeObject = new Date(createdDateTime);
            var createdTime = createdDateTimeObject.getTime();

            var days = dateDiff('d', createdTime, now);
            if (days > 1 || days < 0) {
                return $filter('date')(createdDateTime, DEFAULT_DATE_FORMAT);
            }
            var hours = dateDiff('h', createdTime, now);
            if (hours > 23) {
                return $filter('date')(createdDateTime, DEFAULT_DATE_FORMAT);
            }
            if (hours > 1) {
                return hours + $translate.instant('REACTION_DETAIL.HOURS');
            }

            var minutes = dateDiff('n', createdTime, now);
            if (minutes > 1) {
                return minutes + $translate.instant('REACTION_DETAIL.MINUTES');
            }

            var seconds = dateDiff('s', createdTime, now);

            return seconds + $translate.instant('REACTION_DETAIL.SECONDS');
        }
    }
})();
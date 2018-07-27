(function () {
    'use strict';

    angular.module('biddy.core.util')
        .factory('BdProductUtil', BdProductUtil)
    ;

    function BdProductUtil(REACTION_TYPE, DEFAULT_DATE_FORMAT, $filter, $translate) {
        return {
            groupReaction: groupReaction,
            getIconByReactionType: getIconByReactionType,
            getTimePeriodSinceCreated: getTimePeriodSinceCreated
        };

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

            var days = dateDiff('d',createdTime , now);
            if (days > 1 || days < 0) {
                return $filter('date')(createdDateTime, DEFAULT_DATE_FORMAT);
            }
            var hours = dateDiff('h', createdTime, now);
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

        function getIconByReactionType(type) {
            if (type === REACTION_TYPE.LIKE) {
                return 'reaction-like';
            }
            if (type === REACTION_TYPE.ANGRY) {
                return 'reaction-angry';
            }
            if (type === REACTION_TYPE.LOVE) {
                return 'reaction-heart';
            }
            if (type === REACTION_TYPE.WOW) {
                return 'reaction-wow';
            }
            if (type === REACTION_TYPE.HAHA) {
                return 'reaction-haha';
            }
            if (type === REACTION_TYPE.SAD) {
                return 'reaction-sad';
            }
            if (type === REACTION_TYPE.TOTAL) {
                return $translate.instant('REACTION_DETAIL.ALL');
            }
            return '';
        }

        function groupReaction(comment) {
            var reactions = comment ? comment.reactions : [];
            if (!reactions || reactions.length === 0) {
                return {};
            }
            var groupedReactions = {};
            angular.forEach(reactions, function (reaction) {
                if (reaction.emotion) {
                    if (!groupedReactions[reaction.emotion]) {
                        groupedReactions[reaction.emotion] = {};
                    }
                    if (!groupedReactions[reaction.emotion].detail) {
                        groupedReactions[reaction.emotion].detail = [];
                    }
                    groupedReactions[reaction.emotion].detail.push(reaction);

                    // Update count
                    groupedReactions[reaction.emotion].count = groupedReactions[reaction.emotion].detail.length;
                }
            });

            groupedReactions.total = {
                count: reactions.length,
                detail: reactions
            };

            return groupedReactions;
        }
    }
})();
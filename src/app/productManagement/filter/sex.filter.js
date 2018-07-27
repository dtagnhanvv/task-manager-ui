(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .filter('sex', sex)
    ;

    function sex($translate) {
        return function (gender) {
            switch (gender) {
                case 'male':
                    return $translate.instant('SEX.MALE');
                case 'female':
                    return $translate.instant('SEX.FEMALE');
                case 'both':
                    return $translate.instant('SEX.BOTH');
                default:
                    return '';
            }
        };
    }
})();
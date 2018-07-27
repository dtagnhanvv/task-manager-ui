(function () {
    'use strict';

    angular
        .module('biddy.reaction')
        .constant('RATING_OPTION', {
            values: [1, 2, 3, 4, 5],
            cssBase: "rating-star fa fa-2x"
        })
        .constant('RATING_OPTION_SMALL', {
            values: [1, 2, 3, 4, 5],
            cssBase: "rating-star fa",
            readonly: true
        })
    ;
})();
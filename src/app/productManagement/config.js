(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .constant('REACTION_TYPE', {
            LIKE: 'like',
            WOW: 'wow',
            LOVE: 'love',
            ANGRY: 'angry',
            HAHA: 'haha',
            SAD: 'sad',
            TOTAL: 'total'
        })
        .constant('PRODUCT_TYPES', {
            FREELANCE: 'freelancer',
            PROFESSIONAL: 'professional',
            GENERAL: 'product'
        })
        .constant('REACTION_SOURCE', {
            'COMMENT': 'comment',
            'POST': 'product'
        })

        .constant('SEX', [
            {label: 'SEX.BOTH', value: 'both'},
            {label: 'SEX.MALE', value: 'male'},
            {label: 'SEX.FEMALE', value: 'female'}

        ])
        .constant('AGE_RANGE', [
            {label: 'FREELANCE.AGE_RANGE.ANY', value: 'any'},
            {label: 'FREELANCE.AGE_RANGE.1825', value: '18-25'},
            {label: 'FREELANCE.AGE_RANGE.2535', value: '25-35'},
            {label: 'FREELANCE.AGE_RANGE.3540', value: '35-40'},
            {label: 'FREELANCE.AGE_RANGE.40', value: '40-'}
        ])
})();

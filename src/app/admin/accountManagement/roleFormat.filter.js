(function () {
    'use strict';

    angular
        .module('biddy.admin.accountManagement')
        .filter('roleFormat', roleFormat)
    ;

    function roleFormat() {
        return function (text) {
            text = text.toUpperCase();
            text = text.replace(/^(ROLE|FEATURE)_/, '');
            text = text.replace(/_/g, ' ');
            return text;
        };
    }
})();
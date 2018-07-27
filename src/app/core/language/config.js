(function () {
    'use strict';

    angular.module('biddy.core.language')
        .config(configTranslate);

    function configTranslate($translateProvider, LOCALE_EN, LOCALE_VI) {
        $translateProvider
            .translations('en', LOCALE_EN)
        ;

        $translateProvider
            .translations('vi', LOCALE_VI)
        ;

        $translateProvider
            .preferredLanguage('vi')
            .useSanitizeValueStrategy('escaped');
    }
})();
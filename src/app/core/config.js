(function () {
    'use strict';
    angular.module('biddy.core')
        .constant('APP_NAME', 'Biddy')
        .constant('ENTRY_STATE', 'login')
        .constant('EVENT_SEARCH_AGAIN', 'eventSearchAgain')
        .constant('ITEMS_PER_PAGE', [
            10, 25, 50, 100
        ])
        .constant('DEFAULT_DATE_FORMAT', 'dd-MM-yyyy')
        .constant('DEFAULT_DATETIME_FORMAT', 'dd-MM-yyyy HH:mm:ss')
        .constant('DEFAULT_CALENDAR_FORMAT', 'DD/MM/YYYY')
        // .constant('DEFAULT_CALENDAR_DATETIME_FORMAT', 'DD/MM/YYYY HH:mm:ss')
        .constant('DEFAULT_CALENDAR_DATETIME_FORMAT', 'YYYY-MM-DD HH:mm:ss')
        .constant('ASC', 'asc')
        .constant('DESC', 'desc')
        .constant('FILE_SERVER', 'http://api.biddy.test/app_dev.php/api/public/v1/uploads/uploads')
        .value('froalaConfig', {
            toolbarInline: false,
            placeholderText: 'Bạn muốn chia sẻ gì?',
            language: 'vi',
            toolbarButtons : ["emoticons", "insertImage","insertVideo", "insertLink", "insertTable", "fontSize"],
            quickInsertButtons: [],
            emoticonsUseImage: true,
            charCounterCount: false,
            imageUploadURL: 'http://api.biddy.test/app_dev.php/api/public/v1/uploads/uploads',
            requestWithCORS: true

        })
        .constant('PROFILE_DEFAULT', 'assets/images/anonymous.gif')
        .constant('TIMEOUT_SHORT', 1000)
        .constant('TIMEOUT_LONG', 3000)
        .config(function(NotificationProvider) {
            NotificationProvider.setOptions({
                delay: 10000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: 'right',
                positionY: 'top'
            });
        })
        .config(config)
        .provider('API_PUBLIC_BASE_URL', {
            $get: function(API_END_POINT) {
                return API_END_POINT + '/public/v1';
            }
        })
    ;

    function config($httpProvider, $provide, hljsServiceProvider, ngClipProvider) {
        $httpProvider.interceptors.push('authTokenInterceptor');
        $httpProvider.interceptors.push('responseErrorInterceptor');
        $httpProvider.interceptors.push('responseInterceptor');

        // config for highlight
        hljsServiceProvider.setOptions({
            // replace tab with 4 spaces
            tabReplace: '    '
        });

        // config for copy clipboard
        ngClipProvider.setPath("assets/swf/ZeroClipboard.swf");

        // this config to fix for filter currency
        $provide.decorator('$locale', ['$delegate', function ($delegate) {
            if ($delegate.id == 'en-us') {
                $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00A4';
                $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
            }
            return $delegate;
        }])
    }
})();
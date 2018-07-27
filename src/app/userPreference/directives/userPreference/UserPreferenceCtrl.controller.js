(function () {
    'use strict';

    angular.module('biddy.userPreference')
        .controller('UserPreferenceCtrl', UserPreferenceCtrl)
    ;

    function UserPreferenceCtrl($scope, $translate) {
        const SERVICE_OPTIONS = [
            {
                type: 'transport',
                label: $translate.instant('USER_PREFERENCE.TRANSPORT_SERVICE'),
                checked: false
            }, {
                type: 'buy_send',
                label: $translate.instant('USER_PREFERENCE.SELL_BUY_SERVICE'),
                checked: false
            },
            {
                type: 'non_experience',
                label: $translate.instant('USER_PREFERENCE.NON_EXPERIENCE_SERVICE'),
                checked: false
            },
            {
                type: 'experience',
                label: $translate.instant('USER_PREFERENCE.EXPERIENCE_SERVICE'),
                checked: false
            }
        ];

        var defaultUserPreference = {
            findServices: angular.copy(SERVICE_OPTIONS),
            provideServices: {
                services: angular.copy(SERVICE_OPTIONS),
                transportConfig: null,
                jobConfig: null
            }
        };
        _initFindService();

        $scope.userPreferenceData = $scope.userPreferenceData && $scope.userPreferenceData.findServices ?
            $scope.userPreferenceData : defaultUserPreference;

        $scope.isShowTransportConfig = isShowTransportConfig;
        $scope.isShowExperienceJob = isShowExperienceJob;


        function _initFindService() {
            angular.forEach(defaultUserPreference.findServices, function (service) {
                service.checked = true;
            })
        }

        function isShowExperienceJob() {
            if (!$scope.userPreferenceData.provideServices) return false;
            var found = $scope.userPreferenceData.provideServices.services.find(function (service) {
                return service.type === 'experience' && service.checked === true
            });
            return !!found;
        }

        function isShowTransportConfig() {
            if (!$scope.userPreferenceData.provideServices) return false;
            var found = $scope.userPreferenceData.provideServices.services.find(function (service) {
                return service.type === 'transport' && service.checked === true
            });
            return !!found;
        }
    }
})();
(function () {
    'use strict';

    angular.module('biddy.userPreference')
        .controller('TransportConfigCtrl', TransportConfigCtrl)
    ;

    function TransportConfigCtrl($scope, $translate, FILE_SERVER) {
        $scope.driverUploaderConfig = {
            uploadServer: FILE_SERVER,
            maxSize: 1, // MB
            maxQuantity: 1,
            eventName: 'DRIVER_AVATAR'
        };
        $scope.vehicleUploaderConfig = {
            uploadServer: FILE_SERVER,
            maxSize: 1, // MB
            maxQuantity: 1,
            eventName: 'VEHICLE_AVATAR'
        };


        $scope.VEHICLES = [
            {type: 'MOTOBIKE', label: $translate.instant('USER_PREFERENCE.MOTOBIKE'), checked: false},
            {type: '4_SEAT_CAR', label: $translate.instant('USER_PREFERENCE.4_SEAT_CAR'), checked: false},
            {type: '8_SEAT_CAR', label: $translate.instant('USER_PREFERENCE.8_SEAT_CAR'), checked: false},
            {type: '12_SEAT_CAR', label: $translate.instant('USER_PREFERENCE.12_SEAT_CAR'), checked: false},
            {type: '16_SEAT_CAR', label: $translate.instant('USER_PREFERENCE.16_SEAT_CAR'), checked: false},
            {type: '24_SEAT_CAR', label: $translate.instant('USER_PREFERENCE.24_SEAT_CAR'), checked: false},
            {type: '36_SEAT_CAR', label: $translate.instant('USER_PREFERENCE.36_SEAT_CAR'), checked: false},
            {type: '36+_SEAT_CAR', label: $translate.instant('USER_PREFERENCE.36+_SEAT_CAR'), checked: false},
        ];

        $scope.transportConfigData = $scope.transportConfigData ? $scope.transportConfigData : {
            vehicles: angular.copy($scope.VEHICLES),
            avatar: null,
            vehicleId: null,
            vehiclePhoto: null
        }

        $scope.updateVehicles = updateVehicles;

        function updateVehicles(item) {
            angular.forEach($scope.transportConfigData.vehicles, function (vehicle) {
                if (vehicle.label == item.label) {
                    vehicle.checked = true;
                } else {
                    vehicle.checked = false;
                }
            })
        }
    }
})();
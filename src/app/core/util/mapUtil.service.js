(function () {
    'use strict';

    angular.module('biddy.core.util')
        .factory('mapUtil', mapUtil)
    ;

    function mapUtil() {
        return {
            getUserLocation: getUserLocation
        };

        function getUserLocation(callback) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(callback, showError);
            }
        }

        function showError(error) {
            var message = '';
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    message = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    message = "The request to get user location timed out.";
                    break;
                case error.UNKNOWN_ERROR:
                    message = "An unknown error occurred.";
                    break;
            }
            console.warn(message);
        }
    }
})();
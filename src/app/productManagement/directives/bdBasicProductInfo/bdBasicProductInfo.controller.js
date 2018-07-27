(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .controller('BdBasicProductInfoCtrl', BdBasicProductInfoCtrl)
    ;

    function BdBasicProductInfoCtrl($scope, _, $stateParams, $translate, Auth, productManager, historyStorage, BUSINESS_SETTINGS,
                                    DEFAULT_DETAIL_EDITOR, tagManager, HISTORY_TYPE_PATH, adminUserManager, DateFormatter, NgMap) {


        // map
        $scope.mapConfig = {
            center: {lat: 21.028511, lng: 105.804817},
            zoom: 10,
            marker: {lat: 21.028511, lng: 105.804817}
        };
        var marker;
        NgMap.getMap().then(function (map) {
            $scope.map = map;
            marker = map.markers[0];

            var card = document.getElementById('pac-card');
            var input = document.getElementById('pac-input');
            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
            var autocomplete = new google.maps.places.Autocomplete(input);

            // Bind the map's bounds (viewport) property to the autocomplete object,
            // so that the autocomplete requests use the current map bounds for the
            // bounds option in the request.
            autocomplete.bindTo('bounds', map);

            autocomplete.addListener('place_changed', function () {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    // User entered the name of a Place that was not suggested and
                    // pressed the Enter key, or the Place Details request failed.
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);  // Why 17? Because it looks good.
                }
                marker.setPosition(place.geometry.location);
                $scope.mapConfig.marker.lat = place.geometry.location.lat();
                $scope.mapConfig.marker.lng = place.geometry.location.lng();
                upDatePosition(place.geometry.location.lat(), place.geometry.location.lng());
            });

        });

        // editor
        $scope.froalaOptions = {
            height: 300
        };
        const LIMIT_TAGS = 20;
        $scope.formData = {
            businessSettings: BUSINESS_SETTINGS,
        };

        $scope.basic = $scope.basic ? $scope.basic : {
            subject: null,
            summary: null,
            detail: DEFAULT_DETAIL_EDITOR,
            latitude: $scope.mapConfig.marker.lat,
            longitude: $scope.mapConfig.marker.lng,
            productTags: [],
            businessSetting: $scope.formData.businessSettings[0].value,
        };
        $scope.self = {
            isAdmin: Auth.isAdmin(),
            errorOccurred: false
        };
        // Functions
        $scope.isFormValid = isFormValid;
        $scope.getTags = getTags;
        // MAP
        $scope.onMapClick = onMapClick;

        _initForm();

        function upDatePosition(lat, lng) {
            $scope.basic.latitude = lat;
            $scope.basic.longitude = lng;
        }

        // MAP functions
        function onMapClick(event) {
            $scope.mapConfig.marker.lat = event.latLng.lat();
            $scope.mapConfig.marker.lng = event.latLng.lng();
            upDatePosition(event.latLng.lat(), event.latLng.lng());
        }

        function _initForm() {
            if (!$scope.isNew) {
                _extractFormDataFromApi($scope.basic);
            }
        }

        function _extractFormDataFromApi(basic) {
            $scope.basic.productTags = _getProductTagsOptionObject(basic.productTags);
            _extractLocationToMap($scope.basic.latitude, $scope.basic.longitude);
        }

        function _extractLocationToMap(latitude, longitude) {
            $scope.mapConfig.center.lat = latitude;
            $scope.mapConfig.center.lng = longitude;
            $scope.mapConfig.marker.lat = latitude;
            $scope.mapConfig.marker.lng = longitude;
        }

        /**
         * API return string value of some field
         * This function return ui-select option have value is string value return form api
         * @param options
         * @param apiValue
         * @param compareProperty
         * @returns {*}
         * @private
         */
        function _getSelectBoxOptionObject(options, apiValue, compareProperty) {
            if (!options) {
                return null;
            }
            var found = options.find(function (option) {
                return option[compareProperty] === apiValue;
            });
            if (found) {
                return found;
            }
            return null;
        }

        function _getProductTagsOptionObject(tags) {
            var tagOptions = [];
            angular.forEach(tags, function (tagData) {
                tagOptions.push(tagData.tag);
            });
            return tagOptions;
        }

        function getTags(query) {
            var params = {
                page: 1,
                orderBy: 'desc',
                sortField: 'createdDate',
                searchKey: query,
                limit: LIMIT_TAGS
            };
            return tagManager.one().get(params).then(function (tags) {
                return tags.records;
            });
        }

        function isFormValid() {
            return $scope.productForm.$valid;
        }
    }
})();
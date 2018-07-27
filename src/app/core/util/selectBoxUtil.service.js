(function () {
    'use strict';

    angular.module('biddy.core.util')
        .factory('SelectBoxUtil', SelectBoxUtil)
    ;

    function SelectBoxUtil() {


        return {
            getSelectBoxOptionObject: getSelectBoxOptionObject

        };

        /**
         * API return string value of some field
         * This function return ui-select option have value is string value return form api
         * @param options
         * @param apiValue
         * @param compareProperty
         * @returns {*}
         * @private
         */
        function getSelectBoxOptionObject(options, apiValue, compareProperty) {
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
    }
})();
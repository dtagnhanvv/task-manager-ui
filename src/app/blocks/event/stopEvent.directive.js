(function () {
    'use strict';

    angular.module('biddy.blocks.event')
        .directive('stopEvent', stopEvent)
    ;

    function stopEvent() {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind('click', function (e) {
                    e.stopPropagation();
                });
            }
        };
    }
})();
(function () {
    'use strict';

    angular.module('biddy.blocks.bdImageUploader')
        .directive('bdImageUploader', bdImageUploader)
    ;

    function bdImageUploader() {
        return {
            restrict: 'AE',
            templateUrl: 'blocks/bdImageUploader/bdImageUploader.tpl.html',
            scope: {
                options: '=',
                outputData: '='
            },
            controller: 'BdImageUploaderCtrl'
        };
    }
})();
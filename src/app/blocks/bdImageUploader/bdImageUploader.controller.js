(function () {
    'use strict';

    angular.module('biddy.blocks.bdImageUploader')
        .controller('BdImageUploaderCtrl', BdImageUploaderCtrl);

    function BdImageUploaderCtrl($scope, bdImageUploaderHelper) {
        var uploadConfig = {
            url: $scope.options.uploadServer,
            maxSize: $scope.options.maxSize || 1, // 1MB
            maxQuantity: $scope.options.maxQuantity || 3,
            eventName: $scope.options.eventName
        };
        $scope.uploader = bdImageUploaderHelper.buildPhotoUploader(uploadConfig);

        $scope.$on('IMAGE_ITEM_UPLOAD_DONE', _onImageItemUploadDone);

        function _onImageItemUploadDone(event, data) {
            console.log(data);
            if ($scope.options.eventName === data.eventName) {
                $scope.outputData = data.data.link;
            }
        }
    }
})();
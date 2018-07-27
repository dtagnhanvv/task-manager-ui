/**
 * @author khanda
 * created on 09.07.2018
 */
(function () {
    'use strict';

    angular.module('biddy.blocks.bdImageUploader')
        .factory('bdImageUploaderHelper', bdImageUploaderHelper);

    function bdImageUploaderHelper(FileUploader, swangular, $rootScope) {
        return {
            buildPhotoUploader: buildPhotoUploader
        };

        function buildPhotoUploader(options) {
            var userOptions = options || {};
            var uploadConfig = {
                url: userOptions.url || 'http://localhost:8080/fileupload',
                maxSize: userOptions.maxSize || 1, // 1MB
                maxQuantity: userOptions.maxQuantity || 3
            };

            var uploader = new FileUploader({
                url: uploadConfig.url,
                autoUpload: true,
                removeAfterUpload: true,
                queueLimit: uploadConfig.maxQuantity
            });

            // FILTERS

            uploader.filters.push(_buildExtensionFilter());
            uploader.filters.push(_buildSizeFilter(uploadConfig.maxSize));

            function _buildExtensionFilter(validExtension, filterName, errorMessage) {
                var VALID_EXTENSIONS = validExtension || '|jpg|png|jpeg|bmp|gif|';
                var ERROR_MESSAGE = errorMessage || 'File type not allow';
                var FILTER_NAME = filterName || 'extensionFilter';
                return {
                    name: FILTER_NAME,
                    message: ERROR_MESSAGE,
                    fn: function (item /*{File|FileLikeObject}*/, options) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        return VALID_EXTENSIONS.indexOf(type) !== -1;
                    }
                }
            }

            function _buildSizeFilter(maxSize, filterName, errorMessage) {
                var DEFAULT_MAX_SIZE = 1;
                var MAX_SIZE = maxSize && Number(maxSize) && Number(maxSize) > 0 ? Number(maxSize) * 1024 * 1024 : DEFAULT_MAX_SIZE * 1024 * 1024;
                var FILTER_NAME = filterName || 'sizeFilter';
                var ERROR_MESSAGE = errorMessage || 'file too big';
                return {
                    name: FILTER_NAME,
                    message: ERROR_MESSAGE,
                    fn: function (item /*{File|FileLikeObject}*/, options) {
                        return !(item && item.size && item.size > MAX_SIZE);
                    }
                }
            }

            // CALLBACKS

            uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
                var message = filter.message || filter.name;
                swangular.swal({
                    text: message
                });
            };
            uploader.onAfterAddingFile = function (fileItem) {
            };
            uploader.onAfterAddingAll = function (addedFileItems) {
            };
            uploader.onBeforeUploadItem = function (item) {
            };
            uploader.onProgressItem = function (fileItem, progress) {
            };
            uploader.onProgressAll = function (progress) {
            };
            uploader.onSuccessItem = function (fileItem, response, status, headers) {
            };
            uploader.onErrorItem = function (fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
                swangular.swal({
                    title: 'Đã xảy ra lỗi',
                    text: 'Không thể tải ảnh lên'
                });
            };
            uploader.onCompleteItem = function (fileItem, response, status, headers) {
                $rootScope.$broadcast('IMAGE_ITEM_UPLOAD_DONE', {
                    eventName: options.eventName,
                    data: response
                })
            };
            uploader.onCompleteAll = function () {
                console.info('onCompleteAll');

            };

            return uploader;
        }
    }

})();

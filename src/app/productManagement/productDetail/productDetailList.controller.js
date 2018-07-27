(function () {
    'use strict';

    angular.module('biddy.productManagement.productDetail')
        .controller('ProductDetailList', ProductDetailList);

    function ProductDetailList($scope, $stateParams, $modal, $translate, commentPosts, MODES, ITEMS_PER_PAGE,
                               productManager, product, auction, commentManager, AtSortableService, historyStorage, HISTORY_TYPE_PATH,
                               EVENT_ACTION_SORTABLE, VALIDATION_TIME, BUSINESS_SETTINGS, REACTION_SOURCE, currentUser) {
        $scope.watchManager = {
            commentDeleted: -1, // Id of comment that is deleted
            childCommentDeleted: -1, // Id of comment that is deleted
            commentAdded: 0, //default is 0 for unexpected change. when new comment added use 1 & 2
            childCommentAdded: false
        };
        $scope.formProcessing = false;
        $scope.product = product;
        $scope.auction = auction;
        $scope.itemsPerPageList = ITEMS_PER_PAGE;
        $scope.tableConfig = {
            itemsPerPage: 10,
            maxPages: 10,
            totalItems: Number(commentPosts.totalRecord)
        };
        $scope.pagingOptions = {
            currentPage: 1,
            pageSize: 10
        };
        $scope.self = {
            commentPosts: commentPosts,
            allowNextPage: true,
            countComment: commentPosts.results.length,
            currentUser: currentUser
        };
        var stateParams = $stateParams;
        var getDataSet;

        $scope.reactionData = {
            type: REACTION_SOURCE['POST'],
            emotions: $scope.product.reactions.emotion,
            total: $scope.product.reactions.total,
            sourceId: $scope.product.id,
            rating: $scope.product.rating
        };

        $scope.showPagination = showPagination;
        $scope.searchData = searchData;
        $scope.changePage = changePage;
        $scope.onItemPerPageChange = onItemPerPageChange;
        $scope.hasData = hasData;
        $scope.getValidationTimeTranslatedLabel = getValidationTimeTranslatedLabel;
        $scope.getBusinessSettingTranslatedLabel = getBusinessSettingTranslatedLabel;
        $scope.getModeTranslatedLabel = getModeTranslatedLabel;
        $scope.nextPage = nextPage;
        $scope.previousPage = previousPage;
        $scope.isShowPrevious = isShowPrevious;
        $scope.isShowNext = isShowNext;

        _init();

        $scope.$watch('watchManager.commentDeleted', _onSuccessfulDeletingComment);
        $scope.$on('newCommentAdded', _onSuccessfulAddComment);

        function _onSuccessfulDeletingComment(commentId) {
            var clonedCommentList = angular.copy($scope.self.commentPosts.results);
            $scope.self.commentPosts.results = clonedCommentList.filter(function (comment) {
                return comment.id !== commentId
            });
            $scope.tableConfig.totalItems = $scope.tableConfig.totalItems - 1;
        }

        function _onSuccessfulAddComment(event, data) {
            _getComments(stateParams, 500, false, data);
        }

        function _resetPageToFirst() {
            stateParams.page = 1;
            AtSortableService.insertParamForUrl(stateParams);
        }

        function _init() {
            _resetPageToFirst();
            _updateAllowNextPage();
        }

        function getModeTranslatedLabel(value) {
            return getTranslatedLabelFromString(value, MODES);
        }

        function getBusinessSettingTranslatedLabel(value) {
            return getTranslatedLabelFromString(value, BUSINESS_SETTINGS);
        }

        function getValidationTimeTranslatedLabel(value) {
            return getTranslatedLabelFromString(value, VALIDATION_TIME);
        }

        function getTranslatedLabelFromString(value, options) {
            var found = options.find(function (option) {
                return option.value === value;
            });
            if (found) {
                return found.label;
            }
            return '';
        }

        function hasData() {
            return $scope.self.commentPosts && $scope.self.commentPosts.records && $scope.self.commentPosts.records.length > 0;
        }


        function showPagination() {
            return $scope.self.commentPosts.totalRecord > $scope.tableConfig.itemsPerPage;
        }

        $scope.$on('$locationChangeSuccess', function () {
            historyStorage.setParamsHistoryCurrent(HISTORY_TYPE_PATH.productDetail)
        });

        function searchData() {
            var query = {searchKey: $scope.selectData.query || ''};
            stateParams = angular.extend(stateParams, query);
            _getComments(stateParams, 500);
        }

        $scope.$on(EVENT_ACTION_SORTABLE, function (event, query) {
            stateParams = angular.extend(stateParams, query);
            _getComments(stateParams, 500, true);
        });

        function changePage(currentPage) {
            stateParams = angular.extend(stateParams, {page: currentPage});
            _getComments(stateParams, 500, true);
        }

        function isShowPrevious() {
            return $scope.pagingOptions.currentPage && Number($scope.pagingOptions.currentPage) > 1;
        }

        function isShowNext() {
            return $scope.self.commentPosts.results && $scope.self.commentPosts.results.length > 0 && $scope.self.allowNextPage;
        }

        function nextPage() {
            if ($scope.formProcessing === true) {
                return;
            } else {
                $scope.formProcessing = true;
            }
            if ($scope.pagingOptions.currentPage) {
                $scope.pagingOptions.currentPage = Number($scope.pagingOptions.currentPage) + 1;
            } else {
                $scope.pagingOptions.currentPage = 1;
            }

            stateParams = angular.extend(stateParams, {page: $scope.pagingOptions.currentPage});
            _getComments(stateParams, 500, true);
        }

        function previousPage() {
            if ($scope.formProcessing === true) {
                return;
            } else {
                $scope.formProcessing = true;
            }
            if ($scope.pagingOptions.currentPage) {
                $scope.pagingOptions.currentPage = Number($scope.pagingOptions.currentPage) - 1;
            } else {
                $scope.pagingOptions.currentPage = 1;
            }

            stateParams = angular.extend(stateParams, {page: $scope.pagingOptions.currentPage});
            _getComments(stateParams, 500, true);
        }

        function onItemPerPageChange() {
            $scope.pagingOptions.currentPage = 1;
            stateParams = angular.extend(stateParams, {limit: $scope.tableConfig.itemsPerPage, page: 1});
            _getComments(stateParams, 500, true);
        }

        function _updateAllowNextPage() {
            if ($scope.self.commentPosts.results.length < 10) {
                $scope.self.allowNextPage = false;
                return;
            }
            if ($scope.self.commentPosts.results.length > 10 && $scope.self.commentPosts.results.length == $scope.self.countComment) {
                $scope.self.allowNextPage = false;
            }
        }

        function _showListChildCommentDefault(eventData) {
            if (!eventData || !eventData.commentId) return;

            var commentId = eventData.commentId;
            var found = $scope.self.commentPosts.results.find(function (comment) {
                return comment.id === commentId;
            });
            if (found) {
                found.isShowChild = true;
            }
        }

        function _getComments(query, ms, needConcat, eventData) {
            clearTimeout(getDataSet);
            getDataSet = setTimeout(function () {
                stateParams = query;
                var postId = $stateParams.productId;
                $scope.formProcessing = true;
                return productManager.one(postId).one('comments').get(query)
                    .then(function (comments) {
                        AtSortableService.insertParamForUrl(query);
                        if (needConcat) {
                            $scope.self.commentPosts.results = $scope.self.commentPosts.results.concat(comments.results);
                        } else {
                            $scope.self.commentPosts.results = comments.results;
                        }
                        $scope.tableConfig.totalItems = Number(comments.count);
                        $scope.pagingOptions.currentPage = Number(query.page);
                        $scope.self.countComment = comments.count;
                        _updateAllowNextPage();
                        _showListChildCommentDefault(eventData);
                        $scope.formProcessing = false;
                    }, function (err) {
                        $scope.formProcessing = false;
                    });
            }, ms || 0);
        }

    }
})();
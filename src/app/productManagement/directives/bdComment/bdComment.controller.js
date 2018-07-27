(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .controller('BdComment', BdComment)
    ;

    function BdComment($scope, $stateParams, $timeout, commentManager, BdProductUtil, $modal, REACTION_SOURCE, Notification, sessionStorage, Auth) {
        $scope.froalaOptions = {
            // toolbarInline: true,
            charCounterCount: false,
            toolbarBottom: true,
            toolbarVisibleWithoutSelection: true,
            toolbarButtons: ["emoticons", "insertImage", "insertVideo", "insertLink", "fontSize"]
        };

        $scope.initialize = function (initControls) {
            $scope.initControls = initControls;
            $scope.initControls.initialize();
            $timeout(function () {
                $scope.initControls.destroy();
            }, 1);
        };

        $scope.reactionData = {
            type: REACTION_SOURCE['COMMENT'],
            emotions: $scope.comment.reactions.emotion,
            total: $scope.comment.reactions.total,
            sourceId: $scope.comment.id,
            timePeriodSinceCreated: getTimePeriodSinceCreated()
        };

        $scope.self = {
            groupedReactions: BdProductUtil.groupReaction($scope.comment),
            allowNextPage: true,
            countChildComment: $scope.comment.childComments.length,
            isEditMode: false,
            currentUser: {
                username: sessionStorage.getUsername()
            },
            isAdmin: Auth.isAdmin()
        };
        $scope.clonedComment = null;

        $scope.updateComment = updateComment;
        $scope.confirmDeletion = confirmDeletion;
        $scope.loadMoreComment = loadMoreComment;
        $scope.showComment = showComment;
        $scope.hideComment = hideComment;
        $scope.toggleEditorMode = toggleEditorMode;
        $scope.allowEdit = allowEdit;
        $scope.showMenuDropdown = showMenuDropdown;

        $scope.$watch('watchManager.childCommentDeleted', _onSuccessfulDeleteChildComment);

        _init();

        function _init() {
            _updateClonedCommentContent();
            _updateAllowLoadMore();
        }


        function showMenuDropdown(comment) {
            return $scope.self.currentUser.username === comment.author.username || $scope.self.isAdmin;
        }

        function allowEdit(comment) {
            return $scope.self.currentUser.username === comment.author.username;
        }

        function _onSuccessfulDeleteChildComment(commendId) {
            if (!commendId || commendId === -1) return;

            if (!$scope.parent) return;

            var children = $scope.parent.childComments;

            var index = children.findIndex(function (comment) {
                return comment.id === commendId;
            });
            if (index >= 0) {
                children.splice(index, 1);
            }
        }

        /**
         * Toggle edit and view mode
         * @param mode
         */
        function toggleEditorMode(mode) {
            $scope.self.isEditMode = mode;
            if (mode) {
                $scope.initControls.initialize();
            } else {
                $scope.initControls.destroy();
            }
        }

        function _updateNextPage() {
            if (!$scope.comment.nextPage) {
                $scope.comment.nextPage = 1;
            } else {
                $scope.comment.nextPage += 1;
            }
        }

        function loadMoreComment() {
            var commentId = $scope.comment.id;
            $scope.formProcessing = true;
            var param = {
                page: $scope.comment.nextPage,
                limit: $scope.comment.nextLimit
            };

            return commentManager.one(commentId).one('childrens').get(param)
                .then(function (comments) {
                    $scope.comment.childComments = $scope.comment.childComments.concat(comments.results);
                    $scope.self.countChildComment = comments.count;
                    _updateAllowLoadMore();
                    $scope.formProcessing = false;

                    _updateNextPage();
                }, function (err) {
                    $scope.formProcessing = false;
                });

        }

        function _updateAllowLoadMore() {
            if ($scope.comment.childComments.length < 10) {
                $scope.self.allowNextPage = false;
                return;
            }
            if ($scope.comment.childComments.length > 10 && $scope.comment.childComments.length == $scope.self.countChildComment) {
                $scope.self.allowNextPage = false;
            }
        }

        function hideComment() {
            $scope.comment.isShowChild = false;
        }

        function showComment() {
            $scope.comment.isShowChild = true;
        }


        function getTimePeriodSinceCreated() {
            return BdProductUtil.getTimePeriodSinceCreated($scope.comment.createdDate);
        }

        function _concatUserToComment(comment) {
            var content = '<strong class="bd-comment-content-username">' + comment.author.username + '</strong> ' + comment.content;
            var clonedComment = angular.copy(comment);
            clonedComment.content = content;

            return clonedComment;
        }

        function _updateClonedCommentContent() {
            $scope.clonedComment = _concatUserToComment($scope.comment);
        }

        function updateComment(comment) {
            //Back to view mode
            $scope.toggleEditorMode(false);

            var apiData = _buildApiParameter(comment);
            var postSave = commentManager.one(apiData.id).patch(apiData);
            postSave
                .then(function () {
                    comment.isEditMode = !comment.isEditMode;
                    _updateClonedCommentContent();
                })
                .catch(function (response) {
                    $scope.self.formProcessing = false;
                    var message = response.data.message;
                    if (!message) {
                        message = _setMessageForSave(response);
                    }
                    Notification.error({message: message});
                    comment.isEditMode = !comment.isEditMode;
                });
        }

        function _buildApiParameter(model) {
            return {
                id: model.id,
                content: model.content,
                contentType: model.contentType
            };
        }

        function _setMessageForSave(response) {
            if (response.status == 500) {
                return $scope.self.isNew ? $translate.instant('COMMENT_POST.ADD_FAIL') : $translate.instant('COMMENT_POST.SAVE_FAIL')
            } else {
                return response.data.message
            }
        }

        function _notifyCommentDeleting(commentId) {
            if ($scope.isChild) {
                $scope.watchManager.childCommentDeleted = commentId;
            } else {
                $scope.watchManager.commentDeleted = commentId;
            }
        }

        function confirmDeletion(auto, index) {
            var modalInstance = $modal.open({
                templateUrl: 'productManagement/confirmDeletion.tpl.html'
            });

            modalInstance.result.then(function () {
                return commentManager.one(auto.id).remove()
                    .then(
                        function () {
                            _notifyCommentDeleting($scope.comment.id);
                            Notification.success({message: $translate.instant('COMMENT_POST.DELETE_SUCCESS')});
                        },
                        function (response) {
                            if (!!response && !!response.data && !!response.data.message) {
                                Notification.error({message: response.data.message});
                            }
                        }
                    );
            });
        }

    }
})();
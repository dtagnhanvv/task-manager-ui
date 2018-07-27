(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .controller('BdReaction', BdReaction)
    ;

    function BdReaction($scope, $timeout, $modal, $translate, REACTION_TYPE, BdProductUtil, reactionManager, Auth, sessionStorage,
                        REACTION_SOURCE, commentManager) {
        $scope.showPopup = false;
        $scope.left = 0;
        $scope.top = 0;
        $scope.reactionType = REACTION_TYPE;

        $scope.self = {
            isAdmin: Auth.isAdmin(),
            isShowCommentEditor: false,
            newComment: {
                content: ''
            },
            avatarUrl: sessionStorage.getAvatarUrl()
        };

        $scope.froalaOptions = {
            // toolbarInline: true,
            toolbarBottom: true,
            charCounterCount: false,
            toolbarVisibleWithoutSelection: true,
            placeholderText: $translate.instant('REACTION_DETAIL.DO_COMMENT')
        };

        $scope.hasData = hasData;
        $scope.showDetail = showDetail;
        $scope.getIconByReactionType = BdProductUtil.getIconByReactionType;
        $scope.clickReaction = clickReaction;
        $scope.clickReply = clickReply;
        $scope.onClickRating = onClickRating;
        $scope.clickLike = clickLike;
        $scope.getStyle = getStyle;
        $scope.leavePopup = leavePopup;
        $scope.submitComment = submitComment;
        $scope.cancelAddingComment = cancelAddingComment;
        //FROALA EDITOR
        $scope.initialize = initialize;

        function initialize(initControls) {
            $scope.initControls = initControls;
            $scope.floalaEditor = {
                deleteAll: function () {
                    initControls.getEditor()('html.set', '');
                }
            }
        }

        function onClickRating() {
            $modal.open({
                templateUrl: 'productManagement/directives/bdReaction/bdRatingPopup/bdRatingPopup.tpl.html',
                controller: 'BdRatingPopup',
                size: 'md',
                resolve: {
                    postId: function () {
                        return $scope.reactionsData.sourceId;
                    },
                    rateModel: function (productRatingManager) {
                        var params = {
                            product: $scope.reactionsData.sourceId
                        };
                        return productRatingManager.one('list').get(params)
                            .then(function (rating) {
                                if (!rating || rating.length === 0) return null;
                                return rating[0];
                            }, function (error) {
                                return null;
                            });

                    },
                    rateModelList: function (productManager) {
                        var params = {
                            limit: 10,
                            page: 1,
                            orderBy: 'desc',
                            sortField: 'createdDate'
                        };
                        return productManager.one($scope.reactionsData.sourceId).one('product').one('rating').get(params)
                            .then(function (rating) {
                                return rating;
                            }, function (error) {
                                return [];
                            });

                    },
                    rateSummary: function (productManager) {
                        return productManager.one($scope.reactionsData.sourceId).one('rating').one('summary').get()
                            .then(function (rating) {
                                return rating.plain();
                            }, function (error) {
                                return null;
                            });
                    }
                }
            });
        }

        function cancelAddingComment() {
            _destroyEditor();
            $scope.self.isShowCommentEditor = false;
        }

        function _initEditor() {
            $scope.initControls.initialize();
        }

        function _destroyEditor() {
            $scope.floalaEditor.deleteAll();
            $scope.initControls.destroy();
        }

        function submitComment() {
            _destroyEditor();
            $scope.self.isShowCommentEditor = false;

            var params = buildParams();
            if (!isValidParam(params)) return;
            $scope.self.newComment.content = '';

            commentManager.one().customPOST(params)
                .then(function (elementFinders) {
                    _notifyRefreshCommentList();
                }, function (error) {
                })
        }

        function isValidParam(params) {
            return params && params.content;
        }

        function _toggleCommentAddedWatch() {
            var eventData = {
                commentId: $scope.reactionsData.sourceId
            };
            $scope.$emit('newCommentAdded', eventData);
        }

        function _notifyRefreshCommentList() {
            _toggleCommentAddedWatch();
            if ($scope.reactionsData.type === REACTION_SOURCE['COMMENT']) {
                $scope.watchManager.childCommentAdded = !$scope.watchManager.childCommentAdded;
            }
        }

        function buildParams() {
            var source = $scope.reactionsData.type === REACTION_SOURCE['POST'] ? 'product' : 'masterComment';
            var params = {
                content: $scope.self.newComment.content,
                contentType: 'text'
            };
            params[source] = $scope.reactionsData.sourceId;

            return params;
        }

        function leavePopup() {
            $scope.showPopup = false;
        }

        function getStyle() {
            return 'top:' + $scope.top + "; left:" + $scope.left + ";";
        }

        function clickLike(event) {
            var relX = event.pageX;
            var relY = event.pageY;

            $scope.left = relX;
            $scope.top = relY;
            $scope.showPopup = true;
        }

        function clickReaction(emotion) {
            var params = {
                "emotion": emotion
            };
            params[$scope.reactionsData.type] = $scope.reactionsData.sourceId;
            $scope.showPopup = false;

            reactionManager.one().customPOST(params)
                .then(function (success) {
                        var reactionParams = {
                            sourceId: $scope.reactionsData.sourceId,
                            type: $scope.reactionsData.type
                        };
                        reactionManager.one('status').customPOST(reactionParams)
                            .then(
                                function (apiReactionData) {
                                    _updateReactionsData(apiReactionData);
                                }
                                , function (error) {
                                })
                    },
                    function (error) {

                    })
        }

        function _updateReactionsData(apiReactionData) {
            $scope.reactionsData.emotions = apiReactionData.emotions;
            $scope.reactionsData.total = apiReactionData.total;
        }

        function clickReply() {
            $scope.self.isShowCommentEditor = true;
            _initEditor();
        }

        /**
         *
         * @param reactions
         * @param property
         * @returns {*|boolean}
         */
        function hasData(reactions, property) {
            return reactions && reactions[property];
        }

        function showDetail(reactions) {
            $modal.open({
                templateUrl: 'productManagement/directives/bdReaction/bdReactionDetail/bdReactionDetail.tpl.html',
                controller: 'BdReactionDetail',
                size: 'md',
                resolve: {
                    reactionsData: function () {
                        return reactions;
                    }
                }
            });
        }
    }
})();
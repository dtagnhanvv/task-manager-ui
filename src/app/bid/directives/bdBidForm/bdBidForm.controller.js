(function () {
    'use strict';

    angular.module('biddy.bid')
        .controller('BdBidForm', BdBidForm)
    ;

    function BdBidForm($scope, $modal, $state, $translate, sessionStorage, Auth, biddingManager,
                       productManager, auctionManager, userManager,USER_MODULES,
                       DEFAULT_DATETIME_FORMAT, AUCTION_STATUS, BID_STATUS) {
        $scope.BID_STATUS = BID_STATUS;
        $scope.self = {
            DEFAULT_DATETIME_FORMAT: DEFAULT_DATETIME_FORMAT,
            formProcessing: false,
            isAccount: Auth.isAccount(),
            errorOccurred: false,
            table: {
                page: 0,
                limit: 10,
                total: 0
            },
            currentUser: {},
            winner: null,
            lowestPrice: null,
            hasBiddingModule: $scope.currentUser.enabledModules.indexOf(USER_MODULES.bidding) >= 0
        };
        console.log($scope.self);

        $scope.model = {
            auction: noAuction() ? null : $scope.auction.id,
            price: null
        };

        $scope.bids = {
            records: []
        };

        $scope.message = {
            bidSuccess: null,
            bidFail: null,
            notEnoughCredit: false
        };

        // Functions
        $scope.submit = submit;
        $scope.isFormValid = isFormValid;
        $scope.getBids = getBids;
        $scope.onLoadMore = onLoadMore;
        $scope.showGetMoreBtn = showGetMoreBtn;
        $scope.enableBidding = enableBidding;
        $scope.hasData = hasData;
        $scope.showListBidder = showListBidder;
        $scope.showFinishBiddingBtn = showFinishBiddingBtn;
        $scope.finishedBidding = finishedBidding;
        $scope.showGuide = showGuide;
        $scope.enoughCredit = enoughCredit;
        $scope.noAuction = noAuction;
        $scope.getLowestPrice = getLowestPrice;

        $scope.$on('cfpLoadingBar:loading', function () {
            $scope.self.formProcessing = true;
        });
        $scope.$on('cfpLoadingBar:completed', function () {
            $scope.self.formProcessing = false;
        });

        _initData();


        function hasData() {
            return !!($scope.bids && $scope.bids.records && $scope.bids.records.length > 0);
        }

        function _initData() {
            getLowestPrice();
            onLoadMore();
        }

        /**
         * return lowest price valid for bidding.
         */
        function getLowestPrice() {
            // $scope.self.formProcessing = true;
            if (!$scope.auction || !$scope.auction.id) {
                return;
            }
            auctionManager.one($scope.auction.id).one('price').one('next').get()
                .then(
                    function (data) {
                        $scope.self.lowestPrice = data[0];
                        $scope.model.price = data[0];
                    },
                    function (error) {
                        $scope.self.lowestPrice = 0;
                        $scope.model.price = 0;
                    });
        }

        function showGuide() {
            return !isProductOwner();
        }

        function showFinishBiddingBtn() {
            return isProductOwner() && !finishedBidding() && hasData();
        }

        function finishedBidding() {
            return $scope.auction.status === AUCTION_STATUS.CLOSED;
        }

        function isProductOwner() {
            return $scope.product.seller.username === $scope.currentUser.username;
        }

        function enableBidding() {
            return Auth.isAccount() && !isProductOwner();
        }

        function enoughCredit() {
            var currentUserCredit = $scope.currentUser.credit;
            return currentUserCredit && Number(currentUserCredit) >= Number($scope.self.lowestPrice);
        }

        function noAuction() {
            return !$scope.auction;
        }

        function showListBidder() {
            var modalInstance = $modal.open({
                templateUrl: 'bid/modals/finishBidding/finishBidding.tpl.html',
                size: 'lg',
                controller: 'FinishBidding',
                resolve: {
                    bidProducts: function (auctionManager) {
                        var params = {
                            page: 1,
                            orderBy: 'desc',
                            sortField: 'createdDate',
                            account: $scope.currentUser.id,
                            limit: 10
                        };

                        return auctionManager.one($scope.auction.id).one('buyers').customPOST(params)
                            .then(function (products) {
                                return products.plain();
                            });
                    },
                    product: $scope.product,
                    auction: $scope.auction
                }
            });
            modalInstance.result.then(function (bidItem) {
                if (bidItem) {
                    $scope.auction.status = AUCTION_STATUS.CLOSED;
                }
                if (!bidItem.withoutWinner) {
                    $scope.self.winner = bidItem ? bidItem.buyer : null;
                }
            });
        }

        function isFormValid() {
            return enoughCredit() && $scope.model.price >= $scope.self.lowestPrice;
        }

        function _buildParams() {
            return {
                page: $scope.self.table.page,
                limit: $scope.self.table.limit
            };
        }

        function getBids() {
            var params = _buildParams();

            auctionManager.one($scope.auction.id).one('bids').get(params)
                .then(function (bids) {
                    $scope.bids.records = $scope.bids.records.concat(bids.records);
                    $scope.self.table.total = bids.totalRecord;
                })
        }

        function showGetMoreBtn() {
            return $scope.self.table.total > $scope.bids.records.length;
        }

        function onLoadMore() {
            $scope.self.table.page = Number($scope.self.table.page) + 1;
            getBids();
        }

        function _resetModelList() {
            $scope.self.table.page = 0;
            $scope.bids.records = [];
            $scope.self.table.total = 0;
        }

        function _resetMessage() {
            $scope.message.bidFail = null;
            $scope.message.bidSuccess = null;
        }

        function _updateCurrentUser() {
            userManager.getFullCurrentUser().then(
                function (account) {
                    $scope.currentUser = account.plain();
                },
                function (error) {
                }
            );
        }

        function submit() {
            _resetMessage();
            if ($scope.self.formProcessing) {
                return;
            }
            biddingManager.post($scope.model)
                .then(
                    function () {
                        _resetModelList();
                        getLowestPrice();
                        onLoadMore();
                        _updateCurrentUser();
                        $scope.message.bidSuccess = $translate.instant('BIDDING.BID_SUCCESS');
                    },
                    function (error) {
                        $scope.message.bidFail = error.data.message;
                    });
        }
    }
})();
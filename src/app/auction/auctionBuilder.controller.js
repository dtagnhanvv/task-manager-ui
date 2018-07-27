(function () {
    'use strict';

    angular.module('biddy.auction')
        .controller('AuctionBuilder', AuctionBuilder);

    function AuctionBuilder($scope, $stateParams, _, $timeout, $translate, auction, Auth, Notification,
                            SelectBoxUtil, adminUserManager, VALIDATION_TIME, calendarUtil, DateFormatter,
                            historyStorage, auctionManager, productManager, biddingManager, HISTORY_TYPE_PATH,
                            AUCTION_TYPE, AUCTION_OBJECTIVE, AUCTION_INCREMENT_TYPE, DEFAULT_CALENDAR_DATETIME_FORMAT,
                            AUCTION_PAYMENT_TYPE) {


        $scope.stateParams = $stateParams;
        $scope.datePickerOpts = {
            // singleDatePicker: true,
            showDropdowns: true,
            timePicker: true,
            timePicker24Hour: true,
            timePickerIncrement: 1,
            locale: calendarUtil.getLocaleConfig(),
            showCustomRangeLabel: false,
            minDate: moment()
        };

        $scope.formData = {
            AUCTION_TYPE: AUCTION_TYPE,
            AUCTION_OBJECTIVE: AUCTION_OBJECTIVE,
            AUCTION_INCREMENT_TYPE: AUCTION_INCREMENT_TYPE,
            AUCTION_PAYMENT_TYPE: AUCTION_PAYMENT_TYPE
        };

        $scope.model = auction || {
            minimumPrice: 1,
            showBid: false,
            validTime: {startDate: moment(), endDate: moment().endOf('month')},
            type: AUCTION_TYPE.AUTO,
            objective: AUCTION_OBJECTIVE.HIGHEST_PRICE,
            incrementType: AUCTION_INCREMENT_TYPE.CREDIT,
            incrementValue: 1,
            payment: AUCTION_PAYMENT_TYPE.CREDIT
        };
        $scope.self = {
            formProcessing: false,
            isNew: auction == null,
            isAdmin: Auth.isAdmin()
        };
        $scope.message = {
            saveError: null,
            minimumPriceError: null,
            stepPriceError: null
        };
        // Functions
        $scope.submit = submit;
        $scope.isFormValid = isFormValid;
        $scope.showIncrementValue = showIncrementValue;
        $scope.isAutomatedType = isAutomatedType;
        $scope.isShowNextPrice = isShowNextPrice;
        $scope.getUnitByIncrementType = getUnitByIncrementType;
        $scope.backToProductEdit = backToProductEdit;
        $scope.isShowBackToProductEdit = isShowBackToProductEdit;
        $scope.isInValidIncrementValue = isInValidIncrementValue;
        $scope.isUpdate = isUpdate;

        _initForm();

        function _initForm() {
            if (auction) {
                _extractFormDataFromApi($scope.model);
            }
        }

        function isInValidIncrementValue() {
            return $scope.model.incrementValue > 100 &&
                $scope.model.incrementType === AUCTION_INCREMENT_TYPE.PERCENT;
        }

        function isShowBackToProductEdit() {
            return $scope.self.isNew || $stateParams.next === 'true';
        }

        function backToProductEdit() {
            var params = angular.copy($scope.model);
            params.startDate = params.validTime.startDate.format(DEFAULT_CALENDAR_DATETIME_FORMAT);
            params.endDate = params.validTime.endDate.format(DEFAULT_CALENDAR_DATETIME_FORMAT);
            params.id = $stateParams.productId;
            params.next = true;
            params.payment = params.payment;
            delete params.validTime;
            return historyStorage.getLocationPath(HISTORY_TYPE_PATH.product, '^.^.productManagement.product.edit', params);
        }

        function getUnitByIncrementType() {
            if ($scope.model.incrementType === $scope.formData.AUCTION_INCREMENT_TYPE.PERCENT) {
                return $translate.instant('AUCTION.INCREMENT_TYPE_PERCENT');
            }
            if ($scope.model.incrementType === $scope.formData.AUCTION_INCREMENT_TYPE.CREDIT) {
                return $translate.instant('AUCTION.INCREMENT_TYPE_CREDIT');
            }
            return '';
        }

        function isShowNextPrice() {
            return $scope.model.objective === $scope.formData.AUCTION_OBJECTIVE.HIGHEST_PRICE;
        }

        function isAutomatedType() {
            return $scope.formData.AUCTION_TYPE.AUTO === $scope.model.type;
        }

        function showIncrementValue() {
            return isShowNextPrice();
        }

        function _extractFormDataFromApi(model) {
            $scope.model.validTime = _extractValidDate(model.startDate, model.endDate);
        }

        function _extractValidDate(startDate, endDate) {
            return {
                startDate: DateFormatter.getDateTimeObject(startDate),
                endDate: DateFormatter.getDateTimeObject(endDate)
            }
        }

        function isFormValid() {
            return isValidStepPrice() && isValidMinimumPrice() && !isInValidIncrementValue() && $scope.auctionForm.$valid;
        }

        function isValidStepPrice() {
            if ($scope.isAutomatedType() && $scope.isShowNextPrice()) {
                if ($scope.model.incrementValue && Number($scope.model.incrementValue) > 0) {
                    $scope.message.stepPriceError = null;
                    return true;
                }
                $scope.message.stepPriceError = $translate.instant('AUCTION.POSITIVE_MINIMUM_PRICE');
                return false;
            }
            return true;
        }

        function isValidMinimumPrice() {
            if ($scope.model.minimumPrice && Number($scope.model.minimumPrice) > 0) {
                $scope.message.minimumPriceError = null;
                return true;
            }
            $scope.message.minimumPriceError = $translate.instant('AUCTION.POSITIVE_MINIMUM_PRICE');
            return false;
        }

        function refactorJson(model) {
            return {
                id: model.id,
                minimumPrice: model.minimumPrice == null ? 0 : model.minimumPrice,
                showBid: model.showBid,
                startDate: DateFormatter.getDateTimeString(model.validTime.startDate),
                endDate: DateFormatter.getDateTimeString(model.validTime.endDate),
                product: $stateParams.productId,
                type: model.type,
                objective: model.objective,
                incrementType: model.incrementType,
                incrementValue: model.incrementValue,
                payment: model.payment
            };
        }


        function isUpdate() {
            return !$scope.stateParams.next && !$scope.self.isNew;
        }

        function submit() {
            if ($scope.self.formProcessing) {
                return;
            }
            $scope.self.formProcessing = true;
            var apiData = refactorJson($scope.model);

            var postSave = !isUpdate() ? auctionManager.post(apiData) : auctionManager.one(apiData.id).patch(apiData);
            postSave
                .then(
                    function () {
                        Notification.success({
                            message: $scope.self.isNew ? $translate.instant('AUCTION.ADD_SUCCESS') : $translate.instant('AUCTION.SAVE_SUCCESS')
                        });

                        if($stateParams.from === 'myBidAuctions'){
                            return historyStorage.getLocationPath(HISTORY_TYPE_PATH.auction, '^.^.bid.myBidAuctions.list');
                        }
                        return historyStorage.getLocationPath(HISTORY_TYPE_PATH.auction, '^.list', {productId: $stateParams.productId});
                    },
                    function (response) {
                        $scope.self.formProcessing = false;
                        $scope.message.saveError = response.data.message;
                        Notification.error({
                            message: response.data.message
                        });
                    }
                )

        }


    }
})();
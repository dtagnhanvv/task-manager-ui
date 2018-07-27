(function () {
    'use strict';
    angular.module('biddy.credit.creditTransaction').controller('BdCreditTransactions', BdCreditTransactions);

    function BdCreditTransactions($scope, $stateParams, $translate, MODES, ITEMS_PER_PAGE, calendarUtil,
                                  creditManager, AtSortableService, historyStorage, HISTORY_TYPE_PATH,
                                  EVENT_ACTION_SORTABLE, VALIDATION_TIME, BUSINESS_SETTINGS, PROFILE_DEFAULT,
                                  sessionStorage, DateFormatter, DEFAULT_DATETIME_FORMAT) {

        $scope.itemsPerPageList = ITEMS_PER_PAGE;
        $scope.tableConfig = {
            itemsPerPage: 10,
            maxPages: 10,
            totalItems: Number($scope.creditTransactions.totalRecord)
        };
        $scope.pagingOptions = {
            currentPage: $stateParams.page || 1,
            pageSize: 10
        };
        $scope.self = {
            modelList: $scope.creditTransactions,
            dateSearchModel: {
                startDate: moment().subtract(10, 'days'),
                endDate: moment()
            },
            formProcessing: false
        };
        $scope.formData = {
            PROFILE_DEFAULT: PROFILE_DEFAULT,
            DEFAULT_DATETIME_FORMAT: DEFAULT_DATETIME_FORMAT
        };
        var stateParams = $stateParams;
        var getDataSet;

        $scope.datePickerOpts = {
            singleDatePicker: true,
            showDropdowns: true,
            timePicker: true,
            timePicker24Hour: true,
            timePickerIncrement: 1,
            locale: calendarUtil.getLocaleConfig(),
            showCustomRangeLabel: false,
            eventHandlers:{
                'apply.daterangepicker': _onApplyDate
            },
            maxDate: moment()
        };

        $scope.message = {
            dateRangeError: null
        };

        $scope.showPagination = showPagination;
        $scope.searchData = searchData;
        $scope.changePage = changePage;
        $scope.onItemPerPageChange = onItemPerPageChange;
        $scope.hasData = hasData;
        $scope.getValidationTimeTranslatedLabel = getValidationTimeTranslatedLabel;
        $scope.getBusinessSettingTranslatedLabel = getBusinessSettingTranslatedLabel;
        $scope.getModeTranslatedLabel = getModeTranslatedLabel;
        $scope.getColor = getColor;
        $scope.filterByDateTime = filterByDateTime;


        function _onApplyDate(){
            filterByDateTime();
        }

        function filterByDateTime() {
            var startDate = DateFormatter.getDateTimeString($scope.self.dateSearchModel.startDate);
            var endDate = DateFormatter.getDateTimeString($scope.self.dateSearchModel.endDate);
            var isInValid = moment(startDate).isAfter(endDate);
            if(isInValid){
                $scope.message.dateRangeError = $translate.instant('VALIDATION.START_DATE_LESS_THAN_END_DATE');
                return;
            }
            $scope.message.dateRangeError = null;

            var query = {
                searches: {
                    createdDate: calendarUtil.concatStartDateEndDate(startDate, endDate, ',')
                }
            };
            stateParams = angular.extend(stateParams, query);
            _getTransactions(stateParams, 500);
        }

        function getColor(item) {
            if (item.fromWallet.owner === item.targetWallet.owner) {
                return 'black-row';
            }

            if (item.fromWallet.owner === sessionStorage.getUsername()) {
                return 'red-row';
            }

            if (item.targetWallet.owner === sessionStorage.getUsername()) {
                return 'green-row';
            }

            return 'black-row';
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
            return $scope.self.modelList && $scope.self.modelList.records && $scope.self.modelList.records.length > 0;
        }


        function showPagination() {
            return $scope.self.modelList.totalRecord > $scope.tableConfig.itemsPerPage;
        }

        $scope.$on('$locationChangeSuccess', function () {
            historyStorage.setParamsHistoryCurrent(HISTORY_TYPE_PATH.creditTransactions)
        });

        function searchData() {
            var query = {searchKey: $scope.selectData.query || ''};
            stateParams = angular.extend(stateParams, query);
            _getTransactions(stateParams, 500);
        }

        $scope.$on(EVENT_ACTION_SORTABLE, function (event, query) {
            stateParams = angular.extend(stateParams, query);
            _getTransactions(stateParams);
        });

        function changePage(currentPage) {
            stateParams = angular.extend(stateParams, {page: currentPage});
            _getTransactions(stateParams);
        }

        function onItemPerPageChange() {
            $scope.pagingOptions.currentPage = 1;
            stateParams = angular.extend(stateParams, {limit: $scope.tableConfig.itemsPerPage, page: 1});
            _getTransactions(stateParams);
        }

        function _resetList() {
            $scope.self.modelList = null;
        }
        function _getTransactions(query, ms) {
            clearTimeout(getDataSet);
            getDataSet = setTimeout(function () {
                stateParams = query;
                _resetList();
                $scope.self.formProcessing = true;
                return creditManager.one().one('list').customPOST(query)
                    .then(function (modelList) {
                        $scope.self.formProcessing = false;

                        AtSortableService.insertParamForUrl(query);
                        $scope.self.modelList = modelList;
                        $scope.tableConfig.totalItems = Number(modelList.totalRecord);
                        $scope.pagingOptions.currentPage = Number(query.page);
                    });
            }, ms || 0);
        }

    }
})();
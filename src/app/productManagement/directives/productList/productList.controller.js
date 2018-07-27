(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .controller('ProductListCtrl', ProductListCtrl)
    ;

    function ProductListCtrl($scope, $timeout, $stateParams, $modal, _, Notification, $translate, GeneralProductHelper,
                             productManager, publicProductManager, sessionStorage, MODES, ITEMS_PER_PAGE, AtSortableService,
                             historyStorage, HISTORY_TYPE_PATH, EVENT_ACTION_SORTABLE, VALIDATION_TIME, BUSINESS_SETTINGS,
                             BUSINESS_RULES, VISIBILITIES, ASC, DESC, ALL, ALL_ACCOUNT, adminUserManager, customLibLangUtil,
                             PRODUCT_TYPES, Auth) {

        var ACTIONS = 'ACTIONS';
        $scope.SELLER_BOX = 'SELLER';
        $scope.localLang = customLibLangUtil.getTranslateLanguageMultipleSelect();
        $scope.formData = {
            businessRules: BUSINESS_RULES,
            businessSettings: BUSINESS_SETTINGS,
            visibilities: VISIBILITIES,
            modes: MODES,
            validationTimes: VALIDATION_TIME,
            accounts: $scope.accounts ? $scope.accounts.records : []
        };
        $scope.columns = [ACTIONS, 'id', 'subject', 'productTags', 'seller', 'mode',
            'visibility', 'businessSetting', 'createdDate', 'rating'];

        $scope.columnsTitle = {
            'id': '#',
            ACTIONS: $translate.instant('ACTIONS'),
            'subject': $translate.instant('PRODUCT_MANAGEMENT.PRODUCT.SUBJECT'),
            'productTags': $translate.instant('PRODUCT_MANAGEMENT.PRODUCT.TAGS'),
            'seller': $translate.instant('PRODUCT_MANAGEMENT.PRODUCT.SELLER'),
            'mode': $translate.instant('PRODUCT_MANAGEMENT.PRODUCT.MODE'),
            'visibility': $translate.instant('PRODUCT_MANAGEMENT.PRODUCT.VISIBILITY'),
            'businessSetting': $translate.instant('PRODUCT_MANAGEMENT.PRODUCT.BUSINESS_SETTING'),
            'businessRule': $translate.instant('PRODUCT_MANAGEMENT.PRODUCT.BUSINESS_RULE'),
            'validTime': $translate.instant('PRODUCT_MANAGEMENT.PRODUCT.VALID_TIME'),
            'createdDate': $translate.instant('PRODUCT_MANAGEMENT.PRODUCT.CREATED_DATE'),
            'rating': $translate.instant('PRODUCT_MANAGEMENT.PRODUCT.RATING')
        };

        if (isShowFreelance()) {
            $scope.columns.push('ages');
            $scope.columns.push('gender');
            $scope.columns.push('skills');
            $scope.columnsTitle['ages'] = $translate.instant('FREELANCE.AGE');
            $scope.columnsTitle['gender'] = $translate.instant('FREELANCE.SEX');
            $scope.columnsTitle['skills'] = $translate.instant('FREELANCE.SKILLS');
        }

        $scope.sortData = _initSortData();
        $scope.sortData.createdDate = DESC;

        $scope.searchModel = {};

        $scope.itemsPerPageList = ITEMS_PER_PAGE;
        $scope.tableConfig = {
            itemsPerPage: 10,
            maxPages: 10,
            totalItems: Number($scope.products.totalRecord)
        };
        $scope.pagingOptions = {
            currentPage: $stateParams.page || 1,
            pageSize: 10
        };
        $scope.self = {
            formProcessing: false,
            currentUserId: sessionStorage.getUserId(),
            isAdmin: Auth.isAdmin(),
            products: $scope.products,
            accountInfinite: {
                skipFirstSearch: true,
                skipFirstScroll: true,
                totalRecord: $scope.accounts ? $scope.accounts.totalRecord : 0,
                params: {
                    page: 1,
                    limit: 10,
                    orderBy: 'desc',
                    sortField: 'lastLogin',
                    searchKey: ''
                }
            }
        };

        var stateParams = $stateParams;
        var getDataSet;

        $scope.showPagination = showPagination;
        // $scope.confirmDeletion = confirmDeletion;
        $scope.searchData = searchData;
        $scope.changePage = changePage;
        $scope.onItemPerPageChange = onItemPerPageChange;
        $scope.hasData = hasData;
        $scope.getValidationTimeTranslatedLabel = getValidationTimeTranslatedLabel;
        $scope.getBusinessSettingTranslatedLabel = getBusinessSettingTranslatedLabel;
        $scope.getModeTranslatedLabel = getModeTranslatedLabel;
        $scope.getVisibilityTranslatedLabel = getVisibilityTranslatedLabel;
        $scope.getProductTagsLabel = getProductTagsLabel;

        $scope.getMoreAccount = getMoreAccount;
        $scope.searchAccount = searchAccount;

        $scope.onDateApply = onDateApply;
        $scope.filter = filter;
        $scope.sort = sort;

        $scope.isShowFreelance = isShowFreelance;
        _init();

        function _init() {
            _initAccountSelectBox();
        }

        function isShowFreelance() {
            return $scope.type === PRODUCT_TYPES.FREELANCE;
        }

        function _initAccountSelectBox() {
            $scope.formData.accounts = _addAllToOptions(ALL_ACCOUNT, $scope.formData.accounts);
        }

        function onDateApply() {

        }

        function _getAccounts(params, totalRecord) {
            $scope.self.formProcessing = true;
            adminUserManager.one('list').customPOST(params).then(function (accounts) {
                if (accounts) {
                    $scope.self.formProcessing = false;
                    $scope.formData.accounts = $scope.formData.accounts.concat(accounts.records);
                    totalRecord = accounts.totalRecord;
                }
            });
        }

        function _resetAccount() {
            $scope.searchModel.seller = null;
            $scope.formData.accounts = [];
            _initAccountSelectBox();
        }

        function searchAccount(search) {
            if ($scope.self.accountInfinite.skipFirstSearch) {
                $scope.self.accountInfinite.skipFirstSearch = false;
                return;
            }

            _resetAccount();
            // reset params
            var params = $scope.self.accountInfinite.params;
            var totalRecord = $scope.self.accountInfinite.totalRecord;
            params.page = 1;
            params.searchKey = search;
            _getAccounts(params, totalRecord);
        }

        function getMoreAccount() {
            if ($scope.self.accountInfinite.skipFirstScroll) {
                $scope.self.accountInfinite.skipFirstScroll = false;
                return;
            }
            if ($scope.self.formProcessing) return;
            var page = Math.ceil((($scope.formData.accounts.length - 1) / 10) + 1);
            var params = $scope.self.accountInfinite.params;
            var totalRecord = $scope.self.accountInfinite.totalRecord;
            if (params.page === page || !totalRecord || (page > Math.ceil(totalRecord / 10) && Number(page) !== 1)) {
                return;
            }
            params.page = page;
            _getAccounts(params, totalRecord);
        }

        function _addAllToOptions(all, options) {
            var localOptions = angular.copy(options);
            localOptions.unshift(all);
            return localOptions;
        }

        function _initSortData() {
            return {
                idd: null,
                subject: null,
                mode: $scope.formData.modes[0],
                visibility: null,
                businessSetting: $scope.formData.businessSettings[0],
                createdDate: null
            };
        }

        function sort(keyName) {
            if (ACTIONS === keyName || 'productTags' === keyName) {
                return;
            }
            $scope.sortData = _initSortData();

            $stateParams.orderBy = $stateParams.orderBy === DESC ? ASC : DESC;
            $stateParams.sortField = keyName;

            $scope.sortData[keyName] = $stateParams.orderBy;
            var filterParam = _refactorSearchModel();
            _getProducts(stateParams, 1, filterParam);
        }

        function joinKey(options, key) {
            var arr = [];
            angular.forEach(options, function (option) {
                if (key && option && option[key]) {
                    arr.push(option[key]);
                }
            });
            if (arr.length === 0) {
                return null;
            }
            return arr.join(',');
        }

        function getProductTagsLabel(productTags) {
            var arr = [];
            angular.forEach(productTags, function (option) {
                if (option && option.tag && option.tag.name) {
                    arr.push(option.tag.name);
                }
            });
            if (arr.length === 0) {
                return null;
            }
            return arr.join(',');
        }

        function _refactorSearchModel() {
            var searchModel = angular.copy($scope.searchModel);

            // if (searchModel.seller) {
            //     searchModel.seller = searchModel.seller.id;
            // }
            if (searchModel.mode) {
                searchModel.mode = joinKey(searchModel.mode, 'value');
            }
            if (searchModel.visibility) {
                searchModel.visibility = joinKey(searchModel.visibility, 'value');
            }
            if (searchModel.businessSetting) {
                searchModel.businessSetting = joinKey(searchModel.businessSetting, 'value');
            }
            if (searchModel.businessRule) {
                searchModel.businessRule = joinKey(searchModel.businessRule, 'value');
            }
            // if (searchModel.validTime) {
            //     searchModel.validTime = joinKey(searchModel.validTime, 'value');
            // }
            return searchModel;
        }

        function filter(item, currentSelectBox) {
            $timeout(function () {
                // if (currentSelectBox === $scope.SELLER_BOX) {
                //     $scope.searchModel.seller = item;
                // }
                var filterParam = _refactorSearchModel();
                $stateParams.page = 1;
                _getProducts($stateParams, 500, filterParam);
            }, 1);

        }

        function getVisibilityTranslatedLabel(value) {
            return getTranslatedLabelFromString(value, VISIBILITIES);
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
            return $scope.self.products && $scope.self.products.records && $scope.self.products.records.length > 0;
        }

        function showPagination() {
            return $scope.self.products.totalRecord > $scope.tableConfig.itemsPerPage;
        }

        $scope.$on('$locationChangeSuccess', function () {
            historyStorage.setParamsHistoryCurrent(HISTORY_TYPE_PATH.productList)
        });

        function searchData() {
            var query = {searchKey: $scope.selectData.query || ''};
            stateParams = angular.extend(stateParams, query);
            stateParams.page = 1;
            _getProducts(stateParams, 500);
        }

        $scope.$on(EVENT_ACTION_SORTABLE, function (event, query) {
            stateParams = angular.extend(stateParams, query);
            var filterParam = _refactorSearchModel();
            _getProducts(stateParams, 0, filterParam);
        });

        function changePage(currentPage) {
            stateParams = angular.extend(stateParams, {page: currentPage});
            var filterParam = _refactorSearchModel();
            _getProducts(stateParams, 0, filterParam);
        }

        function onItemPerPageChange() {
            $scope.pagingOptions.currentPage = 1;
            stateParams = angular.extend(stateParams, {limit: $scope.tableConfig.itemsPerPage, page: 1});
            var filterParam = _refactorSearchModel();
            _getProducts(stateParams, 0, filterParam);
        }

        function _getProducts(query, ms, filterParam) {
            clearTimeout(getDataSet);
            getDataSet = setTimeout(function () {
                stateParams.account = Number(sessionStorage.getUserId());
                stateParams = query;
                var apiParams = angular.copy(query);
                apiParams.searches = filterParam;
                if (!apiParams.limit) {
                    apiParams.limit = 10;
                }

                return GeneralProductHelper.getList(apiParams)
                    .then(function (products) {
                        AtSortableService.insertParamForUrl(query);
                        $scope.self.products = products;
                        $scope.tableConfig.totalItems = Number(products.totalRecord);
                        $scope.pagingOptions.currentPage = Number(query.page);
                    });
            }, ms || 0);
        }

    }
})();
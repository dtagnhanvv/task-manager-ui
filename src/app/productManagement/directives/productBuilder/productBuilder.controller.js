(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .controller('ProductBuilderCtrl', ProductBuilderCtrl)
    ;

    function ProductBuilderCtrl($scope, _, $stateParams, $translate, Auth, productManager,
                                historyStorage, tagManager, HISTORY_TYPE_PATH, adminUserManager,
                                DateFormatter, Notification, PRODUCT_TYPES) {

        var accounts = $scope.accounts;
        $scope.self = {
            accounts: accounts ? accounts.records : [],
            formProcessing: false,
            isNew: $scope.model == null,
            isAdmin: Auth.isAdmin(),
            errorOccurred: false,
            accountInfinite: {
                skipFirstSearch: true,
                skipFirstScroll: true,
                totalRecord: accounts ? accounts.totalRecord : 0,
                params: {
                    page: 1,
                    limit: 10,
                    orderBy: 'desc',
                    sortField: 'lastLogin',
                    searchKey: ''
                }
            },
            next: $stateParams.next // next to create auction
        };

        $scope.model = $scope.model || {
            advance: null,
            basic: null,
            freelance: null
        };

        // Functions
        $scope.submit = submit;
        $scope.onSelectAccount = onSelectAccount;
        $scope.isFormValid = isFormValid;
        $scope.getMoreAccount = getMoreAccount;
        $scope.searchAccount = searchAccount;

        $scope.isShowFreelance = isShowFreelance;

        _initForm();

        function _initForm() {
            if (!$scope.self.isNew) {
                _extractFormDataFromApi($scope.model);
            }
        }

        function isShowFreelance() {
            return $scope.type === PRODUCT_TYPES.FREELANCE;
        }

        function _resetAccount() {
            $scope.formData.accounts = [];
        }

        function _getAccounts(params, totalRecord) {
            $scope.self.formProcessing = true;
            adminUserManager.one('list').customPOST(params).then(function (accounts) {
                if (accounts) {
                    $scope.self.accounts = $scope.self.accounts.concat(accounts.records);
                    totalRecord = accounts.totalRecord;
                    $scope.self.formProcessing = false;
                }
            });

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

            var page = Math.ceil((($scope.self.accounts.length) / 10) + 1);
            var params = $scope.self.accountInfinite.params;
            var totalRecord = $scope.self.accountInfinite.totalRecord;
            if (params.page === page || !totalRecord || (page > Math.ceil(totalRecord / 10) && Number(page) !== 1)) {
                return;
            }
            params.page = page;
            _getAccounts(params, totalRecord);
        }

        function _extractFormDataFromApi(model) {
            // basic
            $scope.model.basic = {
                businessSetting: model.businessSetting,
                productTags: model.productTags,
                latitude: model.latitude,
                longitude: model.longitude,
                subject: model.subject,
                summary: model.summary,
                detail: model.detail
            };
            $scope.model.advance = {
                mode: model.mode,
                visibility: model.visibility,
                commentVisibility: model.commentVisibility,
                businessRule: model.businessRule,
                address: model.address,
            };
            $scope.model.freelance = {
                gender: model.gender,
                ages: model.ages,
                skills: model.skills,
            };
            
        }

        function isFormValid() {
            return $scope.productForm.$valid;
        }

        function onSelectAccount(account) {

        }

        function refactorJson(model) {
            var product =
                {
                    id: model.id,

                    type: $scope.type,

                    mode: model.advance.mode,
                    visibility: model.advance.visibility,
                    commentVisibility: model.advance.commentVisibility,
                    businessRule: model.advance.businessRule,
                    address: model.advance.address,

                    businessSetting: model.basic.businessSetting,
                    productTags: buildTags(model.basic.productTags),
                    latitude: model.basic.latitude,
                    longitude: model.basic.longitude,
                    subject: model.basic.subject,
                    summary: model.basic.summary,
                    detail: model.basic.detail,
                };

            if (isShowFreelance()) {
                product.gender = model.freelance.gender;
                product.ages = model.freelance.ages;
                product.skills = model.freelance.skills;
            }

            if ($scope.self.isAdmin) {
                product.seller = model.seller.id;
            }

            console.log(product);
            return product;
        }

        function buildTags(productTags) {
            if (!productTags || productTags.length === 0) return [];

            var tagApiObjects = [];
            angular.forEach(productTags, function (tag) {
                var tagApiObject = {
                    tag: {
                        id: tag.id,
                        name: tag.name
                    }
                };
                tagApiObjects.push(tagApiObject);
            });

            return tagApiObjects;
        }

        function submit() {
            if ($scope.self.formProcessing) {
                return;
            }
            $scope.self.formProcessing = true;
            var apiData = refactorJson($scope.model);

            if (!$scope.self.isAdmin) {
                delete apiData.seller;
            }

            var postSave = $scope.self.isNew ? $scope.serviceManager.saveModel(apiData) :
                $scope.serviceManager.newModel(apiData.id, apiData);
            postSave
                .then(function (result) {
                    Notification.success({
                        message: $scope.self.isNew ?
                            $translate.instant('PRODUCT_MANAGEMENT.PRODUCT.ADD_SUCCESS') :
                            $translate.instant('PRODUCT_MANAGEMENT.PRODUCT.SAVE_SUCCESS')
                    });

                    if ($scope.self.isNew) {
                        return historyStorage.getLocationPath($scope.historyTypePath, '^.^.^.auction.builder', {productId: result.id});
                    } else if ($scope.self.next === 'true') {
                        var params = $scope.tempAuction;
                        params.productId = $stateParams.id;
                        params.next = true;
                        return historyStorage.getLocationPath($scope.historyTypePath, '^.^.^.auction.builder', params);
                    }
                    else {
                        return historyStorage.getLocationPath($scope.historyTypePath, '^.list');
                    }
                })
                .catch(function (error) {
                    $scope.self.formProcessing = false;
                    if (error && error.data && error.data.message) {
                        Notification.error({message: error.data.message});
                    }
                });
        }

    }
})();
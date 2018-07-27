(function () {
    'use strict';
    angular.module('biddy.userManagement').controller('BdAccountList', BdAccountList);

    function BdAccountList($scope, $translate, $stateParams, autoLogin, Notification, AtSortableService,
                           historyStorage, HISTORY_TYPE_PATH, ITEMS_PER_PAGE, ASC, DESC,
                           EVENT_ACTION_SORTABLE, USER_ROLES, customLibLangUtil, Auth) {

        $scope.localLang = customLibLangUtil.getTranslateLanguageMultipleSelect();
        $scope.allowChangeCredit = allowChangeCredit;
        
        function allowChangeCredit() {
            return Auth.isAdmin() || Auth.isSale();
        }
        var getUserList;
        var root = {
            data: $scope.accounts || [],
            searchFields: {},
            searchQuery: '',
            table: {},
            action: {},
            itemsPerPageList: ITEMS_PER_PAGE,
            sortData: {},
            stateParams: $stateParams,
            constant: {
                ACTIONS: 'ACTIONS'
            },
            dataFilter: {
                status: [
                    {name: $translate.instant('ACCOUNT_MODULE.ENABLED_STATUS'), value: 1, ticked: true},
                    {name: $translate.instant('ACCOUNT_MODULE.LOCK_STATUS'), value: 0, ticked: true}
                ]
            },
            initTable: function () {
                return {
                    columns: ['action', 'id', 'name', 'username', 'email', 'phone', 'lastLogin', 'status'],
                    titles: {
                        'id': '#',
                        'action': $translate.instant('ACTIONS'),
                        'name': $translate.instant('NAME'),
                        'username': $translate.instant('ACCOUNT_MODULE.USERNAME'),
                        'email': $translate.instant('ACCOUNT_MODULE.EMAIL'),
                        'phone': $translate.instant('ACCOUNT_MODULE.PHONE'),
                        // 'userType': $translate.instant('ACCOUNT_MODULE.USER_TYPE'),
                        'lastLogin': $translate.instant('ACCOUNT_MODULE.LAST_LOGIN'),
                        'status': $translate.instant('ACCOUNT_MODULE.STATUS'),
                    },
                    pagingOptions: {
                        currentPage: this.stateParams.page || 1,
                        pageSize: 10
                    },
                    config: {
                        itemsPerPage: 10,
                        maxPages: 10,
                        totalItems: Number($scope.accounts.totalRecord || 0)
                    }
                }
            },
            helper: function () {
                var self = this;
                return {
                    initSortData: function () {
                        return {
                            name: '',
                            username: '',
                            email: '',
                            phone: '',
                            // userType: '',
                            lastLogin: '',
                            status: null
                        }
                    },
                    sort: function (key) {
                        if (self.constant.ACTIONS === key) {
                            return;
                        }

                        $scope.sortData = this.initSortData();
                        $stateParams.orderBy = $stateParams.orderBy === DESC ? ASC : DESC;
                        $stateParams.sortField = key;
                        self.sortData[key] = $stateParams.orderBy;
                        self.action.getList(self.stateParams, 1, this.refactorSearchModel());
                    },
                    joinKey: function (options, key) {
                        var arr = [];
                        _.each(options, function (option) {
                            if (_.has(option, key))
                                arr.push(option[key]);
                        });

                        return _.isEmpty(arr) ? null : arr.join(',');
                    },
                    refactorSearchModel: function () {
                        if (_.has(self.searchFields, 'statusOutput') && !_.isEmpty(self.searchFields['statusOutput']))
                            self.searchFields['status'] = self.helper().joinKey(self.searchFields['statusOutput'], 'value');
                        if(_.isEmpty(self.searchFields['statusOutput'])){
                            self.searchFields['status'] = null;
                        }
                        var newFormat = _.clone(self.searchFields);
                        _.has(newFormat, 'statusOutput') ? delete newFormat.statusOutput : void 0;

                        return newFormat;
                    },
                    hasData: function () {
                        return _.isEmpty(self.data);
                    },
                    showPagination: function () {
                        return $scope.accounts.totalRecord > self.table.config.itemsPerPage;
                    }
                }
            },
            initAction: function () {
                return {
                    searchBySpecificField: (function () {
                        this.stateParams.page = 1;
                        this.action.getList(this.stateParams, 0, this.helper().refactorSearchModel());
                    }).bind(this),
                    searchUser: (function () {
                        this.stateParams = angular.extend(this.stateParams, {searchKey: this.searchQuery || ''});
                        this.action.getList(this.stateParams, 500);
                    }).bind(this),
                    changePage: (function (currentPage) {
                        this.stateParams = _.extend(this.stateParams, {page: currentPage});
                        this.action.getList(this.stateParams, 0, this.helper().refactorSearchModel());
                    }).bind(this),
                    onItemPerPageChange: (function () {
                        this.table.pagingOptions.currentPage = 1;
                        this.stateParams = angular.extend(this.stateParams, {
                            limit: this.table.config.itemsPerPage,
                            page: 1
                        });
                        this.action.getList(this.stateParams, 0, this.helper().refactorSearchModel());
                    }).bind(this),
                    getList: (function (query, ms, filterParam) {
                        var self = this;
                        clearTimeout(getUserList);
                        getUserList = setTimeout(function () {
                            this.stateParams = query;
                            var apiParams = _.clone(query);
                            apiParams.searches = filterParam;
                            if (!apiParams.limit) {
                                apiParams.limit = 10;
                            }

                            return $scope.restAngularManager.one('list').customPOST(apiParams)
                                .then(function (accounts) {
                                    AtSortableService.insertParamForUrl(query);
                                    self.data = accounts || [];
                                    self.table.config.totalItems = Number(accounts.totalRecord || 0);
                                    self.table.pagingOptions.currentPage = Number(query.page);
                                });
                        }, ms || 0);
                    }).bind(this),
                    toggleAccountStatus: function (account) {
                        var newStatus = !account.enabled;
                        var isPause = !newStatus;

                        if(!$scope.restAngularManager) return;

                        return $scope.restAngularManager.one(account.id).patch({'enabled': newStatus})
                            .then(function () {
                                account.enabled = newStatus;

                                var successMessage;

                                if (isPause) {
                                    successMessage = $translate.instant('ACCOUNT_MODULE.PAUSE_STATUS_SUCCESS');
                                } else {
                                    successMessage = $translate.instant('ACCOUNT_MODULE.ACTIVE_STATUS_SUCCESS');
                                }

                                Notification.success({message: successMessage});
                            })
                            .catch(function () {
                                Notification.error({message: $translate.instant('ACCOUNT_MODULE.UPDATE_STATUS_FAIL')});
                            });
                    }
                }
            },
            createListener: function () {
                var self = this;
                $scope.$on(EVENT_ACTION_SORTABLE, function (event, query) {
                    self.stateParams = _.extend(self.stateParams, query);
                    self.action.getList(self.stateParams, 0, self.helper().refactorSearchModel());
                });

                $scope.$on('$locationChangeSuccess', function () {
                    historyStorage.setParamsHistoryCurrent(HISTORY_TYPE_PATH.account)
                });
            },
            init: function () {
                this.table = this.initTable();
                this.action = this.initAction();
                this.createListener();
            }
        };

        $scope.root = _.clone(root);
        $scope.root.init();
    }
})();
(function () {
    'use strict';

    angular.module('biddy.tag')
        .controller('TagList', TagList);

    function TagList($scope, $stateParams, $modal, Notification, $translate, tags, MODES, ITEMS_PER_PAGE, tagManager,
                     AtSortableService, historyStorage, HISTORY_TYPE_PATH, EVENT_ACTION_SORTABLE) {

        $scope.itemsPerPageList = ITEMS_PER_PAGE;
        $scope.tableConfig = {
            itemsPerPage: 10,
            maxPages: 10,
            totalItems: Number(tags.totalRecord)
        };
        $scope.pagingOptions = {
            currentPage: $stateParams.page || 1,
            pageSize: 10
        };
        $scope.self = {
            tags: tags
        };
        var stateParams = $stateParams;
        var getDataSet;

        $scope.showPagination = showPagination;
        $scope.confirmDeletion = confirmDeletion;
        $scope.searchData = searchData;
        $scope.changePage = changePage;
        $scope.onItemPerPageChange = onItemPerPageChange;
        $scope.hasData = hasData;


        function hasData() {
            return $scope.self.tags && $scope.self.tags.records && $scope.self.tags.records.length > 0;
        }

        function confirmDeletion(tag, index) {
            var modalInstance = $modal.open({
                templateUrl: 'productManagement/confirmDeletion.tpl.html'
            });

            modalInstance.result.then(function () {
                return tagManager.one(tag.id).remove()
                    .then(
                        function () {
                            _getTags(stateParams);
                            Notification.success({message: $translate.instant('TAG.DELETE_SUCCESS')});
                        },
                        function (response) {
                            if (!!response && !!response.data && !!response.data.message) {
                                Notification.error({message: response.data.message});
                            }
                        }
                    );
            });
        }

        function showPagination() {
            return $scope.self.tags.totalRecord > $scope.tableConfig.itemsPerPage;
        }

        $scope.$on('$locationChangeSuccess', function () {
            historyStorage.setParamsHistoryCurrent(HISTORY_TYPE_PATH.tag)
        });

        function searchData() {
            var query = {searchKey: $scope.selectData.query || ''};
            stateParams = angular.extend(stateParams, query);
            _getTags(stateParams, 500);
        }

        $scope.$on(EVENT_ACTION_SORTABLE, function (event, query) {
            stateParams = angular.extend(stateParams, query);
            _getTags(stateParams);
        });

        function changePage(currentPage) {
            stateParams = angular.extend(stateParams, {page: currentPage});
            _getTags(stateParams);
        }

        function onItemPerPageChange() {
            $scope.pagingOptions.currentPage = 1;
            stateParams = angular.extend(stateParams, {limit: $scope.tableConfig.itemsPerPage, page: 1});
            _getTags(stateParams);
        }

        function _getTags(query, ms) {
            clearTimeout(getDataSet);
            getDataSet = setTimeout(function () {
                stateParams = query;
                return tagManager.one().get(query)
                    .then(function (tags) {
                        AtSortableService.insertParamForUrl(query);
                        $scope.self.tags = tags;
                        $scope.tableConfig.totalItems = Number(tags.totalRecord);
                        $scope.pagingOptions.currentPage = Number(query.page);
                    });
            }, ms || 0);
        }

    }
})();
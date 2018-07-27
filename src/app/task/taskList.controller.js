(function () {
    'use strict';

    angular.module('biddy.task')
        .controller('TaskList', TaskList);

    function TaskList($scope, $stateParams, $modal, Notification, $translate, tasks, MODES, ITEMS_PER_PAGE, taskManager,
                     AtSortableService, historyStorage, HISTORY_TYPE_PATH, EVENT_ACTION_SORTABLE) {

        $scope.itemsPerPageList = ITEMS_PER_PAGE;
        $scope.tableConfig = {
            itemsPerPage: 10,
            maxPages: 10,
            totalItems: Number(tasks.totalRecord)
        };
        $scope.pagingOptions = {
            currentPage: $stateParams.page || 1,
            pageSize: 10
        };
        $scope.self = {
            tasks: tasks
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
            return $scope.self.tasks && $scope.self.tasks.records && $scope.self.tasks.records.length > 0;
        }

        function confirmDeletion(task, index) {
            var modalInstance = $modal.open({
                templateUrl: 'productManagement/confirmDeletion.tpl.html'
            });

            modalInstance.result.then(function () {
                return taskManager.one(task.id).remove()
                    .then(
                        function () {
                            _getTasks(stateParams);
                            Notification.success({message: $translate.instant('TASK.DELETE_SUCCESS')});
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
            return $scope.self.tasks.totalRecord > $scope.tableConfig.itemsPerPage;
        }

        $scope.$on('$locationChangeSuccess', function () {
            historyStorage.setParamsHistoryCurrent(HISTORY_TYPE_PATH.task)
        });

        function searchData() {
            var query = {searchKey: $scope.selectData.query || ''};
            stateParams = angular.extend(stateParams, query);
            _getTasks(stateParams, 500);
        }

        $scope.$on(EVENT_ACTION_SORTABLE, function (event, query) {
            stateParams = angular.extend(stateParams, query);
            _getTasks(stateParams);
        });

        function changePage(currentPage) {
            stateParams = angular.extend(stateParams, {page: currentPage});
            _getTasks(stateParams);
        }

        function onItemPerPageChange() {
            $scope.pagingOptions.currentPage = 1;
            stateParams = angular.extend(stateParams, {limit: $scope.tableConfig.itemsPerPage, page: 1});
            _getTasks(stateParams);
        }

        function _getTasks(query, ms) {
            clearTimeout(getDataSet);
            getDataSet = setTimeout(function () {
                stateParams = query;
                return taskManager.one().get(query)
                    .then(function (tasks) {
                        AtSortableService.insertParamForUrl(query);
                        $scope.self.tasks = tasks;
                        $scope.tableConfig.totalItems = Number(tasks.totalRecord);
                        $scope.pagingOptions.currentPage = Number(query.page);
                    });
            }, ms || 0);
        }

    }
})();
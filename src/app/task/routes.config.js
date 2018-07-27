(function () {
    'use strict';

    angular.module('biddy.task')
        .config(addStates)
    ;

    function addStates(UserStateHelperProvider) {
        // uniqueRequestCacheBuster is used as a work-around for reloading only the postModel state
        // currently UI-Router will reload all parent states as well, this causes problems having

        UserStateHelperProvider
            .state('task', {
                abstract: true,
                url: '/task',
                ncyBreadcrumb: {
                    skip: true
                }
            })
            .state('task.list', {
                url: '/list?page&sortField&orderBy&search',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'TaskList',
                        templateUrl: 'task/taskList.tpl.html'
                    }
                },
                resolve: {
                    tasks: function (taskManager, $stateParams) {
                        $stateParams.page = !$stateParams.page ? 1 : $stateParams.page;
                        $stateParams.orderBy = !$stateParams.orderBy ? 'desc' : $stateParams.orderBy;
                        $stateParams.sortField = !$stateParams.sortField ? 'createdDate' : $stateParams.sortField;
                        return taskManager.one().get($stateParams).then(function (tasks) {
                            return tasks.plain();
                        });
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'TASK.LIST' | translate}}"
                }
            })
            .state('task.builder', {
                url: '/builder',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'TaskBuilder',
                        templateUrl: 'task/taskBuilder.tpl.html'
                    }
                },
                resolve: {
                    task: function () {
                        return null;
                    }
                },
                customResolve: {
                },
                ncyBreadcrumb: {
                    label: "{{'TASK.ADD' | translate}}"
                }
            })
            .state('task.edit', {
                url: '/edit?id',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'TaskBuilder',
                        templateUrl: 'task/taskBuilder.tpl.html'
                    }
                },
                resolve: {
                    task: function (taskManager, $stateParams) {
                        if (!!$stateParams.id) {
                            return taskManager.one($stateParams.id).get()
                                .then(function (task) {
                                    return task.plain();
                                })
                        }
                        return null;
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'TASK.EDIT' | translate}}"
                }
            })
        ;
    }
})();
(function () {
    'use strict';

    angular.module('biddy.tag')
        .config(addStates)
    ;

    function addStates(UserStateHelperProvider) {
        // uniqueRequestCacheBuster is used as a work-around for reloading only the postModel state
        // currently UI-Router will reload all parent states as well, this causes problems having

        UserStateHelperProvider
            .state('tag', {
                abstract: true,
                url: '/tag',
                ncyBreadcrumb: {
                    skip: true
                }
            })
            .state('tag.list', {
                url: '/list?page&sortField&orderBy&search',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'TagList',
                        templateUrl: 'tag/tagList.tpl.html'
                    }
                },
                resolve: {
                    tags: function (tagManager, $stateParams) {
                        $stateParams.page = !$stateParams.page ? 1 : $stateParams.page;
                        $stateParams.orderBy = !$stateParams.orderBy ? 'desc' : $stateParams.orderBy;
                        $stateParams.sortField = !$stateParams.sortField ? 'createdDate' : $stateParams.sortField;
                        return tagManager.one().get($stateParams).then(function (tags) {
                            return tags.plain();
                        });
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'TAG.LIST' | translate}}"
                }
            })
            .state('tag.builder', {
                url: '/builder',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'TagBuilder',
                        templateUrl: 'tag/tagBuilder.tpl.html'
                    }
                },
                resolve: {
                    tag: function () {
                        return null;
                    }
                },
                customResolve: {
                },
                ncyBreadcrumb: {
                    label: "{{'TAG.ADD' | translate}}"
                }
            })
            .state('tag.edit', {
                url: '/edit?id',
                params: {
                    uniqueRequestCacheBuster: null
                },
                views: {
                    'content@app': {
                        controller: 'TagBuilder',
                        templateUrl: 'tag/tagBuilder.tpl.html'
                    }
                },
                resolve: {
                    tag: function (tagManager, $stateParams) {
                        if (!!$stateParams.id) {
                            return tagManager.one($stateParams.id).get()
                                .then(function (tag) {
                                    return tag.plain();
                                })
                        }
                        return null;
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'TAG.EDIT' | translate}}"
                }
            })
        ;
    }
})();
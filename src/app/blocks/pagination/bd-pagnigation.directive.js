(function () {
    'use strict';

    angular.module('biddy.blocks.pagination')
        .directive('bdPagination', bdPagination)
    ;

    function bdPagination() {
        return {
            restrict: 'E',
            templateUrl: 'blocks/pagination/bd-pagination.tpl.html',
            scope: {
                showPagination: '=',
                tableConfig: '=',
                pagingOptions: '=',
                itemsPerPageList: '=',
                changePage: '&',
                onItemPerPageChange: '&'
            },
            controller: function () {
            }
        };
    }
})();
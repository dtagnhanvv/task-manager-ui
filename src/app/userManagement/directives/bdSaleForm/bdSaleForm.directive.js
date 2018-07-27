(function () {
    'use strict';

    angular.module('biddy.userManagement')
        .directive('bdSaleForm', bdSaleForm)
    ;

    function bdSaleForm() {

        return {
            scope: {
                role: '=',
                sale: '=',
                isNew: '='
            },
            restrict: 'AE',
            templateUrl: 'userManagement/directives/bdSaleForm/bdSaleForm.tpl.html',
            controller: 'BdSaleForm'
        };
    }
})();
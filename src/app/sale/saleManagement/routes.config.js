(function () {
    'use strict';

    angular
        .module('biddy.sale.saleManagement')
        .config(addStates)
    ;

    function addStates($stateProvider) {
        // uniqueRequestCacheBuster is used as a work-around for reloading only the current state
        // currently UI-Router will reload all parent states as well, this causes problems having

        $stateProvider
            .state({
                name: 'app.sale.saleManagement',
                abstract: true,
                url: '/saleManagement',
                ncyBreadcrumb: {
                    label: "{{'SALE_MODULE.MANAGEMENT' | translate}}"
                }
            })
            .state({
                name: 'app.sale.saleManagement.edit',
                url: '/edit/{id:[0-9]+}',
                views: {
                    'content@app': {
                        controller: 'SaleForm',
                        templateUrl: 'sale/saleManagement/saleForm.tpl.html'
                    }
                },
                resolve: {
                    sale: function($stateParams, saleManager) {
                        return saleManager.one($stateParams.id).one('current').get();
                    }
                },
                ncyBreadcrumb: {
                    label: "{{'SALE_MODULE.EDIT' | translate}}" + ' - {{ sale.username }}'
                }
            })
        ;
    }
})();
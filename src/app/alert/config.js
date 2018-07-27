(function () {
    'use strict';

    angular.module('biddy.alert')
        .constant('ALERT_TARGET_TYPE', {
            PRODUCT: 'product',
            PRODUCT_AUCTION: 'product_auction',
            AUCTION: 'auction',
            BILL: 'bill',
            CREDIT: 'credit',
            PROFILE: 'profile'
        })
        .constant('ALERT_TARGET_TYPE_ROUTER_MAP', {
            product: 'productManagement.productDetail.list',
            auction: 'auction.edit',
            bill: 'bill.edit',
            credit: 'credit.creditTransaction.list',
            profile: 'accountManagement.edit',
            saleProfile: 'saleManagement.edit'
        })

})();
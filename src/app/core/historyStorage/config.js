(function () {
    'use strict';

    angular.module('biddy.core.historyStorage')
        .constant('HISTORY', 'biddyHistory')
        .constant('HISTORY_TYPE_PATH', {
            account: 'account',
            sale: 'sale',
            product: 'product',
            freelance: 'freelance',
            profession: 'profession',
            productList: 'productList',
            productDetail: 'productDetail',
            bill: 'bill',
            billList: 'billList',
            commentsPost: 'commentsPost',
            tag: 'tag',
            bidAuction: 'bidAuction',
            myBidAuctions: 'myBidAuctions',
            creditTransactions: 'creditTransactions',
            auction: 'auction',
            userPreference: 'userPreference'
        })
    ;
})();
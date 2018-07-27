(function () {
    'use strict';

    angular.module('biddy.bill')
        .constant('STATUS', [
            {key: 'WAIT_ACCEPTING_FROM_SELLER', value: 'waitAcceptingFromSeller', label: 'Đang chờ người bán phê duyệt'},
            {key: 'PREPARE_PRODUCT', value: 'prepareProduct', label: 'Đang chuẩn bị hàng'},
            {key: 'BEING_DELIVERED', value: 'beingDelivered', label: 'Đang giao hàng'},
            {key: 'DELIVERED', value: 'delivered', label: 'Đã giao hàng'},
            {key: 'REJECTED', value: 'rejected', label: 'Bị hủy'}
        ])
        .constant('BILL_GROUP', {
                'SELL_LEASE': 'waitConfirmed',
                'BUY_RENT': 'needConfirmed'
            }
        )
        .constant('BILL_TAB', {
                'NEED_CONFIRM': 'unconfirmed',
                'WAIT_CONFIRM': 'unconfirmed',
                'CONFIRMED': 'confirmed',
                'REJECTED': 'rejected'
            }
        )
})();
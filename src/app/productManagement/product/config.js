(function () {
    'use strict';

    angular.module('biddy.productManagement.product')
        .constant('MODES', [
            {key: 'PUBLISHED', value: 'published', label: 'Đăng', translateLabel: 'published', ticked: true},
            {key: 'DRAFT', value: 'draft', label: 'Chưa đăng', translateLabel: 'draft', ticked: true}

        ])
        .constant('BUSINESS_RULES', [
            {key: 'BIDDING', value: 'bidding', label: 'Cho phép', translateLabel: 'bidding', ticked: true},
            {key: 'NO_BIDDING', value: 'no_bidding', label: 'Không cho phép', translateLabel: 'no_bidding', ticked: true}
        ])
        .constant('BUSINESS_SETTINGS', [
            {key: 'SELL', value: 'sell', label: 'Bán', translateLabel: 'sell', ticked: true},
            {key: 'BUY', value: 'buy', label: 'Mua', translateLabel: 'buy', ticked: true},
            {key: 'RENT', value: 'rent', label: 'Thuê', translateLabel: 'rent', ticked: true},
            {key: 'LEASE', value: 'lease', label: 'Cho thuê', translateLabel: 'lease', ticked: true}
        ])
        .constant('VISIBILITIES', [
            {key: 'EVERYONE', value: 'everyone', label: 'Mọi người', translateLabel: 'everyone', ticked: true, icon: '<i class="material-icons small-icon">public</i>'},
            {key: 'CUSTOM_PRIVATE', value: 'customPrivate', label: 'Tùy chọn', translateLabel: 'customPrivate', ticked: true, icon: '<i class="material-icons small-icon">people</i>'},
            {key: 'PRIVATE', value: 'private', label: 'Chỉ mình tôi', translateLabel: 'private', ticked: true, icon: '<i class="material-icons small-icon">lock</i>'}
        ])
        .constant('COMMENT_VISIBILITIES', [
            {key: 'EVERYONE', value: 'everyone', label: 'Mọi người', translateLabel: 'everyone', ticked: true},
            {key: 'CUSTOM_PRIVATE', value: 'customPrivate', label: 'Tùy chọn', translateLabel: 'customPrivate', ticked: true},
            {key: 'PRIVATE', value: 'private', label: 'Chỉ mình tôi', translateLabel: 'private', ticked: true}
        ])
        .constant('VALIDATION_TIME', [
            {key: '1_WEEK', value: '1 week', label: '1 tuần', translateLabel: '1 week', ticked: true},
            {key: '2_WEEKS', value: '2 weeks', label: '2 tuần', translateLabel: '2 weeks', ticked: true},
            {key: '3_WEEKS', value: '3 weeks', label: '3 tuần', translateLabel: '3 weeks', ticked: true},
            {key: '1_MONTH', value: '1 month', label: '1 tháng', translateLabel: '1 month', ticked: true},
            {key: '2_MONTHS', value: '2 months', label: '2 tháng', translateLabel: '2 months', ticked: true},
            {key: '3_MONTHS', value: '3 months', label: '3 tháng', translateLabel: '3 months', ticked: true}
        ])
        .constant('BILL_STATUS', [
            {key: 'WaitAcceptingFromSeller', value: 'waitAcceptingFromSeller', label: 'Đợi người bán chấp nhận', translateLabel: 'waitAcceptingFromSeller', ticked: true},
            {key: 'PrepareProduct', value: 'prepareProduct', label: 'Chuẩn bị sản phẩm', translateLabel: 'prepareProduct', ticked: true},
            {key: 'BeingDelivered', value: 'beingDelivered', label: 'Sản phẩm đang gửi đi', translateLabel: 'beingDelivered', ticked: true},
            {key: 'Delivered', value: 'delivered', label: 'Đã giao', translateLabel: 'delivered', ticked: true},
            {key: 'Rejected', value: 'rejected', label: 'Hoàn trả', translateLabel: 'rejected', ticked: true}
        ])
        .constant('ALL', {key: 'ALL', value: null, label: 'Tất cả', translateLabel: 'ALL', ticked: true})
        .constant('ALL_ACCOUNT', {key: 'ALL', value: null, username: 'Tất cả', label: 'Tất cả', ticked: true})
        .constant('DEFAULT_DETAIL_EDITOR', '')
    ;
})();
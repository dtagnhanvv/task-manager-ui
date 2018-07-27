(function () {
    'use strict';

    angular.module('biddy.bill')
        .factory('OutBillHelper', OutBillHelper)
    ;

    function OutBillHelper(billManager, sessionStorage) {
        return {
            getList: getList

        };

        /**
         *
         * @param param
         * @returns {*} Promise
         */
        function getList(param) {
            param.billGroup = 'waitConfirmed';
            param.account = sessionStorage.getUserId();
            return billManager.one().get(param);
        }

    }
})();
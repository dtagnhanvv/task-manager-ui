(function () {
    'use strict';

    angular.module('biddy.bill')
        .factory('IncomeBillHelper', IncomeBillHelper)
    ;

    function IncomeBillHelper(billManager, sessionStorage) {
        return {
            getList: getList

        };

        /**
         *
         * @param param
         * @returns {*} Promise
         */
        function getList(param) {
            param.billGroup = 'needConfirmed';
            param.account = sessionStorage.getUserId();
            return billManager.one().get(param);
        }

    }
})();
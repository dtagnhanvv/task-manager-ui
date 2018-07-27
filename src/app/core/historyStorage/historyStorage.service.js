(function() {
    'use strict';

    angular.module('biddy.core.historyStorage')
        .factory('historyStorage', historyStorage)
    ;

    function historyStorage($window, $stateParams, $location, $state, HISTORY_TYPE_PATH, HISTORY) {

        var api = {
            getLocationPath: getLocationPath,
            setParamsHistoryCurrent: setParamsHistoryCurrent,
            concatBaseState: concatBaseState
        };

        $window.localStorage[HISTORY] = $window.localStorage[HISTORY] || '{}';

        return api;

        function getLocationPath(type, state, paramDefault) {
            $window.localStorage[HISTORY] = $window.localStorage[HISTORY] || '{}';
            $state.current.reloadOnSearch = true;

            if(!!HISTORY_TYPE_PATH[type]) {
                return $state.go(state, angular.extend(_getHistoryParams(type), paramDefault));
            }

            console.log('not support type ' + type);
        }

        function setParamsHistoryCurrent(type) {
            $window.localStorage[HISTORY] = $window.localStorage[HISTORY] || '{}';
            var stateParam = _getStateParams();

            if(!!HISTORY_TYPE_PATH[type]) {
                return _setParamsHistoryCurrent(stateParam, type);
            }

            console.log('not support type ' + type);
        }

        function _setParamsHistoryCurrent(stateParam, type) {
            var tcHistory = angular.fromJson($window.localStorage[HISTORY]);
            tcHistory[type] = stateParam;
            $window.localStorage[HISTORY] = angular.toJson(tcHistory);
        }

        function _getStateParams() {
            var params = angular.copy($stateParams);
            var search = $location.search();

            angular.forEach(search, function(value, key) {
                params[key] = value;
            });

            return params;
        }

        function _getHistoryParams(historyParams) {
            if(!$window.localStorage[HISTORY]) {
                return null;
            }

            var params = angular.fromJson($window.localStorage[HISTORY])[historyParams];

            if(!!params) {
                params.uniqueRequestCacheBuster = Math.random();
            }
            if(!params) {
                params = {
                    uniqueRequestCacheBuster: Math.random()
                }
            }

            return params;
        }

        /**
         *
         * @param currentSate ex: app.account.s1.s2.s3
         * @param targetState ex: s1.a1.a2
         * @returns {*} ex app.account.s1.a1.a2
         */
        function concatBaseState(currentSate, targetState) {
            /**
             * app.adm | app.pub | app.sale => value is 2
             * @type {number}
             */
            const MIN_STEP = 2;
            if (!currentSate) return null;
            var currentSateArr = currentSate.split(".");
            if (!currentSateArr || currentSateArr.length < MIN_STEP) return null;
            var suffix = currentSateArr.slice(2, currentSateArr.length);// from index 2 to end
            var count = suffix.length;
            var symbols = [];
            for (var index = 0; index < count; index++){
                symbols.push('^.');
            }

            return symbols.join("") + targetState;
        }
    }
})();
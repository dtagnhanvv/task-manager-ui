(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .controller('BdAdvanceProductInfoCtrl', BdAdvanceProductInfoCtrl)
    ;

    function BdAdvanceProductInfoCtrl($scope, _, $stateParams, $translate, Auth, MODES, BUSINESS_RULES,
                                      VISIBILITIES, COMMENT_VISIBILITIES) {

        $scope.formData = {
            modes: MODES,
            businessRules: BUSINESS_RULES,
            visibilities: VISIBILITIES,
            commentVisibilities: COMMENT_VISIBILITIES
        };
        $scope.advance = $scope.advance || {
            address: null,
            mode: $scope.formData.modes[0].value,
            visibility: $scope.formData.visibilities[0].value,
            businessRule: $scope.formData.businessRules[0].value,
            commentVisibility: $scope.formData.commentVisibilities[0].value,
        };
    }
})();
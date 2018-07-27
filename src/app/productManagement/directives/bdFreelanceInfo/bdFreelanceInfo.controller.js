(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .controller('BdFreelanceInfoCtrl', BdFreelanceInfoCtrl)
    ;

    function BdFreelanceInfoCtrl($scope, _, $translate, Auth, SEX, AGE_RANGE) {

        $scope.formData = {
            SEX: SEX,
            AGE_RANGE: AGE_RANGE,
        };

        $scope.freelance = $scope.freelance || {
            gender: SEX[0].value,
            skills: [],
            ages: AGE_RANGE[0].value
        };
    }
})();
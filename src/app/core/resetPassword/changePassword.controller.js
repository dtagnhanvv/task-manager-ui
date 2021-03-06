(function () {
    'use strict';

    angular.module('biddy.core.resetPassword')
        .controller('ChangePassword', ChangePassword)
    ;

    function ChangePassword($scope, $translate, $state, Restangular, token, AlertService, publicRestangular) {
        $scope.password = null;
        $scope.repeatPassword = null;

        $scope.isFormValid = function() {
            return $scope.resetForm.$valid && $scope.password === $scope.repeatPassword;
        };

        $scope.changePassword = function() {
            publicRestangular.one('resetting').one('reset').one(token).customPOST({ biddy_user_system_account_resetting_form: { plainPassword: { first: $scope.password, second: $scope.repeatPassword }}})
                .then(
                function() {
                    AlertService.addFlash({
                        type: 'success',
                        message: $translate.instant('RESET_PASSWORD_MODULE.RESET_SUCCESS')
                    });

                    $state.go('login');
                },
                function(response) {
                    if(response.status = 404) {
                        AlertService.addAlert({
                            type: 'error',
                            message: $translate.instant('RESET_PASSWORD_MODULE.TOKEN_NOT_EXISTED', { token: token })
                        });
                    }

                    if(response.status = 408) {
                        AlertService.addAlert({
                            type: 'error',
                            message: $translate.instant('RESET_PASSWORD_MODULE.TOKEN_EXPIRED', { token: token })
                        });
                    }

                    else {
                        AlertService.addAlert({
                            type: 'error',
                            message: $translate.instant('RESET_PASSWORD_MODULE.INTERNAL_ERROR')
                        });
                    }
                })
            ;
        }
    }
})();
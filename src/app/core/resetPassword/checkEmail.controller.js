(function () {
    'use strict';

    angular.module('biddy.core.resetPassword')
        .controller('CheckEmail', CheckEmail)
    ;

    function CheckEmail($scope, $translate, publicRestangular, AlertService) {
        $scope.username = null;

        $scope.sendEmail = sendEmail;
        $scope.showForm = true;

        $scope.isFormValid = function() {
            return $scope.forgotPasswordForm.$valid && !!$scope.username;
        };

        function sendEmail() {
            publicRestangular.one('resetting').one('sendEmail').customPOST({username : $scope.username})
                .then(
                function(response) {
                    $scope.showForm = false;

                    AlertService.addAlert({
                        type: 'success',
                        message: $translate.instant('RESET_PASSWORD_MODULE.SEND_EMAIL_SUCCESS', {username: response})
                    })
                },
                function(response) {
                    if(response.status === 404) {
                        AlertService.addAlert({
                            type: 'error',
                            message: $translate.instant('RESET_PASSWORD_MODULE.SEND_EMAIL_FAIL', {username: $scope.username})
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
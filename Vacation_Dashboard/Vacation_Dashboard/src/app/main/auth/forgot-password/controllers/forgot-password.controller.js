(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.forgot-password')
        .controller('ForgotPasswordController', ForgotPasswordController)
        .controller('ToastCtrl', ToastCtrl);

    /** @ngInject */
    function ToastCtrl($scope, $mdToast, $mdDialog, $state) {
        $scope.closeToast = function () {
            if (isDlgOpen) return;

            $mdToast
                .hide()
                .then(function () {
                    isDlgOpen = false;
                });
        };

        //$scope.login = function (e) {
        //    if (isDlgOpen) return;
        //    isDlgOpen = true;

        //    $mdDialog
        //        .show($mdDialog
        //            .alert()
        //            .clickOutsideToClose(true)
        //            .title('Login')
        //            .textContent('Do you wnat to go to Login Page')
        //            .ariaLabel('More info')
        //            .ok('Go ahead!')
        //            .targetEvent(e)
        //        )
        //        .then(function () {
        //            $state.go("app.pages_auth_login-v2");
        //            isDlgOpen = false;
        //        });
        //};
    }

    /** @ngInject */
    function ForgotPasswordController($scope, AuthenticationService, $mdToast, $mdDialog)
    {
        $scope.PasswordRecovery = function () {
            AuthenticationService.RequestResetPasswordByEmail(forgotPasswordForm.email.value).then(function () { 
                $scope.showSuccessfulSendEmailForPasswordRecoveryToast();
            }, function (err) {
                $scope.showFailedSendEmailForPasswordRecoveryToast();
            });
        }
        // Data

        // Methods
        $scope.showSuccessfulSendEmailForPasswordRecoveryToast = function () {
            $mdToast.show({
                hideDelay: 5000,
                position: 'top right',
                controller: 'ToastCtrl', 
                templateUrl: 'app/main/toast-templates/forgot-password-send-email.html'

            });
        };

        //toast register information failed
        $scope.showFailedSendEmailForPasswordRecoveryToast = function () {
            $mdToast.show({
                hideDelay: 5000,
                position: 'top right',
                controller: 'ToastCtrl',
                templateUrl: 'app/main/toast-templates/forgot-password-error-send-email.html'

            });
        };
        //////////
    }
})();
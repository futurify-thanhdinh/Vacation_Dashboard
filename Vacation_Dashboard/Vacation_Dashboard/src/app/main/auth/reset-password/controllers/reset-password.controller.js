(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.reset-password')
        .controller('ResetPasswordController', ResetPasswordController);

    /** @ngInject */
    function ResetPasswordController($scope, AuthenticationService)
    {
        // Data

        // Methods
        $scope.ResetPasswordByEmail = function ()
        {
            var email = resetPasswordForm.email.value;
            var oldPassword = resetPasswordForm.oldPassword.value
            var newPassword = resetPasswordForm.newPassword.value;
            var confirmPassword = resetPasswordForm.passwordConfirm.value;
            var verifyCode = resetPasswordForm.VerificationCode.value;
            if (newPassword == confirmPassword)
            {
                AuthenticationService.ResetPasswordByEmail(email, verifyCode, oldPassword, newPassword);
            }
        }
        
        //////////
    }
})();
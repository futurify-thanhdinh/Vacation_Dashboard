(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register-v2')
        .controller('RegisterV2Controller', RegisterV2Controller);

    /** @ngInject */
    function RegisterV2Controller($scope, $http, SVCS)
    { 
        $scope.Register = function () {
            var firstName = registerForm.firstName.value;
            var lastName = registerForm.LastName.value;
            var email = registerForm.email.value;
            var password = registerForm.password.value;
            var passwordConfirm = registerForm.passwordConfirm.value;
            var data = { FirstName: firstName, LastName: lastName, Email: email, Password: password, PasswordConfirm: passwordConfirm }
        }

        var registerAccount = function (data)
        {
            $http.post(SVCS.Profile + "", data).then(function () {

            });
        }
        // Data

        // Methods

        //////////
    }
})();
(function () {
    'use strict';

    angular
        .module('app.pages.auth.login-v2')
        .controller('LoginV2Controller', LoginV2Controller);

    /** @ngInject */
    function LoginV2Controller($scope, $state, SVCS, $http, AuthenticationService, $timeout) {
        var ctrl = this;
       
        $scope.Remember;
        $scope.authenticate = function () {
            $state.go('app.sample');
            ctrl.error = null;
            ctrl.loggingIn = true;
            //console.log(loginForm.UserName.value);
            //console.log(loginForm.Password.value);
            //console.log($scope.Remember);
            AuthenticationService.SignInAsync(loginForm.UserName.value, loginForm.Password.value, $scope.Remember).then(function () {
                ctrl.loggingIn = false;

                if (AuthenticationService.Permissions.indexOf('CREATE_USER') != -1 && AuthenticationService.Permissions.length == 1) {
                    $state.go('app.sample');
                }  

            }, function (error) {
                $timeout(function () {
                    ctrl.loggingIn = false;
                    if (error && error.Code) {
                        switch (error.Code) {
                            case 'INCORRECT_LOGIN':
                                ctrl.error = { incorrect: true }
                                break;
                            default:
                                ctrl.error = { busy: true }
                                break;
                        }
                    } else {
                        ctrl.error = { busy: true }
                    }
                }, 300)
            })  
        }
         
    }
})();
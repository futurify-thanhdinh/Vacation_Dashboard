(function () {
    'use strict';

    angular
        .module('app.pages.auth.login-v2')
        .controller('LoginV2Controller', LoginV2Controller);

    /** @ngInject */
    function LoginV2Controller($scope, $state, SVCS, $http, AuthenticationService) {
        var ctrl = this;
        $scope.UserName;
        $scope.Password;
        $scope.Remember;
        $scope.authenticate = function (UserName, Password, Remember) {
            ctrl.error = null;
            ctrl.loggingIn = true;
            console.log(UserName);
            console.log(Password);
            AuthenticationService.SignInAsync(UserName, Password, Remember).then(function () {
                ctrl.loggingIn = false;

                if (AuthenticationService.Permissions.indexOf('CREATE_USER') != -1 && AuthenticationService.Permissions.length == 1) {
                    ctrl.error = { denied: true };
                    AuthenticationService.SignOut();
                } else {
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
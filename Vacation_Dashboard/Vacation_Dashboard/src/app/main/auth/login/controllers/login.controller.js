(function () {
    'use strict';

    angular
        .module('app.pages.auth.login-v2')
        .controller('LoginV2Controller', LoginV2Controller);

    /** @ngInject */
    function LoginV2Controller($scope, $state) {
        $scope.email = '';
        $scope.password;
        $scope.authenticate = function (email, pass) {
            $state.go('app.sample');
            console.log(email.$$rawModelValue);
            console.log(pass.$$rawModelValue);
        }
    }
})();
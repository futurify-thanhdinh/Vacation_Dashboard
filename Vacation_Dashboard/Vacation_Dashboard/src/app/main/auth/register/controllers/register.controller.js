(function ()
{
    'use strict';
    var isDlgOpen;
    angular
        .module('app.pages.auth.register-v2')
        .controller('RegisterV2Controller', RegisterV2Controller)
        .controller('ToastCtrl', ToastCtrl);
    /** @ngInject */
    function ToastCtrl($scope, $mdToast, $mdDialog, $state)
    {
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
    function RegisterV2Controller($scope, $http, SVCS, $element, AuthenticationService, ProfileService, $mdToast, $mdDialog, $state)
    { 

        $scope.Register = function () {
            var firstName = registerForm.firstName.value;
            var lastName = registerForm.LastName.value;
            var email = registerForm.email.value;
            var phoneNumber = registerForm.PhoneNumber.value;
            var position = registerForm.Position.value;
            var gender = registerForm.Gender.value;
            var DoB = $scope.BirthDay;
            var data = { FirstName: firstName, LastName: lastName, Email: email, PhoneNumber: phoneNumber, Gender: gender, Position: position, Birthday: DoB }
             
            console.log(data);
            AuthenticationService.registerAccount(data).then(function () {
                $scope.showSuccessfulRegisterToast();
                $state.go("app.pages_auth_login-v2");
            }, function (err) {
                $scope.showFailedRegisterToast();
            });
        }
        
        
        //position dropdown
        $scope.positions = [{ id: 1, value: 'Dev' }, { id: 2, value: 'Tester' }, { id: 3, value: 'Hr' }, { id: 4, value: 'BA' }, { id: 5, value: 'Marketting' }, { id: 1, value: 'Leader' }];
        $scope.searchTerm;
        $scope.clearSearchTerm = function () {
            $scope.searchTerm = '';
        }; 
        $element.find('input').on('keydown', function (ev) {
            ev.stopPropagation();
        }); 
        // gender dropdown
        $scope.genders = ['None', 'Male', 'Female', 'Others'];
        $scope.searchTerm;
        $scope.clearSearchTerm = function () {
            $scope.searchTerm = '';
        };
        $element.find('input').on('keydown', function (ev) {
            ev.stopPropagation();
        });
        $scope.show = function () {
            console.log("asdasd");
        }
        //toast register information success
        $scope.showSuccessfulRegisterToast = function () {
            $mdToast.show({
                hideDelay: 5000,
                position: 'top right',
                controller: 'ToastCtrl',
                templateUrl: 'app/main/toast-templates/register-toast-template.html'
                   
            });
        };

        //toast register information failed
        $scope.showFailedRegisterToast = function () {
            $mdToast.show({
                hideDelay: 5000,
                position: 'top right',
                controller: 'ToastCtrl',
                templateUrl: 'app/main/toast-templates/register-error-toast-template.html'

            });
        };

        //get positions 
        ProfileService.getPositions().then(function (data) {
            console.log(data);
        });
    }
})();
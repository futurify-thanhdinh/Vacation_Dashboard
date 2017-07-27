(function () {
    'use strict';

    angular
        .module('app.auth')
        .factory('AuthenticationService', AuthenticationService)
        .factory('HttpBearerTokenAuthorizationInterceptor', ['$cookies', function ($cookies) {
            return {
                'request': function (config) {
                    var accessToken = $cookies.get('access_token');
                    if (config.params && config.params.isExternalRequest) {
                        delete (config.params.isExternalRequest)
                    } else if (accessToken) {
                        config.headers.Authorization = 'bearer ' + accessToken;
                    }
                    return config;
                }
            }
        }]).config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('HttpBearerTokenAuthorizationInterceptor');
        }]);

    /** @ngInject */
    function AuthenticationService(SVCS, $cookies, $http, $q, $interval, $rootScope) {

        var baseUrl = SVCS.Auth;
        var accountUrl = baseUrl + "/api/account";

        var loadCurrentPromises = [];
        var loadCurrentProfilePromises = [];

        var service = {
            IsAuthenticated: false,
            AccessToken: null,
            Account: null,
            GetCurrentAsync: function () {
                var deferer = $q.defer();

                if (service.Account == null) {
                    loadCurrentPromises.push(deferer);
                } else {
                    deferer.resolve(service.Account);
                }

                return deferer.promise;
            },
            Permissions: [],
            SignInAsync: SignInAsync,
            SignOut: SignOut,
            HasPermissions: HasPermissions,
            ChangePasswordAsync: ChangePasswordAsync,
            GetProfileAsync: function () {
                var deferer = $q.defer();

                if (service.Profile == null) {
                    loadCurrentProfilePromises.push(deferer);
                } else {
                    deferer.resolve(service.Profile);
                }

                return deferer.promise;
            },
            RequestResetPasswordByPhoneNumber: RequestResetPasswordByPhoneNumber,
            RequestResetPasswordByEmail: RequestResetPasswordByEmail,
            VerifyPinCode: VerifyPinCode,
            ResetPasswordByPhoneNumber: ResetPasswordByPhoneNumber,
            ResetPasswordByEmail: ResetPasswordByEmail,
            Profile: null,
            registerAccount: registerAccount
        };

        $rootScope.$authSrv = service;

        function registerAccount(data)
        {
            var deferer = $q.defer();
            $http.post(SVCS.Auth + "/api/account/register", data).then(function () {
                deferer.resolve();
            }, function (error) {
                deferer.reject(error.data);
            });

            return deferer.promise;
        }


        function SignInAsync(userName, password, remember) {
            var deferer = $q.defer();
             

            $http.post(baseUrl + '/token', { username: userName, password: password }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                noBigBox: true,
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }).then(function (response) {
                console.log(response);
                _authenticate(response.data, remember);
                _syncPermissions(service.Account.Id).then(function () {
                    deferer.resolve();
                })

            }, function (error) {
                deferer.reject(error.data);
            })

            return deferer.promise;
        }

        function ChangePasswordAsync(model) {
            var deferer = $q.defer();

            $http.put(baseUrl + '/api/account/me/password', model).then(function () {
                deferer.resolve();
            }, function (error) {
                deferer.reject(error.data);
            })

            return deferer.promise;
        }

        function SignOut() {
            $cookies.remove('access_token');
            service.IsAuthenticated = false;
            service.AccessToken = null;
            service.Account = null;
            service.Profile = null
            service.Permissions = [];
        }

        function RequestResetPasswordByPhoneNumber(phoneNumber) {
            var deferer = $q.defer();

            $http.get(baseUrl + '/api/verification/reset-password/request?phoneNumber=' + phoneNumber).then(function () {
                deferer.resolve();
            }, function (error) {
                deferer.reject(error.data);
            })

            return deferer.promise;
        }

        function RequestResetPasswordByEmail(email) {
            var deferer = $q.defer();

            $http.get(accountUrl + '/RequestResetPasswordByEmail/' + email).then(function () {
                deferer.resolve();
            }, function (error) {
                deferer.reject(error.data);
            })

            return deferer.promise;
        }

        function VerifyPinCode(phoneNumber, pinCode) {
            var deferer = $q.defer();

            var model = { PhoneNumber: phoneNumber, PIN: pinCode };
            $http.post(baseUrl + '/api/verification/reset-password/verify', model).then(function (response) {
                deferer.resolve(response.data);
            }, function (error) {
                deferer.reject(error.data);
            })

            return deferer.promise;
        }

        function ResetPasswordByPhoneNumber(phoneNumber, pinCode, newPassword) {
            var deferer = $q.defer();

            var model = { PhoneNumber: phoneNumber, PIN: pinCode, NewPassword: newPassword };
            $http.put(baseUrl + '/api/account/reset-password', model).then(function () {
                deferer.resolve();
            }, function (error) {
                deferer.reject(error.data);
            })

            return deferer.promise;
        }

        function ResetPasswordByEmail(email, code, oldPassword, newPassword) {
            var deferer = $q.defer();

            var model = { Email: email, Code: code, OldPassword: oldPassword, NewPassword: newPassword };
            $http.put(baseUrl + '/api/account/reset-password/email', model).then(function () {
                deferer.resolve();
            }, function (error) {
                deferer.reject(error.data);
            })

            return deferer.promise;
        }

        function HasPermissions(permissions) {
            if (!service.IsAuthenticated) {
                return false;
            }
            else if (permissions && permissions.length) {
                if (!service.Permissions.length) {
                    return false;
                }
                for (var i = 0; i < permissions.length; i++) {
                    if (service.Permissions.indexOf(permissions[i]) != -1) {
                        return true;
                    }
                }
                return false;
            } else {
                return true;
            }
        }

        function _authenticate(signInResponse, remember) {
            var cookieOptions = {
                path: '/'
            };

            if (remember) {
                cookieOptions.expires = new Date(signInResponse.Expires);
            }

            $cookies.put('access_token', signInResponse.AccessToken, cookieOptions)
            service.AccessToken = signInResponse.AccessToken;
            service.Account = signInResponse.Account;
            service.IsAuthenticated = true;
        }

        var firstCheck = true;
        function _checkAuthentication() {
            service.AccessToken = $cookies.get('access_token');
            service.IsAuthenticated = service.AccessToken && firstCheck ? true : service.IsAuthenticated;
            if (service.AccessToken) {
                $http.get(baseUrl + '/api/account/is-me-authenticated', { hideAjaxLoader: true }).then(function (authenticated) {
                    service.IsAuthenticated = authenticated.data;
                    if (service.IsAuthenticated) {
                        if (!service.Account) {
                            $http.get(baseUrl + '/api/account/me', { hideAjaxLoader: true }).then(function (account) {
                                service.Account = account.data;
                                var deferer = loadCurrentPromises.pop();
                                while (deferer) {
                                    deferer.resolve(service.Account);
                                    deferer = loadCurrentPromises.pop();
                                }
                            })
                            _syncPermissions();
                        }
                    } else if (firstCheck) {
                        service.SignOut();
                        window.location.reload();
                    }
                    firstCheck = false;
                })
            }
        }

        function _syncPermissions(accountId) {
            if (service.IsAuthenticated) {
                return $http.get(baseUrl + '/api/account/me/permissions/' + accountId, { hideAjaxLoader: true }).then(function (permissions) {
                    console.log(permissions);
                    service.Permissions = permissions.data;
                    $rootScope.$emit('PERMISSIONS_LOADED');

                    if (service.Permissions.indexOf('RECRUITER') != -1) {
                        $http.get(SVCS.Profile + '/api/recruiters/me').then(function (profile) {
                            service.Profile = profile.data;
                            var deferer = loadCurrentProfilePromises.pop();
                            while (deferer) {
                                deferer.resolve(service.Profile);
                                deferer = loadCurrentProfilePromises.pop();
                            }
                        })
                    }
                })
            } else {
                var deferer = $q.defer();
                deferer.reject();
                return deferer.promise;
            }
        }

        //$interval(_checkAuthentication, 300000);
        //_checkAuthentication();

        return service;
    }
})();
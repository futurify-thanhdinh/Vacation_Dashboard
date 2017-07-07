(function ()
{
    'use strict';

    angular
        .module('vacation')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, $rootScope, $http)
    {
        // request
        $rootScope.ajax = {};

        //override $http.get
        $rootScope.ajax.get = function (url, successHandler, errorHandler) {
            
            $http.get(url).success(function (res) { 
                successHandler(res);
            }).error(function (error, status, header, config, statusText) {
                 
                if (error == null && status == 0) {
                    alert("Lost internet, please check internet connection again.");
                }
                else if (!errorHandler) {
                    if (status == 401) {
                        window.location = "/login";
                    }
                    else {
                        if ($.type(error) == 'string')
                            alert(error);
                        else {
                            console.log(error);
                            if (error.ExceptionMessage)
                                alert(error.ExceptionMessage);
                            else
                                alert('Connection to server is fail. Please reload page.');
                        }
                    }
                }
                else
                    errorHandler(error, status, header, config, statusText);
            })
        }

        //override $http.post method
        $rootScope.ajax.post = function (url, data, successHandler, errorHandler) {
           

            $http.post(url, data ).success(function (res) {
                 
                if (typeof successHandler != 'undefined' && successHandler != null)
                    successHandler(res);
            }).error(function (error, status, header, config, statusText) {
                 
                if (error == null && status == 0) {
                    alert("Lost internet, please check internet connection again.");
                }
                else if (!errorHandler) {
                    if (status == 401) {
                        window.location = "/login";
                    }
                    else if (status == 400) {//bad request
                        alert(error);
                    }
                    else {
                        if (error.ExceptionMessage)
                            alert(error.ExceptionMessage);
                        else
                            alert('Connection to server is fail. Please reload page.');
                    }
                }
                else
                    errorHandler(error, status, header, config, statusText);
            });
        };

        //override $http.push method
        $rootScope.ajax.put = function (url, data, successHandler, errorHandler) {
            
            
            $http.put(url, data).success(function (res) {
                if (typeof successHandler != 'undefined' && successHandler != null)
                    successHandler(res);
               
            }).error(function (error, status, header, config, statusText) {
                 
                if (error == null && status == 0) {
                    alert("Lost internet, please check internet connection again.");
                }
                else if (!errorHandler) {
                    if (status == 401) {
                        window.location = "/login";
                    }
                    else if (status == 400) {//bad request
                        alert(error);
                    }
                    else {
                        if ($.type(error) == 'string')
                            alert(error);
                        else {
                            if (error.ExceptionMessage)
                                alert(error.ExceptionMessage);
                            else
                                alert('Connection to server is fail. Please reload page.');
                        }
                    }
                }
                else
                    errorHandler(error, status, header, config, statusText);
            });
        };

        //override $http.delete method
        $rootScope.ajax.delete = function (url, data, successHandler, errorHandler) {
            
           
            $http.delete(url, data).success(function (res) {
                if (typeof successHandler != 'undefined' && successHandler != null)
                    successHandler(res);
                
            }).error(function (error, status, header, config, statusText) {
                 
                if (error == null && status == 0) {
                    alert("Lost internet, please check internet connection again.");
                }
                else if (!errorHandler) {
                    if (status == 401) {
                        window.location = "/Admin/Home/LogOn?ReturnUrl=%2f";
                    }
                    else if (status == 400) {//bad request
                        alert(error);
                    }
                    else {
                        if ($.type(error) == 'string')
                            alert(error);
                        else {
                            if (error.ExceptionMessage)
                                alert(error.ExceptionMessage);
                            else
                                alert('Connection to server is fail. Please reload page.');
                        }
                    }
                }
                else
                    errorHandler(error, status, header, config, statusText);
            });
        };

        //override $http.post method with formData object
        $rootScope.ajax.postFormData = function (url, formData, successHandler, errorHandler) {
            
            $http.post(url, formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined, 'Authorization': "Bearer " + get_cookie('access_token') }
            }).success(function (res) {
                if (typeof successHandler != 'undefined' && successHandler != null)
                    successHandler(res);
                
            }).error(function (error, status, header, config, statusText) {
                 
                if (error == null && status == 0) {
                    alert("Lost internet, please check internet connection again.");
                }
                else if (!errorHandler) {
                    if (status == 401) {
                        window.location = "/Admin/Home/LogOn?ReturnUrl=%2f";
                    }
                    else if (status == 400) {//bad request
                        alert(error);
                    }
                    else {
                        if (error.ExceptionMessage)
                            alert(error.ExceptionMessage);
                        else
                            alert('Connection to server is fail. Please reload page.');
                    }
                }
                else
                    errorHandler(error, status, header, config, statusText);
            });
        };
        //////////
        
        // Remove the splash screen
        $scope.$on('$viewContentAnimationEnded', function (event)
        {
            if ( event.targetScope.$id === $scope.$id )
            {
                $rootScope.$broadcast('msSplashScreen::remove');
            }
        });
    }
})();
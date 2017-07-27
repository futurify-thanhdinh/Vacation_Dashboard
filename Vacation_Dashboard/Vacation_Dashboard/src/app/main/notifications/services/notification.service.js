(function () {
    'use strict';

    angular
        .module('app.notification')
        .factory('NotificationServer', NotificationServer);

    /** @ngInject */
    function NotificationServer(SVCS, $cookies, $http, $q, $interval, $rootScope) {

        var baseUrl = SVCS.Notification + "/api/message";

        var loadCurrentPromises = [];
        var loadCurrentProfilePromises = [];

        var service = {
            
            sendEmailForPasswordRecovery: sendEmailForPasswordRecovery
            
        };

        function sendEmailForPasswordRecovery(email)
        {
            var deferer = $q.defer();
            $http.post(baseUrl + "/ForgotPassword/" + email, { Email: email }).then(function () {
                deferer.resolve();
            }, function (err) {
                deferer.reject(error.data);
            });
            return deferer.promise;
        }

        return service;
    }
})();
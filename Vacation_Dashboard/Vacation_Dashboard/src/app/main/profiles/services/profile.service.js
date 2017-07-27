(function () {
    'use strict';

    angular
        .module('app.profile')
        .factory('ProfileService', ProfileService);

    /** @ngInject */
    function ProfileService(SVCS, $cookies, $http, $q, $interval, $rootScope) {

        var baseUrl = SVCS.Profile;
        var PositionUrl = baseUrl + "/api/Position";
        var loadCurrentPromises = [];
        var loadCurrentProfilePromises = [];

        var service = {
              
            getPositions: getPositions
        };
         

        function getPositions() {
            var deferer = $q.defer();
            $http.get(PositionUrl + "/PositionList").then(function (data) {
                deferer.resolve(data);
            }, function (error) {
                deferer.reject(error.data);
            });

            return deferer.promise;
        }

  

        return service;
    }
})();
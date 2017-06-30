(function () {
    'use strict';

    angular
        .module('app.grant.user', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider) {
        // State
        $stateProvider.state('app.grant.user', {
            url: '/users',
            templateUrl: 'app/main/auth/grants/users/views/UserList.html',
            controller: 'UserController as utc'
                
        });


    }
})();
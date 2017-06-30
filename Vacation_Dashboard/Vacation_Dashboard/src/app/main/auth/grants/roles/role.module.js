(function () {
    'use strict';

    angular
        .module('app.grant.role', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider) {
        // State
        $stateProvider.state('app.grant.role', {
            url: '/roles',
            templateUrl: 'app/main/auth/grants/roles/views/RoleList.html',
            controller: 'RoleController as rtc'
                
        });


    }
})();
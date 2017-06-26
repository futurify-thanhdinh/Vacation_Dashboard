(function ()
{
    'use strict';

    angular
        .module('app.profile.employee', ['app.profile'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $locationProvider)
    {
        // State
        $stateProvider.state('app.profile.employee', {
            url      : '/employee',
            templateUrl: 'app/main/profiles/employees/views/EmployeeList.html',
            controller: 'EmployeeController as emc'
                
        });
        $locationProvider.html5Mode(true);
        
    }
})();
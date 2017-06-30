(function ()
{
    'use strict';

    angular
        .module('app.profile.employee', ['app.profile'])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider.state('app.profile.employee', {
            url      : '/employee',
            templateUrl: 'app/main/profiles/employees/views/EmployeeList.html',
            controller: 'EmployeeController',
            controllerAs : 'emc'
                
        });
         
        
    }
})();
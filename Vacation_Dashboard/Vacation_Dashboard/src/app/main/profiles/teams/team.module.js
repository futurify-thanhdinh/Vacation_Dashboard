(function ()
{
    'use strict';

    angular
        .module('app.team', ['app.profile'])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider.state('app.profile.team', {
            url      : '/teams',
            templateUrl: 'app/main/profiles/teams/views/TeamList.html',
            controller: 'TeamController as tmc'
                
        });
         
        
    }
})();
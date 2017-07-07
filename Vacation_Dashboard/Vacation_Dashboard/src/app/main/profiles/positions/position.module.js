(function ()
{
    'use strict';

    angular
        .module('app.profile.position', ['app.profile'])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider.state('app.profile.position', {
            url      : '/positions',
            templateUrl: 'app/main/profiles/positions/views/PositionList.html',
            controller: 'PositionController',
            controllerAs : 'pc'
                
        });
         
        
    }
})();
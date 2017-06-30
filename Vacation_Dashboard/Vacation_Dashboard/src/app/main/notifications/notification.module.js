(function ()
{
    'use strict';

    angular
        .module('app.notification', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider.state('app.notification', {
            url: '/notifications',
            views: {
                'content@app': {
                    templateUrl: 'app/main/notifications/views/NotificationList.html',
                    controller: 'NotificationController as noc'
                }
            } 
        });
         
    }
})();
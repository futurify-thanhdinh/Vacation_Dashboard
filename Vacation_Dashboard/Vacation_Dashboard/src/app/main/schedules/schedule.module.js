(function () {
    'use strict';

    angular
        .module('app.schedule', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider) {
        // State
        $stateProvider.state('app.schedule', {
            url: '/schedules',
            views: {
                'content@app': {
                    templateUrl: 'app/main/schedules/views/ScheduleList.html',
                    controller: 'ScheduleController as shc'
                }
            }
        });


    }
})();
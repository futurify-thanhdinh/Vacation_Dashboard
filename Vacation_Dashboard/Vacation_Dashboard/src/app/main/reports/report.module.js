(function () {
    'use strict';

    angular
        .module('app.report', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider) {
        // State
        $stateProvider.state('app.report', {
            url: '/reports',
            views: {
                'content@app': {
                    templateUrl: 'app/main/reports/views/Report.html',
                    controller: 'ReportController as rpc'
                }
            }
        });


    }
})();
(function () {
    'use strict';

    angular
        .module('app.grant', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider) {
        // State
        $stateProvider.state('app.grant', {
            url: '/grants',
            views: {
                'content@app': {
                    templateUrl: 'app/main/auth/grants/views/GrantList.html',
                    controller: 'GrantController as gtc'
                }
            }
        });


    }
})();
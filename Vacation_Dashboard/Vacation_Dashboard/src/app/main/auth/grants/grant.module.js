(function () {
    'use strict';

    angular
        .module('app.grant', ['app.grant.user', 'app.grant.role'])
        .config(config);

    /** @ngInject */
    function config($stateProvider) {
        // State
        $stateProvider.state('app.grant', {
            url: '/grants',
            views: {
                'content@app': {
                    template: '<div class="container-fluid" ui-view></div>'
                }
            }
        });


    }
})();
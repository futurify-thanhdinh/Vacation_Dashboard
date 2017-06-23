(function () {
    'use strict';

    angular
        .module('app.profile', ['app.profile.employee'])
        .config(config);

    /** @ngInject */
    function config($stateProvider) {
        // State
        $stateProvider.state('app.profile', {
            url: '/profile',
            views: {
                'content@app': {
                    template: '<div class="container-fluid" ui-view></div>'
                }
            }
        });


    }
})();
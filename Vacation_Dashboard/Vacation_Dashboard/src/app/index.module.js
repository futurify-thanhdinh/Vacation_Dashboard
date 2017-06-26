(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('vacation', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick Panel
            'app.quick-panel',

            // app module
            'app.sample',

            'app.profile',

            'app.profile.employee',

            'app.notification',

            'app.grant',

            'app.team',

            'app.report',

            'app.schedule'
        ]);
})();
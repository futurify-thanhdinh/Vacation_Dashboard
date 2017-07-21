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

            "kendo.directives",


            // app module
            'app.sample',

            'app.profile',

            'app.profile.employee',

            'app.notification',

            'app.grant',

            'app.team',

            'app.report',

            'app.schedule',

            'app.grant.role',

            'app.pages.auth.login-v2',

            'app.pages.auth.register-v2',

            'app.pages.auth.reset-password',

            'app.pages.auth.forgot-password',

            'app.profile.position',

            'app.auth'
        ]);
})();
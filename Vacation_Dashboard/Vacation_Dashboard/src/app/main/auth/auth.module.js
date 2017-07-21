(function () {
    'use strict';

    angular
        .module('app.auth', ['app.grant', 'app.pages.auth.register-v2', 'app.pages.auth.reset-password', 'app.pages.auth.forgot-password', 'app.pages.auth.login-v2'])
        .config(config);

    /** @ngInject */
    function config() {
        

    }

})();
﻿(function ()
{
    'use strict';

    angular
        .module('vacation')
        .config(config);

    /** @ngInject */
    function config($translateProvider, msNavigationServiceProvider)
    {
        // Put your common app configurations here
        // Navigation 
        msNavigationServiceProvider.saveItem('apps', {
            title: 'DASHBOARD',
            icon: 'icon-menu',
            group: true,
            weight: 1
        });

        // Apps.Grants
        msNavigationServiceProvider.saveItem('apps.grants', {
            title: 'Grants',
            icon: 'icon-lock-outline',
            state: 'app.grant',
            class: 'navigation-dashboards',
            weight: 1
        });

        // Apps.Profile
        msNavigationServiceProvider.saveItem('apps.profiles', {
            title: 'Profiles',
            icon: 'icon-account-box',
            class: 'navigation-dashboards',
            weight: 1
        });

        // Apps.Profile.Employee
        msNavigationServiceProvider.saveItem('apps.profiles.employees', {
            title: 'Employees',
            icon: 'icon-account',
            state: 'app.profile.employee',
            class: 'navigation-dashboards project-dashboard',
            weight: 1
        });

        // Apps.Profile.Team
        msNavigationServiceProvider.saveItem('apps.profiles.teams', {
            title: 'Teams',
            icon: 'icon-account-multiple',
            state: 'app.profile.team',
            class: 'navigation-dashboards project-dashboard',
            weight: 1
        });

        // Apps.Notification
        msNavigationServiceProvider.saveItem('apps.notifications', {
            title: 'Notifications',
            icon: 'icon-bell-outline',
            state: 'app.notification',
            class: 'navigation-dashboards',
            weight: 1
        });

        // Apps.Report
        msNavigationServiceProvider.saveItem('apps.reports', {
            title: 'Reports',
            icon: 'icon-chart-bar',
            state: 'app.report',
            class: 'navigation-dashboards',
            weight: 1
        });

        // Apps.Schedule
        msNavigationServiceProvider.saveItem('apps.schedules', {
            title: 'Schedules',
            icon: 'icon-timetable',
            state: 'app.schedule',
            class: 'navigation-dashboards',
            weight: 1
        });

        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');
    }

})();
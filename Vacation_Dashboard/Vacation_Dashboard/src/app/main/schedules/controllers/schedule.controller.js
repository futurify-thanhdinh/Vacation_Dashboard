(function () {
    'use strict';

    angular
        .module('app.schedule')
        .controller('ScheduleController', ScheduleController);

    /** @ngInject */
    function ScheduleController($scope, $http) {
        $scope.schedulerOptions = {
            date: new Date("2013/6/13"),
            startTime: new Date("2013/6/13 07:00 AM"),
            height: 600,
            views: [
                "day",
                { type: "workWeek", selected: true },
                "week",
                "month",
            ],
            timezone: "Etc/UTC",
            dataSource: {
                batch: true,
                transport: {
                    //read: {
                    //    url: "https://demos.telerik.com/kendo-ui/service/tasks",
                    //    dataType: "jsonp"
                    //},
                   
                    read: function (e) {
                        var data = [];
                        var beginDate = new Date("2017-07-11");
                        var endDate = new Date("2017-07-11");
                        data.push({
                            TaskId: 1,
                            Title: "ok",
                            Start: beginDate,
                            End: endDate,
                            StartTimezone: "Etc/UTC",
                            EndTimezone: "Etc/UTC",
                            Description: null,
                            RecurrenceId: null,
                            RecurrenceRule: null,
                            RecurrenceException: null,
                            OwnerId: null,
                            IsAllDay: false
                        });
                        e.success({ data: data });
                    },
                    update: {
                        url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
                        dataType: "jsonp"
                    },
                    create: {
                        url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
                        dataType: "jsonp"
                    },
                    destroy: {
                        url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
                        dataType: "jsonp"
                    } 
                },
                schema: {
                    total: 'total',
                    model: {
                        id: "taskId",
                        fields: {
                            taskId: { from: "TaskID", type: "number" },
                            title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                            start: { type: "date", from: "Start" },
                            end: { type: "date", from: "End" },
                            startTimezone: { from: "StartTimezone" },
                            endTimezone: { from: "EndTimezone" },
                            description: { from: "Description" },
                            recurrenceId: { from: "RecurrenceID" },
                            recurrenceRule: { from: "RecurrenceRule" },
                            recurrenceException: { from: "RecurrenceException" },
                            ownerId: { from: "OwnerID", defaultValue: 1 },
                            isAllDay: { type: "boolean", from: "IsAllDay" }
                        }
                    }
                },
                filter: {
                    logic: "or",
                    filters: [
                        { field: "ownerId", operator: "eq", value: 1 },
                        { field: "ownerId", operator: "eq", value: 2 }
                    ]
                }
            },
            resources: [
                {
                    field: "ownerId",
                    title: "Owner",
                    dataSource: [
                        { text: "Alex", value: 1, color: "#f8a398" },
                        { text: "Bob", value: 2, color: "#51a0ed" },
                        { text: "Charlie", value: 3, color: "#56ca85" }
                    ]
                }
            ]
        };

        console.log($scope.schedulerOptions.dataSource);
    }

})();
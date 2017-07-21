(function () {
    'use strict';

    angular
        .module('app.schedule')
        .controller('ScheduleController', ScheduleController);

    /** @ngInject */
    function ScheduleController($scope, $http, SVCS) {
        $scope.EmployeeId;
        $scope.setDateSource = function () {
            console.log($scope.EmployeeId);
            //getDataSource();
            //bindingData();
            $scope.dataSource = null;
             
            //$scope.dataSource.refresh();
            $scope.schedulerOptions = null;
            
        }
        $scope.employeesDataSource = {
            transport: {
                read: {
                    dataType: "json",
                    url: SVCS.Profile + 'api/Employee/GetScheduleOwners',
                }
            }
        };
        $scope.customOptions = {
            dataSource: $scope.employeesDataSource,
            dataTextField: "name",
            dataValueField: "id",
            value : -1,
            change: function (e) {
                var item = e.item;
                //var text = item.text();
                var employeeValue = this.value();
                //console.log(text);
                //console.log(this.value()); 
                $scope.EmployeeId = employeeValue;
                getDataSource();
                //bindingData();
                $scope.schedulerOptions = $scope.dataSource;
                //$scope.dataSource.filter({
                //    operator: function (task) {
                //        console.log(employeeValue);
                //        console.log("================");
                //        console.log(task.ownerId);
                //        //console.log($.inArray(task.ownerId, employeeValue));
                //        task.forEach(function (value) {
                //            if (value.ownerId == employeeValue)
                //            {
                //                //console.log("==========" + value.ownerId + "===========");
                //                return true;
                //            }
                //            //console.log(value);
                //        });
                //        return true;
                //        //return $.inArray(task.ownerId, employeeValue) >= 0;
                //        //return task.ownerId == employeeValue;
                //    }
                //});

                //$scope.dataSource.read();
                 
                //$scope.schedulerOptions.dataSource = $scope.dataSource;
                //console.log($scope.dataSource.filter.filters);
                // Use the selected item or its text
               
            }
        };
        //console.log($scope.customOptions);
        //var filters = {
        //    OwnerId : null
        //};
        $http.get(SVCS.Profile + 'api/Employee/GetScheduleOwners').then(function (owners) { 
            var data = [];
            owners.data.forEach(function (value) {
                data.push({
                    text: value.name,
                    value: value.id,
                    color: "#f8a398"
                });
            });
            $scope.owners = data; 
            getDataSource(); 
            bindingData(); 
        });
        var getDataSource = function () {
            $scope.dataSource = new kendo.data.SchedulerDataSource(
                {
                    batch: true,
                    transport: {
                        read: function (e) {
                            var data = [];
                            var EmployeeId = $scope.EmployeeId ? $scope.EmployeeId.toString() : '-1';
                            $http.get(SVCS.Schedule + "api/schedule/GetAllVacations/" + EmployeeId  , { responseType: "text" }).then(function (res) {
                                 
                                if (res.data) {
                                    res.data.forEach(function (event) {
                                        data.push({
                                            Id: event.id,
                                            eventId: event.id,
                                            title: event.title,
                                            start: event.start,
                                            end: event.end,
                                            description: event.description,
                                            ownerId: event.ownerId,
                                            isAllDay: event.isAllDay
                                        });
                                    });
                                    console.log(data);
                                    e.success({ data: data });
                                     
                                }
                            });
                        },
                        update: function (e) {
                            var createdEvent = e.data.models[e.data.models.length - 1];
                            console.log(createdEvent);
                            var data = { Id: createdEvent.eventId, Title: createdEvent.title, Start: createdEvent.start, End: createdEvent.end, OwnerId: createdEvent.ownerId, IsAllDay: createdEvent.isAllDay, Description: createdEvent.description };
                            $http.put(SVCS.Schedule + 'api/schedule/Update', data).then(function (res) {
                                var event = {
                                    Id: res.data.id,
                                    eventId: res.data.id,
                                    title: res.data.title,
                                    start: res.data.start,
                                    end: res.data.end,
                                    ownerId: res.data.ownerId,
                                    isAllDay: res.data.isAllDay,
                                    description: res.data.description
                                };
                               
                                console.log(event);
                                e.success({ data: event });
                            });
                        },
                        create: function (e) {
                            console.log(e.data.models);
                            var createdEvent = e.data.models[e.data.models.length - 1];
                            var data = { Id: createdEvent.Id, Title: createdEvent.title, Start: createdEvent.start, End: createdEvent.end, OwnerId: createdEvent.ownerId, IsAllDay: createdEvent.isAllDay, Description: createdEvent.description };
                            $http.post(SVCS.Schedule + 'api/schedule/Create', data).then(function (res) {


                                var event = {
                                    Id: res.data.id,
                                    eventId: res.data.id,
                                    title: res.data.title,
                                    start: res.data.start,
                                    end: res.data.end,
                                    ownerId: res.data.ownerId,
                                    isAllDay: res.data.isAllDay,
                                    description: res.data.description
                                };
                                console.log(event);
                                e.success({ data: event });

                            });
                             
                        },
                        destroy: function (e) {
                            console.log(e);
                            $http.delete(SVCS.Schedule + 'api/schedule/Delete/' + e.data.models[0].eventId).then(function (res) {
                                e.success({ data: res.data });
                            });
                            e.success();

                        }
                    },
                    schema: {
                        data: 'data',
                        model: {
                            id: "Id",
                            fields: {
                                Id: { from: "Id", type: "number" },
                                EventId: { from: "eventId", type: "number" },
                                title: { from: "title", defaultValue: "No title", validation: { required: true } },
                                start: { type: "date", from: "start" },
                                end: { type: "date", from: "end" },
                                description: { from: "description" },
                                ownerId: { from: "ownerId", defaultValue: 1 },
                                isAllDay: { type: "boolean", from: "isAllDay" }
                            }
                        }
                    },
                    filter: {
                        logic: "or",
                        filters: [
                            //{ field: "ownerId", operator: "eq", value: 1 },
                            //{ field: "ownerId", operator: "eq", value: 2 },
                            //{ field: "ownerId", operator: "eq", value: 3 }
                        ]
                    }
                    
                }
            );
        }     
        var bindingData = function () {
            
                $scope.schedulerOptions = { 
                    date: new Date(),
                    startTime: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 8, 0, 0),
                    endTime: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 20, 0, 0),
                    height: 700,
                    views: [
                        "day",
                        { type: "workWeek", selected: true}, 
                        "week",
                        "month",
                        "timeline"
                        
                    ],
                    timezone: "Etc/UTC",
                    dataSource: $scope.dataSource, 
                    resources: [
                        {
                            field: "ownerId",
                            title: "Owner", 
                            dataSource: $scope.owners
                        }
                    ]

                }
            } 
    };
        
        

})();
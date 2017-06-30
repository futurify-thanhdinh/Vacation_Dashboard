(function () {
    'use strict';

    angular
        .module('app.report')
        .controller('ReportController', ReportController);

    /** @ngInject */
    function ReportController($scope, $log) {
        $scope.dataSource = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    var data = [];
                    $scope.data.forEach(function (value) {
                        data.push({
                            Id: value.Id,
                            Year: value.Year,
                            Month: value.Month,
                            Employee: value.Employee,
                            RemainDay: value.RemainDay
                        });
                    });
                    e.success({ data: data, total: 3 });
                },
                create: function (e) {
                    e.success({ data: e.data });
                },
                update: function (e) {
                    e.success({ data: e.data });
                }
            },
            schema: {
                data: 'data',
                total: 'total',
                model: {
                    id: 'Id',
                    fields: {
                        Id: { type: "number", editable: false, nullable: false },
                        Year: { type: 'number', editable: false },
                        Month: { type: 'number', editable: false },
                        Employee: { type: 'string', editable: false },
                        RemainDay: { type: 'number', editable: false } 
                    }
                }
            },
            page: 1,
            pageSize: 50
        });
        
        $scope.ReportGridOptions = {
            dataSource: $scope.dataSource,
            sortable: {
                mode: "single",
                allowUnsort: false
            },
            scrollable: true,
            filterable: true,
            editable: false,
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            },
            pageable: {
                pageSizes: [10, 20, 50, "all"],
                messages: {
                    display: "Showing {0}-{1} in {2} records"
                }
            },
            columns: [
                {
                    title: "#",
                    template: "#= Id #",
                    width: 50,
                    headerAttributes: {
                        "class": "center",
                    },
                    attributes: {
                        "class": "center",
                    }
                },
                {
                    command: [
                        { name: "remove", template: '<a ng-click="delete(this, $event)" class="k-button k-button-icontext k-grid-edit"><span class="k-icon k-delete"></span>Delete</a>' }
                    ],
                    title: 'Action',
                    width: 100,
                    attributes: {
                        "class": "center",
                    }
                },
                {
                    field: "Year", title: "Year"
                },
                {
                    field: "Month", title: "Month" 
                }, {
                    field: "Employee", title: "Employee" 
                },  {
                    field: "RemainDay", title: "Remaining Day Off" 
                }]
        };

        $scope.data = [
            {
                Id: 1,
                Year: 2017,
                Month: 2,
                Employee: "thanh",
                RemainDay: 3
            },
            {
                Id: 2,
                Year: 2015,
                Month: 2,
                Employee: "tan",
                RemainDay: 2
            },
            {
                Id: 3,
                Year: 2016,
                Month: 3,
                Employee: "thao",
                RemainDay: 10
            }];

        $scope.delete = function (e, event) {
            var confirm = window.confirm('Do you want to delete this record?');
            if (!confirm)
                return false;
            //event.preventDefault();
            var dataItem = e.dataItem;
            //window.confirm('success', "Delete Success!");
            window.alert('success', "Delete Success!");
            $scope.dataSource.remove(dataItem);
        }
        // enable or disable filter
    }

})();
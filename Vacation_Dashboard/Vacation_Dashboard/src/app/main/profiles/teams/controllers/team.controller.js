(function () {
    'use strict';

    angular
        .module('app.team')
        .controller('TeamController', TeamController);

    /** @ngInject */
    function TeamController($scope, $log, $mdDialog, $rootScope) {

        $rootScope.ajax.get("http://localhost:65235/api/Team/GetAllEmployees", function (employees) {
            $scope.employees = employees;
            getTeamData();
            bindDataGrid();
        });

        var readonlyEditor = function (container, options) {
            if (options.field == 'Leader') {
                var input = $('<input data-text-field="name" data-value-field="id" data-bind="value:LeaderId"/>');
                input.appendTo(container)
                    .kendoDropDownList({
                        dataSource: $scope.employees,
                    });
            }
            else {
                var input = $('<select multiple="multiple" data-text-field="name" data-value-field="id" data-bind="value:MemberIds"/>');
                input.appendTo(container)
                    .kendoMultiSelect({
                        valuePrimitive: true,
                        autoClose: false,
                        dataSource: $scope.employees
                    });
            }
             
            
        };
        var getTeamData = function () {
            $scope.dataSource = new kendo.data.DataSource({
                transport: {
                    read: function (e) {

                        $rootScope.ajax.get("http://localhost:65235/api/Team/GetAllTeam", function (teams) {
                             
                            var data = [];
                            teams.forEach(function (value) {
                                var members = '';
                                var leader = '';
                                var memberids = [];
                                $scope.employees.forEach(function (employee) {
                                    if (value.memberIds.includes(employee.id)) {
                                        members += '-' + employee.name + '<br/>';
                                    }
                                });
                                $scope.employees.forEach(function (employee) {
                                    if (value.leaderId == employee.id) {
                                        leader = employee.name;
                                    }
                                });
                                data.push({
                                    Id: value.id,
                                    TeamName: value.name,
                                    Leader: leader,
                                    LeaderId: value.leaderId,
                                    MemberIds: value.memberIds,
                                    Members: members
                                });
                            });
                            e.success({ data: data, total: data.length });
                        });
                        
                    },
                    create: function (e) {
                        
                        var data = { Id: e.data.Id, TeamName: e.data.TeamName, LeaderId: e.data.LeaderId, MemberIds: e.data.MemberIds, Description: e.data.Description };
                        $rootScope.ajax.post("http://localhost:65235/api/Team/Create", data, function (team) {
                            
                            var members = '';
                            var leader = '';
                            $scope.employees.forEach(function (value) {
                                if (e.data.MemberIds.includes(value.id)) {
                                    members += '-' + value.name + '<br/>';
                                }
                            });
                            $scope.employees.forEach(function (value) {
                                if (e.data.LeaderId == value.id) {
                                  leader = value.name;
                                }
                            });
                            e.data.Members = members;
                            e.data.Leader = leader;
                            
                            e.success({ data: e.data });
                             
                        }); 
                    },
                    update: function (e) {
                        console.log(e.data);
                        var data = { Id: e.data.Id, TeamName: e.data.TeamName, LeaderId: e.data.LeaderId, MemberIds: e.data.MemberIds };
                        $rootScope.ajax.put("http://localhost:65235/api/Team/UpdateInfo", data, function (team) {
                            console.log(team); 
                            $scope.dataSource.read();
                        });
                        //var members = '';
                        //var leader = '';
                        //$scope.employees.forEach(function (value) {
                        //    if (data.MemberIds.includes(value.id)) {
                        //        members += '-' + value.name + '<br/>';
                        //    }
                        //});
                        //$scope.employees.forEach(function (value) {
                        //    if (data.LeaderId == value.id) {
                        //        leader = value.name;
                        //    }
                        //});
                        //e.data.Members = members;
                        //e.data.Leader = leader;
                        //console.log(data);
                        //e.success({ data: data });
                    }
                },
                schema: {
                    data: 'data',
                    total: 'total',
                    model: {
                        id: 'Id',
                        fields: {
                            Id: { type: "number", editable: false, nullable: false },
                            TeamName: { type: 'string', editable: true },
                            Leader: { type: 'string', editable: true },
                            LeaderId: { type: 'number', editable: true },
                            MemberIds: { type: 'object', editable: true },
                            Members: { type: 'string', editable: true }
                        }
                    }
                },
                page: 1,
                pageSize: 50
            });
        }

        var bindDataGrid = function () {
            $scope.TeamGridOptions = {
                dataSource: $scope.dataSource,
                toolbar: [{ name: "create", text: "Add New Team" }],
                sortable: {
                    mode: "single",
                    allowUnsort: false
                },
                scrollable: true,
                filterable: true,
                editable: 'inline',
                dataBound: function () {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                pageable: {
                    pageSizes: [10, 20, 50, "all"],
                    messages: {
                        display: "Showing {0}-{1} in {2} records"
                    }
                },
                columnMenu: true,
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
                            { name: 'edit', title: 'Edit' },
                            { name: "remove", template: '<a ng-click="delete(this, $event)" class="k-button k-button-icontext k-grid-edit"><span class="k-icon k-delete"></span>Delete</a>' }
                        ],
                        title: 'Action',
                        width: 200,
                        attributes: {
                            "class": "center",
                        }
                    },
                    {
                        field: "TeamName", title: "Team Name"
                    },
                    {
                        field: "Leader", title: "Leader", editor: readonlyEditor
                    },
                    {
                        field: "Members", title: "Members", editor: readonlyEditor, encoded: false
                    }]
            };
        }
       
        

        $scope.data = [
            {
                Id: 1,
                TeamName: "dinh",
                Leader: "thanh",
                Members: [{ id: 1, name: "thanh" }, { id: 2, name: "uyen" }, { id: 3, name: "hung" }],
                MemberQuantity: 2,
                Description: "2015-12-22",
            },
            {
                Id: 1,
                TeamName: "dinh",
                Leader: "thanh",
                Members: [{ id: 1, name: "thanh" }, { id: 2, name: "uyen" }, { id: 3, name: "hung" }],
                MemberQuantity: 2,
                Description: "2015-12-22"
            },
            {
                Id: 1,
                TeamName: "dinh",
                Leader: "thanh",
                MemberQuantity: 2,
                Members: [{ id: 1, name: "thanh" }, { id: 2, name: "uyen" }, { id: 3, name: "hung" }],
                Description: "2015-12-22"
            }];

        $scope.delete = function (e, event) {
            var confirm = window.confirm('Do you want to delete this employee?');
            if (!confirm)
                return false;
            //event.preventDefault();
            var dataItem = e.dataItem;
           
            window.alert('success', "Delete Success!");
            $scope.dataSource.remove(dataItem);
        }
         
        $scope.showDialog = showDialog;
        var alert;
        function showDialog($event) {
            var parentEl = angular.element(document.querySelector('md-content'));
            alert = $mdDialog.alert({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: 'dialog.template.html',
                clickOutsideToClose: true,
                locals: {
                    items: $scope.items,
                    closeDialog: $scope.closeDialog
                },
                bindToController: true,
                controllerAs: 'ctrl',
                controller: 'TeamController'
            });

            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
        }

        $scope.closeDialog = closeDialog;

        function closeDialog() {
            $mdDialog.hide();
        }

        $scope.leaders = [{ id: 1, value: "tan" }, { id: 2, value: "hoang" }];
        $scope.teams = [{ id: 1, value: "test" }, { id: 2, value: "dev" }];
        $scope.members = [{ id: 1, value: "nhan" }, { id: 2, value: "vu" }, { id: 3, value: "thi" }, { id: 4, value: "uyen" }];
        $scope.team = {};
        $scope.team.members = [];
        $scope.team.name = '';
        $scope.printSelectedMembers = function () {
            return $scope.team.members.join(', ');
        }


    }

})();
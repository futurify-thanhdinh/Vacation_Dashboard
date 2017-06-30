
(function () {
    'use strict';

    angular
        .module('app.grant.role')
        .controller('RoleController', RoleController);

    /** @ngInject */
    function RoleController($scope) {
        var readonlyEditor = function (container, options) {
            if (options.field == 'Permissions') {
                var input = $('<select multiple="multiple" data-text-field="name" data-value-field="id" data-bind="value:PermissionIds"/>');
                input.appendTo(container)
                    .kendoMultiSelect({
                        valuePrimitive: true,
                        autoClose: false,
                        dataSource: $scope.permissions
                    });
            } 
        };
        $scope.dataSource = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    var data = [];
                    $scope.roles.forEach(function (value) {
                        var permissionids = [];
                        var permissions = '';
                        value.Permissions.forEach(function (value) {
                            permissionids.push(value.id);
                            permissions += '-' + value.name + '<br/>';
                        });
                        data.push({
                            Id: value.Id,
                            Role: value.Role,
                            PermissionIds: permissionids,
                            Permissions: permissions
                        });
                        
                    }); 
                    e.success({ data: data, total: data.length });
                },
                create: function (e) {
                    var data = e.data;
                    var permissions = '';
                    $scope.permissions.forEach(function (value) {
                        if (data.PermissionIds.includes(value.id)) {
                            permissions += '-' + value.name + '<br/>';
                        }
                    });
                    data.Permissions = permissions;
                    
                    e.success({ data: data });
                    
                },
                update: function (e) {
                    var data = e.data;
                    var permissions = '';
                    $scope.permissions.forEach(function (value) {
                        if (data.PermissionIds.includes(value.id)) {
                            permissions += '-' + value.name + '<br/>';
                        }
                    });
                    data.Permissions = permissions;

                    e.success({ data: data });
                }
            },
            schema: {
                data: 'data',
                total: 'total',
                model: {
                    id: 'Id',
                    fields: {
                        Id: { type: "number", editable: false, nullable: false },
                        Role: { type: 'string', editable: true },
                        PermissionIds: { type: 'object', editable: true },
                        Permissions: { type: 'string', editable: true }
                    }
                }
            },
            page: 1,
            pageSize: 50
        });

        $scope.RoleOptions = {
            dataSource: $scope.dataSource,
            toolbar: [{ name: "create", text: "Add New Role" }],
            sortable: true,
            pageable: true,
            filterable: true,
            editable: 'inline',
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row").first());
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
                    field: "Role",
                    title: "Role",
                    editable: true
                }, {
                    field: "Permissions",
                    title: "Permission", 
                    encoded: false,
                    editor: readonlyEditor
                }]
        };
        $scope.roles = [{
            Id: 1,
            Role: "2015-02-22",
            Permissions: [{ id: 1, name: "Admin" }, { id: 2, name: "Manager" }, { id: 3, name: "Staff" }]
        },
        {
            Id: 1,
            Role: "2015-02-22",
            Permissions: [{ id: 1, name: "Admin" }, { id: 2, name: "Manager" }, { id: 3, name: "Staff" }]
        },
        {
            Id: 1,
            Role: "2015-02-22",
            Permissions: [{ id: 1, name: "Admin" }, { id: 2, name: "Manager" }, { id: 3, name: "Staff" }]
        }];

        $scope.permissions = [{ id: 1, name: "Admin" }, { id: 2, name: "Manager" }, { id: 3, name: "Staff" }];
        $scope.delete = function (e, event) {
            var confirm = window.confirm('Do you want to delete this role?');
            if (!confirm)
                return false;
            //event.preventDefault();
            var dataItem = e.dataItem;
            //window.confirm('success', "Delete Success!");
            window.alert('success', "Delete Success!");
            $scope.dataSource.remove(dataItem);
        }
    }

})();
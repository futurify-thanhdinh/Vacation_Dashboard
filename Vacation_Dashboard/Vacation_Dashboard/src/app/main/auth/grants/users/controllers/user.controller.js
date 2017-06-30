
(function () {
    'use strict';

    angular
        .module('app.grant.user')
        .controller('UserController', UserController);

    /** @ngInject */
    function UserController($scope) {
        
        var readonlyEditor = function (container, options) {
            if (options.field == 'IsActive') {
                var input = $('<input data-text-field="value" data-value-field="value" data-bind="value:IsActive"/>');
                input.appendTo(container)
                    .kendoDropDownList({
                        dataSource: [{ value: true }, { value: false }]
                    });
            }
            else {
                var input = $('<input data-text-field="value" data-value-field="value" data-bind="value:IsActivated"/>');
                input.appendTo(container)
                    .kendoDropDownList({
                        dataSource: [{ value: true }, { value: false }]
                    });
            } 
        };
 
        $scope.dataSource = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    var data = [];
                    $scope.users.forEach(function (value) {
                       
                        data.push({
                            Id: value.Id,
                            User: value.User,
                            IsActive: value.IsActive,
                            IsActivated: value.IsActivated
                        });
                        
                    }); 
                    e.success({ data: data, total: data.length });
                },
                create: function (e)  {
                    
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
                        User: { type: 'string', editable: true },
                        IsActive: { type: 'boollean', editable: true },
                        IsActivated: { type: 'boollean', editable: true }
                    }
                }
            },
            page: 1,
            pageSize: 50
        });

        $scope.UserOptions = {
            dataSource: $scope.dataSource,
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
                    field: "User",
                    title: "User",
                    editable: true
                }, {
                    field: "IsActive",
                    title: "Active", 
                    encoded: false,
                    editor: readonlyEditor
                },
                {
                    field: "IsActivated",
                    title: "Activated",
                    encoded: false,
                    editor: readonlyEditor
                }]
        };
        $scope.users = [{
            Id: 1,
            User: "thanh",
            IsActive: false,
            IsActivated: false
        },
        {
            Id: 2,
            User: "dung",
            IsActive: true,
            IsActivated: false
        }, {
            Id: 3,
            User: "tri",
            IsActive: false,
            IsActivated: true
        }];

       
        $scope.delete = function (e, event) {
            var confirm = window.confirm('Do you want to delete this user?');
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
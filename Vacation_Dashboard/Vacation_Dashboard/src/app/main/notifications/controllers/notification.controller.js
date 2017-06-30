(function () {
    'use strict';



    angular
        .module('app.notification')
        .controller('NotificationController', NotificationController);
        
    /** @ngInject */
    function NotificationController($scope) {

        $scope.dataSource = new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    var data = [];
                    data.push({
                        Id: 1,
                        Date: "2015-02-22",
                        Content: "tạo thêm team mới",
                        Sender: "Tân Hoàng"
                    });

                    e.success({ data: data, total: data.length });
                }
            },
            schema: {
                data: 'data',
                total: 'total',
                model: {
                    id: 'Id',
                    fields: {
                        Id: { type: "number", editable: false, nullable: false },
                        Date: { type: 'date', editable: true },
                        Content: { type: 'string', editable: true },
                        Sender: { type: 'string', editable: true }
                    }
                }
            },
            page: 1,
            pageSize: 50
        });
        
        $scope.mainGridOptions = {
            dataSource: $scope.dataSource,
            sortable: true,
            pageable: true,
            filterable : true,
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
                    { name: "remove", template: '<a ng-click="delete(this, $event)" class="k-button k-button-icontext k-grid-edit"><span class="k-icon k-delete"></span>Delete</a>' }
                ],
                title: 'Action',
                width: 100,
                attributes: {
                    "class": "center",
                }
            },
            {
                field: "Date",
                title: "Date",
                width: "120px",
                format: "{0:dd/MM/yyyy}"
            }, {
                field: "Content",
                title: "Content"
            }, {
                field: "Sender",
                title : "Sender",
                width: "300px"
            }]
        }; 

        $scope.delete = function (e, event) {
            var confirm = window.confirm('Do you want to delete this notification?');
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
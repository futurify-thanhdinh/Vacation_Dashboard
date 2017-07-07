(function () {
    'use strict';

    angular
        .module('app.profile.position')
        .controller('PositionController', PositionController);

    /** @ngInject */
    function PositionController($scope, $log, $mdDialog, $rootScope, $http, $window) {
        $scope.baseUrl = "http://localhost:65235";
       
         
            $scope.dataSource = new kendo.data.DataSource({
                transport: {
                    read: function (e) {

                        var data = [];

                        $rootScope.ajax.get("http://localhost:65235/api/Position/PositionList", function (positions) { 
                            var position;
                            
                            positions.forEach(function (value) {
                                  
                                  data.push({
                                      Id: value.id,
                                      Name: value.name
                                  });
                            });
                            e.success({ data: data, total: data.length });
                        });

                    },
                    create: function (e) {
                        var data = { Id: e.data.Id, Name: e.data.Name};
                        $rootScope.ajax.post("http://localhost:65235/api/Position/Create", data, function (res) {
                            var resData = [];
                             
                            resData.push({
                                Id: res.id,
                                Name: res.name
                            });

                            $scope.dataSource.read(); 
                        });   
                    },
                    update: function (e) {
                        var data = { Id: e.data.Id, Name: e.data.Name };
                        $rootScope.ajax.put("http://localhost:65235/api/Position/UpdateInfo", data, function (res) {
                            var resData = []; 

                            resData.push({
                                Id: res.id,
                                Name: res.name
                            });
                             

                            e.success({ data: resData, total: resData.length });
                        }); 
                    }
                },
                schema: {
                    data: 'data',
                    total: 'total',
                    model: {
                        id: 'Id',
                        fields: {
                            Id: { type: "number", editable: false, nullable: false },
                            Name: { type: 'string', editable: true }
                        }
                    }
                },
                page: 1,
                pageSize: 5
            });
        

        
             $scope.PositionGridOptions = {
                dataSource: $scope.dataSource,
                toolbar: [{ name: "create", text: "Add New Position" }],
                sortable: true,
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
                        field: "Name", title: "Name"
                    }]
            }; 
        
        
         
         

        $scope.delete = function (e, event) {
            
            var confirm = window.confirm('Do you want to delete this position?');
            if (confirm) {
                $rootScope.ajax.delete("http://localhost:65235/api/Position/Delete/" + e.dataItem.Id, e.dataItem.Id, function (res) {
                    console.log(res);
                    var dataItem = e.dataItem;
                    if (res != 0)
                        window.alert('success', "Delete position Success!");
                    else
                        window.alert('Delete position ' + e.dataItem.Name + ' fail');
                    $scope.dataSource.read();
                });
                return true;
            }
            else
            {
                return false;
            }
             

        }
        // enable or disable filter
         

     
    }

})();
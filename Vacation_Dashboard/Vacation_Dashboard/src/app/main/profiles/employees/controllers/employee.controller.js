(function () {
    'use strict';

    angular
        .module('app.profile.employee')
        .controller('EmployeeController', EmployeeController);

    /** @ngInject */
    function EmployeeController($scope, $log, $mdDialog, $rootScope, $http, $window) {
        $scope.baseUrl = "http://localhost:65235";
        $rootScope.ajax.get("http://localhost:65235/api/Position/PositionList", function (positions) {
            $scope.positions = positions;
            getEmployeeData();
            bindDataGrid();
        });
        var readonlyEditor = function (container, options) {
            if (options.field == 'Gender') {
                var input = $('<input data-text-field="value" data-value-field="id" data-bind="value:GenderId"/>');
                input.appendTo(container)
                    .kendoDropDownList({
                        dataSource: $scope.genders
                    });
            }
            else if (options.field == 'Position') {
                var input = $('<input data-text-field="name" data-value-field="id" data-bind="value:PositionId"/>');
                input.appendTo(container)
                    .kendoDropDownList({
                        dataSource: $scope.positions
                    });
            }
            else {
                var input = $('<input type="file"/>');
                input.appendTo(container)
                    .kendoUpload({
                        multiple: true,
                        async: {
                            saveUrl: "http://localhost:65235/api/Employee/UploadAvatar/" + options.model.Id,
                            removeUrl: "remove",
                            autoUpload: false
                        },
                        upload: function (e) {

                            if (e.files.length > 1) {
                                $window.alert("Please select only 1 images.");
                                e.preventDefault();
                            }
                           
                            var extension = [".jpg", ".png", ".jpge"];
                            var files = e.files; 
                            // Check the extension of each file and abort the upload if it is not .jpg
                            files.forEach(function (value) {
                                if (!extension.includes(value.extension)) {
                                    $window.alert("Only .jpg, .png, .jpge files can be uploaded")
                                    e.preventDefault();
                                }
                            });
                        },
                        success: function (e) {
                            $window.alert("Upload Image " + e.files[0].name + " successfully");
                            $scope.dataSource.read();
                        },
                        error: function (e) {
                            $scope.dataSource.read();
                            $window.alert("Upload Image Fail");
                        },
                        select: function (e) {
                            if (e.files.length > 1) {
                                $window.alert("Please select only 1 images.");
                                e.preventDefault();
                            }
                        }
                    });
            }
        };
        var getEmployeeData = function () {
            $scope.dataSource = new kendo.data.DataSource({
                transport: {
                    read: function (e) {

                        var data = [];

                        $rootScope.ajax.get("http://localhost:65235/api/Employee/EmployeeList", function (employees) {
                            var position;
                            console.log(employees);
                            employees.forEach(function (value) {
                                  $scope.positions.forEach(function (pos) {
                                      if (pos.id == value.positionId)
                                          position = pos.name;
                                  });
                                  var gender;
                                  var genderid;
                                  $scope.genders.forEach(function (gen) {
                                      if (gen.id == value.gender)
                                      { 
                                          gender = gen.value;
                                          genderid = gen.id;
                                      }
                                  });
                                  data.push({
                                      Id: value.id,
                                      FirstName: value.firstName,
                                      LastName: value.lastName,
                                      GenderId: genderid,
                                      Gender: gender,
                                      BirthDate: value.birthDate,
                                      PositionId: value.positionId,
                                      Position: position,
                                      PhoneNumber: value.phoneNumber,
                                      Email: value.email,
                                      RemainDayOff: value.remainDayOff,
                                      Avatar: value.avatar
                                  });
                            });
                            e.success({ data: data, total: data.length });
                        });

                    },
                    create: function (e) {
                        var data = { Id: e.data.Id, FirstName: e.data.FirstName, LastName: e.data.LastName, BirthDate: e.data.BirthDate, Gender: e.data.GenderId, PositionId: e.data.PositionId, PhoneNumber: e.data.PhoneNumber, Email: e.data.Email, RemainDayOff: e.data.RemainDayOff, Avatar: e.data.Avatar };
                        $rootScope.ajax.post("http://localhost:65235/api/Employee/Create", data, function (res) {
                            var resData = [];
                            var position;
                            var gender;
                            var genderid;
                            $window.alert("Created New Employee Successfully"); 

                            $scope.positions.forEach(function (pos) {
                                if (pos.id == res.positionId)
                                    position = pos.name;
                            });
                            $scope.genders.forEach(function (gen) {
                                if (gen.id == res.gender) {
                                    gender = gen.value;
                                    genderid = gen.id;
                                }
                            });
                            resData.push({
                                Id: res.id,
                                FirstName: res.firstName,
                                LastName: res.lastName,
                                GenderId: genderid,
                                Gender: gender,
                                BirthDate: res.birthDate,
                                PositionId: res.positionId,
                                Position: position,
                                PhoneNumber: res.phoneNumber,
                                Email: res.email,
                                RemainDayOff: 12,
                                Avatar: res.avatar
                            });

                            $scope.dataSource.read();
                            //e.success({ data: resData });
                        });   
                    },
                    update: function (e) {
                        var data = { Id: e.data.Id, FirstName: e.data.FirstName, LastName: e.data.LastName, BirthDate: e.data.BirthDate, Gender: e.data.GenderId, PositionId: e.data.PositionId, PhoneNumber: e.data.PhoneNumber, Email: e.data.Email, RemainDayOff: e.data.RemainDayOff, Avatar: e.data.Avatar };
                        $rootScope.ajax.put("http://localhost:65235/api/Employee/UpdateInfo", data, function (res) {
                            var resData = [];
                            var position;
                            var gender;
                            var genderid;
                            $window.alert("Updated Employee Infomation Successfully");
                            console.log(res);
                           
                            $scope.positions.forEach(function (pos) {
                                if (pos.id == res.positionId)
                                    position = pos.name;
                            }); 
                            $scope.genders.forEach(function (gen) {
                                if (gen.id == res.gender) {
                                    gender = gen.value;
                                    genderid = gen.id;
                                }
                            });
                            resData.push({
                                Id: res.id,
                                FirstName: res.firstName,
                                LastName: res.lastName,
                                GenderId: genderid,
                                Gender: gender,
                                BirthDate: res.birthDate,
                                PositionId: res.positionId,
                                Position: position,
                                PhoneNumber: res.phoneNumber,
                                Email: res.email,
                                RemainDayOff: res.remainDayOff,
                                Avatar: res.avatar
                            });
                            
                           
                            e.success({ data: resData });
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
                            FirstName: { type: 'string', editable: true },
                            LastName: { type: 'string', editable: true },
                            GenderId: { type: 'number', editable: true },
                            Gender: { type: 'string', editable: true },
                            BirthDate: { type: 'date', editable: true },
                            PositionId: { type: 'number', editable: true },
                            Position: { type: 'string', editable: true },
                            PhoneNumber: { type: 'string', editable: true },
                            Email: { type: 'string', editable: true },
                            RemainDayOff: { type: 'number', editable: false },
                            Avatar: { type: 'string', editable: true }
                        }
                    }
                },
                page: 1,
                pageSize: 5
            });
        }

        var bindDataGrid = function () {
            $scope.EmployeeGridOptions = {
                dataSource: $scope.dataSource,
                toolbar: [{ name: "create", text: "Add New Employee" }],
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
                        field: "Avatar", title: "Avatar", template: "<img src='" + $scope.baseUrl + "#=Avatar #' />", editor: readonlyEditor, width: 200, filterable: false, sortable: false
                    },
                    {
                        field: "FirstName", title: "First Name"
                    }, {
                        field: "LastName", title: "Last Name"
                    }, {
                        field: "Gender", title: "Gender", editor: readonlyEditor, filterable: {
                            cell: {
                                enabled: true,
                                template: function (args) {
                                    args.element.kendoDropDownList({
                                        dataSource: new kendo.data.DataSource({
                                            data: [
                                                { gender: "Male" },
                                                { gender: "Female" }
                                            ]
                                        }),
                                        dataTextField: "gender",
                                        dataValueField: "gender",
                                        valuePrimitive: true
                                    });
                                },
                                showOperators: false
                            }
                        }
                    }, {
                        field: "BirthDate", title: "Date Of Birth",
                        format: "{0:dd/MM/yyyy}",
                        filterable: {
                            ui: "datetimepicker"
                        }
                    }, {
                        field: "Position", title: "Position", editor: readonlyEditor
                    }, {
                        field: "PhoneNumber", title: "Phone Number"
                    }, {
                        field: "Email", title: "Email"
                    }, {
                        field: "RemainDayOff", title: "Remain Day Off"
                    }]
            }; 
        } 
        
         
        $scope.data = [
        {
            Id : 1,
            FirstName: "dinh",
            LastName: "thanh",
            Gender: "Male",
            BirthDay: "2015-12-22",
            PositionId : 1,
            Position: "dev",
            PhoneNumber: "564647654",
            Email: "dinhvanthanh1995@gmail.com",
            RemainDayOff: 3,
            Avatar: "alice.jpg"
        },
        {
            Id: 2,
            FirstName: "tan",
            LastName: "hoang",
            Gender: "Male",
            BirthDay: "2015-12-22",
            PositionId : 2,
            Position: "dev",
            PhoneNumber: "564647654",
            Email: "dinhvanthanh1995@gmail.com",
            RemainDayOff: 3,
            Avatar: "alice.jpg"
        },
        {
            Id: 3,
            FirstName: "thu",
            LastName: "thao",
            Gender: "Male",
            BirthDay: "2015-12-22",
            PositionId : 3,
            Position: "dev",
            PhoneNumber: "564647654",
            Email: "dinhvanthanh1995@gmail.com",
            RemainDayOff: 3,
            Avatar: "alice.jpg"
        }];

        $scope.delete = function (e, event) {
            
            var confirm = window.confirm('Do you want to delete this employee?');
            if (confirm) {
                $rootScope.ajax.delete("http://localhost:65235/api/Employee/Delete/" + e.dataItem.Id, e.dataItem.Id, function (res) {
                    console.log(res);
                    var dataItem = e.dataItem;
                    window.alert('success', "Delete employee Success!"); 
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
                controller: 'EmployeeController'
            });

            $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
        }
        $scope.closeDialog = closeDialog;

        function closeDialog()
        {
            $mdDialog.hide();
        }

        $scope.user = {};

        $scope.genders = [{ id: 1, value: "Male" }, { id: 0, value: "Female" }];

        

     
    }

})();
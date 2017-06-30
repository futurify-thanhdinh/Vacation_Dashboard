(function ()
{
    'use strict';

    angular
        .module('app.sample')
        .controller('SampleController', SampleController);

    /** @ngInject */
    function SampleController(SampleData, $rootScope)
    {
        var vm = this;
        
        $rootScope.ajax.get("http://localhost:65235/api/values", function (res) {
            console.log(res);
        });
        // Data
        vm.helloText = SampleData.data.helloText;
         
        // Methods

        //////////
    }
})();

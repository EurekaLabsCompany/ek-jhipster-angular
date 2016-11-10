(function(){
  'use strict';

  angular.module('ek-jhipster-angular').service('Dialog', Dialog);

  Dialog.$inject = ['$timeout'];
  function Dialog($timeout){
    var vm = this;

      vm.configDialog   = configDialog;

      function configDialog(controller, $scope, service, $uibModalInstance){

        if(angular.isFunction(controller.getItem) == false){
          throw new Error('You need to add the function "getItem" to your controller with association');
        }

        controller.initializeDialogItem = initializeDialogItem;
        controller.initializeFocus      = initializeFocus;
        controller.clear                = clear;

        controller.initializeDialogItem();
        $timeout(controller.initializeFocus, 100);

        function initializeDialogItem(){
          (controller.initializeItem || angular.noop)(controller.getItem());
        }

        function initializeFocus(){
             angular.element('.form-group:eq(0)>input').focus();
        }

        function clear () {
            $uibModalInstance.close(controller.getItem());
        }      

      }


    return vm;
  }
})();

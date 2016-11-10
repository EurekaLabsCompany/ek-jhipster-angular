(function(){

    'use strict'
    angular.module('ek-jhipster-angular').factory('ChildFormController', ChildFormControllerFactory);

    function ChildFormControllerFactory() {

      function ChildFormController($scope, service){
        var vm = this;
        vm.$service = service;
        vm.$scope   = $scope;

        vm.$scope.$watch('itemId', angular.bind(vm, initialize));

        vm.initialize();
      }

      ChildFormController.extend = extend;

      function extend (controller) {
        controller.prototype.get          = get;
        controller.prototype.save         = save;
        controller.prototype.cancel       = cancel;
        controller.prototype.initialize   = initialize;

        controller.prototype.constructor = controller;
      }

      function initialize(){
        var vm = this;
        if(angular.isDefined(vm.$scope.itemId)){
          vm.get(vm.$scope.itemId);
        }else{
          vm.data = vm.data || {};
          (vm.initializeItem || angular.noop)(vm.data);
        }
      }

      function get(itemId){
        var vm = this;
        vm.$service.get({id: itemId}).$promise.then(onGetSuccess);
        

        function onGetSuccess(item){
          vm.data = item;
          (vm.afterLoadItem || angular.noop)(vm.data);
        }
      }

      function save(){
        var vm = this;
        var dataClone = angular.copy(vm.data);
        dataClone[vm.$scope.mapedBy] = vm.$scope.parentItem;
        vm.isSaving = true;
        if (vm.beforeSave) {
            dataClone = vm.beforeSave(dataClone);
        }
        if(angular.isDefined(vm.data.id)){
          vm.$service.update(dataClone, saveSuccess, saveError);
        }else{
          vm.$service.save(dataClone, saveSuccess, saveError);
        }


        function saveSuccess(data){
          vm.isSaving = false;
          vm.$scope.onSave({data:data});
        }

        function saveError() {
          vm.isSaving = false;
        }
      }

      function cancel(){
        var vm = this;
        vm.$scope.onCancel();
      }


      return ChildFormController;
    }
})();

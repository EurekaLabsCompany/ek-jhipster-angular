(function(){

    'use strict'
    angular.module('ek-jhipster-angular').factory('ChildListController', ChildListControllerFactory);

    function ChildListControllerFactory() {
      
      function ChildListController($scope, service){
        var vm = this;
        vm.$service = service;
        vm.$scope   = $scope;
      }

      ChildListController.extend = extend;

      function extend (controller) {
        controller.prototype.deleteItem  = deleteItem;    
        controller.prototype.editItem    = editItem;   
        controller.prototype.constructor = controller;
      }

      function deleteItem(itemId){
        var vm = this;
        vm.$service.delete({id: itemId}, deleteItemSuccess);     

        function deleteItemSuccess(data){
          vm.$scope.onDelete({data:data});
        }        
      }

      function editItem(itemId){
        var vm = this;
        vm.$scope.onEdit({id: itemId});
      }

     
      return ChildListController;
    }
})();
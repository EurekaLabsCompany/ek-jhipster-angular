(function(){
  'use strict';

  angular.module('ek-jhipster-angular').service('AssociationList', AssociationList);

  AssociationList.$inject = ['$state', '$timeout'];
  function AssociationList($state, $timeout){
    var vm = this;

      vm.configAssociations   = configAssociations;

      function configAssociations(controller, $scope, service, $uibModalInstance){

        if(angular.isFunction(controller.getItem) == false){
          throw new Error('You need to add the function "getItem" to your controller with association');
        }

        controller.getChildList               = getChildList;
        controller.getChildAssociation        = getChildAssociation;
        controller.toggleAssociationMode      = toggleAssociationMode;
        controller.afterSaveAssociation       = afterSaveAssociation;
        controller.navigateToAssociationForm  = navigateToAssociationForm;
        controller.save                       = save;
        controller.associations               = {};
        controller.state                      = controller.getItem().id != null ? 'update' : 'create';
        $scope.options                        = $scope.options || {};


        function save () {
            controller.isSaving = true;
            if (controller.getItem().id !== null) {
                service.update(controller.getItem(), onSaveSuccess, onSaveError);
            } else {
                service.save(controller.getItem(), onSaveSuccess, onSaveError);
            }
        }

        function onSaveError () {
            controller.isSaving = false;
        }

        function onSaveSuccess(item){
          controller.isSaving = false;
          var toState = $state.current.name;
          
          if(toState.indexOf('.edit') >= 0) 
              return;

          $uibModalInstance.close(item);

          toState = toState.replace('.new', '.edit');
          $timeout(editSavedItem);

          function editSavedItem(){
            $state.go(toState, {id: item.id})
          }

        }

        function getChildList(associationName){
          var itemId = controller.getItem().id;

          if(itemId != undefined){
            controller[associationName] = service.loadListOf({id: itemId, list: associationName});
          }
        }

        function getChildAssociation(associationName){
          var itemId = controller.getItem().id;
         
          if(itemId != undefined){
            controller.getItem()[associationName] = service.loadAssociationOf({id: itemId, list: associationName});
          }
        }

         function toggleAssociationMode(associationName){
            var association = getAssociationByName(associationName);
            association.mode = association.mode == 'list' ? 'form' : 'list';
         }

         function afterSaveAssociation(associationName){
            toggleAssociationMode(associationName);
            controller.getChildList(associationName);
         }

         function navigateToAssociationForm(associationName, id){
            var association = getAssociationByName(associationName);
            if(id != null){
              association.id = id;
            }else{
              delete association.id;
            }
            toggleAssociationMode(associationName);
         }

         function getAssociationByName(associationName){
            controller.associations[associationName] = controller.associations[associationName] || {};
            return controller.associations[associationName];
         }
      }


    return vm;
  }
})();

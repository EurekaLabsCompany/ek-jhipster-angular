(function(){

    'use strict'
    angular.module('ek-jhipster-angular').factory('ChildListFactory', ChildListFactory);

    function ChildListFactory() {
      ChildListFactory.build = build;

      function build(data){
        var scope = data.scope || {};        
        scope.items       = '='; 
        scope.onInsert    = '&';
        scope.onEdit      = '&';
        scope.onDelete    = '&';
        scope.mode        = '=?';

        var childListDirective = {
          restrict        : 'E',
          scope           : scope,
          templateUrl     : data.templateUrl,
          controller      : data.controller,
          controllerAs    : 'vm',
          transclude      : true,
          link            : link
        }

        function link($scope) {
          $scope.mode   = 'list';
          $scope.insert = insert;
          $scope.edit   = edit;

          function insert(){
            $scope.onInsert();
          }

          function edit(data){
            $scope.onEdit(data);
          }
        }

        return childListDirective;
      }

      return ChildListFactory;
    }
})();
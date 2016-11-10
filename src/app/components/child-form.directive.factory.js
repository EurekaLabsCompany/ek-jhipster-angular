(function(){

    'use strict'
    angular.module('ek-jhipster-angular').factory('ChildFormFactory', ChildFormFactory);

    function ChildFormFactory() {
      ChildFormFactory.build = build;

      function build(data){
        var scope = data.scope || {};    
        scope.mapedBy     = '@';
        scope.parentItem  = '=';
        scope.onSave      = '&';
        scope.onCancel    = '&';
        scope.itemId      = '=?';

        var formDirective = {
          restrict        :   'E',
          scope           :   scope,
          controller      :   data.controller,
          controllerAs    :   'vm',
          templateUrl     :   data.templateUrl,
          link            :   link
        }

        function link($scope, $element, $attrs){
          (data.beforeLink || angular.noop)($scope, $element, $attrs);
          (data.afterLink || angular.noop)($scope, $element, $attrs);
        }



        return formDirective;
      }

      return ChildFormFactory;
    }
})();
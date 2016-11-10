(function(){

    'use strict'
    angular.module('ek-jhipster-angular').factory('ListFactory', ListFactory);

    function ListFactory() {
      ListFactory.build = build;

      function build(data){
        var scope = data.scope || {};
        scope.vm = '=';

        var formDirective = {
          restrict        : 'E',
          templateUrl     : data.templateUrl
        }

        return formDirective;
      }

      return ListFactory;
    }
})();
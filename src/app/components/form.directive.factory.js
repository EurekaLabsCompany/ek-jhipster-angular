(function(){

    'use strict'
    angular.module('ek-jhipster-angular').factory('FormFactory', FormFactory);

    function FormFactory() {
      FormFactory.build = build;

      function build(data){
        var scope = data.scope || {};
        scope.vm = '=';

        var formDirective = {
          restrict        :   'E',
          scope           :   scope,
          templateUrl     :   data.templateUrl
        }

        return formDirective;
      }

      return FormFactory;
    }
})();
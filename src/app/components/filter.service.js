(function(){
  angular.module('ek-jhipster-angular').service('FilterService', FilterService);

  'use strict';  
  function FilterService(){
    var vm = this;    
    vm.addFiltersToParams   = addFiltersToParams;
    vm.getFilterFromParams  = getFilterFromParams;
    vm.hasNotDefaultFilters = hasNotDefaultFilters;

    vm.clearFilter = clearFilter;

    function clearFilter(filter){
      var field;
      
      for(field in filter){
        delete filter[field];
      }
    }

    function hasNotDefaultFilters(filters, filterFields){
       var field;

       for (var i = filterFields.length - 1; i >= 0; i--) {
         field = filterFields[i];
         if(angular.isDefined(filters[field.value]) && field.type != 'boolean'){
            return true;
         }
       }

       return false;
    }

    function getFilterFromParams(params, filterFields) {
       var field;
       var filter = {};

       for (var i = filterFields.length - 1; i >= 0; i--) {
         field = filterFields[i];
          if(isValidFilter(params[field.value])){

            filter[field.value] = getFilterValue(params[field.value],  field.type);
          }
       }

       return filter;
    }

    function addFiltersToParams(params, filter, filterFields){
      var field;

       for (var i = filterFields.length - 1; i >= 0; i--) {
         field = filterFields[i];
          if(isValidFilter(filter[field.value])){
            params[field.value] = getFilterValue(filter[field.value],  field.type);
          }else{
             delete params[field.value];
          }
       }
     
      return params;
    }

    function getFilterValue(value, type){
      var result = value;

      switch(type){
        case 'boolean':
          result = angular.fromJson(value);
        break;
        case 'number':
          result = angular.fromJson(value);
        break;
        case 'date':          
         result = value;
          
        break;
        default:
      }

     
      return result;
    }

    function isValidFilter(value){

      if(angular.isUndefined(value)){
        return false;
      }

      if(value == null){
        return false;
      }

      if(value.toString().trim().length == 0){
        return false;
      }

      return true;
    }

    return vm;
  }
})();
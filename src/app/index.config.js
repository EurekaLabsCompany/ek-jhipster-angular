(function() {
  'use strict';

  angular
    .module('ek-jhipster-angular')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

  }

})();

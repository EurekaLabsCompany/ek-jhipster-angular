(function() {
  'use strict';

  angular
    .module('ek-jhipster-angular')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

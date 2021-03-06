'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;

  var deleteThrottling = function (callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = {
    deleteThrottling: deleteThrottling
  };

})();

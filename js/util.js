'use strict';

(function () {
  var ESC_CODE = 27;
  var ENTER_CODE = 13;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_CODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_CODE) {
      action();
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();

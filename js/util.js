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

  var checkIsSubArray = function (haystack, needle) {
    return needle.every(function (item) {
      return haystack.includes(item);
    });
  };

  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    checkIsSubArray: checkIsSubArray,
    Coordinate: Coordinate
  };
})();

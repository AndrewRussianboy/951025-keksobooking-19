'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var SUCCESFUL_REQUEST = 200;
  var UNKNOWN_ERROR_TEXT = 'Произошла неизвестная ошибка, статус: ';
  var ERROR_TEXT = 'Произошла ошибка во время отправки: ';

  var makeRequest = function (url, method, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('error', function (evt) {
      onError(UNKNOWN_ERROR_TEXT + evt.target.status);
    });

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESFUL_REQUEST) {
        onLoad(xhr.response);
      } else {
        onError(ERROR_TEXT + xhr.status);
      }
    });

    xhr.open(method, url);

    return xhr;
  };

  var upload = function (data, onLoad, onError) {
    var xhr = makeRequest(URL_UPLOAD, 'POST', onLoad, onError);

    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var xhr = makeRequest(URL, 'GET', onLoad, onError);

    xhr.send();
  };

  window.backend = {
    upload: upload,
    load: load
  };

})();

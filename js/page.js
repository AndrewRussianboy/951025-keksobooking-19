'use strict';

(function () {
  var PIN_HEIGHT = 62;
  var PIN_WIDTH = 62;
  var MAP_PIN_TRIANGLE_HEIGHT = 22;
  var TOP_RESTRICTION_FOR_MAP_PIN = 46;
  var BOTTOM_RESTRICTION_FOR_MAP_PIN = 546;

  var load = window.backend.load;
  var isEnterEvent = window.util.isEnterEvent;
  var Coordinate = window.util.Coordinate;
  var updateApartments = window.mapFilter.updateApartments;
  window.page = {};
  window.page.apartments = [];

  var mapElement = document.querySelector('.map');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapFilterElement = document.querySelectorAll('.map__filter');
  var mapFeaturesElement = document.querySelector('.map__features');
  var buttonComputedStyle = getComputedStyle(mapPinMainElement);
  var inputAddressElement = document.querySelector('.input-address');
  var adFormElement = document.querySelector('.ad-form');
  var adFormHeaderElement = document.querySelector('.ad-form-header');
  var formElementElement = document.querySelectorAll('.ad-form__element');

  var getButtonPinPositionDefault = function () {
    return (inputAddressElement.value = (parseInt(buttonComputedStyle.left, 10) + PIN_WIDTH / 2) + ' , ' + (parseInt(buttonComputedStyle.top, 10) + PIN_HEIGHT / 2));
  };

  var deactivatePage = function (error) {
    getButtonPinPositionDefault();
    adFormHeaderElement.setAttribute('disabled', 'true');
    for (var i = 0; i < formElementElement.length; i++) {
      formElementElement[i].setAttribute('disabled', 'true');
    }
    for (var j = 0; j < mapFilterElement.length; j++) {
      mapFilterElement[j].setAttribute('disabled', 'true');
    }
    mapFeaturesElement.setAttribute('disabled', 'true');

    if (error) {
      showError();
    }
  };

  var showError = function (errorMessage) {
    var element = document.createElement('div');
    element.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ff3f04; color: white;';
    element.style.position = 'absolute';
    element.style.left = 0;
    element.style.right = 0;
    element.style.fontSize = '25px';

    element.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', element);

    deactivatePage();
  };

  var getPageDefault = function () {
    deactivatePage();
    mapElement.classList.add('map--faded');
  };

  getPageDefault();

  var getButtonPinPositionActive = function () {
    return (inputAddressElement.value = (parseInt(buttonComputedStyle.left, 10) + PIN_WIDTH / 2) + ' , ' + (parseInt(buttonComputedStyle.top, 10) + PIN_HEIGHT + MAP_PIN_TRIANGLE_HEIGHT));
  };

  var activatePage = function () {
    getButtonPinPositionActive();
    mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    adFormHeaderElement.removeAttribute('disabled');
    mapFeaturesElement.removeAttribute('disabled');
    inputAddressElement.value = (parseInt(buttonComputedStyle.left, 10) + PIN_WIDTH / 2) + ' , ' + (parseInt(buttonComputedStyle.top, 10) + PIN_HEIGHT + MAP_PIN_TRIANGLE_HEIGHT);
    for (var i = 0; i < formElementElement.length; i++) {
      formElementElement[i].removeAttribute('disabled');
    }
    for (var j = 0; j < mapFilterElement.length; j++) {
      mapFilterElement[j].removeAttribute('disabled');
    }
  };

  var getPinsFromServer = function (backendApartments) {
    window.page.apartments = backendApartments;
    updateApartments();
  };

  var onMainPinPress = function () {
    load(getPinsFromServer, showError);
  };

  mapPinMainElement.addEventListener('keydown', function (evt) {
    isEnterEvent(evt, activatePage);
    isEnterEvent(evt, onMainPinPress);
  });

  var relocate = function (location) {
    mapPinMainElement.style.top = location.y + 'px';
    mapPinMainElement.style.left = location.x + 'px';
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    activatePage();
    load(getPinsFromServer, showError);


    var startCoords = new Coordinate(evt.clientX, evt.clientY);

    inputAddressElement.value = (parseInt(buttonComputedStyle.left, 10) + PIN_WIDTH / 2) + ' , ' + (parseInt(buttonComputedStyle.top, 10) + PIN_HEIGHT + MAP_PIN_TRIANGLE_HEIGHT);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var limits = {
        top: TOP_RESTRICTION_FOR_MAP_PIN,
        right: mapElement.offsetWidth - mapPinMainElement.offsetWidth / 2,
        bottom: BOTTOM_RESTRICTION_FOR_MAP_PIN,
        left: -mapPinMainElement.offsetWidth / 2
      };

      var newLocation = new Coordinate(limits.left, limits.top);

      if (mapPinMainElement.offsetLeft > limits.right) {
        newLocation.x = limits.right;
      } else if (mapPinMainElement.offsetLeft > limits.left) {
        newLocation.x = mapPinMainElement.offsetLeft;
      }
      if (mapPinMainElement.offsetTop > limits.bottom) {
        newLocation.y = limits.bottom;
      } else if (mapPinMainElement.offsetTop > limits.top) {
        newLocation.y = mapPinMainElement.offsetTop;
      }

      relocate(newLocation);

      var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);

      mapPinMainElement.style.top = (mapPinMainElement.offsetTop - shift.y) + 'px';
      mapPinMainElement.style.left = (mapPinMainElement.offsetLeft - shift.x) + 'px';
      inputAddressElement.value = (parseInt(buttonComputedStyle.left, 10) + PIN_WIDTH / 2) + ' , ' + (parseInt(buttonComputedStyle.top, 10) + PIN_HEIGHT + MAP_PIN_TRIANGLE_HEIGHT);
    };

    var onMouseup = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseup);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseup);
  };

  mapPinMainElement.addEventListener('mousedown', onMouseDown);

  window.page = {
    getPageDefault: getPageDefault,
    getButtonPinPositionDefault: getButtonPinPositionDefault,
    mapPinMain: mapPinMainElement
  };
})();



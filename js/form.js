'use strict';

(function () {
  var MAX_QUANTITY_OF_ROOMS = 100;
  var MIN_BUNGALO_PRICE = 0;
  var MIN_FLAT_PRICE = 1000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;
  var GUESTS_MORE_THAN_ROOMS_TEXT = 'Количество гостей не соответствует количеству комнат';

  var upload = window.backend.upload;
  var getButtonPinPositionDefault = window.page.getButtonPinPositionDefault;
  var isEscEvent = window.util.isEscEvent;
  var removeCard = window.cardRender.removeCard;
  var removePins = window.pinsRender.removePins;
  var mapFilters = window.mapFilter.chart;
  var getPageDefault = window.page.getPageDefault;

  var typeSelectElement = document.querySelector('#type');
  var priceInputElement = document.querySelector('#price');

  typeSelectElement.addEventListener('change', function () {
    var minPricesMap = {
      bungalo: MIN_BUNGALO_PRICE,
      flat: MIN_FLAT_PRICE,
      house: MIN_HOUSE_PRICE,
      palace: MIN_PALACE_PRICE
    };
    var key = typeSelectElement.value;
    var minPrice = minPricesMap[key];
    priceInputElement.placeholder = minPrice;
    priceInputElement.min = minPrice;
  });

  var timeInSelectElement = document.querySelector('#timein');
  var timeOutSelectElement = document.querySelector('#timeout');

  timeInSelectElement.addEventListener('change', function () {
    timeOutSelectElement.value = timeInSelectElement.value;
  });

  timeOutSelectElement.addEventListener('change', function () {
    timeInSelectElement.value = timeOutSelectElement.value;
  });

  var compareRoomsWithGuests = function (rooms, guests) {
    if (rooms === MAX_QUANTITY_OF_ROOMS) {
      return guests === 0;
    }
    if (guests === 0) {
      return rooms === MAX_QUANTITY_OF_ROOMS;
    }
    return rooms >= guests;
  };

  var selectRoomElement = document.querySelector('#room_number');
  var guestsNumberElement = document.querySelector('#capacity');

  var getGuestsByRooms = function () {
    for (var i = 0; i < guestsNumberElement.length; i++) {
      var guestOption = guestsNumberElement.options[i];
      if (compareRoomsWithGuests(+selectRoomElement.value, +guestOption.value)) {
        guestOption.removeAttribute('disabled');
      } else {
        guestOption.setAttribute('disabled', 'true');
      }
    }
  };

  getGuestsByRooms();

  selectRoomElement.addEventListener('change', function () {
    getGuestsByRooms();
    if (compareRoomsWithGuests(+selectRoomElement.value, +guestsNumberElement.value)) {
      guestsNumberElement.setCustomValidity('');
    } else {
      guestsNumberElement.setCustomValidity(GUESTS_MORE_THAN_ROOMS_TEXT);
    }
  });

  guestsNumberElement.addEventListener('change', function () {
    if (compareRoomsWithGuests(+selectRoomElement.value, +guestsNumberElement.value)) {
      guestsNumberElement.setCustomValidity('');
    } else {
      guestsNumberElement.setCustomValidity(GUESTS_MORE_THAN_ROOMS_TEXT);
    }
  });

  var formElement = document.querySelector('.ad-form');

  var showSuccessPopup = function () {
    var successTemplate = document.querySelector('#success').content;
    var successElement = successTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(successElement);
    var successPopup = formElement.append(fragment);

    return successPopup;
  };

  var cleanPage = function () {
    formElement.reset();
    mapFilters.reset();

    removePins();
    removeCard();
    getButtonPinPositionDefault();
  };

  var getSuccess = function () {
    getPageDefault();
    cleanPage();

    showSuccessPopup();
    var successPopupElement = document.querySelector('.success');
    var removeSuccessPopup = function () {
      successPopupElement.remove();
    };

    var onPopupEscRemove = function (evt) {
      isEscEvent(evt, removeSuccessPopup);
    };

    var onPopupClickRemove = function () {
      removeSuccessPopup();
    };

    if (successPopupElement) {
      document.addEventListener('keydown', onPopupEscRemove);
      document.addEventListener('click', onPopupClickRemove);
    } else {
      document.removeEventListener('keydown', onPopupEscRemove);
      document.removeEventListener('click', onPopupClickRemove);
    }
  };

  var showErrorPopup = function () {
    var errorTemplateElement = document.querySelector('#error').content;
    var errorElement = errorTemplateElement.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorElement);
    var errorPopup = formElement.append(fragment);

    return errorPopup;
  };

  var getError = function () {
    getPageDefault();
    showErrorPopup();
    var errorPopupElement = document.querySelector('.error');
    var removeErrorPopup = function () {
      errorPopupElement.remove();
    };
    document.addEventListener('keydown', function (evt) {
      isEscEvent(evt, removeErrorPopup);
    });
    document.addEventListener('click', function () {
      removeErrorPopup();
    });
  };

  formElement.addEventListener('submit', function (evt) {

    var dataSend = new FormData(formElement);
    upload(dataSend, getSuccess, getError);
    evt.preventDefault();
  });

  var adFormResetElement = document.querySelector('.ad-form__reset');

  adFormResetElement.addEventListener('click', function () {
    getPageDefault();
    cleanPage();
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    document.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';
    var adFormFoto = document.querySelector('.ad-form__photo img');
    if (adFormFoto) {
      adFormFoto.remove();
    }
  });

})();

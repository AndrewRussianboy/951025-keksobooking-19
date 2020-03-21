'use strict';

(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var NUMBER_OF_RENDERED_PINS = 5;
  var LOW_PRICE_TEXT = 'low';
  var MIDDLE_PRICE_TEXT = 'middle';
  var HIGH_PRICE_TEXT = 'high';
  var ANY_PRICE_TEXT = 'any';

  var renderApartments = window.pinsRender.renderApartments;
  var removePins = window.pinsRender.removePins;
  var removeCard = window.cardRender.removeCard;
  var onFilterDebounce = window.debounce.deleteThrottling;

  var checkIsSubArray = function (haystack, needle) {
    return needle.every(function (item) {
      return haystack.includes(item);
    });
  };

  var typeOfHouseElement = document.querySelector('#housing-type');
  var filterByType = function (item) {
    return (typeOfHouseElement.value === item.offer.type || typeOfHouseElement.value === ANY_PRICE_TEXT);
  };

  var priceElement = document.querySelector('#housing-price');
  var filterByPrice = function (item) {
    switch (priceElement.value) {
      case MIDDLE_PRICE_TEXT:
        return item.offer.price > LOW_PRICE && item.offer.price < HIGH_PRICE;
      case LOW_PRICE_TEXT:
        return item.offer.price < LOW_PRICE;
      case HIGH_PRICE_TEXT:
        return item.offer.price > HIGH_PRICE;
      default:
        return priceElement.value === ANY_PRICE_TEXT;
    }
  };

  var roomsQuantityElement = document.querySelector('#housing-rooms');
  var filterByRoomQuantity = function (item) {
    return +roomsQuantityElement.value === +item.offer.rooms || roomsQuantityElement.value === ANY_PRICE_TEXT;
  };

  var guestsQuantityElement = document.querySelector('#housing-guests');
  var filterByGuestQuantity = function (item) {
    return +guestsQuantityElement.value === +item.offer.guests || guestsQuantityElement.value === ANY_PRICE_TEXT;
  };

  var updateApartments = function () {

    var featuresElement = document.querySelectorAll('.map__checkbox');
    var mappedFeatures = Array.from(featuresElement)
      .filter(function (feature) {
        return feature.checked;
      })
      .map(function (element) {
        return element.value;
      });

    var filteredItems = [];

    var filterByFeatures = function (apartment) {
      return checkIsSubArray(apartment.offer.features, mappedFeatures);
    };

    var filters = [filterByType, filterByPrice, filterByRoomQuantity, filterByGuestQuantity, filterByFeatures];

    var apartmentsLength = window.page.apartments.length;
    for (var i = 0; (i < apartmentsLength) && (filteredItems.length < NUMBER_OF_RENDERED_PINS); i++) {
      var apartment = window.page.apartments[i];

      var isValidApartment = filters.every(function (filter) {
        return filter(apartment);
      });

      if (isValidApartment) {
        filteredItems.push(apartment);
      }

    }
    removePins();
    renderApartments(filteredItems);
    removeCard();
  };

  var mapFiltersElement = document.querySelector('.map__filters');
  mapFiltersElement.addEventListener('change', onFilterDebounce(updateApartments));

  window.mapFilter = {
    chart: mapFiltersElement,
    updateApartments: updateApartments
  };

})();

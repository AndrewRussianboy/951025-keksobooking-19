'use strict';

(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var NUMBER_OF_RENDERED_PINS = 5;

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
    return (typeOfHouseElement.value === item.offer.type || typeOfHouseElement.value === 'any');
  };

  var priceElement = document.querySelector('#housing-price');
  var filterByPrice = function (item) {
    switch (priceElement.value) {
      case 'middle':
        return item.offer.price > LOW_PRICE && item.offer.price < HIGH_PRICE;
      case 'low':
        return item.offer.price < LOW_PRICE;
      case 'high':
        return item.offer.price > HIGH_PRICE;
      default:
        return priceElement.value === 'any';
    }
  };

  var roomsQuantityElement = document.querySelector('#housing-rooms');
  var filterByRoomQuantity = function (item) {
    return +roomsQuantityElement.value === +item.offer.rooms || roomsQuantityElement.value === 'any';
  };

  var guestsQuantityElement = document.querySelector('#housing-guests');
  var filterByGuestQuantity = function (item) {
    return +guestsQuantityElement.value === +item.offer.guests || guestsQuantityElement.value === 'any';
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

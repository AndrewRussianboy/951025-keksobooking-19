'use strict';

(function () {
  var isEscEvent = window.util.isEscEvent;

  var addCard = function (apartment) {

    var cardTemplate = document.querySelector('#card').content;
    var cardElement = cardTemplate.cloneNode(true);

    var popupFeaturesElement = cardElement.querySelector('.popup__features');

    for (var i = 0; i < popupFeaturesElement.children.length; i++) {
      var feature = popupFeaturesElement.children[i];
      feature.style.display = 'none';

      apartment.offer.features.forEach(function (item1) {
        var featureName = 'popup__feature--' + item1;

        if (feature.classList.contains(featureName)) {
          feature.style.display = 'inline-block';
        }
      });
    }

    var translateApartment = function () {
      var typeApartment = apartment.offer.type;

      switch (typeApartment) {
        case 'flat':
          return 'Квартира';
        case 'bungalo':
          return 'Бунгало';
        case 'house':
          return 'Дом';
        case 'palace':
          return 'Дворец';
      }
      return typeApartment;
    };

    var popupPhotoElement = cardElement.querySelector('.popup__photo');
    var photosContainerElement = cardElement.querySelector('.popup__photos');
    var fragment = document.createDocumentFragment();

    apartment.offer.photos.forEach(function (item) {
      var photoClone = popupPhotoElement.cloneNode(true);
      fragment.appendChild(photoClone);
      photoClone.src = item;
    });

    photosContainerElement.appendChild(fragment);
    popupPhotoElement.remove();

    cardElement.querySelector('.popup__title').textContent = apartment.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = apartment.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = apartment.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = translateApartment();
    cardElement.querySelector('.popup__text--capacity').textContent = (apartment.offer.rooms + ' комнаты ') + ('для ' + apartment.offer.guests + ' гостей');
    cardElement.querySelector('.popup__text--time').textContent = ('Заезд после ' + apartment.offer.checkin) + (' Выезд до ' + apartment.offer.checkout);
    cardElement.querySelector('.popup__description').textContent = apartment.offer.description;
    cardElement.querySelector('.popup__avatar').src = apartment.author.avatar;

    var filtersContainerElement = document.querySelector('.map__filters-container');
    var mapSectionElement = document.querySelector('.map');

    var popupCloseElement = cardElement.querySelector('.popup__close');
    var mapCardPopupElement = cardElement.querySelector('.map__card');

    var onPopupEscPress = function (evt) {
      isEscEvent(evt, closePopup);
    };

    var closePopup = function () {
      mapCardPopupElement.remove();
    };

    popupCloseElement.addEventListener('click', function () {
      closePopup();
    });

    if (mapCardPopupElement) {
      document.addEventListener('keydown', onPopupEscPress);
    } else {
      document.removeEventListener('keydown', onPopupEscPress);
    }

    mapSectionElement.insertBefore(cardElement, filtersContainerElement);
  };

  var removeCard = function () {
    var mapCardElement = document.querySelector('.map__card');
    if (mapCardElement) {
      mapCardElement.remove();
    }
  };

  window.cardRender = {
    addCard: addCard,
    removeCard: removeCard
  };
})();

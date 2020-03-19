'use strict';

(function () {

  var renderCard = window.cardRender.addCard;
  var removeCard = window.cardRender.removeCard;

  var pinTemplate = document.querySelector('#pin').content;

  var renderPin = function (apartment) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinElementCommon = pinElement.querySelector('.map__pin img');
    var mapPinElement = pinElement.querySelector('.map__pin');

    mapPinElement.style.left = apartment.location.x + 'px';
    mapPinElement.style.top = apartment.location.y + 'px';
    pinElementCommon.src = apartment.author.avatar;
    pinElementCommon.alt = apartment.author.title;

    return pinElement;
  };

  var pinMap = document.querySelector('.map');

  var renderApartments = function (apartments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < apartments.length; i++) {
      var mapPin = renderPin(apartments[i]);

      var onCardChange = function () {
        var k = i;
        return function () {
          removeCard();
          renderCard(apartments[k]);
        };
      };
      var mapPinChild = mapPin.querySelector('.map__pin');
      mapPinChild.addEventListener('click', onCardChange());

      fragment.appendChild(mapPin);
    }

    pinMap.appendChild(fragment);
  };

  var removePins = function () {
    var mapPinElement = document.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPinElement.length; i++) {
      if (!mapPinElement[i].classList.contains('map__pin--main')) {
        mapPinElement[i].remove();
      }
    }
  };

  window.pinsRender = {
    removePins: removePins,
    renderApartments: renderApartments
  };

})();

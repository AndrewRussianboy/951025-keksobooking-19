'use strict';

(function () {
  var fileChooserElement = document.querySelector('.ad-form__input');
  var previewElement = document.querySelector('.ad-form__photo');

  fileChooserElement.addEventListener('change', function () {
    var fileList = fileChooserElement.files;

    var loadImage = function (aImageElement) {
      return function (e) {
        aImageElement.src = e.target.result;
      };
    };

    fileList.forEach(function (item) {
      var reader = new FileReader();

      var imageElement = document.createElement('img');
      imageElement.style = 'width: 70px; height: 70px; border-radius: 5px;';
      previewElement.append(imageElement);

      reader.addEventListener('load', loadImage(imageElement));

      reader.readAsDataURL(item);
    });

  });
})();

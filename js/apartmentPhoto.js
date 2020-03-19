'use strict';

(function () {
  var fileChooserElement = document.querySelector('.ad-form__input');
  var previewElement = document.querySelector('.ad-form__photo');

  fileChooserElement.addEventListener('change', function () {
    var fileList = fileChooserElement.files;

    var onImageLoad = function (aImageElement) {
      return function (e) {
        aImageElement.src = e.target.result;
      };
    };

    for (var i = 0; i < fileList.length; i++) {
      var file = fileList[i];

      var reader = new FileReader();

      var imageElement = document.createElement('img');
      imageElement.style = 'width: 70px; height: 70px; border-radius: 5px;';
      previewElement.append(imageElement);

      reader.addEventListener('load', onImageLoad(imageElement));

      reader.readAsDataURL(file);
    }

  });
})();

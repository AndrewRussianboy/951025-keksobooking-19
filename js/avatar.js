'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserElement = document.querySelector('.ad-form-header__input');
  var previewElement = document.querySelector('.ad-form-header__preview img');

  fileChooserElement.addEventListener('change', function () {
    var file = fileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var isValidType = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (isValidType) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const photoContainer = document.querySelector('.ad-form__photo-container');
const photoChooser = photoContainer.querySelector('.ad-form__upload input[type=file]');
let photoPreview = photoContainer.querySelector('.ad-form__photo');


const downloadfile = function (chooser, preview) {
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

avatarChooser.addEventListener('change', () => {
  downloadfile(avatarChooser, avatarPreview);
});

photoChooser.addEventListener('change', () => {
  let imgPreview;
  if (!photoPreview.firstChild) {
    const img = document.createElement('img');
    img.style.width = '100%';
    photoPreview.style.display = 'flex';
    photoPreview.style.alignItems = 'center';
    photoPreview.style.justifyContent = 'center';
    imgPreview = photoPreview.appendChild(img);
  } else {
    photoPreview = photoPreview.cloneNode(true);
    photoContainer.appendChild(photoPreview);
    imgPreview = photoPreview.firstChild;
  }
  downloadfile(photoChooser, imgPreview);
});

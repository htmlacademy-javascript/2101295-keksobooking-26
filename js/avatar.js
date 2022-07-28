const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooserElement = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const photoElementElement = document.querySelector('.ad-form__photo-Element');
const photoChooserElement = photoElementElement.querySelector('.ad-form__upload input[type=file]');
let photoPreviewElement = photoElementElement.querySelector('.ad-form__photo');


const uploadFile = (chooser, preview) => {
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

avatarChooserElement.addEventListener('change', () => {
  uploadFile(avatarChooserElement, avatarPreviewElement);
});

photoChooserElement.addEventListener('change', () => {
  let imgPreview;
  if (!photoPreviewElement.firstChild) {
    const img = document.createElement('img');
    img.style.width = '100%';
    photoPreviewElement.style.display = 'flex';
    photoPreviewElement.style.alignItems = 'center';
    photoPreviewElement.style.justifyContent = 'center';
    imgPreview = photoPreviewElement.appendChild(img);
  } else {
    photoPreviewElement = photoPreviewElement.cloneNode(true);
    photoElementElement.appendChild(photoPreviewElement);
    imgPreview = photoPreviewElement.firstChild;
  }
  uploadFile(photoChooserElement, imgPreview);
});

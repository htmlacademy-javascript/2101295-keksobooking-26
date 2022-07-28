import {resetMainMarker, resetAddress, clearLayersOnMap} from './map.js';
import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {updateMarkers} from './filter.js';

const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const formAdElement = document.querySelector('.ad-form');
const filterFormElement = document.querySelector('.map__filters');
const photoPreviewElement = document.querySelector('.ad-form__photo');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const sliderElement = document.querySelector('.ad-form__slider');
const numberRoomsElement = formAdElement.querySelector('[name="rooms"]');
const numberSeatsElement = formAdElement.querySelector('[name="capacity"]');
const timeInElement = formAdElement.querySelector('#timein');
const timeOutElement = formAdElement.querySelector('#timeout');
const priceRoomElement = formAdElement.querySelector('#price');
const typeRoomElement = formAdElement.querySelector('#type');
const submitButtonElement = formAdElement.querySelector('.ad-form__submit');

//валидация заголовка

const pristine = new Pristine(formAdElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__element--error',
}, true);


const validateHead = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  formAdElement.querySelector('#title'),
  validateHead,
  'От 30 до 100 символов'
);

//валидация цены создание слайдера

const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const validatPrice = (value) => parseInt(value, 10) >= parseInt(priceRoomElement.min, 10);


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 10,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(Number.isInteger(value) ? 0 : 1),
    from: (value) => parseFloat(value),
  },
});

const onUnitChange = () => {
  priceRoomElement.min = minPrice[typeRoomElement.value];
  priceRoomElement.placeholder = minPrice[typeRoomElement.value];
  sliderElement.noUiSlider.set(minPrice[typeRoomElement.value]);
};

priceRoomElement.min = 1000;
sliderElement.noUiSlider.on('update', () => {
  priceRoomElement.value = sliderElement.noUiSlider.get();
  pristine.validate(priceRoomElement);
});

const getErrorMessagePrice = () => `значение должно быть больше ${priceRoomElement.min} `;


pristine.addValidator(priceRoomElement, validatPrice, getErrorMessagePrice);

typeRoomElement.addEventListener('change', onUnitChange);

//валидация
const numberGuests = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей']
};


const validateNumberGuests = () => numberGuests[numberRoomsElement.options[numberRoomsElement.selectedIndex].text].includes(numberSeatsElement.options[numberSeatsElement.selectedIndex].text);

const getErrorMessageNumberRooms = () => {
  const numberRoomsNow = numberRoomsElement.options[numberRoomsElement.selectedIndex].text;
  return `
         ${numberRoomsNow}
         ${numberRoomsNow === '1 комната' ? 'не подходит' : 'не подходят'}
         ${numberSeatsElement.options[numberSeatsElement.selectedIndex].text.toLowerCase()}
  `;
};

pristine.addValidator(numberSeatsElement, validateNumberGuests, getErrorMessageNumberRooms);

function onUnitChangeRoom () {
  pristine.validate(numberSeatsElement);
}
numberRoomsElement.addEventListener('change', onUnitChangeRoom);
numberSeatsElement.addEventListener('change', onUnitChangeRoom);

timeInElement.addEventListener('change', (evt) => {
  const nowSelected = evt.target.selectedIndex;
  timeOutElement.selectedIndex = nowSelected;
});

timeOutElement.addEventListener('change', (evt) => {
  const nowSelected = evt.target.selectedIndex;
  timeInElement.selectedIndex = nowSelected;
});

const cleanInput = () => {
  formAdElement.reset();
  clearLayersOnMap();
  filterFormElement.reset();
  document.querySelectorAll('.features__checkbox').forEach((el) => {el.checked = false;});
  resetMainMarker();
  resetAddress();
  priceRoomElement.min = 1000;
  document.querySelector('#description').value = '';
  updateMarkers();
  photoPreviewElement.innerHTML = '';
  avatarPreviewElement.src = DEFAULT_AVATAR;
  sliderElement.noUiSlider.set(1000);
};

const openOrClose = (massage) => {
  const bodyDocument = document.querySelector('body');
  const onMessageEscKey = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onDocumentCkick();
    }
  };

  const openMessage = () => {
    bodyDocument.appendChild(massage);
    document.addEventListener('keydown', onMessageEscKey);
    document.addEventListener('click', onDocumentCkick);
  };

  function onDocumentCkick() {
    bodyDocument.removeChild(massage);
    document.removeEventListener('keydown', onMessageEscKey);
    document.removeEventListener('click', onDocumentCkick);
  }
  openMessage();
};

const showSuccsessMessage = () => {
  const templateSuccsess = document.querySelector('#success');
  const successMessageTemplate = templateSuccsess.content.querySelector('.success').cloneNode(true);
  openOrClose(successMessageTemplate);
};

const showErrorMessage = () => {
  const templateError = document.querySelector('#error');
  const errorMessageTemplate = templateError.content.querySelector('.error').cloneNode(true);
  openOrClose(errorMessageTemplate);
};

const onSuccess = () => {
  cleanInput();
  showSuccsessMessage();
};

const blockSubmitButton = () => {
  submitButtonElement.setAttribute('disabled', 'disabled');
  submitButtonElement.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButtonElement.removeAttribute('disabled');
  submitButtonElement.textContent = 'Опубликовать';
};

const setUserFormSubmit = () => {
  formAdElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(onSuccess, showErrorMessage, new FormData(evt.target));
      unblockSubmitButton();
    }
  });
};


const resetKeyElement = document.querySelector('.ad-form__reset');
resetKeyElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  cleanInput();
});

export {cleanInput, setUserFormSubmit};

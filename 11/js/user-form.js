import {ADRESS, mainPinMarker, map} from './map.js';
import {isEscapeKey} from './util.js';
import {sendData} from './api.js';


const formAd = document.querySelector('.ad-form');

const pristine = new Pristine(formAd, {
  classTo: 'ad-form__element',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
}, );

function validateHead(value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  formAd.querySelector('#title'),
  validateHead,
  'От 30 до 100 символов'
);

const priceRoom = formAd.querySelector('#price');
const typeRoom = formAd.querySelector('#type');

const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

function validatPrice(value) {
  return parseInt(value, 10) >= parseInt(priceRoom.min, 10);
}

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceRoom.value = sliderElement.noUiSlider.get();
});

function onUnitChange () {
  priceRoom.min = minPrice[typeRoom.value];
  priceRoom.placeholder = minPrice[typeRoom.value];
  sliderElement.noUiSlider.set(minPrice[typeRoom.value]);
}

function getErrorMessagePrice () {
  return `значение должно быть больше ${priceRoom.min} `;
}

pristine.addValidator(priceRoom, validatPrice, getErrorMessagePrice);
typeRoom.addEventListener('change', onUnitChange);

const numberRooms = formAd.querySelector('[name="rooms"]');
const numberSeats = formAd.querySelector('[name="capacity"]');

const numberGuests = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей']
};


function validateNumberGuests() {
  return numberGuests[numberRooms.options[numberRooms.selectedIndex].text].includes(numberSeats.options[numberSeats.selectedIndex].text);
}

function getErrorMessageNumberRooms () {
  const numberRoomsNow = numberRooms.options[numberRooms.selectedIndex].text;
  return `
         ${numberRoomsNow}
         ${numberRoomsNow === '1 комната' ? 'не подходит' : 'не подходят'}
         ${numberSeats.options[numberSeats.selectedIndex].text.toLowerCase()}
  `;
}

pristine.addValidator(numberRooms, validateNumberGuests, getErrorMessageNumberRooms);
pristine.addValidator(numberSeats, validateNumberGuests, getErrorMessageNumberRooms);

const timeIn = formAd.querySelector('#timein');
const timeOut = formAd.querySelector('#timeout');

timeIn.addEventListener('change', (evt) => {
  const nowSelected = evt.target.selectedIndex;
  timeOut.selectedIndex = nowSelected;
});

timeOut.addEventListener('change', (evt) => {
  const nowSelected = evt.target.selectedIndex;
  timeIn.selectedIndex = nowSelected;
});

const cleanInput = () => {
  formAd.reset();
  map.closePopup();
  priceRoom.value = '1000';   //здесь проблема - reset не работает
  document.querySelectorAll('.features__checkbox').forEach((el) => {el.checked = false;});
  mainPinMarker.setLatLng({
    lat: 35.658581,
    lng: 139.745438,
  });
  map.flyTo({
    lat: 35.658581,
    lng: 139.745438,
  }, 12);
  ADRESS.value = `${mainPinMarker._latlng.lat.toFixed(5)}, ${mainPinMarker._latlng.lng.toFixed(5)}`;
  document.querySelector('#description').value = '';
};

const openOrClose = (massage) => {
  const body = document.querySelector('body');
  const onMessageEscKey = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  };

  function openMessage() {
    body.appendChild(massage);
    document.addEventListener('keydown', onMessageEscKey);
    document.addEventListener('click', closeMessage);
  }

  function closeMessage() {
    body.removeChild(massage);
    document.removeEventListener('keydown', onMessageEscKey);
    document.removeEventListener('click', closeMessage);
  }
  openMessage();
};


const alertSuccsessMessage = () => {
  const templateSuccsess = document.querySelector('#success');
  const successMessage = templateSuccsess.content.querySelector('.success').cloneNode(true);
  openOrClose(successMessage);
};

const alertErrorMessage = () => {
  const templateError = document.querySelector('#error');
  const errorMessage = templateError.content.querySelector('.error').cloneNode(true);
  openOrClose(errorMessage);
};

const onSuccess = () => {
  cleanInput();
  alertSuccsessMessage();};


function setUserFormSubmit() {
  formAd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      sendData(onSuccess, alertErrorMessage, new FormData(evt.target));
      //изначально было так как написано вынизу, ВОПРОС: почему new FormData(evt.target) подходит, ведь sendData.body нет 'body:'
      /*const formData = new FormData(evt.target);
      fetch(
        'https://26.javascript.pages.academy/keksobooking',
        {
          method: 'POST',
          body: new FormData(evt.target),
        }
      )
        .then((response) => {
          if (response.ok) {
            cleanInput();
            alertSuccsessMessage();
          } else {
            alertErrorMessage();
          }
        })
        .catch(() => {
          alertErrorMessage();
        });*/
    }
  });
}

setUserFormSubmit();

const resetKey = document.querySelector('.ad-form__reset');

resetKey.addEventListener('click', (evt) => {
  evt.preventDefault();


  cleanInput();
});

export {cleanInput, formAd};

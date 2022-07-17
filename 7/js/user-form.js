import {typeOfHouse} from './popup.js';


const formAd = document.querySelector('.ad-form');

const pristine = new Pristine(formAd, {
  classTo: 'ad-form__element',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
},);

function validateHead(value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  formAd.querySelector('#title'),
  validateHead,
  'От 30 до 100 символов'
);

const minPrice = {
  [typeOfHouse.bungalow]: 0,
  [typeOfHouse.flat]: 1000,
  [typeOfHouse.hotel]: 3000,
  [typeOfHouse.house]: 5000,
  [typeOfHouse.palace]: 10000
};

function validatePrice(value) {
  const type = typeOfHouse[formAd.querySelector('#type').value];
  return value.length && value >= minPrice[type];
}

function getErrorMessagePrice () {
  const type = typeOfHouse[formAd.querySelector('#type').value];
  return `${type} стоит дороже ${minPrice[type]}`;
}

pristine.addValidator(
  formAd.querySelector('#price'),
  validatePrice,
  getErrorMessagePrice
);

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

formAd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});



import {getRandomPositiveInteger, getRandomPositiveFloat} from './util.js';

function getAvatars () {
  const number = getRandomPositiveInteger(1, 10);
  let sss = '';
  if (number <= 9) {sss = `img/avatars/user0${  number  }.png`;}
  else {sss = `img/avatars/user${  number  }.png`;}
  return sss;
}


//нужен массив для генерации заголовка title
const titles = ['отель Медвежий угол', 'отель Altay', 'гостиница пять звезд', 'Отель Марьин Остров'];

//нужен массив для генерации typs
const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

//нужен массив для генерации checkins
const checkins = ['12:00', '13:00', '14:00'];

//нужен массив для генерации checkout
const checkouts = ['12:00', '13:00', '14:00'];

//нужен массив для генерации features
export const preparedFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

//нужен массив для генерации discription
const discriptions = [' База отдыха имеет три отдельно стоящих корпуса. Номерной фонд состоит из 14 номеров: три 2х-местных, один 3-х местный, десять 4х-местных.',
  'Гостиница отлично подходит для туристов, командированных, путешественников. К услугам гостей и жителям Барнаула - 14 уютных номеров.', 'Гостиница подойдет для краткосрочного пребывания туристов и командированных.', 'Гостиница расположена в жилом районе, в 4 км от центральной площади Советов. '];

//нужен массив для генерации photos
const preparedPhotos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

// массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator
function getArrayFeatures() {
  const lengthOfArray = getRandomPositiveInteger(1, preparedFeatures.length);
  const arrayFe = [];

  while (arrayFe.length < lengthOfArray) {
    const indexOfEl = getRandomPositiveInteger(0, preparedFeatures.length - 1);
    const el = preparedFeatures[indexOfEl];

    if (!arrayFe.includes(el)) {
      arrayFe.push(el);
    }
  }
  return arrayFe;
}

//создаем массив случайной длины из значений photoArr
const getArrayPhoto = () => {
  const getRandomLength = getRandomPositiveInteger(1, preparedPhotos.length);
  const createdPhotos = [];
  for (let i = 0; i < getRandomLength; i++) {
    const getIndEl = getRandomPositiveInteger(0, preparedPhotos.length - 1);
    createdPhotos.push(preparedPhotos[getIndEl]);
  }
  return createdPhotos;
};


//переменная для фиксировангия колличества необходимых объектов
const NUMBER_OF_ADS = 10;

//создаем функциб для создания объекта
export const createAdvertisements = () => ({

  author: {
    avatar: getAvatars(1, 10)
  },

  offer: {
    title: titles[getRandomPositiveInteger(0, titles.length - 1)],
    address: `${getRandomPositiveFloat(0, 10, 4)  } , ${  getRandomPositiveFloat(0, 10, 4)}`,
    price:  getRandomPositiveInteger(1000, 10000),
    type: types[getRandomPositiveInteger(0, types.length - 1)],
    rooms: getRandomPositiveInteger(1, 5),
    guests: getRandomPositiveInteger(1, 12),
    checkin: checkins[getRandomPositiveInteger(0, checkins.length - 1)],
    checkout: checkouts[getRandomPositiveInteger(0, checkouts.length - 1)],
    features: getArrayFeatures(preparedFeatures),
    description: discriptions[getRandomPositiveInteger(0, discriptions.length - 1)],
    photos: getArrayPhoto(preparedPhotos)
  },

  location: {
    lat: getRandomPositiveFloat(35.65, 35.7, 5),
    lng: getRandomPositiveFloat(139.7, 139.8, 5)

  }
});
const createSimilarAds = () => Array.from({length: NUMBER_OF_ADS}, createAdvertisements);
export {createSimilarAds};

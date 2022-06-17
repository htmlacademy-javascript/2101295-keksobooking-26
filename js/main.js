function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

//нужен массив для генерации заголовка title
const TITLEARR = ['отель Медвежий угол', 'отель Altay', 'гостиница пять звезд', 'Отель Марьин Остров'];

//нужен массив для генерации typs
const TYPSARR = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

//нужен массив для генерации checkins
const CHECKINSARR = ['12:00', '13:00', '14:00'];

//нужен массив для генерации checkout
const CHECKOUTSARR = ['12:00', '13:00', '14:00'];

//нужен массив для генерации features
const FEATURESARR = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

//нужен массив для генерации discription
const DISCRIPTIONARR = [' База отдыха имеет три отдельно стоящих корпуса. Номерной фонд состоит из 14 номеров: три 2х-местных, один 3-х местный, десять 4х-местных.',
  'Гостиница отлично подходит для туристов, командированных, путешественников. К услугам гостей и жителям Барнаула - 14 уютных номеров.', 'Гостиница подойдет для краткосрочного пребывания туристов и командированных.', 'Гостиница расположена в жилом районе, в 4 км от центральной площади Советов. '];

//нужен массив для генерации photos
const PHOTOARR = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

// массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator
function getArrayFeatures(featuresArr) {
  const lengthOfArray = getRandomPositiveInteger(1, featuresArr.length);
  const arrayFe = [];

  while (arrayFe.length < lengthOfArray) {
    const indexOfEl = getRandomPositiveInteger(0, featuresArr.length - 1);
    const el = featuresArr[indexOfEl];

    if (!arrayFe.includes(el)) {
      arrayFe.push(el);
    }
  }
  return arrayFe;
}

//создаем массив случайной длины из значений photoArr
const getArrayPhoto = (photoArr) => {
  const getRandomLength = getRandomPositiveInteger(1, photoArr.length);
  const resultArrPhoto = [];
  for (let i = 0; i < getRandomLength; i++) {
    const getIndEl = getRandomPositiveInteger(0, photoArr.length - 1);
    resultArrPhoto.push(photoArr[getIndEl]);
  }
  return resultArrPhoto;
};


//переменная для фиксировангия колличества необходимых объектов
const CREATEADVERTISEMENTSARR = 10;

//создаем функциб для создания объекта
const createAdvertisements = () => ({

  AUTHOR: {
    avatar: `img/avatars/user${  getRandomPositiveInteger(1, 10)  }.png`
  },


  OFFER: {
    title: TITLEARR[getRandomPositiveInteger(0, TITLEARR.length - 1)],
    address: `${getRandomPositiveFloat(0, 10, 4)  } , ${  getRandomPositiveFloat(0, 10, 4)}`,
    price:  getRandomPositiveInteger(1000, 10000),
    type: TYPSARR[getRandomPositiveInteger(0, TYPSARR.length - 1)],
    rooms: getRandomPositiveInteger(1, 5),
    guests: getRandomPositiveInteger(1, 12),
    checkin: CHECKINSARR[getRandomPositiveInteger(0, CHECKINSARR.length - 1)],
    checkout: CHECKOUTSARR[getRandomPositiveInteger(0, CHECKOUTSARR.length - 1)],
    features: getArrayFeatures(FEATURESARR),
    description: DISCRIPTIONARR[getRandomPositiveInteger(0, DISCRIPTIONARR.length - 1)],
    photos: getArrayPhoto(PHOTOARR)
  },

  LOCATION: {
    lat: getRandomPositiveFloat(35.65, 35.7, 5),
    lng: getRandomPositiveFloat(139.7, 139.8, 5)

  }
});

export const similarWizards = Array.from({length: CREATEADVERTISEMENTSARR}, createAdvertisements);



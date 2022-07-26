import {preparedFeatures} from './data.js';
const adCardTemplate = document.querySelector('#card').content.querySelector('.popup');

// объект для сопоставления типов жилья
export const typeOfHouse = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};


export const listCard = (point) => {
  const similarCard = adCardTemplate.cloneNode(true);

  similarCard.querySelector('.popup__avatar').src = point.author.avatar;
  if (point.author.avatar === '') {similarCard.querySelector('.popup__avatar').style.display = 'none';}

  similarCard.querySelector('.popup__title').textContent = point.offer.title;
  if (point.offer.title === '') {similarCard.querySelector('.popup__title').style.display = 'none';}

  similarCard.querySelector('.popup__text--address').textContent = point.offer.address;
  if (point.offer.address === '') {similarCard.querySelector('.popup__text--address').style.display = 'none';}

  similarCard.querySelector('.popup__text--price').textContent = `${point.offer.price} ₽/ночь`;
  if (point.offer.price === '') {similarCard.querySelector('.popup__text--price').style.display = 'none';}

  similarCard.querySelector('.popup__type').textContent = typeOfHouse[point.offer.type];
  if (point.offer.type === '') {similarCard.querySelector('.popup__type').style.display = 'none';}

  similarCard.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  if (point.offer.rooms === '') {similarCard.querySelector('.popup__text--capacity').style.display = 'none';}

  similarCard.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;
  if (point.offer.checkout === '') {similarCard.querySelector('.popup__text--time').style.display = 'none';}

  const popupFeature = similarCard.querySelector('.popup__features');
  //const popupFeatures = popupFeature.querySelectorAll('.popup__feature');

  if (point.offer.features) {

    preparedFeatures.forEach((feature) => {
      if (!point.offer.features.includes(feature)) {
        const el = popupFeature.querySelector(`popup_feature--${feature}`);
        if (el) {
          el.remove();
        }
      }
    });
  } else {
    preparedFeatures.forEach((feature) => {
      const el = popupFeature.querySelector(`popup_feature--${feature}`);
      if (el) {
        el.remove();
      }
    });
  }
  //if (point.offer.features === '') {similarCard.querySelector('.popup__features').style.display = 'none';}

  similarCard.querySelector('.popup__description').textContent = point.offer.description;
  if (point.offer.description === '') {similarCard.querySelector('.popup__description').style.display = 'none';}

  if (point.offer.photos) {
    point.offer.photos.forEach((photo) => {
      const clonePhoto = similarCard.querySelector('.popup__photos').querySelector('.popup__photo').cloneNode(true);
      clonePhoto.src = photo;
      similarCard.querySelector('.popup__photos').append(clonePhoto);
    });
    similarCard.querySelector('.popup__photos').querySelectorAll('.popup__photo')[0].remove();
  }
  //if (point.offer.photos === '') {similarCard.querySelector('.popup__photos').style.display = 'none';}
  return similarCard;
};



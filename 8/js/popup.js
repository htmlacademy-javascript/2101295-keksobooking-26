import {similarWizards} from './data.js';
const mapCanvas = document.querySelector('#map-canvas');
const adCardTemplate = document.querySelector('#card').content.querySelector('.popup');


// объект для сопоставления типов жилья
export const typeOfHouse = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};


const createCard = similarWizards();


const listCard = createCard.map(({ author, offer }) => {
  const similarCard = adCardTemplate.cloneNode(true);

  similarCard.querySelector('.popup__avatar').src = author.avatar;
  if (author.avatar === '') {similarCard.querySelector('.popup__avatar').style.display = 'none';}

  similarCard.querySelector('.popup__title').textContent = offer.title;
  if (offer.title === '') {similarCard.querySelector('.popup__title').style.display = 'none';}

  similarCard.querySelector('.popup__text--address').textContent = offer.address;
  if (offer.address === '') {similarCard.querySelector('.popup__text--address').style.display = 'none';}

  similarCard.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  if (offer.price === '') {similarCard.querySelector('.popup__text--price').style.display = 'none';}

  similarCard.querySelector('.popup__type').textContent = typeOfHouse[offer.type];
  if (offer.type === '') {similarCard.querySelector('.popup__type').style.display = 'none';}

  similarCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  if (offer.rooms === '') {similarCard.querySelector('.popup__text--capacity').style.display = 'none';}

  similarCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if (offer.checkout === '') {similarCard.querySelector('.popup__text--time').style.display = 'none';}

  const popupFeature = similarCard.querySelector('.popup__features');
  const popupFeatures = popupFeature.querySelectorAll('.popup__feature');
  popupFeatures.forEach((popupFeaturesItem) => {
    const isNecessary = offer.features.some((i) => popupFeaturesItem.classList.contains(`popup__feature--${  i}`),
    );
    if(!isNecessary) {popupFeaturesItem.remove();}
  });
  if (offer.features === '') {similarCard.querySelector('.popup__features').style.display = 'none';}

  similarCard.querySelector('.popup__description').textContent = offer.description;
  if (offer.description === '') {similarCard.querySelector('.popup__description').style.display = 'none';}

  offer.photos.forEach((photo) => {
    const clonePhoto = similarCard.querySelector('.popup__photos').querySelector('.popup__photo').cloneNode(true);
    clonePhoto.src = photo;
    similarCard.querySelector('.popup__photos').append(clonePhoto);
  });
  similarCard.querySelector('.popup__photos').querySelectorAll('.popup__photo')[0].remove();
  if (offer.photos === '') {similarCard.querySelector('.popup__photos').style.display = 'none';}
  return similarCard;
});

mapCanvas.appendChild(listCard[0]);


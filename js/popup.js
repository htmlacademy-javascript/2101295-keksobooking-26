const adCardTemplate = document.querySelector('#card').content.querySelector('.popup');

// объект для сопоставления типов жилья
export const typeOfHouse = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const createOfferFeatures = (features) => {
  const featuresItemsFragment = document.createDocumentFragment();
  features.forEach((feature) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add(`popup__feature--${feature}`);
    featuresItemsFragment.appendChild(featureItem);
  });
  return featuresItemsFragment;
};

const OFFER_PHOTO = { width: 45, height: 40 };

const createOfferPhotos = (photos) => {
  const offerPhotosFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const offerPhoto = document.createElement('img');
    offerPhoto.classList.add('popup__photo');
    offerPhoto.src = photo;
    offerPhoto.width = OFFER_PHOTO.width;
    offerPhoto.height = OFFER_PHOTO.height;
    offerPhoto.alt = 'Фотография жилья';
    offerPhotosFragment.appendChild(offerPhoto);
  });
  return offerPhotosFragment;
};


export const listCard = (point) => {
  const similarCard = adCardTemplate.cloneNode(true);
  const avatarPopup = similarCard.querySelector('.popup__avatar');
  const titlePopup = similarCard.querySelector('.popup__title');
  const addressPopup = similarCard.querySelector('.popup__text--address');
  const pricePopup = similarCard.querySelector('.popup__text--price');
  const typeOffer = similarCard.querySelector('.popup__type');
  const capacityPopup = similarCard.querySelector('.popup__text--capacity');
  const timePopup = similarCard.querySelector('.popup__text--time');
  const feauteresPopup = similarCard.querySelector('.popup__features');
  const discriptionPopup = similarCard.querySelector('.popup__description');
  const photoPopup = similarCard.querySelector('.popup__photos');

  if (point.author.avatar) {
    avatarPopup.src = point.author.avatar;
  } else {
    avatarPopup.remove();
  }

  if (point.offer.title) {
    titlePopup.textContent = point.offer.title;
  } else {
    titlePopup.remove();
  }

  if (point.offer.address) {
    addressPopup.textContent = point.offer.address;
  } else {
    addressPopup.remove();
  }

  if (point.offer.price) {
    pricePopup.textContent = `${point.offer.price} ₽/ночь`;
  } else {
    pricePopup.remove();
  }

  if (point.offer.type) {
    typeOffer.textContent = typeOfHouse[point.offer.type];
  } else {
    typeOffer.remove();
  }

  if (point.offer.rooms && point.offer.guests) {
    capacityPopup.textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  } else {
    capacityPopup.remove();
  }

  if (point.offer.checkin && point.offer.checkout) {
    timePopup.textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;
  } else {
    timePopup.remove();
  }


  if (point.offer.features) {
    feauteresPopup.innerHTML = '';
    feauteresPopup.appendChild(createOfferFeatures(point.offer.features));
  } else {
    feauteresPopup.remove();
  }

  if (point.offer.description) {
    discriptionPopup.textContent = point.offer.description;
  } else {
    discriptionPopup.remove();
  }


  if (point.offer.photos) {
    photoPopup.innerHTML = '';
    photoPopup.appendChild(createOfferPhotos(point.offer.photos));
  } else {
    photoPopup.remove();
  }

  return similarCard;
};



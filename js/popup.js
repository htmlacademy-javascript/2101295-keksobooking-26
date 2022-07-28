const OFFER_PHOTO = { width: 45, height: 40 };

const adCardTemplate = document.querySelector('#card').content.querySelector('.popup');

// объект для сопоставления типов жилья
export const typeOfHouse = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

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


const listCard = (point) => {
  const similarCardTemplate = adCardTemplate.cloneNode(true);
  const avatarPopupTemplate = similarCardTemplate.querySelector('.popup__avatar');
  const titlePopupTemplate = similarCardTemplate.querySelector('.popup__title');
  const addressPopupTemplate = similarCardTemplate.querySelector('.popup__text--address');
  const pricePopupTemplate = similarCardTemplate.querySelector('.popup__text--price');
  const typeOfferTemplate = similarCardTemplate.querySelector('.popup__type');
  const capacityPopupTemplate = similarCardTemplate.querySelector('.popup__text--capacity');
  const timePopupTemplate = similarCardTemplate.querySelector('.popup__text--time');
  const featuresPopupTemplate = similarCardTemplate.querySelector('.popup__features');
  const descriptionPopupTemplate = similarCardTemplate.querySelector('.popup__description');
  const photoPopupTemplate = similarCardTemplate.querySelector('.popup__photos');

  if (point.author.avatar) {
    avatarPopupTemplate.src = point.author.avatar;
  } else {
    avatarPopupTemplate.remove();
  }

  if (point.offer.title) {
    titlePopupTemplate.textContent = point.offer.title;
  } else {
    titlePopupTemplate.remove();
  }

  if (point.offer.address) {
    addressPopupTemplate.textContent = point.offer.address;
  } else {
    addressPopupTemplate.remove();
  }

  if (point.offer.price) {
    pricePopupTemplate.textContent = `${point.offer.price} ₽/ночь`;
  } else {
    pricePopupTemplate.remove();
  }

  if (point.offer.type) {
    typeOfferTemplate.textContent = typeOfHouse[point.offer.type];
  } else {
    typeOfferTemplate.remove();
  }

  if (point.offer.rooms && point.offer.guests) {
    capacityPopupTemplate.textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  } else {
    capacityPopupTemplate.remove();
  }

  if (point.offer.checkin && point.offer.checkout) {
    timePopupTemplate.textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;
  } else {
    timePopupTemplate.remove();
  }

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

  if (point.offer.features) {
    featuresPopupTemplate.innerHTML = '';
    featuresPopupTemplate.appendChild(createOfferFeatures(point.offer.features));
  } else {
    featuresPopupTemplate.remove();
  }

  if (point.offer.description) {
    descriptionPopupTemplate.textContent = point.offer.description;
  } else {
    descriptionPopupTemplate.remove();
  }

  if (point.offer.photos) {
    photoPopupTemplate.innerHTML = '';
    photoPopupTemplate.appendChild(createOfferPhotos(point.offer.photos));
  } else {
    photoPopupTemplate.remove();
  }

  return similarCardTemplate;
};

export {listCard};

import {createMarker, markerGroup} from './map.js';
import {offersArr} from './main.js';
import {debounce} from './util.js';


const DEFAULT_VALUE = 'any';
const LOW_VALUE = 'low';
const MIDDLE_VALUE = 'middle';
const HIGH_VALUE = 'high';
const LOW_PRICE= 10000;
const HIGH_PRICE = 50000;
const filterTypeElement = document.querySelector('#housing-type');
const filterPriceElement = document.querySelector('#housing-price');
const filterRoomElement = document.querySelector('#housing-rooms');
const filterGuestsElement = document.querySelector('#housing-guests');

const housingType = (ad) => {
  if (filterTypeElement.value === DEFAULT_VALUE) {return true;}
  return ad.offer.type === filterTypeElement.value;
};

const housingPrice = (ad) => {
  if (filterPriceElement.value === DEFAULT_VALUE) {return true;}
  if (filterPriceElement.value === MIDDLE_VALUE) {
    return ad.offer.price > LOW_PRICE && ad.offer.price < HIGH_PRICE;
  }
  if (filterPriceElement.value === LOW_VALUE) {
    return ad.offer.price < LOW_PRICE;
  }
  if (filterPriceElement.value === HIGH_VALUE) {
    return ad.offer.price > HIGH_PRICE;
  }
};

const housingRooms = (ad) => {
  if (filterRoomElement.value === DEFAULT_VALUE) {return true;}
  return ad.offer.rooms === Number(filterRoomElement.value);
};

const housingGuests = (ad) => {
  if (filterGuestsElement.value === DEFAULT_VALUE) {return true;}
  return ad.offer.guests === Number(filterGuestsElement.value);
};


const housingFeatures = (ad) => {
  const checkboxes = document.getElementsByName('features');
  const checkboxesChecked = [];

  for (let v=0; v<checkboxes.length; v++) {
    if (checkboxes[v].checked) {
      checkboxesChecked.push(checkboxes[v].value);
    }}

  const listOfFeatures = ad.offer.features;

  if (checkboxesChecked.length === 0) {
    return true;
  }

  if (!listOfFeatures) {
    return false;}

  for (let q = 0; q < checkboxesChecked.length; q++) {
    if (!listOfFeatures.includes(checkboxesChecked[q])){
      return false;
    }
  }
  return true;
};

const allFilters = document.querySelector('.map__filters');

const filterOffers = (ads) => housingGuests(ads) && housingRooms(ads) && housingPrice(ads) && housingType(ads) && housingFeatures(ads);

const updateMarkers = () => {
  markerGroup.clearLayers();
  createMarker(offersArr.filter(filterOffers).slice(0, 10));
  allFilters.addEventListener('change', debounce(() =>
    updateMarkers(), 500)
  );
};

export {updateMarkers};

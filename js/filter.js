import {createMarker, clearLayersOnMap} from './map.js';
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


const checkTypeHouse = (ad) => filterTypeElement.value === DEFAULT_VALUE || ad.offer.type === filterTypeElement.value;

const checkPriceHouse = (ad) => {
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

const checkRoomsHouse = (ad) => filterRoomElement.value === DEFAULT_VALUE || ad.offer.rooms === Number(filterRoomElement.value);

const checkGuestsHouse = (ad) => filterGuestsElement.value === DEFAULT_VALUE || ad.offer.guests === Number(filterGuestsElement.value);

const checkFeaturesHouse = (ad) => {
  const allCheckboxesElements = document.querySelectorAll('input[name="features"]');
  const checkboxesChecked = [];

  for (const checkbox of allCheckboxesElements) {
    if (checkbox.checked) {
      checkboxesChecked.push(checkbox.value);
    }}

  const listOfFeatures = ad.offer.features;

  if (checkboxesChecked.length === 0) {
    return true;
  }

  if (!listOfFeatures) {
    return false;}

  for (const selectedСheckbox of checkboxesChecked) {
    if (!listOfFeatures.includes(selectedСheckbox)){
      return false;
    }
  }
  return true;
};

const allFiltersElements = document.querySelector('.map__filters');

const filterOffers = (elements) => checkTypeHouse(elements) && checkPriceHouse(elements) && checkRoomsHouse(elements) && checkGuestsHouse(elements) && checkFeaturesHouse(elements);

let offersArr = [];

const updateMarkers = () => {
  clearLayersOnMap();
  createMarker(offersArr.filter(filterOffers).slice(0, 10));
  allFiltersElements.addEventListener('change', debounce(() =>
    updateMarkers(), 500)
  );
};


const extractingArray = (ads) => {
  offersArr = ads;
  updateMarkers();
};


export {extractingArray, updateMarkers};

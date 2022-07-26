import {createMarker, markerGroup} from './map.js';
import {offers} from './main.js';
import {debounce} from './util.js';
//let offers = [];
const defaultValue = 'any';
const filterTypeElement = document.querySelector('#housing-type');
const filterPriceElement = document.querySelector('#housing-price');
const filterRoomElement = document.querySelector('#housing-rooms');
const filterGuestsElement = document.querySelector('#housing-guests');

const housingType = (i) => {
  if (filterTypeElement.value === defaultValue) {return true;}
  return i.offer.type === filterTypeElement.value;
};

const housingPrice = (i) => {
  if (filterPriceElement.value === defaultValue) {return true;}
  if (filterPriceElement.value === 'middle') {
    return i.offer.price > 10000 && i.offer.price < 50000;
  }
  if (filterPriceElement.value === 'low') {
    return i.offer.price < 10000;
  }
  if (filterPriceElement.value === 'high') {
    return i.offer.price > 50000;
  }
};

const housingRooms = (i) => {
  if (filterRoomElement.value === defaultValue) {return true;}
  return i.offer.rooms === Number(filterRoomElement.value);
};

const housingGuests = (i) => {
  if (filterGuestsElement.value === defaultValue) {return true;}
  return i.offer.guests === Number(filterGuestsElement.value);
};


const housingFeatures = (i) => {
  const checkboxes = document.getElementsByName('features');
  const checkboxesChecked = [];

  for (let v=0; v<checkboxes.length; v++) {
    if (checkboxes[v].checked) {
      checkboxesChecked.push(checkboxes[v].value);
    }}

  const listOfFeatures = i.offer.features;

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

const filters = document.querySelector('.map__filters');

const filterOffers = (q) => housingGuests(q) && housingRooms(q) && housingPrice(q) && housingType(q) && housingFeatures(q);

const updateMarkers = () => {
  markerGroup.clearLayers();
  createMarker(offers.filter(filterOffers).slice(0, 10));
  filters.addEventListener('change', debounce(() =>
    updateMarkers(), 500)
  );
};

export {updateMarkers};

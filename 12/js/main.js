import './util.js';
import './avatar.js';
import './popup.js';
import './form.js';
import './user-form.js';
import './map.js';
import './api.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {createMarker, markerGroup} from './map.js';


let offers = [];
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
  return i.offer.guests === filterGuestsElement.value;
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
    return true;}

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
  filters.addEventListener('change',
    updateMarkers, 500
  );
};

getData((ads) => {
  offers = ads;
  updateMarkers();

},
() => {
  showAlert();
});

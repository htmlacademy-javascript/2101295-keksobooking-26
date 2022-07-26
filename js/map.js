import {setActiveState} from './form.js';
import {listCard} from './popup.js';

const map = L.map('map-canvas')
  .on('load', () => {
    setActiveState();
  })
  .setView({
    lat: 35.658581,
    lng: 139.745438,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const ADRESS = document.querySelector('#address');

const mainPinMarker = L.marker(
  {
    lat: 35.658581,
    lng: 139.745438,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);


ADRESS.value = `${mainPinMarker._latlng.lat.toFixed(5)}, ${mainPinMarker._latlng.lng.toFixed(5)}`;


mainPinMarker.on('moveend', (evt) => {
  const targetCoords = evt.target.getLatLng();
  ADRESS.value = `${targetCoords.lat.toFixed(5)}, ${targetCoords.lng.toFixed(5)}`;
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const markerGroup = L.layerGroup().addTo(map);

export const createMarker = (ads) => {
  ads.forEach((ad) => {L.marker({
    lat: ad.location.lat,
    lng: ad.location.lng,
  },
  {
    icon,
  }).addTo(markerGroup)
    .bindPopup(listCard(ad));
  });
};


export {ADRESS ,map,mainPinMarker, markerGroup};

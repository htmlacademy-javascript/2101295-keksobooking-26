import './util.js';
import './popup.js';
import './form.js';
import './user-form.js';
import './map.js';
import './api.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {createMarker} from './map.js';

getData((ads) => {
  ads.slice(0, 10).forEach((points) => {
    createMarker(points);
  });
}, () => {
  showAlert();
});

import './util.js';
import './avatar.js';
import './filter.js';
import './popup.js';
import './form.js';
import './user-form.js';
import './map.js';
import './api.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {updateMarkers} from './filter.js';

let offers = [];

getData((ads) => {
  offers = ads;
  updateMarkers();

},
() => {
  showAlert();
});
export {offers};


import './form.js';
import './avatar.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {extractingArray} from './filter.js';
import {setUserFormSubmit} from './user-form.js';

getData(extractingArray, showAlert);
setUserFormSubmit();

const ADFORM = document.querySelector('.ad-form');
const FIELDSET = ADFORM.querySelectorAll('fieldset');
const MAPFILTERS = document.querySelector('.map__filters');
const MAPFILTERSSELECT = ADFORM.querySelectorAll('select');



let giveAnInactiveState = () => {
  ADFORM.classList.add('ad-form--disabled');
  MAPFILTERS.classList.add('ad-form--disabled');
  FIELDSET.disabled = true;
  MAPFILTERSSELECT.disabled = true;
};

giveAnInactiveState();

let giveInactiveState = () => {
  ADFORM.classList.remove('ad-form--disabled');
  MAPFILTERS.classList.remove('ad-form--disabled');
  FIELDSET.disabled = false;
  MAPFILTERSSELECT.disabled = false;
};

giveInactiveState();


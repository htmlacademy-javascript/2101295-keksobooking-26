const ADFORM = document.querySelector('.ad-form');
const FIELDSET = ADFORM.querySelectorAll('fieldset');
const MAPFILTERS = document.querySelector('.map__filters');
const MAPFILTERSSELECT = ADFORM.querySelectorAll('select');


const setDisabledState = () => {
  ADFORM.classList.add('ad-form--disabled');
  MAPFILTERS.classList.add('ad-form--disabled');
  FIELDSET.disabled = true;
  MAPFILTERSSELECT.disabled = true;
};

//setDisabledState();

export const setActiveState = () => {
  ADFORM.classList.remove('ad-form--disabled');
  MAPFILTERS.classList.remove('ad-form--disabled');
  FIELDSET.disabled = false;
  MAPFILTERSSELECT.disabled = false;
};



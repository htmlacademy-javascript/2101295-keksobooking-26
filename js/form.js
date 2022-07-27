const ADFORM = document.querySelector('.ad-form');
const FIELDSETS = ADFORM.querySelectorAll('fieldset');
const MAPFILTERS = document.querySelector('.map__filters');
const MAPFILTERSSELECT = ADFORM.querySelectorAll('select');

const setDisabledState = () => {
  ADFORM.classList.add('ad-form--disabled');
  MAPFILTERS.classList.add('ad-form--disabled');
  FIELDSETS.disabled = true;
  MAPFILTERSSELECT.disabled = true;
};
setDisabledState();

export const setActiveState = () => {
  ADFORM.classList.remove('ad-form--disabled');
  MAPFILTERS.classList.remove('ad-form--disabled');
  FIELDSETS.disabled = false;
  MAPFILTERSSELECT.disabled = false;
};



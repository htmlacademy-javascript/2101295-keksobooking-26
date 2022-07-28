const adFormElement = document.querySelector('.ad-form');
const fieldsetElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersElements = document.querySelector('.map__filters');
const mapSelectElements = adFormElement.querySelectorAll('select');

const setDisabledState = () => {
  adFormElement.classList.add('ad-form--disabled');
  mapFiltersElements.classList.add('ad-form--disabled');
  fieldsetElements.disabled = true;
  mapSelectElements.disabled = true;
};

setDisabledState();

const setActiveState = () => {
  adFormElement.classList.remove('ad-form--disabled');
  mapFiltersElements.classList.remove('ad-form--disabled');
  fieldsetElements.disabled = false;
  mapSelectElements.disabled = false;
};

export {setActiveState};

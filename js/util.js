const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = () => {
  const alertElement = document.createElement('div');
  alertElement.style.zIndex = '1000';
  alertElement.style.width = '500px';
  alertElement.style.height = '100px';
  alertElement.style.position = 'absolute';
  alertElement.style.left = '500px';
  alertElement.style.top = '280px';
  alertElement.style.right = '0';
  alertElement.style.padding = '10px 3px';
  alertElement.style.fontSize = '30px';
  alertElement.style.textAlign = 'center';
  alertElement.style.backgroundColor = 'red';

  alertElement.textContent = 'Не загрузились объявления. Перезагрузите страницу.';

  document.body.append(alertElement);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showAlert, isEscapeKey, debounce};



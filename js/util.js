const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.width = '500px';
  alertContainer.style.height = '100px';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '500px';
  alertContainer.style.top = '280px';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = 'Не загрузились объявления. Перезагрузите страницу.';

  document.body.append(alertContainer);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {showAlert, isEscapeKey, debounce};



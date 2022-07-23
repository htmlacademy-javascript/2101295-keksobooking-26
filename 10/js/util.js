function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}


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

export {getRandomPositiveInteger, getRandomPositiveFloat, showAlert, isEscapeKey};



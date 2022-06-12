function getRandom(min, max) {
  if (max < min  || min < 0 || max <= 0) {
    return ('Задан неверный диапозон');
  }
  return Math.round(Math.random() * (max - min) + min);
}


function getRandomCoordinates(from, before, afterComma) {
  if (before < from  || from < 0 || before <= 0) {
    return ('Задан неверный диапозон');
  }
  const rounding = Math.random() * (before - from) + from;
  return rounding.toFixed(afterComma);
}

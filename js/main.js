function getRandomCoordinates(from, before, afterComma) {
  if (before < from  || from < 0 || before <= 0) {
    return ('Задан неверный диапозон');
  }

  const rounding = Math.random() * (before - from) + from;
  return rounding.toFixed(afterComma);
}

getRandomCoordinates();

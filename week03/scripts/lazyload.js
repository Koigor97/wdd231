const getDate = function () {
  const date = new Date();
  const option = {
    month: "short",
    day: "numeric",
  };

  const dateNYear = {
    time: date.toTimeString(),
    year: date.getFullYear(),
    date: new Intl.DateTimeFormat("en-SA", option).format(date),
  };

  return dateNYear;
};

document.querySelector('#date').textContent =`${getDate().year} .:. ${getDate().date} .:. ${getDate().time}`
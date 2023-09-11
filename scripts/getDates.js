"use strict";

const date = document.getElementById("lastModified");
const year = document.getElementById("year");

const getDate = function () {
  const date = new Date();
  const option = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const dateNYear = {
    time: date.toTimeString(),
    year: date.getFullYear(),
    date: new Intl.DateTimeFormat("en-SA", option).format(date),
  };

  return dateNYear;
};

year.textContent = getDate().year;
date.textContent = `${getDate().date} ${getDate().time}`;

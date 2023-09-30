"use strict";

const nav = document.querySelector('.header-nav');
const menuBtn = document.querySelector('.menu-btn');
const theYear = document.querySelector('#year');
const lastModify = document.querySelector('.last-modify')
const messageBox =  document.querySelector('.message-box');
const daysContainer = document.querySelector(".days");
const nextMonthBtn = document.querySelector(".next-btn");
const prevMonthBtn = document.querySelector(".prev-btn");
const month = document.querySelector(".the-date");
const todayBtn = document.querySelector('.today');

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] 

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

class Switch {
  constructor(switchMode) {
    this.switchBtn = switchMode;
    this.switchBtn.addEventListener('click', () => this.toggleStatus());
    this.switchBtn.addEventListener('keydown', (event) =>
      this.handleKeydown(event)
    );
  }

  handleKeydown(event) {
    // Only do something when space or return is pressed
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleStatus();
    }
  }

  // Switch state of a switch
  toggleStatus() {
    const currentState =
      this.switchBtn.getAttribute('aria-checked') === 'true';
    const switchDot = this.switchBtn.querySelector('.switch span');
    // console.log(currentState);
    const newState = String(!currentState);
    // console.log(newState);

    this.switchBtn.setAttribute('aria-checked', newState);
    // switchDot.classList.toggle('dot');
    switchDot.classList.toggle('moveRight');
  }
}

// Initialize switches
window.addEventListener('load', function () {
  // Initialize the Switch component on all matching DOM nodes
  Array.from(document.querySelectorAll('[role^=switch]')).forEach(
    (element) => {
      new Switch(element)
      // console.log(element);
    }
  );
});

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

const toggleMenu = function () {
  nav.classList.toggle('show-nav')
}

const hoverFadeInOut = function (e) {
  if (e.target.classList.contains('nav-links')) {
    const theNav = e.target;
    const linksList = theNav.closest('.nav-list').querySelectorAll('.nav-links');

    linksList.forEach(theLink => {
      if (theLink !== theNav) {
        theLink.style.opacity = this;

      }
    });
  }
}

nav.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains('nav-links')) {
    const links = e.target
      .closest(".nav-list")
      .querySelectorAll(".nav-links");

    const theLink = e.target;
    links.forEach((e) => {
      e.classList.remove("active");
    });

    if (theLink.tagName.toLowerCase() !== "a") return;
    theLink.classList.add("active");
  }

});

//  getting current date
const date = new Date();
// getting the current month
let currentMonth = date.getMonth();
// getting the current year
let currentYear = date.getFullYear();

// function for rendering the days
function renderCalender() {
  // getting the previous, current and next month days
  date.setDate(1);
  const firstDay = new Date(currentYear, currentMonth, 1);
  console.log(firstDay.getDay());
  const lastDay =  new Date(currentYear, currentMonth + 1, 0);
  console.log(lastDay);
  const lastDayIndex = lastDay.getDay();
  console.log(lastDayIndex);
  const lastDayDate = lastDay.getDate();
  console.log(lastDayDate);
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  console.log(prevLastDay);
  const prevLastDayDate = prevLastDay.getDate();
  console.log(prevLastDayDate);
  const nextDays = (7 - lastDayIndex) - 1;
  console.log(nextDays);

  // updating the current year and month in header
  month.innerHTML = `${months[currentMonth]} ${currentYear}`;
  // updating the days 
  let days = '';
  // updating previous days 
  for (let x = firstDay.getDay(); x > 0; x--) {
    days +=`<div class="day prev">${prevLastDayDate - x + 1}</div>`;  
  }

  // current month days
  for (let i = 1; i <= lastDayDate; i++) {
    // check if its today then add today class
    if (i === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
      // if date month year matches add today
      days += `<div class="day today">${i}</div>`;
    } else {
      // else dont add today
      days += `<div class="day">${i}</div>`;
    }
  }

  // next month days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next">${j}</div>`
  }

  hideTodayBtn();
  daysContainer.innerHTML = days;

}
renderCalender();

nextMonthBtn.addEventListener('click', () => {
  // increase the current month by one
  currentMonth++
  if (currentMonth > 11) {
    // if current month is greater 11, set it zero and increase year by one
    currentMonth = 0;
    currentYear++
  }
  // render calendar
  renderCalender();
})

prevMonthBtn.addEventListener("click", ()=> {
  // decrease by one
  currentMonth--;
  // checking if it's less than 0 set it to 11 and decrease year
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;

    // render calendar
    renderCalender();
  }

  // render calendar
  renderCalender();
});

// go to today
todayBtn.addEventListener('click', () => {
  // set the month and year to current
  currentMonth =  date.getMonth();
  currentYear = date.getFullYear();

  // render calendar
  renderCalender();
});

// hiding today button if it's already the current date
function hideTodayBtn() {
  if (currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
    todayBtn.style.display = "none";
  } else {
    todayBtn.style.display = "flex";
  }
}

const welcomeMsg = `<h1>Welcome! Let us know if you have any questions.</h1>`;
const welcomeBack = `<h1>Back so soon! Awesome!</h1>`

// const aWholeDay = 84600000; //(1000 * 60 * 60 * 24);
// const today = new Date();
// console.log(today.getTime());
// console.log(Date.now());
// const day = Math.floor(today.getTime() - 8) / (1000 * 60 * 60 * 24);
// console.log(day);
// console.log(new Date(day).getFullYear());


// let lastVisit = Number(JSON.parse(localStorage.getItem("numOfVisits"))) || 1;

// if (lastVisit !== 0) {
//   const currentTime = new Date().getTime();
//   // console.log(currentTime);
//   const theDifference = currentTime - lastVisit;
//   const daysGoneBy = (theDifference / aWholeDay);
  

//   if(daysGoneBy < 1) {
//     messageBox.innerHTML = welcomeBack;
//     lastVisit++
//   } else {
//     messageBox.innerHTML = `<h1>You last visited ${daysGoneBy.toFixed(0)}</h1>`
//   }
// }
// else {
//   messageBox.innerHTML = welcomeMsg;
// }


nav.addEventListener('mouseover', hoverFadeInOut.bind(0.5))
nav.addEventListener('mouseout', hoverFadeInOut.bind(1))
menuBtn.addEventListener('click', toggleMenu);
theYear.textContent = `${getDate().year}`;
lastModify.textContent = `${getDate().date} - ${getDate().time}`



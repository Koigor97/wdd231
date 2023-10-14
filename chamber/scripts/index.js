"use strict";

const nav = document.querySelector('.header-nav');
const menuBtn = document.querySelector('.menu-btn');
const theYear = document.querySelector('#year');
const lastModify = document.querySelector('.last-modify')
const messageBox = document.querySelector('.message-box');
const daysContainer = document.querySelector(".days");
const nextMonthBtn = document.querySelector(".next-btn");
const prevMonthBtn = document.querySelector(".prev-btn");
const month = document.querySelector(".the-date");
messageBox.innerHTML = `Testing`;
month.innerHTML = `Testing`;
const todayBtn = document.querySelector('.today');
const memberCardBox = document.querySelector('.member-card-section');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');

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

const membersUrl = '../data/members.json';

const getMembersData = async function() {
  const response = await fetch(membersUrl);
  const data = await response.json();
  console.log(data);
  renderMembers(data.data);
}

const renderMembers = function(members) {
  members.forEach((member) => {
    const html = `
      <div class="member-card">
          <figure>
            <div>
              <img src="${member.image}" alt="${member.name} logo" width="1000" height="623" loading="lazy">
            </div>
            <figcaption>${member.name}</figcaption>
          </figure>
          <div class="member-info-box">
              <p>${member.address}</p>
              <p>${member.phone}</p>
              <a href="${member.website}">${member.website.slice(8)}</a>
              <img src="${member.membershipLevel}" alt="" width="45" height="64">
          </div>
      </div>
    `;
    memberCardBox.insertAdjacentHTML('afterbegin', html)
  })
}

const saveView = function(view) {
  localStorage.setItem("localView", JSON.stringify(view));
}

const changeView = function() {
  const btn = this;

  if(memberCardBox.classList.contains('list')) {
    memberCardBox.classList.remove('list');
  } else {
    memberCardBox.classList.remove('grid');
  }
  memberCardBox.classList.add(btn.id.slice(0, 4))
  console.log(btn.id);
  saveView(btn.id.slice(0, 4));
}

const theView  = function() {
  const isView = JSON.parse(localStorage.getItem("localView"));

  if (isView && isView != 0) {
    memberCardBox.classList.add(isView);
  }
}



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
console.log(date, currentMonth, currentYear);

// function for rendering the days
function renderCalender() {
  // getting the previous, current and next month days
  date.setDate(1);
  const firstDay = new Date(currentYear, currentMonth, 1);
  console.log(firstDay);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
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
  console.log(`${months[currentMonth]} ${currentYear}`);
  // updating the days 
  let days = '';

  // updating previous days 
  for (let x = firstDay.getDay(); x > 0; x--) {
    days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
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

// hiding today button if it's already the current date
function hideTodayBtn() {
  if (currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
    todayBtn.style.display = "none";
  } else {
    todayBtn.style.display = "flex";
  }
}

function feedbackMessage() {
  const welcomeMsg = `<p>Welcome! Let us know if you have any questions.</p>`;
  const welcomeBack = `<p>Back so soon! Awesome!</p>`
  const sinceLastVist = `<p>You last visited [n] days ago</p>`;

  // number of milliseconds in a day
  const millisecToDay = (1000 * 60 * 60 * 24);

  // checking if previous visit timestamp exist in local storage
  let lastVisit = Number(JSON.parse(localStorage.getItem("visitTimeStamp")));
  // getting today's date in milliseconds
  const currentTime = Date.now();

  if (lastVisit) {
    // calculating the days past since the last visit 

    const daysPast = Math.abs(Math.trunc((currentTime - lastVisit) / millisecToDay));
    console.log(daysPast);
    // give user feedback based on the days past
   if (daysPast === 0) {
      messageBox.innerHTML = welcomeBack;
    } else {
      messageBox.innerHTML = sinceLastVist.replace('[n]', daysPast);
    }
  } else {
    messageBox.innerHTML = welcomeMsg;
  }

  localStorage.setItem('visitTimeStamp', JSON.stringify(currentTime))
}

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
});

prevMonthBtn.addEventListener("click", () => {
  // decrease by one
  currentMonth--;
  // checking if it's less than 0 set it to 11 and decrease year
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  // render calendar
  renderCalender();
});

// go to today
todayBtn.addEventListener('click', () => {
  // set the month and year to current
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  // render calendar
  renderCalender();
});

nav.addEventListener('mouseover', hoverFadeInOut.bind(0.5))
nav.addEventListener('mouseout', hoverFadeInOut.bind(1))
menuBtn.addEventListener('click', toggleMenu);
gridBtn.addEventListener('click', changeView.bind(gridBtn));
listBtn.addEventListener('click', changeView.bind(listBtn));

theYear.textContent = `${getDate().year}`;
lastModify.textContent = `${getDate().date} - ${getDate().time}`

renderCalender();
feedbackMessage();
getMembersData();
theView();

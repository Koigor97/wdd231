"use strict";

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");
const theH2 = document.querySelector("h2");
const pageVisit = document.querySelector(".page-visit");
const date = document.getElementById("lastModified");
const year = document.getElementById("year");

hamButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  hamButton.classList.toggle("open");
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

// 1️⃣ Initialize display element variable
let numOfVisits = Number(JSON.parse(localStorage.getItem("numOfVisits-timestamp"))) || 0;

// 3️⃣ Determine if this is the first visit or display the number of visits. We wrote this example backwards in order for you to think deeply about the logic.
if (numOfVisits !== 0) {
	pageVisit.textContent = `Current number of visit to the page is: ${numOfVisits} 🫡`;
} else {
	pageVisit.textContent = `This is your first visit. 🥳 Welcome!`;
}
//increment the number of visits by one.
numOfVisits++;
//store the new visit total into localStorage, key=numOfVisits-ls
localStorage.setItem("numOfVisits-ls", JSON.stringify(numOfVisits));

year.textContent = getDate().year;
date.textContent = `${getDate().date} ${getDate().time}`;

"use strict";

const nav = document.querySelector('.header-nav');


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


const cloneAndAppendLogos = function () {
  const parentBox = document.querySelector('.partners');
  const cloneVersion = document.querySelector('.partner-slide').cloneNode(true);
  parentBox.appendChild(cloneVersion);
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


nav.addEventListener('mouseover', hoverFadeInOut.bind(0.5))
nav.addEventListener('mouseout', hoverFadeInOut.bind(1))

cloneAndAppendLogos();
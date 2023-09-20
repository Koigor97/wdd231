"use strict";

const newsContainer = document.querySelector('.news-box');

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
        console.log(element);
    }
  );
});

const renderNewsFeed = function(param) {
    const theList = param["newsList"].map((items) => {
        return `
        <figure>
            <img src="${items.image}" alt="">
             <figcaption>${items.headlines}</figcaption>
            <blockquote>
                ${items.excerpt}
             </blockquote>
        </figure>
        `
    }).join('')

    newsContainer.insertAdjacentHTML('afterbegin', theList)
}

const getNews = async function(fileName) {
    const url = `./data/${fileName}.json`;
    const response = await fetch(url);
    const data = await response.json();

    renderNewsFeed(data)
} 

getNews("news");


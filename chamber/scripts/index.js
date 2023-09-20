"use strict";


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

const getNews = async function(fileName) {
    const url = `./data/${fileName}.json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if(!response.ok) throw new Error('There was problem getting the data');

        return data;
    }catch(error) {
        console.log(error);
    }

} 


class NewsClass {
    _newFeeds;
    _newFeedLength;
    constructor(parent, getData, file) {
        this.parentBox = parent;
        [this._newFeeds] = getData(file);
        this._newFeedLength = this._newFeeds.length;

        _



    }
}
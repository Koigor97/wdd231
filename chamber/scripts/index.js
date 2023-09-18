"use strict";

const getNews = async function() {
    const url = './data/event.json';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    
} 

// getNews();

// data
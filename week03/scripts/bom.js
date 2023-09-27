"use strict";

let chaptersArray = getChapterList() || [];

const input = document.querySelector("#favchap");
const list = document.querySelector("#list");
const addBtn = document.querySelector("#btn");

function renderList(item) {
    let listItem = document.createElement("li");

    let deleteBtn = document.createElement("button")
    deleteBtn.style.padding = "10px";
    deleteBtn.style.backgroundColor = "#9e9c48";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "5px";
    deleteBtn.ariaLabel = 'Remove List-item'

    listItem.textContent = item;
    deleteBtn.textContent = "❌";

    deleteBtn.addEventListener("click", () => {
        list.removeChild(listItem)
        deleteChapter(listItem.textContent)
        input.focus();
    });

    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);
}

function setChapterList() {
    localStorage.setItem('favBOMList', JSON.stringify(chaptersArray));
}

function getChapterList() {
  return JSON.parse(localStorage.getItem('favBOMList'));
}

function deleteChapter(chapter) {
  chapter = chapter.slice(0, chapter.length - 1);
  chaptersArray = chaptersArray.filter(item => item !== chapter);
  setChapterList();
}

chaptersArray.forEach(chapter => {
    renderList(chapter);
});

addBtn.addEventListener("click", () => {
    if (input.value !== '') {
        renderList(input.value); 
        chaptersArray.push(input.value); 
        setChapterList();
        input.value = ''; 
        input.focus(); 
    }
});
"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");

  // Add event-listeners to filter and sort buttons//user interactivity
  registerButtons();
  loadJSON();
}
function registerButtons() {
  document
    .querySelectorAll("[data-action='filter']")
    .forEach((button) => button.addEventListener("click", selectFilter));
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first
  displayList(allAnimals);
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}
function selectFilter(event) {
  const filter = event.target.dataset.filter;
  console.log(`Selected filtering option: ${filter}`);
  filteringList(filter);
}
function filteringList(filterBy) {
  let filteredList = allAnimals;
  if (filterBy === "cat") {
    //filtered list on cats
    filteredList = allAnimals.filter(isCat);
  } else if (filterBy === "dog") {
    filteredList = allAnimals.filter(isDog);
  }
  //create a filtered list of only one type// hardcode
  //const filteredList = allAnimals.filter(isCat);
  //displayList(filteredList);
  //create a filtered list of on the other type//hardcode
  // const filteredList = allAnimals.filter(isDog);
  // displayList(filteredList);
  displayList(filteredList);
}
function isCat(animal) {
  return animal.type === "cat";
  // this can be written like
  // if ( animal.type === "cat"){
  //   return true;
  //   }else{
  //     return false
  //   }
}
function isDog(animal) {
  return animal.type === "dog";
  // this can be written like
  // if ( animal.type === "cat"){
  //   return true;
  //   }else{
  //     return false
  //   }
}
function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}

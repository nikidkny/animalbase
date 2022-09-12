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
const settings = { filter: "all", sortBy: "name", sortDir: "asc" };

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
  document
    .querySelectorAll("[data-action='sort']")
    .forEach((button) => button.addEventListener("click", selectSort));
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
  //filteringList(filter);
  setFilter(filter);
}
function setFilter(filter) {
  settings.filterBy = filter;
  buildList();
}
function filteringList(filteredList) {
  //let filteredList = allAnimals;
  if (settings.filterBy === "cat") {
    //filtered list on cats
    filteredList = allAnimals.filter(isCat);
  } else if (settings.filterBy === "dog") {
    filteredList = allAnimals.filter(isDog);
  }
  //create a filtered list of only one type// hardcode
  //const filteredList = allAnimals.filter(isCat);
  //displayList(filteredList);
  //create a filtered list of on the other type//hardcode
  // const filteredList = allAnimals.filter(isDog);
  // displayList(filteredList);
  return filteredList;
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
function selectSort(event) {
  const sortBy = event.target.dataset.sort;
  //looks at the direction //data-sort-direction="asc"// in html and then sortby that direction
  const sortDir = event.target.dataset.sortDirection;

  // toggle the direction of sorting
  if (sortDir === "asc") {
    event.target.dataset.sortDirection = "desc";
  } else {
    event.target.dataset.sortDirection = "asc;";
  }
  console.log(`Selected filtering option: ${sortBy} - ${sortDir}`);
  setSort(sortBy, sortDir);
}
function setSort(sortBy, sortDir) {
  settings.sortBy = sortBy;
  settings.sortDir = sortDir;
  buildList();
}
function sortingList(sortedList) {
  //we don't need the next line as we made it a global variable
  //let sortedList = allAnimals;
  // setting a direction
  let direction = 1;
  if (settings.sortDir === "desc") {
    direction = -1;
  } else {
    settings.direction = 1;
  }
  // if (sortBy === "name") {
  //   sortedList = sortedList.sort(sortByName);
  // } else if (sortBy === "type") {
  //   sortedList = sortedList.sort(sortByType);
  // } else if (sortBy === "desc") {
  //   sortedList = sortedList.sort(sortByDesc);
  // } else if (sortBy === "age") {
  //   sortedList = sortedList.sort(sortByAge);
  // }
  //to make it generic from the above the only thing that stays is this
  sortedList = sortedList.sort(sortByProperty);
  // and the function is moved inside the function//closoure
  function sortByProperty(animalA, animalB) {
    if (animalA[settings.sortBy] < animalB[settings.sortBy]) {
      return -1 * direction;
    } else {
      return 1 * direction;
    }
  }
  return sortedList;
}
// after making it generic the following is not needed anymore
//instead the line 115 function is renamed to a generic sorting name
// function sortByType(animalA, animalB) {
//   if (animalA.type < animalB.type) {
//     return -1;
//   } else {
//     return 1;
//   }
// }
// function sortByDesc(animalA, animalB) {
//   if (animalA.desc < animalB.desc) {
//     return -1;
//   } else {
//     return 1;
//   }
// }
// function sortByAge(animalA, animalB) {
//   if (animalA.age < animalB.age) {
//     return -1;
//   } else {
//     return 1;
//   }
// }
function buildList() {
  const currentList = filteringList(allAnimals);
  const sortedList = sortingList(currentList);
  displayList(sortedList);
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

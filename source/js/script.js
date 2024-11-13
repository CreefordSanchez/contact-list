'use strict'

function listener(selector, event, callBack) {
  return selector.addEventListener(event, callBack);
}

function selector(selector) {
  return document.querySelector(selector);
}

function createElement(tag) {
  return document.createElement(tag);
}

class Contact {
  #name;
  #city;
  #email;

  constructor(name, city, email) {
    this.#name = name;
    this.#city = city;
    this.#email = email;
  }

  set name(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  set city(city) {
    this.#city = city;
  }

  get city() {
    return this.#city;
  }

  set email(email) {
    this.#email = email;
  }

  get email() {
    return this.#email;
  }

  listContacts() {
    let print = 
    `<span>Name: ${this.name}</span>\
     <span>City: ${this.city}</span>\
    <span>Email: ${this.email}</span>`;
    return  print;
  }
}

const input = selector('input');
const printError = selector('.print-error');
let checkValid = false;
setInterval(() => {
  const inputLength = input.value.trimEnd().split(', ');
  if (inputLength.length >= 3) {
    checkValid = true;
    enableBtn('#00e200');
  } 
  else {
    checkValid = false;
    enableBtn('#00e20052');
  }
}); 

const button = selector('button');
function enableBtn(color) {
  button.style.backgroundColor = color;
}

let errorPlaceHolder = '';
const parentBox = selector('.grid');
function add() {
  errorPlaceHolder = '';

  if (checkValid) {
    validate();
  } else errorPlaceHolder = 'Please enter Name, City, and Email';

  printError.innerText = errorPlaceHolder;
  const arrayBox = Array.from(parentBox.children);
  scannChildren(arrayBox);
}

//Validation;
function validate() {
  const inputValues = input.value.trimEnd().split(', ');
  let isNameValid = validName(inputValues[0]);
  let isCityValid = validCity(inputValues[1]);
  let isEmailValid = validEmail(inputValues[2]);

  if (!reachedMax()) {
    if (isNameValid && isCityValid && isEmailValid) {
      const newObj = new Contact(inputValues[0], inputValues[1], inputValues[2]);
      createBox(newObj);
    } 
  }
}

function reachedMax() {
  if (getLength() >= 9 ) {
    errorPlaceHolder = 'Contact list has reached maximum';
    return true;
  }

  return false;
}

function getLength() {
  const getLength = Array.from(parentBox.children);
  return getLength.length;
}

function validName(name) {
  if (!includesSpecial(name) && checkSpace(name) && name.length > 5) {
    return true;
  }

  errorPlaceHolder += '(name is not valid) '; 
  return false;
}

function validCity(city) {
  let length = city.length;
  if (!includesSpecial(city) && !checkSpace(city)  && length > 3) {
    return true;
  }
  
  errorPlaceHolder += '(city is not valid) ';
  return false;
}

function validEmail(email) {
  /*
    - read the string from the start (^) and to end (&) 
        (this also check if @ comes first due to this)
    - checks if one or more char exist (+)
    - a-zA-Z0-9 check if a character is withing assign range
    - (co|com) achecks if co OR com is inlcuded,  vice versia for @ and .
  */
  let requirements = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(co|com)$/;

  if (requirements.test(email)) return true;

  errorPlaceHolder += '(email is not valid) ';
  return false;
}

function includesSpecial(value) {
  const breakValue = value.split(' ');
  let joinValue = breakValue.join('');

  return !/^[A-Za-z]+$/.test(joinValue);
}

function checkSpace(value) {
  const values = value.split(' ');

  if (values.length > 1) return true;
  return false;
}

//Create the box
function createBox(contacts) {
  const newBox = createElement('div');
  giveProperties(contacts, newBox);
  parentBox.appendChild(newBox);
}

function giveProperties(classObj, newBox) {
  newBox.classList.add('box');
  printContacts(classObj, newBox);
}

function printContacts(classObj, newBox) {
  let contacts = createElement('p');
  contacts.innerHTML = classObj.listContacts();
  newBox.appendChild(contacts);
}

function scannChildren(arrayBox) {
  arrayBox.forEach(box => {
    listener(box, 'click', () => {
        box.remove(); 
    });
  })
}

//update box count
const boxCount = selector('.count');
boxCount.innerText = length;
setInterval(() => {
  boxCount.innerText = getLength();
}); 
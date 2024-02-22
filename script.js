'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* --------------Selecting Elements from html ------------*/
console.log(document.documentElement); // selecting the entire page
console.log(document.head);
console.log(document.body);

console.log(document.querySelector('.header'));
console.log(document.querySelectorAll('.section'));

console.log(document.getElementById('section--1'));
console.log(document.getElementsByTagName('button'));
console.log(document.getElementsByClassName('btn'));

/*----------------CREATING ELEMENTS-----------------*/
// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies form improved functionalities and analytics';
message.innerHTML =
  'We use cookies form improved functionalities and analytics. <button class = "btn btn--close-cookie">Got It!</button>';

/*------------------- INSERTING ELEMENTS TO THE WEB PAGE ------------------*/
document.querySelector('.header').prepend(message); // add as the first child of the element
document.querySelector('.header').append(message); // add as the last child of the element
document.querySelector('.header').before(message); // add the element before the heade
document.querySelector('.header').after(message); // add the element after the header

/* ------------- DELETING ELEMENTS --------------*/
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

/* ---------- SETTING STYLES------------*/
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style);

/* ---------- GETTING STYLES------------*/
const color = message.style.backgroundColor; // we can get imbeded css styles like this but cant get css styles on the css style.sheet
const textColor = document.querySelector('.section__description').style.color;
console.log(textColor, color);

const allStyles = getComputedStyle(message); // this get all the styles including the ones on the external CSS sheets
const extheight = getComputedStyle(message).height; // this gets the computed widths
console.log(allStyles, extheight);

// Adding to the value of of the size, which is in PX
message.style.height = Number.parseFloat(extheight, 10) + 30 + 'px';

// Working with CSS custom property
document.documentElement.style.setProperty('--color-primary', 'orangered');

// checking if an object have a specific value
// const hasValue = (obj, value) => Object.values(obj).includes(value);
// console.log(hasValue(message, width));

/* ---------- GETTING ATRRIBUTE------------*/
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.alt); // This can be used to get the standard properties

console.log(logo.getAttribute('designer')); // this is used to get none standard attribute

/* ---------- SETTING ATRRIBUTE------------*/
logo.alt = 'Beautiful minimalist Logo';
// logo.src = 'img/hero.png';

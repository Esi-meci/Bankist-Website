'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const scrolBtn = document.querySelector('.btn--scroll-to');
const sec1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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
// creating cookie element
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
  'We use cookies form improved functionalities and analytics. <button class = "btn btn--close-cookie">Got It!</button>';
document.querySelector('.header').prepend(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// PAGE NAVIGATION
// Scrolling to the secon section when i click on a button

scrolBtn.addEventListener('click', function (e) {
  sec1.scrollIntoView({ behavior: 'smooth' });
});

// scrolling to another section when i click the link
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// implement the tab feature

tabsContainer.addEventListener('click', function (e) {
  // e.preventDefault();
  // matching strategy
  const clicked = e.target.closest('.operations__tab');

  // ignore any click that dosent match
  // if (clicked) {
  //   clicked.classList.add('operations__tab--active');
  //   console.log(clicked);
  // }
  // OR for fast pages
  if (!clicked) return;
  // Removing the active from all the tab before adding it the active class to clicked button
  tabs.forEach(function (t) {
    t.classList.remove('operations__tab--active');
  });
  clicked.classList.add('operations__tab--active');

  // Activating the content area

  // Remove the active class from other elements
  tabsContent.forEach(function (t) {
    t.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  // if(e.target.classList)
});

// MENU FADE ANIMATION
function handleHover(e, opacity) {
  const clicked = e.target;
  const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
  const logo = clicked.closest('.nav').querySelector('img');

  // Matching the event
  if (e.target.classList.contains('nav__link')) {
    siblings.forEach(function (el) {
      if (el !== clicked) {
        el.style.opacity = opacity;
        logo.style.opacity = opacity;
      }
    });
  }
}
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

// making navigation sticy and transparent when it get to a point in the page
// this is bad for performance
// const cords = sec1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > cords.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });

// instead use this (the Intersection Observer Api)

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
function stickyNav(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, //  this should always be specified correctly
});

headerObserver.observe(header);

// Revealing Sections
// the observer function
function revealSectionFunc(entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
}
// declaring the threahold(at what percentage should the intersection occure), and what object is the observer observering
const secObserver = new IntersectionObserver(revealSectionFunc, {
  root: null,
  threshold: 0.1,
});
// callinng the observer on all sections
const allSections = document.querySelectorAll('.section');
allSections.forEach(function (section) {
  secObserver.observe(section);
  // section.classList.add('section--hidden');
});

// implementing Lazy loading images to improve performance
function imgLoad(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // replace the src attribute with the data-src attribute
  entry.target.src = entry.target.dataset.src;
  // removing the blur filter
  // entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img'); // this removes the blur feature when the image is done loading
  });
  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(imgLoad, {
  root: null,
  threshold: 0.4,
  rootMargin: '200px', //making the image load before the images is views
});

const allImages = document.querySelectorAll('img[data-src]');
allImages.forEach(function (img) {
  imgObserver.observe(img);
});

// BUILDING THE SLIDER COMPONENT
const slides = document.querySelectorAll('.slide');
let curSlide = 0;
const maxSlide = slides.length - 1;

// Adding the active class to the current slide dot
function activateDot(slide) {
  document.querySelectorAll('.dots__dot').forEach(function (d) {
    d.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
}

// working on the buttons
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
function goToSlide(slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
}
// putting all the slides side by side
goToSlide(0);

function nextSlide() {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}
function prevSlide() {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}

// going to the next slide
btnRight.addEventListener('click', nextSlide);

// going the previous slide
btnLeft.addEventListener('click', prevSlide);

// implementing the arrow keys move slider
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  e.key === 'ArrowLeft' && prevSlide();
});

// working on the slider dots
const dotContainer = document.querySelector('.dots');
function createDots() {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class = "dots__dot" data-slide="${i}"></button>`
    );
  });
}
createDots();

// linking the dots to each slide
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});
activateDot(0);

///////////////////////////////////////////////////////////////////////////////
/* --------------Selecting Elements from html ------------*/
// console.log(document.documentElement); // selecting the entire page
// console.log(document.head);
// console.log(document.body);

// console.log(document.querySelector('.header'));
// console.log(document.querySelectorAll('.section'));

// console.log(document.getElementById('section--1'));
// console.log(document.getElementsByTagName('button'));
// console.log(document.getElementsByClassName('btn'));

/*----------------CREATING ELEMENTS-----------------*/
// .insertAdjacentHTML
// const message = document.createElement('div');
// message.classList.add('cookie-message');

// message.textContent =
//   'We use cookies form improved functionalities and analytics';
// message.innerHTML =
//   'We use cookies form improved functionalities and analytics. <button class = "btn btn--close-cookie">Got It!</button>';

/*------------------- INSERTING ELEMENTS TO THE WEB PAGE ------------------*/
/*document.querySelector('.header').prepend(message); // add as the first child of the element
document.querySelector('.header').append(message); // add as the last child of the element
document.querySelector('.header').before(message); // add the element before the heade
document.querySelector('.header').after(message); // add the element after the header*/

/* ------------- DELETING ELEMENTS --------------*/
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

/* ---------- SETTING STYLES------------*/
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// console.log(message.style);

/* ---------- GETTING STYLES------------*/
// const color = message.style.backgroundColor; // we can get imbeded css styles like this but cant get css styles on the css style.sheet
// const textColor = document.querySelector('.section__description').style.color;
// console.log(textColor, color);

// const allStyles = getComputedStyle(message); // this get all the styles including the ones on the external CSS sheets
// const extheight = getComputedStyle(message).height; // this gets the computed widths
// console.log(allStyles, extheight);

// Adding to the value of of the size, which is in PX
// message.style.height = Number.parseFloat(extheight, 10) + 30 + 'px';

// Working with CSS custom property
// document.documentElement.style.setProperty('--color-primary', 'orangered');

/* ---------- GETTING ATRRIBUTE------------*/
// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.alt); // This can be used to get the standard properties

// console.log(logo.getAttribute('designer')); // this is used to get none standard attribute

/* ---------- SETTING ATRRIBUTE------------*/
logo.alt = 'Beautiful minimalist Logo'; // this is used to set for standard attribute
// logo.src = 'img/hero.png';

// this is used to set none standard attribute
logo.setAttribute('company', 'Bankist');
// the setAttribute is also used to get the absolute value
// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);

// Data atrribute
// console.log(logo.dataset.versionNumber);

// Classes
// logo.classList.add('c', 'g'); // this is used to add a class to an element
// logo.classList.remove(); // this is used to remove classes
// logo.classList.toggle('c'); // this is used to off and on classes
// logo.classList.contains('c'); // this is used to check ffor a class

/* ------------- SMOOTH SCROLLING ----------------- */
// const scrolBtn = document.querySelector('.btn--scroll-to');
// const sec1 = document.querySelector('#section--1');

/*scrolBtn.addEventListener('click', function (e) {
getting the location we want to scroll to
const s1coords = sec1.getBoundingClientRect();
console.log(s1coords);
Scrooling to the location
window.scrollTo({
  left: s1coords.left + window.pageXOffset,
  top: s1coords.top + window.pageYOffset,
  behavior: 'smooth',
});
modern solution
sec1.scrollIntoView({ behavior: 'smooth' });
});*/

/*--------LISTENING FOR EVENT-----------*/
// function alertH1() {
//   alert('addEventListerner: Great you are reading the heading');

//   // Deleting an eventListener after use, this help listen for an event only once
//   h1.removeEventListener('mouseenter', alertH1);
// }
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', alertH1);

/* -----------EVENT BUBBBLING AND CAPTURING( event PRopagation)--------*/
// GENERATING RANDOM COLORS
// this is used when u specify a starting point that is not zero
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor(50, 255));

// this is used when the default starting point is zero
// function random(max) {
//   const colors = [
//     `rgb(${Math.trunc(Math.random() * max)}`,
//     `${Math.trunc(Math.random() * max)}`,
//     `${Math.trunc(Math.random() * max)})`,
//   ];
//   return colors.join(',');
// }
// console.log(random(255));
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// console.log('MENU', e.target, e.currentTarget);
// Stoping Propagation
// e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = random(255);
// console.log('CONTAINER', e.target);
// e.stopPropagation();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = random(255);
// console.log('NAV', e.target);
// });

/* ---------------DOM TRAVERSING ----------*/
// const head1 = document.querySelector('h1');

// Going downwards: selecting child
// console.log(head1.querySelectorAll('.highlight'));
// console.log(head1.childNodes);
// head1.firstElementChild.style.color = 'white';
// head1.lastElementChild.style.color = 'orangered';

// Going upwards : Selecting parent element
// console.log(head1.parentNode);
// console.log(head1.parentElement); //mostly used
// finding a parent element no matter how far off it is
// head1.closest('.header').style.background = 'var(--gradient-secondary)';
// head1.closest('h1').style.background = 'var(--gradient-primary)';
// console.log(head1.closest('.header'));

// Going sideways : selecting siblings
// console.log(head1.previousElementSibling); // this select the previous sibling
// head1.nextElementSibling.style.color = 'orangered'; // this selects the nextSibling

// To Select all the siblings we need to go up the parent Element and select all its child Elements
// console.log(head1.parentElement.children);
// [...head1.parentElement.children].forEach(function (el) {
//   if (el !== head1) {
//     el.style.transform = 'scale(0.8)';
//   }
// });

/* ------------ How the INTERSECTION ABSERVER API WORKS----------------*/
// function obsFunction(entries, Observer) {
//   entries.forEach(function (entry) {
//     console.log(entry);
//   });
// }

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const IntObserver = new IntersectionObserver(obsFunction, obsOptions);
// IntObserver.observe(sec1);

/*
checking if an object have a specific value
const hasValue = (obj, value) => Object.values(obj).includes(value);
console.log(hasValue(message, width));
*/

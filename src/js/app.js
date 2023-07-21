import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

import Swiper, { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);

//============================================IventLiseners===================================

let userMenu = document.querySelector('.user-header__menu');

let menuBurger = document.querySelector('.icon-menu');
let menuBody = document.querySelector('.menu__body');
let body = document.querySelector('body');
let loadcircle = document.querySelector('.control-slider-quotes__circle');
const mainForm = document.forms.main;
const mainFormInput = mainForm.nameInput;
const mainFormInputPlaceholder = mainFormInput.placeholder;

document.addEventListener("click", function (e) {
   //Для юсер меню
   if (e.target.closest('.user-header__icon')) userMenu.classList.toggle('_active');
   if (!e.target.closest('.user-header')) userMenu.classList.remove('_active');

   //Для бургера
   if (e.target.closest('.icon-menu')) {
      menuBurger.classList.toggle('_active');
      menuBody.classList.toggle('_active');
      body.classList.toggle('_lock');
   }
   //Для свайпера
   if (e.target.closest('.control-main-slider__arrow_prev')) {
      main_slider.slidePrev();
   }
   if (e.target.closest('.control-main-slider__arrow_next')) {
      main_slider.slideNext();
   }

   if (e.target.closest('.control-slider-lots__arrow_prev')) {
      lots_slider.slidePrev();
   }
   if (e.target.closest('.control-slider-lots__arrow_next')) {
      lots_slider.slideNext();
   }

   if (e.target.closest('.control-slider-quotes__link')) {
      quotes_slider.slideNext();
      loadcircle.classList.add('_active');
      setTimeout(function () {
         loadcircle.classList.remove('_active');
      }, 1000);
   }
});
//проверка формы=============================
mainForm.addEventListener("submit", function (event) {
   if (emailTest(mainFormInput)) {
      if (!mainFormInput.nextElementSibling) {
         mainFormInput.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">
				Ошибка
			</div>`
         );
      }
      event.preventDefault();
   }
});

mainFormInput.addEventListener("focus", function (e) {
   mainFormInput.placeholder = "";
   if (mainFormInput.nextElementSibling) {
      mainFormInput.nextElementSibling.remove();
   }
});

mainFormInput.addEventListener("blur", function (e) {
   mainFormInput.placeholder = mainFormInputPlaceholder;
});

function emailTest(input) {
   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
// menuBurger.addEventListener("click", function (event) {
//    menuBurger.classList.toggle('_active');
//    menuBody.classList.toggle('_active');
// });

//===================================================================================

const main_slider = new Swiper('.main-slider__body', {
   autoHeight: true,
   observer: true,
   observeParents: true,
   slidesPerView: 1,
   spaceBetween: 0,
   speed: 880,
   loop: true,
   direction: 'horizontal',
   // navigation: {
   //    nextEl: '.control-main-slider__arrow_next',
   //    prevEl: '.control-main-slider__arrow_prev',
   // },
   breakpoints: {
      320: {
         autoHeight: true,
      },
   }
});

const lots_slider = new Swiper('.slider-lots__body', {
   loop: true,
   // autoHeight: true,
   observer: true,
   observeParents: true,
   slidesPerView: 3,
   spaceBetween: 30,
   // slidesPerGroup: 1,
   speed: 880,
   direction: 'horizontal',
   // navigation: {
   //    nextEl: '.control-main-slider__arrow_next',
   //    prevEl: '.control-main-slider__arrow_prev',
   // },
   on: {
      lazyImageReady: function () {
         ibg();
      },
   },
   breakpoints: {
      975: {
         spaceBetween: 100,
      },
      768: {
         spaceBetween: 30,
         slidesPerView: 3,
      },
      550: {
         slidesPerView: 2,
      },
      320: {
         slidesPerView: 1,
      }
   },
});



const quotes_slider = new Swiper('.slider-quotes__body', {
   effect: 'fade',
   fadeEffect: {
      crossFade: true
   },
   autoHeight: true,
   observer: true,
   observeParents: true,
   slidesPerView: 1,
   spaceBetween: 0,
   speed: 1000,
   loop: true,
   direction: 'horizontal',
   // navigation: {
   //    nextEl: '.control-main-slider__arrow_next',
   //    prevEl: '.control-main-slider__arrow_prev',
   // },
   // breakpoints: {
   //    570: {
   //       autoHeight: true,
   //    },
   // }
});

//Прокрутка по якорям=================================================================================
document.querySelectorAll('a[href^="#"').forEach(link => {

   link.addEventListener('click', function (e) {
      e.preventDefault();

      let href = this.getAttribute('href').substring(1);

      const scrollTarget = document.getElementById(href);

      const topOffset = 50;
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;

      window.scrollBy({
         top: offsetPosition,
         behavior: 'smooth'
      });
   });
});

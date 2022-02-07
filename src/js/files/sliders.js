/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Pagination, Autoplay, Lazy, Mousewheel, Scrollbar, Thumbs } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	if (document.querySelector('.banner__slider')) {
		new Swiper('.banner__slider', {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Pagination, Lazy, Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 10,
			autoHeight: true,
			speed: 800,
			loop: false,

			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},

			// lazy
			preloadImages: true,
			lazy: {
				loanOnTransitionStart: true,
				loadPrevNext: true,
			},

			// Dotts
			pagination: {
				el: '.banner-controlls__dotts',
				clickable: true,
			},

			on: {
				init: function (swiper) {
					const allSlides = document.querySelector('.fraction-controll__all');
					const allSlidesItems = document.querySelectorAll('.banner__slide:not(.swiper-slide-duplicate)');
					allSlides.innerHTML = allSlidesItems.length < 10 ? `0${allSlidesItems.length}` : allSlidesItems.length;
				},
				slideChange: function (swiper) {
					const currentSlide = document.querySelector('.fraction-controll__current');
					currentSlide.innerHTML = swiper.realIndex + 1 < 10 ? `0${swiper.realIndex + 1}` : swiper.realIndex + 1;
				}
			}
		});
	}

	if (document.querySelector('.showcase__products')) {
		new Swiper('.showcase__products', {
			// Подключаем модули слайдера для конкретного случая
			modules: [Lazy, Mousewheel, Scrollbar],
			observer: true,
			observeParents: true,
			watchOverflow: true,
			slidesPerView: 1,
			spaceBetween: 10,
			autoHeight: false,
			speed: 800,
			loop: false,

			// lazy
			preloadImages: true,
			lazy: {
				loanOnTransitionStart: true,
				loadPrevNext: true,
			},

			// scrollbar
			scrollbar: {
				el: '.showcase__scrollbar',
				draggable: true,
			},

			breakpoints: {
				350: {
					slidesPerView: 2,
				},
				480: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 24,
				},
			},
		});
	}

	if (document.querySelector('.gallery-product__thumbs')) {
		const thumbsSwiper = new Swiper('.gallery-product__thumbs', {
			// Подключаем модули слайдера для конкретного случая
			modules: [Navigation, Lazy, Autoplay, Thumbs],
			observer: true,
			observeParents: true,
			watchOverflow: true,
			slidesPerView: 3,
			spaceBetween: 3,
			autoHeight: false,
			speed: 800,
			loop: false,
			direction: 'vertical',

			/* 			autoplay: {
							delay: 3000,
							disableOnInteraction: false,
						}, */

			// lazy
			preloadImages: true,
			lazy: {
				loanOnTransitionStart: true,
				loadPrevNext: true,
			},

			navigation: {
				nextEl: '.swiper__button-next',
				prevEl: '.swiper__button-prev',
			},

			/* 			breakpoints: {
							350: {
								slidesPerView: 2,
							},
							480: {
								slidesPerView: 3,
							},
							992: {
								slidesPerView: 4,
								spaceBetween: 24,
							},
						}, */
		});

		new Swiper('.gallery-product__slider', {
			// Подключаем модули слайдера для конкретного случая
			modules: [Lazy, Autoplay, Thumbs, Pagination],
			observer: true,
			observeParents: true,
			watchOverflow: true,
			slidesPerView: 1,
			spaceBetween: 20,
			autoHeight: false,
			speed: 800,
			loop: false,

			/* 			autoplay: {
							delay: 3000,
							disableOnInteraction: false,
						},
			 */
			// lazy
			preloadImages: true,
			lazy: {
				loanOnTransitionStart: true,
				loadPrevNext: true,
			},

			// Dotts
			pagination: {
				el: '.gallery-product__slider .swiper-pagination',
				clickable: true,
				dynamicBullets: true,
			},


			thumbs: {
				swiper: thumbsSwiper
			},
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});
class foxCarousel {

	constructor(selector, options) {
		this.$el = document.querySelector(selector);

		this.init();

		if( options.navContainer ) {
			this.setNavContainer( options.navContainer );
		}
	}

	init() {
		this.$el.classList.add('fox-carousel');
		this.$el.querySelector('*:first-child').classList.add('js-act');
	}

	setNavContainer(container) {
		let $prevBtn = document.querySelector(container).querySelector(':first-child');
		let $nextBtn = document.querySelector(container).querySelector(':last-child');

		$prevBtn.addEventListener('click', (e) => {
			this.prev();
		});

		$nextBtn.addEventListener('click', (e) => {
			this.next();
		});		
	}

	next() {
		let $actSlide = this.$el.querySelector('.js-act');
		$actSlide.classList.remove('js-act');

		if( $actSlide.nextElementSibling ) {
			$actSlide.nextElementSibling.classList.add('js-act');
		} else {
			this.$el.querySelector('*:first-child').classList.add('js-act');
		}
	}

	prev() {
		let $actSlide = this.$el.querySelector('.js-act');
		$actSlide.classList.remove('js-act');

		if( $actSlide.previousElementSibling ) {
			$actSlide.previousElementSibling.classList.add('js-act');
		} else {
			this.$el.querySelector('*:last-child').classList.add('js-act');
		}
	}
}

const carousel = new foxCarousel('.js-fox-carousel', {
	navContainer: '.js-carousel-nav'
});

window.fox = carousel;
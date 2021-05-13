class imCarousel {

	constructor(selector, options) {
		this.$el = document.querySelector(selector);
		this.autoplayTimer, this.time = null;

		this.init();

		if( options.navContainer ) {
			this.setNavContainer( options.navContainer );
		}

		if( options.autoPlay ) {
			this.time = 5000;
			if( options.autoPlayTimeout ) {
				this.time = options.autoPlayTimeout;
			}

			this.setAutoplay(this.time);
		}
	}

	init() {
		this.$el.classList.add('im-carousel');
		this.$el.firstElementChild.classList.add('js-act');
	}

	// NAVIGATION EVENTS
	setNavContainer(container) {
		let $prevBtn = document.querySelector(container).firstElementChild;
		let $nextBtn = document.querySelector(container).lastElementChild;

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
			this.$el.firstElementChild.classList.add('js-act');
		}

		if( options.autoPlay ) {
			this.restartAutoplay();
		}
	}

	prev() {
		let $actSlide = this.$el.querySelector('.js-act');
		$actSlide.classList.remove('js-act');

		if( $actSlide.previousElementSibling ) {
			$actSlide.previousElementSibling.classList.add('js-act');
		} else {
			this.$el.lastElementChild.classList.add('js-act');
		}

		if( options.autoPlay ) {
			this.restartAutoplay();
		}
	}
	// END NAVIGATION EVENTS

	setAutoplay(time) {

		this.autoplayTimer = setInterval( () => {
			this.next();
		}, time);
	}

	restartAutoplay() {
		clearTimeout(this.autoplayTimer);
		this.setAutoplay(this.time);
	}
}

// window.im = carousel;
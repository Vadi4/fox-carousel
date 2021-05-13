class imCarousel {

	constructor(selector, options) {
		this.$el = document.querySelector(selector);
		this.autoplayTimer, this.time, this.counter, this.length = null;
		this.options = options;

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
		this.counter = 1;
		this.length = this.$el.children.length;

		if( this.options.counterTotal ) {
			document.querySelector( this.options.counterTotal ).innerHTML = this.length;
		}

		this.change();
	}

	change() {

		if( this.options.counterCurrent ) {
			document.querySelector( this.options.counterCurrent ).innerHTML = this.counter;
		}
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
			this.counter++;
		} else {
			this.$el.firstElementChild.classList.add('js-act');
			this.counter = 1;
		}

		if( this.options.autoPlay ) {
			this.restartAutoplay();
		}

		this.change();

	}

	prev() {
		let $actSlide = this.$el.querySelector('.js-act');
		$actSlide.classList.remove('js-act');

		if( $actSlide.previousElementSibling ) {
			$actSlide.previousElementSibling.classList.add('js-act');
			this.counter--;
		} else {
			this.$el.lastElementChild.classList.add('js-act');
			this.counter = this.length;
		}

		if( this.options.autoPlay ) {
			this.restartAutoplay();
		}

		this.change();
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
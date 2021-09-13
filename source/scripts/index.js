class imCarousel {

	constructor(selector, options) {
		this.$el = document.querySelector(selector);
		this.autoplayTimer, this.time, this.counter, this.length, this.$prevBtn, this.$nextBtn = null;
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

		this.setup();
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
		this.$prevBtn = document.querySelector(container).firstElementChild;
		this.$nextBtn = document.querySelector(container).lastElementChild;
		this.$prevBtn.setAttribute('data-controls', 'prev');
		this.$nextBtn.setAttribute('data-controls', 'next');
	}

	setup() {
		this.clickHandler = this.clickHandler.bind(this);
		this.$prevBtn.addEventListener('click', this.clickHandler);
		this.$nextBtn.addEventListener('click', this.clickHandler);
	}

	clickHandler(event) {
		const {controls} = event.target.dataset;

		if( controls === 'prev' ) {
			this.prev();
		} else if ( controls === 'next' ) {
			this.next();
		}
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

		let event = new CustomEvent('next');
		this.$el.dispatchEvent(event);

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

		let event = new CustomEvent('prev');
		this.$el.dispatchEvent(event);		
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

	destroy() {
		this.$prevBtn.removeEventListener('click', this.clickHandler);
		this.$nextBtn.removeEventListener('click', this.clickHandler);
	}
}

// window.im = carousel;
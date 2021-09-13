const carousel = new imCarousel('.js-im-carousel', {
	navContainer: '.js-carousel-nav',
	counterTotal: '.js-total-count',
	counterCurrent: '.js-current-count',
	autoPlay: true,
	autoPlayTimeout: 5000
});


carousel.$el.addEventListener('next', (e) => {
	console.log('next');
});

carousel.$el.addEventListener('prev', (e) => {
	console.log('prev');
});

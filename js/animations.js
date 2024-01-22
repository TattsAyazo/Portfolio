$(function () {
	var $window = $(window),
		$body = $("body"),
		image = $(".slide"),
		scrollTop = $window.scrollTop(),
		SCROLL_DELAY = 0,
		preventDefaultFormAction = function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
		};

	var timeout,
	updateParallax = function (el, useVertical) {

	},
	isLargeViewport = function () {
		return windowWidth >= MIN_WINDOW_WIDTH_FOR_PARALLAX;
	},
	isElementInViewport = function (el) {
		var rect = el.getBoundingClientRect();

    return (rect.bottom > 0 && rect.bottom < window.innerWidth) ||
        	(rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.top > 0);
	};

	var onScroll = function () {
		scrollTop = $window.scrollTop();
		console.log(scrollTop);
		if (isElementInViewport(image[0])) {
			$ (image[0]).addClass("scrollup");
		}
	};

	$window.scroll(function () {
			onScroll();

	});
});

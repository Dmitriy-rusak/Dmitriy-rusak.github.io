
$(document).ready(function(){

	// Nav menu
	const menuBtnToggle = $('.mobile-nav-btn');
	const mobileNavContainer = $('.mobile-nav');
	const logoMobileNav = $('.header_logo-mobile-nav');
	const mainLogoHidden = $('.header_logo-img');

	menuBtnToggle.click(function(){
		menuBtnToggle.toggleClass('mobile-nav-btn-active');
		mobileNavContainer.toggleClass('mobile-nav-active');
		logoMobileNav.toggleClass('header_logo-mobile-nav-active');
		mainLogoHidden.toggleClass('header_logo-img-hidden');
	});

	// Owl carousel
	$('.owl-carousel').owlCarousel({
		items: 1,
		loop: true,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true,
		autoplaySpeed: 1000,
		dotsSpeed: 1000
	});

	// Sroll to top
	const scrollBtn = $('.scroll-to-top-btn');

 	// show or hide ScrollBtn - by scrolling
	$(window).scroll(function(){
		if ($(this).scrollTop() > 900) {
			scrollBtn.fadeIn();
		} else {
			scrollBtn.fadeOut();
		}
	});

	// Click by scrollBtn
	scrollBtn.click(function(){
		$('html, body').animate({scrollTop: 0}, 360);
		return false;
	});

	// MixItUp
	var mixer = mixitup('.products_row');
});
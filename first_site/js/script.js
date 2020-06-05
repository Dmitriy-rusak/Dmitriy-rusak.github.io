// smooth scroll to anchor

document.addEventListener('click', function(event){
	if(event.target.classList.contains('scroll')){
		event.preventDefault();
		var targetSection = event.target.getAttribute('href');
		var section = document.querySelector(targetSection);
		var offset = section.offsetTop;
		window.scrollTo({
			behavior: 'smooth',
			top: offset,
			left: 0
		});
	}

});



window.onscroll = function(){
	// onScroll();
	var elToTop = document.getElementsByClassName('top');
	if(window.scrollY < 300){
		elToTop[0].style.display = 'none';
	}
	else{
		elToTop[0].style.display = 'block';
	}
}
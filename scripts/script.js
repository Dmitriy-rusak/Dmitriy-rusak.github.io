'use strict'

const header 	= document.querySelector('header');
const menubtn 	= document.getElementById('menubtn');



// * show Mobile nav

menubtn.onclick = function() {
	header.classList.toggle('opened');
}
////

const homeTop 		= 0;
const aboutTop 	 	= document.querySelector('#about').offsetTop - 100;
const serviceTop 	= document.querySelector('#service').offsetTop - 150;
const portfolioTop 	= document.querySelector('#portfolio').offsetTop - 380;
const contactTop 	= document.querySelector('#contact').offsetTop - 300;
const statTop 		= document.querySelector('.statistics').offsetTop - 300;

let menulinks = document.querySelectorAll('nav a');
menulinks = [].slice.call(menulinks);

function setActiveLink(num){
	menulinks.forEach(function(item){
		item.classList.remove('active');
	});
	menulinks[num].classList.add('active');
}

const progressbars = document.querySelectorAll('.progress');
let progressAnimated = false;

const counters = document.querySelectorAll('.count');
let counterAnimated = false;

function onScroll(scrollTop){
	// * animate counter by scroll
	if(scrollTop > statTop - 200 && !counterAnimated){
		counterAnimated = true;
		for(let j = 0; j < counters.length; j++){
			incrementCount(counters[j]);
		}
	}
	////

	// * set active menu link by scroll
	if(scrollTop < aboutTop){
		setActiveLink(0);
	}
		// * animate progress skills by scroll
	else if(scrollTop > aboutTop + 100 && !progressAnimated){	
		progressAnimated = true;
		for(let i = 0; i < progressbars.length; i++){
			showProgress(progressbars[i]);
		}
	}
		////
	else if(scrollTop > aboutTop && scrollTop < serviceTop){
		setActiveLink(1);
	}
	else if(scrollTop > serviceTop && scrollTop < portfolioTop){
		setActiveLink(2);
	}
	else if(scrollTop > portfolioTop && scrollTop < contactTop){
		setActiveLink(3);
	}
	else if(scrollTop > contactTop ){
		setActiveLink(4);
	}
	////
}

onScroll(window.pageYOffset);

window.onscroll = function(){
	onScroll(window.pageYOffset);
	// * sticky header
	if(window.pageYOffset > 300){
		header.classList.add('sticky');
	}
	else{
		header.classList.remove('sticky');
	}
	//// 
}


// * smooth scroll to anchor

document.addEventListener('click', function(event){
	if(event.target.classList.contains('scroll')){
		event.preventDefault();
		let targetSection = event.target.getAttribute('href');
		scrollToElem(targetSection);
	}
	if (event.target.classList.contains('fa-long-arrow-alt-up')) {
		event.preventDefault();
		scrollToElem('#home');
	}
});
////

// * show progress skills

function showProgress(elem){
	let max 	= +elem.getAttribute('data-value');
	let current = 0;
	let delta 	= 1;
	let interval = setInterval(function(){
		if(current < max){
			current+=delta;
			elem.style.width = current + '%';
		}
		else {
			clearInterval(interval);
		}
	}, 10);	
}
////

// * counter

function incrementCount(elem){
	var current = 0;
	var max 	= elem.getAttribute('data-count');
	var delta 	= 1500/max;

	var interval = setInterval(function(){
		if(current < max){
			current+=1;
			elem.innerText = current;
		}
		else {
			clearInterval(interval);
		}
	}, delta);
}
////

// * loadmore

// var portfolios = document.querySelectorAll('.portfolio_item');
// var loadBtn = document.querySelector('#portfolio .btn');
// var loaded = 6;
// var deltaLoading = 6;

// loadBtn.onclick = function(){
// 	if(loaded + deltaLoading <= portfolios.length){
// 		for(var i = loaded; i < loaded+deltaLoading; i++){
// 			portfolios[i].style.display = 'block';
// 		}
// 		loaded += deltaLoading;
// 	}
// 	else {
// 		for(var j = loaded; j < portfolios.length; j++){
// 			portfolios[j].style.display = 'block';
// 		}
// 		loaded = portfolios.length;
// 		loadBtn.style.display = 'none';
// 	}
// }
////

// * loader
// var loader = document.querySelector('.loader');
// reshenie dlia real saita
// document.addEventListener('DOMContentLoaded', function(){
// 	loader.style.display = 'none';
// });
// setTimeout(function(){
// 	loader.style.display = 'none';
// }, 2000);
////


// *  Modal Window with CV

const bodyTag 	= document.querySelector('body');
const divToTop 	= document.querySelector('.to_top');
let divParals 	= document.querySelectorAll('#parallax');
let modalWind 	= document.querySelectorAll('.modal');
let widthBody 	= bodyTag.clientWidth;
let allWidth 	= window.innerWidth;
let paddRight 	= allWidth - widthBody + 'px';
// 1366 - is nature width of parallax elem in '.service'
modalWind = [].slice.call(modalWind);
divParals = [].slice.call(divParals);

// change backgroundPositionX for parallax background-image, so that the picture does not move when the modal 'is-open'
if ((allWidth - 1366 + parseInt(paddRight, 10)) > 0) {
	let natureMarg = (widthBody - 1366)/2;
	divParals[0].style.backgroundPositionX = natureMarg + 'px';
	divParals[1].style.backgroundPositionX = natureMarg + 'px';
} else {
	divParals[0].style.backgroundPositionX = '0px';
	divParals[1].style.backgroundPositionX = '0px';
}
////

function showModal(ind) {
	bodyTag.classList.add('is-open-modal');
	addPaddingScrollbar(ind);
	modalWind[ind].classList.add('is-open');
	document.addEventListener('click', clickToClose);
}

function hideModal() {
	bodyTag.classList.remove('is-open-modal');
	removePaddingScrollbar();
	modalWind[0].classList.remove('is-open');
	modalWind[1].classList.remove('is-open');
	document.removeEventListener('click', clickToClose);
}

function clickToClose(e) {
	if (!(
	(document.querySelector('.dialog').contains(e.target))
	||  (e.target.classList.contains('modal-open'))
	||  (form.contains(e.target)))) {
		hideModal();
	}
}

function addPaddingScrollbar (ind) {
	bodyTag.style.paddingRight 			= paddRight;
	modalWind[ind].style.paddingRight 	= paddRight;
	divToTop.style.marginRight 			= paddRight;
	if (document.querySelector('.sticky')) {
		document.querySelector('nav').style.paddingRight = paddRight;
	}
}

function removePaddingScrollbar () {
	bodyTag.style.paddingRight 		= '0px';
	modalWind[0].style.paddingRight = '0px';
	modalWind[1].style.paddingRight = '0px';
	divToTop.style.marginRight 		= '0px';
	if (document.querySelector('.sticky')) {
		document.querySelector('nav').style.paddingRight = '0px';
	}
}

document.querySelector('#modal-btn_1').addEventListener('click', function(){
	showModal(0);
});

// redirect from form
const form 		= document.querySelector('#form'),
 	  min 		= document.querySelector('#min');
let	headerModal2 = document.querySelector('#header_modal-2'),
	textModal2   = document.querySelector('#text_modal-2'),
	notOpen		 = 0;

form.addEventListener('click', function(e){
		e.preventDefault();
		if (!notOpen) {windowRedirect();}
		
})

function windowRedirect() {
	showModal(1);
	notOpen++;
	let timer = 5;
	let timerId = setInterval(function(){
		min.innerText = --timer;
	}, 1000 )

	setTimeout(function(){
		clearInterval(timerId);
		document.location.href = "http://z96183n5.beget.tech/index.html#contact";
	}, 5100);
}
////

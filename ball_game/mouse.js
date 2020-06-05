	let move_platf = function (eventMove){
				let aa = eventMove.movementX;
				platf_leftX += aa;
				platf_rightX = platf_leftX + platf_Width;
				if (platf_leftX <= 0) {
					platf_leftX = 0;
					platf_rightX = platf_leftX + platf_Width;
				}
				if (platf_leftX >= max_platf_leftX){
					platf_leftX = max_platf_leftX;
					platf_rightX = platf_leftX + platf_Width;
				}
				platform_elem.style.left = platf_leftX + 'px';
			}
	
	platform_elem.addEventListener('mousedown', function (eventDown){
		if (eventDown.button == 0) {
			platform_elem.classList.add('active_platform');

			document.addEventListener('mousemove', move_platf);
		}
	});

	document.addEventListener('mouseup', function (event){
		if (event.button == 0){
			platform_elem.classList.remove('active_platform');
			document.removeEventListener('mousemove', move_platf);
		}
	});


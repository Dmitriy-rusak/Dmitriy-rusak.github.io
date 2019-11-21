	function move_ball () {
		balls.forEach(function(item) {
			///1-начало. Отражения мяча от границ: 1 if от левой-правой, 2 if от верхней-нижней.???
			// если левый отступ мяча + диаметр мяча(т.к. предел это правая граница, а отсчёт диаметра от лев. верх. угла мяча) больше либо равен ширине поля || или текущий левый отступ мяча больше либо равен 0 - шаг delta меняется на отриц.
			// также с верх. отступом
			if (item.ball_leftX + ball_size >= max_leftX  || item.ball_leftX <= 0) {  
				delta_leftX = - delta_leftX;
			}
			if (item.ball_topY + ball_size >= max_topY || item.ball_topY <= 0 ){
				delta_topY = - delta_topY;
			}
			///1-конец

			///2-начало. Отражение мяча от верхней границы платформы
			if (item.ball_leftX + ball_size/2 > platf_leftX  &&  item.ball_leftX + ball_size/2 < platf_rightX  &&  item.ball_topY + ball_size >= platf_topY  &&  delta_topY != 0) {
					
					delta_topY = - delta_topY;
					item.ball_topY = platf_topY - ball_size;  //можно поробовать убрать строку - мяч западал в платф.
					ball_elem.style.top = item.ball_topY + 'px';

			}
			///2-конец


			///3-начало. Отражение мяча от левого верхнего угла платформы, и изменение угла отражения
			// мяч(окружность) диаметром 30px - нижняя правая четверть разбита на 3 сектора - 4 точки. Начало отсчёта лев.верх. угол div'а в котором окружность: точка1_х=15;у=30  точка2_х=23;у=28  точка3_х=28;у=23  точка4_х=30;у=15
		if (count_1523X == 0) {

		if (platf_leftX >= item.ball_leftX + 15  &&  platf_leftX <= item.ball_leftX + 23  &&  platf_topY < Math.floor(item.ball_topY) + 30  &&  platf_topY >= item.ball_topY ){

				count_1523X = 4;
				if (item.ball_topY > platf_topY - 28) {
						item.ball_topY = platf_topY - 28;
						ball_elem.style.top = item.ball_topY + 'px';
					}
				if (delta_leftX <= 0  &&  delta_topY != 0){  //  если мяч двигается справа налево то... - иначе(значит слева направо)
					delta_leftX = delta_leftX - 1;
					delta_topY = - delta_topY;
				} else if (delta_topY != 0) {
					temp = delta_leftX;
					delta_leftX = delta_topY/2;
					delta_topY = - temp;
				} else {
					delta_topY -= 1; 	
				}
		}

		if (platf_leftX > item.ball_leftX + 23  &&  platf_leftX <= item.ball_leftX + 28  &&  platf_topY <= item.ball_topY + 28  &&  platf_topY >= item.ball_topY + 23){
				count_1523X = 4;
				if (delta_leftX <= 0  &&  delta_topY != 0){  //  если мяч двигается справа налево то... - иначе(значит слева направо)
					delta_leftX = delta_leftX - 1;
					delta_topY = - delta_topY + 1;
				} else if (delta_topY != 0) {				
					delta_leftX = - delta_leftX;
					delta_topY = - delta_topY;
				} else {
					delta_topY -= 1;
				}
		}

		if (platf_leftX >= item.ball_leftX + 28  &&  platf_leftX <= item.ball_leftX + 30  &&  platf_topY <= item.ball_topY + 23  &&  platf_topY >= item.ball_topY + 15){
				count_1523X = 4;
				if (delta_leftX == 0){  //  если мяч двигается ровно вниз то... - иначе(значит слева направо)
					delta_leftX = delta_leftX - 1;
				
				} else if (delta_topY != 0) {
					delta_leftX = - delta_leftX + 1;
				} else {
					delta_leftX = - delta_leftX;
					delta_topY =  delta_leftX;
				}
		}
		} else if (count_1523X > 0) {
			count_1523X--;
		} else if (count_1523X < 0) {count_1523X = 0}
		///3-конец.

		///4-начало. Отражение мяча от левой боковой границы платформы
		if (delta_leftX > 0  &&  item.ball_topY + ball_size/2 > platf_topY  &&  item.ball_topY + ball_size/2 < platf_topY + platf_height  &&  item.ball_leftX + ball_size >= platf_leftX  &&  item.ball_leftX + ball_size < platf_leftX + delta_leftX) {
				delta_leftX = - delta_leftX;
		}
		///4-конец.

		///5-начало. Отражение мяча от правого верхнего угла платформы, и изменение угла отражения
		// мяч(окружность) диаметром 30px - нижняя левая четверть разбита на 3 сектора - 4 точки. Начало отсчёта лев.верх. угол div'а в котором окружность: точка1_х=0;у=15  точка2_х=2;у=23  точка3_х=7;у=28  точка4_х=15;у=30
		if (count_upR == 0){

		if (platf_rightX >= item.ball_leftX  &&  platf_rightX <= item.ball_leftX + 2  &&  platf_topY >= item.ball_topY + 15  &&  platf_topY <= item.ball_topY + 23){
				if (delta_leftX == 0){  //  если мяч двигается ровно вниз то... - иначе(значит слева направо)
					delta_leftX = delta_leftX + 1;
				
				} else if (delta_topY == 0) {
					delta_leftX = - delta_leftX;
					delta_topY = - delta_leftX;
					} else {
						delta_leftX = - delta_leftX;
					}
				if (item.ball_leftX < platf_rightX) {
					item.ball_leftX = platf_rightX;
				}
				count_upR = 3;
		}

		if (platf_rightX > item.ball_leftX + 2  &&  platf_rightX <= item.ball_leftX + 7  &&  platf_topY >= item.ball_topY + 23  &&  platf_topY <= item.ball_topY + 28){
				if (item.ball_topY > platf_topY - 28) {
						item.ball_topY = platf_topY - 28;
						ball_elem.style.top = item.ball_topY + 'px';
					}
				if (delta_leftX >= 0){  //  если мяч двигается слева направо то... - иначе(значит справа налево)
					delta_leftX = delta_leftX + 1;
					delta_topY = - delta_topY + 1;
				} else if (delta_topY == 0) {
					delta_topY -= 1;
					} else {
						delta_leftX = - delta_leftX;
						delta_topY = - delta_topY;
					}
					count_upR = 3;
		}

		if (platf_rightX > item.ball_leftX + 7  &&  platf_rightX <= item.ball_leftX + 15  &&  platf_topY >= item.ball_topY + 28  &&  platf_topY <= Math.floor(item.ball_topY) + 30){
				if (delta_leftX >= 0  &&  delta_topY != 0){  //  если мяч двигается слева направо то... - иначе(значит справа налево)
					delta_leftX = delta_leftX + 1;
					delta_topY = - delta_topY;
				} else if (delta_topY != 0) {
					delta_leftX = delta_leftX/2;
					delta_topY = - delta_topY;
					} else {
						delta_topY -= 1;
					}
					count_upR = 3;
		
		}  
		} else if (count_upR > 0){
				count_upR--;
			} else if (count_upR < 0) { count_upR = 0}
		///5-конец.

		///6-начало. Отражение мяча от правой боковой границы платформы
		if (delta_leftX < 0  &&  item.ball_topY + ball_size/2 > platf_topY  &&  item.ball_topY + ball_size/2 < platf_topY + platf_height  &&  item.ball_leftX <= platf_rightX  &&  item.ball_leftX > platf_rightX + delta_leftX) {
				delta_leftX = - delta_leftX;
		}
		///6-конец.

		/////////////////////////////////////////
		//Отражение от блоков

		blocks.forEach( function(block, index) {

		if (block.live){
			
		//10 - Отражение мяча от нижней границы блока
			if (item.ball_leftX + ball_size/2 > block.leftX  &&  item.ball_leftX + ball_size/2 < block.rightX  &&  item.ball_topY <= block.bottomY  &&  item.ball_topY >= block.topY  &&  delta_topY != 0) {
					
					delta_topY = - delta_topY;
					block.live = false;
					//block.classList.add('none');


					//item.ball_topY = platf_topY - ball_size;  //можно поробовать убрать строку - мяч западал в платф.
				//	ball_elem.style.top = item.ball_topY + 'px';

			}

		} 
		else {
			block.block_link.classList.add('none');

			// block.block_link.classList.add('boom');
		}
		});


		/// Конец игры когда все блоки разбиты - все элементы block со свойством live = false.
		if (blocks.every(block => block.live == false)) {
			clearInterval(interval);
		}


		////////////////////////////////////
		//Изменение Left и Top - само движение
			item.ball_leftX +=  delta_leftX; // текущ. левый отступ + шаг и запись в новый текущий отступ
			ball_elem.style.left = item.ball_leftX + 'px';  // передача левого отступа из JS в CSS

			item.ball_topY += delta_topY;
			ball_elem.style.top = item.ball_topY + 'px';
		});
	}

	let sec = 0;
    function timing (val) { 
    	return val > 9 ? val : "0" + val; 
    }
    
    let timerInterval = setInterval( function(){
        document.getElementById("seconds").innerHTML = timing(++sec%60);
        document.getElementById("minutes").innerHTML = timing(parseInt(sec/60, 10));
    }, 1000);
class Controller {
  constructor () {
    this.canvas  = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.Anim_id;
    this.stop_create;
  }

  start () {
    this.animate.call(this);
  }

  stop () {
      cancelAnimationFrame(this.Anim_id);
      clearTimeout(this.stop_create);
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let score = document.getElementById('score');
      let lost = document.getElementById('lost');
      let cube_numb = document.getElementById('number');
      score.innerHTML = '0';
      lost.innerHTML = '0';
      cube_numb.innerHTML = '50';
  }

  animate () {
      let canv = this.canvas,
          ctx  = this.context;
          

      let min_speed = 1,
          max_speed = 1.5,
          w_h = 50,   //  ширина и высота квадрата
          cubes = [],
          score = document.getElementById('score'),
          count_score = 1,
          lost = document.getElementById('lost'),
          count_lost = 1,
          cube_numb = document.getElementById('number'),
          cube_number = 50;
    
      function createCube () {
        let min_color = 120,
            max_color = 255,
            r = Math.floor(Math.random() * (max_color - min_color)) + min_color,
            g = Math.floor(Math.random() * (max_color - min_color)) + min_color,
            b = Math.floor(Math.random() * (max_color - min_color)) + min_color,
            color = 'rgb(' + r + ', ' + g + ', ' + b +')',
            min = 1, 
            max = 589, //  min/max диапазон коорд. 'у' для появления квадрата 
            x = Math.floor(Math.random() * (max - min + 1)) + min,
            y = 0;


        // проверка накладки нового квадрата на уже созданный
        function find_X() {
          cubes.forEach(function(item) {
            if (x >= item.cube_x  &&  x < item.cube_x + w_h  &&  item.cube_y < w_h + 1  ||  x + w_h >= item.cube_x  &&  x + w_h < item.cube_x + w_h  &&  item.cube_y < w_h + 1) {
              x = Math.floor(Math.random() * (max - min + 1)) + min;
              find_X();
            }
          });
          return x;
        }
        x = find_X();

        let dy = +(((Math.random() * (max_speed - min_speed)) + 1).toFixed(1));

        let cube = {
          cube_x:   x,
          cube_y:   y,
          cube_w_h: w_h,
          cube_dy:  dy,
          cube_color: color,
          catch:    false  
        }
        cube_numb.innerHTML = --cube_number;

        ctx.fillStyle = cube.cube_color;
        ctx.fillRect (cube.cube_x, cube.cube_y, cube.cube_w_h, cube.cube_w_h);

        cubes.push(cube);
      }

      //  интервал при создании квадратиков с разной задержкой
      let createTimeout = function(){
        let del = Math.random()*1200;
        createCube();
        clearTimeout(this.stop_create);
        this.stop_create = setTimeout(createTimeout.bind(this), del);
        if (cube_number <= 0) clearTimeout(this.stop_create);
        ////cube_number  для остановки создания новых квадратов
      };
      createTimeout.bind(this)();
      
      function move_cube(){
        cubes.forEach( function(item, ind) {

          //если на квадр не кликнули то двигаем его дальше
          if(!item.catch){
            //удаление предыдущего квадратика из Canvas
            ctx.clearRect (item.cube_x, Math.floor(item.cube_y), item.cube_w_h, item.cube_w_h);
            // изменение коорд. У для движения
            item.cube_y += item.cube_dy;

            //рисование квадратика с новым У
            let moved_cube = new Path2D();
            ctx.fillStyle = item.cube_color;
            moved_cube.rect (item.cube_x, item.cube_y, item.cube_w_h, item.cube_w_h);
            ctx.fill(moved_cube);
          }
          else {
            if (item.cube_w_h > 0){
              let dwh = item.cube_y - Math.floor(item.cube_y);
              dwh += 0.5;
              ctx.clearRect (item.cube_x, Math.floor(item.cube_y), item.cube_w_h, item.cube_w_h + dwh);
              item.cube_x += 2;
              item.cube_y += 2;
              item.cube_w_h -= 4;
              let moved_cube = new Path2D();
              ctx.fillStyle = item.cube_color;
              moved_cube.rect (item.cube_x, Math.floor( item.cube_y), item.cube_w_h, item.cube_w_h);
              ctx.fill(moved_cube);
            } 
            else {
              ctx.clearRect (item.cube_x, Math.floor(item.cube_y), item.cube_w_h, item.cube_w_h);
              cubes.splice(ind, 1);
            }
          }

          //если квадратик вышел за границу Canvas удаляем его из массива (смещая массив)
          if (item.cube_y >= canvas.height) {
            lost.innerHTML = count_lost++;
            cubes.splice(ind, 1);
          }     
        });
        
        this.Anim_id = requestAnimationFrame(move_cube.bind(this));
        
        // анимация останавливается когда массив с кубиками пустой
        if (cubes.length == 0) {
          cancelAnimationFrame(this.Anim_id);
        }
      }

      this.Anim_id = requestAnimationFrame(move_cube.bind(this));

      // получение коорд. клика мыши в виде объекта с .х и .у
      function oMousePos(canvas, evt) {
        var ClientRect = canvas.getBoundingClientRect();
        return {
          x: Math.round(evt.clientX - ClientRect.left),
          y: Math.round(evt.clientY - ClientRect.top)
        }
      }

      //слушатель события "клик" - и при попадании мыши на квадр - изменение свойства cube.catch на true
      let mouse;
      canv.addEventListener("click", function(event) {
        mouse = oMousePos(canv, event)
        cubes.forEach(function(item) {
          if(mouse.x >= item.cube_x  &&
            mouse.x <= item.cube_x + item.cube_w_h  &&
            mouse.y >= item.cube_y  &&
            mouse.y <= item.cube_y + item.cube_w_h) {
              item.catch = true;
              score.innerHTML = count_score++;
            }
        });
      }, false);
  }
}

let controller = new Controller();

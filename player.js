window.onload = function() {

        var video = document.querySelector('video');
        var vk = document.querySelector('.video');
        var btn0 = document.querySelector('.video>img');
        var btn1 = document.querySelector('.start');
        var btn2 = document.querySelector('.voice');
        var time1 = document.querySelector('.time1');
        var time2 = document.querySelector('.time2');
        var btn3 = document.querySelector('.istloop');
        var btn4 = document.querySelector('.istfull');
        var show = document.querySelector('.show');
        var dot = document.querySelector('.dot');
        var line = document.querySelector('.line');
        var demo = document.querySelector('.demo');
        var dotted = document.querySelector('.dotted');
        var btn_send = document.querySelector('.btn_send');
        var btn_close = document.querySelector('.btn_close');
        var btn5 = document.querySelector('.sendsay');
        var send = document.querySelector('.send');
        var input = document.querySelector('#danmu');
        var voi_n = document.querySelector('.voi_n');
        var voi_t = document.querySelector('.voi_t');
        var voi_d = document.querySelector('.voi_d');
        var voi_p = document.querySelector('.voi_p');
        var color1 = document.querySelector('.color1');
        var i = 1;

        btn0.onclick = function(){
        	video.play();
        	this.style.display = "none";
        	btn1.classList.remove('needstart');
        	btn1.classList.add('needpause');
        }
        btn1.onclick = function() {
            if (video.paused) {
            	video.play();
            	this.classList.remove('needstart');
            	this.classList.add('needpause');
            	btn0.style.display = "none";

            } else {
                video.pause();
                this.classList.remove('needpause');
            	this.classList.add('needstart');
            	btn0.style.display = "block";
            }
        }

        btn2.onclick = function() {
            if (video.muted) {
                video.muted = false;
                
            	 this.classList.remove('needvoice');
            	this.classList.add('needquiet');
            } else {
                video.muted = true;
               	this.classList.remove('needquiet');
            	this.classList.add('needvoice');
            }
        }

        btn3.onclick = function() {
            if (video.loop) {
                video.loop = false;
                this.classList.remove('loop');
            	this.classList.add('noloop');
            } else {
                video.loop = true;
                this.classList.remove('noloop');
            	this.classList.add('loop');
            }
        }

        btn4.onclick = function() {
            if(i % 2 != 0){
                requestFullscreen('.show');
                document.querySelector('video').style.width = document.documentElement.clientWidth + "px";
                document.querySelector('.video').style.width = document.documentElement.clientWidth + "px";
                document.querySelector('.video').style.height = 702 + "px";
                document.querySelector('.top').style.width = document.documentElement.clientWidth + "px";
                document.querySelector('.cont').style.width = document.documentElement.clientWidth + "px";
                document.querySelector('.send').style.width = document.documentElement.clientWidth + "px";
                document.querySelector('.top').style.borderRadius = "0px";
                document.querySelector('.cont').style.borderRadius = "0px";
                voi_p.style.right = 702 + "px";
                i++;
            }else{
                exitFullscreen();
                document.querySelector('video').style.width = 800+ "px";
                document.querySelector('.video').style.width = 800 + "px";
                document.querySelector('.video').style.height = 450 + "px";
                document.querySelector('.top').style.width = 800 + "px";
                document.querySelector('.cont').style.width = 800 + "px";
                document.querySelector('.send').style.width = 800 + "px";
                document.querySelector('.top').style.borderRadius = "10px 10px 0 0";
                document.querySelector('.cont').style.borderRadius = "0 0 10px 10px";
                voi_p.style.right = 153 + "px";
                i++;
            }
        }
        document.onkeydown=function(event){
            var e = event 
            if(e && e.keyCode==27){ 
                document.querySelector('video').style.width = 800+ "px";
                document.querySelector('.video').style.width = 800 + "px";
                document.querySelector('.video').style.height = 450 + "px";
                document.querySelector('.top').style.width = 800 + "px";
                document.querySelector('.cont').style.width = 800 + "px";
                document.querySelector('.send').style.width = 800 + "px";
              }
            }


         function requestFullscreen(selector) {
            var ele = document.querySelector(selector);
            if (ele.requestFullscreen) {
                ele.requestFullscreen();
            } else if (ele.webkitRequestFullscreen) {
                ele.webkitRequestFullscreen();
            } else if (ele.mozRequestFullScreen) {
                ele.mozRequestFullScreen();
            } else if (ele.msRequestFullscreen) {
                ele.msRequestFullscreen();
            }
        }

        function exitFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
        }

        video.ontimeupdate = function() {
            time1.innerHTML = getTime(video.currentTime);
        }

        time2.innerHTML = getTime(video.duration);

        function getTime(time) {
            var time = Math.floor(time);
            var minute = Math.floor(time / 60);
            var second = time % 60;
            if (minute < 10) {
                minute = '0' + minute;
            }
            if (second < 10) {
                second = '0' + second;
            }
            return minute + ':' + second;
        }
	    function play(){
	    	s = setInterval(function(){
	        	var percent = video.currentTime / video.duration;
	            dot.style.width = percent * 400 + "px";
                dotted.style.left = percent * 400 - 4 + "px";
        	},60)
        }
        play();
        demo.onclick = function(ent){
		  			clearInterval(s);
		        	var e = ent || event;
		        	var len = e.pageX - demo.offsetLeft;
		        	var percent = len / line.offsetWidth;
		        	dot.style.width = len;
                    dotted.style.left = len - 4;
		        	video.currentTime = percent * video.duration;
		        	play();
                    console.log(e.pageX);
                    console.log(demo.offsetLeft);
		        }


        dotted.onmousedown = function(ent) {
            var e = ent || event;
            var x = e.pageX - demo.offsetLeft - dotted.offsetLeft;

            document.onmousemove = function(ment) {
                var me = ment || event;
                var left = me.pageX - demo.offsetLeft - x;

                if (left < 0) {
                    left = 0;
                } else if (left >= line.offsetWidth) {
                    left = line.offsetWidth;
                }
                dot.style.width = left + 'px';
                dotted.style.left = left - 3 + 'px';

                var per = left / line.offsetWidth;
                video.currentTime = video.duration * per;
            }

            document.onmouseup = function() {
                document.onmousemove = null;
            }
        }

        $('.sendsay').click(function(){
                $('.send').slideDown();
                })
        btn_close.onclick = function(){
            send.style.display = "none";
        }

        btn_send.onclick = function(){
            var danmu = input.value;
            var addp = document.createElement('p');
            addp.innerHTML = danmu;
            vk.appendChild(addp);
            input.value = "";

            function rand(m, n) {
            return Math.floor(Math.random() * (n - m + 1) + m);
            }

            addp.style.top = rand(1,430) + 'px';
            var ll = 800;
            var ani = function(){
                var s = setInterval(function(){
                    ll -= 10;
                    if(ll >= -1000){
                    addp.style.left = ll + 'px';
                }else{
                    return false;
                }
                },100)
            }

            addp.style.color = color1.value;

            ani();

        }

        btn2.onmouseover = function(){
            document.querySelector('.voi_p').style.display = "block";
        }
        document.querySelector('.voi_ok').onclick = function(){
            document.querySelector('.voi_p').style.display = "none";
        }


        voi_p.onclick = function(ent){
            var e = ent || event;
            var hy =voi_n.offsetHeight - (e.pageY - voi_p.offsetTop - 10 -vk.offsetTop);
            if(hy <= 100 && hy >= 0){
                voi_t.style.height = hy + "px";
                voi_d.style.bottom = hy + 30 + "px";
            }

            video.volume = hy / 100;
        }

 
  }
		


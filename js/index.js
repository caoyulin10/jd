window.onload = function(){
	search();
	banner();
	downTime();

}
/*头部搜索功能*/
function search(){
	var searchBox = document.querySelector(".jd_header_box");
	var bannerBox = document.querySelector(".jd_banner");
	var height = bannerBox.offsetHeight;
	window.onscroll= function(){
		var top = document.body.scrollTop;  /*当前滚动距离*/
		var opacity = 0;
		if(top > height){
			opacity = 0.85;
		}else {
			opacity = 0.85 * (top/height);
		}
		searchBox.style.background = "rgba(201,21,35,"+opacity+")";

	}
}
/*轮播图*/
function banner(){
	var banner = document.querySelector(".jd_banner");
	var width = banner.offsetWidth;
	var imageBox = banner.querySelector("ul:first-child");
	var pointBox = banner.querySelector("ul:last-child");
	var points = pointBox.querySelectorAll("li");
	/* 公用方法*/
	var addTransition = function(){
		imageBox.style.webkitTransition = "all 0.2s";
		imageBox.style.transition = "all 0.2s";
	}
	var removeTransition = function(){
		imageBox.style.webkitTransition = "none";
		imageBox.style.transition = "none";
	}
	var setTranslateX = function(x){
		imageBox.style.webkitTransform = "translateX("+x+"px)";
		imageBox.style.transform = "translateX("+x+"px)";
	}
	/*自动轮播*/
	var index = 1;
	var timer = setInterval(function(){
		index++;
		addTransition();
		setTranslateX(-index*width);
	},1000);
	itcast.transitionEnd(imageBox,function(){
		if(index >= 9){
			index = 1;
			removeTransition();
			setTranslateX(-index*width);
		}else if(index <=0){
			index = 8;	
			removeTransition();
			setTranslateX(-index*width);		
		}		
		setPoint();
	});
	/*白点对应改变*/
	var setPoint = function(i){
		for(var i = 0 ; i < points.length ; i ++){
			points[i].className = " ";
		}
		points[index-1].className = "now";
	}
	/*图片能滑动*/
	var startX = 0;
	var moveX = 0;
	var distanceX = 0;
	var isMove = false;
	imageBox.addEventListener("touchstart",function(e){
		clearInterval(timer);
		startX = e.touches[0].clientX;
	});
	imageBox.addEventListener("touchmove",function(e){
		isMove = true;
		moveX = e.touches[0].clientX;
		distanceX = moveX - startX;
		removeTransition();
		setTranslateX(-index*width+distanceX);
	});
	window.addEventListener("touchend",function(){
		if(Math.abs(distanceX) > (width/3) && isMove){
			if(distanceX > 0){
				index--;
			}else {
				index++;
			}
			addTransition();
			setTranslateX(-index*width);
		}else {
			addTransition();
			setTranslateX(-index*width);
		}

		startX = 0;
		moveX = 0;
		distanceX = 0;
		isMove = false;

		clearInterval(timer);
		timer = setInterval(function(){
			index++;
			addTransition();
			setTranslateX(-index*width);
		},1000);
	});
}
/*倒计时*/
function downTime(){
	var time = 5 * 60 *60 ;/*5小时*/
	var skTime = document.querySelector(".sk_time");
	var spans = skTime.querySelectorAll("span");
	var timer = setInterval(function(){
		time -- ;
		if(time<0){
			clearInterval(timer);
			return false;
		}
		var h = parseInt(time/3600);
		var m = parseInt((time%3600)/60);
		var s = time%60;
		spans[0].innerHTML = Math.floor(h/10);
		spans[1].innerHTML = h%10;
		spans[3].innerHTML = Math.floor(m/10);
		spans[4].innerHTML = m%10;
		spans[6].innerHTML = Math.floor(s/10);
		spans[7].innerHTML = s%10;

	},1000)
}
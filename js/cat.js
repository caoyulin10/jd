window.onload = function(){
	deleteBox();
}
/*弹出效果*/
function deleteBox(){
	var win = document.querySelector('.jd_win');
	var box = win.querySelector('.jd_win_box');
	var deleteList = document.querySelectorAll(".delete_box");
	var deleteBox = null;
	for(var i = 0 ; i < deleteList.length ; i++){
		deleteList[i].onclick = function(e){
			win.style.display = "block";
			box.className = "jd_win_box bounceInDown";
			/*垃圾箱盖子翻转效果*/
			deleteBox = this;
			var deleteUp = deleteBox.querySelector("span:first-child");
			deleteUp.style.transition = "all 1s";
			deleteUp.style.webkitTransition = "all 1s";
			deleteUp.style.transform = "rotate(-30deg) translateY(2px)";
			deleteUp.style.webkitTransform = "rotate(-30deg) translateY(2px)";
			deleteUp.style.transformOrigin = "0 5px";
			deleteUp.style.webkitTransformOrigin = "0 5px";
		}

	}

/*取消事件*/
	document.querySelector('.cancel').onclick = function(){
        win.style.display = "none";
        if(deleteUp){    
        	var deleteUp = deleteBox.querySelector('span:first-child');       
            deleteUp.style.webkitTransform = "none";
            deleteUp.style.transform = "none";
        }
    }


}
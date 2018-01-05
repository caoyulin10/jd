/*公用js文件*/
window.itcast = {};
/*封装一个transitionEnd 过渡结束事件*/
itcast.transitionEnd = function(dom,callback){
	if(dom && typeof dom == "object"){
		dom.addEventListener("webkitTransitionEnd",function(){
			callback && callback();
		});
		dom.addEventListener("transitionEnd",function(){
			callback && callback();
		});
	}
}

/*封装tap*/
itcast.tap = function(dom,callback){
    /*
     * 要求  没有触发 touchmove 事件
     *       并且响应速度要比click快
    */
    if(dom && typeof  dom == 'object'){
        var isMove = false;
        var startTime = 0;
        dom.addEventListener('touchstart',function(e){
            startTime = Date.now();
        });
        dom.addEventListener('touchmove',function(e){
            isMove = true;
        });
        dom.addEventListener('touchend',function(e){
            /*判读  是否满足tap 的要求  一般要求tap的响应时间150*/
            if(!isMove && (Date.now()-startTime) < 150){
                /*调用 callback*/
                callback && callback(e);
            }
            /*重置 参数*/
            isMove = false;
            startTime = 0;
        });
    }
}
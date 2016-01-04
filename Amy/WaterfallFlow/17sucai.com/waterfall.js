window.onload=function(){
	waterfall('main','pin');
            addGlass();
            var picNum = 0;
            var flag =0;
            window.onresize=function(){waterfall('main','pin');};
            window.onscroll=function(){
                if(checkscrollside()){
                      var oParent = document.getElementById('main');
                     for(var i=0;i<6;i++){ 
                      
                        var opin = document.createElement('div');
                        opin.className='pin';
                        var oBox = document.createElement('div');
                        oBox.className='box';
                        opin.appendChild(oBox);
                        var oImg = document.createElement('img');
                        oBox.appendChild(oImg);
                        oParent.appendChild(opin);
                        oImg.src='./images/'+(picNum++)+'.jpg';
                        if(picNum==10){
                            picNum=0;
                            switch (flag){
                                case 0: alert("就这么多图,后面都是重复的了");break;
                                case 1: alert("都说没有了,你还滚...");break;
                                case 2: alert("再往下滚你的电脑要爆炸了!");document.documentElement.scrollTop=0;document.body.scrollTop=0;break;
                            }
                            flag++;
                        };
                    }
                    waterfall('main','pin');
                    addGlass();
                }
            }
            function addGlass(){
                var eParent = document.getElementById('main');
                var ePin = getClassObj(eParent,'pin');
                var glass = document.getElementById('glass');
                // var glass_text = document.getElementById('glass_text')
                for(var i=0;i<ePin.length;i++){ 
                ePin[i].onmouseover = function(e){ 
                if(checkFather(this,e)){       
                    var mH = this.offsetHeight-30;
                    var mTop = this.offsetTop+20;
                    var mLeft = this.offsetLeft+22;
                        glass.style.display = "block";
                        glass.style.position = "absolute";
                        glass.style.height = mH+'px';
                        glass.style.top = mTop+'px';
                        glass.style.left = mLeft+'px';
                        glass.style.zIndex = 1;
                }
                 }
                    
            }
                eParent.onmouseout = function(e){
                        if(checkFather(this,e)){
                        glass.style.display = 'none';
                    }
                }
            }

            function checkFather(that,e){
                    var parent = e.relatedTarget;
                     try {
                        while ( parent && parent !== that ) {
                            parent = parent.parentNode; 
                        }
                        return (parent !== that);
                    } catch(e) { }
                }
	function waterfall(parent,pin){
		var oparent = document.getElementById(parent);
		var aPin = getClassObj(oparent,pin);
		var ipinW= aPin[0].offsetWidth;
		var num = Math.floor(document.documentElement.clientWidth/ipinW);
		oparent.style.cssText = "width:"+num*ipinW+"px;"+"margin:0 auto;"

		var pinHArr=[];
		for(var i=0;i<aPin.length;i++){
			var pinH = aPin[i].offsetHeight;
			if(i<num){
				pinHArr[i]=pinH;
			}else{
				var minH = Math.min.apply(null,pinHArr);
				var minHIndex = getminHIndex(pinHArr,minH);
				 aPin[i].style.position='absolute';//设置绝对位移
			            aPin[i].style.top=minH+'px';
			            aPin[i].style.left=aPin[minHIndex].offsetLeft+'px';
				pinHArr[minHIndex]+=aPin[i].offsetHeight;
			}
		}

	}

	// getElementByClassName函数
	function getClassObj(parent,className){
		obj = parent.getElementsByTagName('*');
		var pinS = [];
		for(var i=0;i<obj.length;i++){
			if(obj[i].className==className){
				pinS.push(obj[i]);
			}
		};
		return pinS;
	}
	// getminHIndex函数获取最小高度pin的索引
	function getminHIndex(arr,min){
		for(var i=0;i<arr.length;i++){
			if(arr[i]==min){
				return i;
			}
		}
	}
           // checkscrollside函数,检测是否滚动底部
           function checkscrollside(){
                var oParent = document.getElementById('main');
                var aPin = getClassObj(oParent,'pin');
                var lastH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop ;
                var winH = document.documentElement.clientHeight;
                return (lastH< scrollTop+winH) ? true : false; 
           }
}
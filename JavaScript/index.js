window.onload=function(){//注意：所有的代码哦度要写在这两个大括号内
	var games = new game();
	games.play();
	var faa ; 
};/*这里是结束的那个花括号*/
function game(){
 this.clientw=document.documentElement.clientWidth;
 this.clienth=document.documentElement.clientHeight;
 this.letterArr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","Q","R","S","T","W","V","W","X","Y","Z"];
 this.letterLen=5;
 this.speed=3;
 this.spans=[];
 this.die=10;
 this.sore=0;
 this.soreEle=document.getElementsByClassName("sore")[0].getElementsByTagName("a")[1];
 this.dieEle=document.getElementsByClassName("die")[0].getElementsByTagName("a")[1];
 this.step=10;
 this.aa=1;
 this.currPosArr=[];
 this.currArr=[];

}
game.prototype={
   play:function(){
       //将字母显示到body里面
       this.getLetter(this.letterLen);
       this.move();
       this.key();
   },
    key:function(){
        var that=this;
      document.onkeydown=function(e){
          var ev=e||window.event;
          var code=String.fromCharCode(ev.keyCode);
          for(var i=0;i<that.spans.length;i++){
              if(that.spans[i].innerHTML==code){
                  document.body.removeChild(that.spans[i]);
                  that.spans.splice(i,1);
                  that.currArr.splice(i,1);
                  that.currPosArr.splice(i,1);
                  // if(that.currArr.length>=8){
                  // 	that.getLetter(1);
                  // }else{
                  // 	that.getLetter(2);
                  // }
                  that.getLetter(1);
                  that.sore++;
                  that.soreEle.innerHTML=that.sore;
                  if(that.sore%that.step==0){
                      that.aa++;
                      //alert("第"+that.aa+"关");
                      that.next(that.aa);

                  }
                  break;
              }
          }
      }
    },
    next:function(num){
    	//重置游戏
      //clearInterval(this.t);
      //for(var i=0;i<this.spans.length;i++){
      //   document.body.removeChild(this.spans[i]);
      //}
      //  //this.spans=[];
      //  //this.speed+=1;
      //  //this.letterLen+=1;
      //  this.getLetter(this.letterLen+1);
        //this.play();
        var def = document.createElement("div");
        def.style.cssText="text-align: center; line-height: 300px;width:300px;height:300px;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto auto;background:url(../images/da/mifeng.png) no-repeat center center ;background-size:cover";
        def.innerHTML="第"+num+"关";
        document.body.appendChild(def);
        setTimeout(function(){
            document.body.removeChild(def);
        },200);
    },
    move:function(){
       var that=this;
       console.log(this.soreEle.nodeType,this.soreEle.nodeName,this.soreEle.Value);
       this.t=setInterval(function(){
         for(var i=0;i<that.spans.length;i++){
             var top=that.spans[i].offsetTop+that.speed;
             that.spans[i].style.top=top+"px";
             if(top>that.clienth){
                 document.body.removeChild(that.spans[i]);
                 that.spans.splice(i,1);
                 that.currArr.splice(i,1);
                 that.currPosArr.splice(i,1);
                 that.getLetter(1);
                 that.die--;
                 that.dieEle.innerHTML=that.die;
                 if(that.die==0){
                     // alert("game over!");
                     that.dieto();
                     //location.reload();
                 }

             }
         }
       },60)
    },
    dieto:function(){
        var def = document.createElement("div");
        def.style.cssText="text-align: center; line-height: 300px;width:300px;height:300px;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto auto;background:#ccc;";
        def.innerHTML="您输了";
        document.body.appendChild(def);
        var defbotton = document.createElement("div");
        defbotton.style.cssText="text-align: center; line-height: 80px;width:200px;height:80px;position:absolute;bottom:20px;left:50px;background:#000;color:#fff";
        defbotton.innerHTML="重新开始";
        def.appendChild(defbotton);
        var that = this;
        defbotton.onclick=function(){
            location.reload();
            //var spaned = document.getElementsByTagName("span");
            //for(var i=0;i<spaned.length;i++){
            //    document.body.removeChild(spaned[i]);
            //}
            //this.die=10;
            //this.sore=0;
            //this.spans=[];
            //that.play();
            document.body.removeChild(def);

        }
    },
    getLetter:function(num){
        //先获取到指定的字母
        var arr=this.getRand(num);
        var posArr=[];
        var eleArr=[];
        for(var i=0;i<arr.length;i++){
            var span=document.createElement("span");
            span.innerHTML=arr[i];
            var x=(100+(this.clientw-200)*Math.random());
            var y=(100*Math.random());
            var width=100;
            while (this.check1( this.currPosArr,x,width)){
                x=(100+(this.clientw-200)*Math.random());
            }
            posArr.push({minx:x,maxx:x+width});
            this.currPosArr.push({minx:x,maxx:x+width});
            span.style.cssText="width:"+width+"px;background:url(./images/da/mi"+Math.floor(Math.random()*3+1)+".png) no-repeat center center;background-size:cover;position:absolute;left:"+x+"px;top:"+y+"px;";
            document.body.appendChild(span);
           // eleArr.push(span);
            this.spans.push(span);
        }
       // return eleArr;
    },
    check1:function(arr,x,width){
        for(var i=0;i<arr.length;i++){
            if(!(x+width<arr[i].minx||arr[i].maxx+width<x)){
                return true;
            }
        }
        return false;
    },
    getRand:function(num){
    	var arr=[];
       for(var i=0;i<num;i++) {
           var rand = Math.floor(this.letterArr.length * Math.random());
           while(this.check( this.currArr,this.letterArr[rand])){
               rand = Math.floor(this.letterArr.length * Math.random());
           }
           arr.push(this.letterArr[rand]);
           this.currArr.push(this.letterArr[rand]);
       }
       return arr;
    },
    check:function(arr,val){
       	for(var i=0;i<arr.length;i++){
           if(arr[i]==val){
               return true;
           }
       	}
        return false;
    }
}
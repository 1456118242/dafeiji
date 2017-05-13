/**
 * Created by luwen on 2017/5/8.
 */
//游戏入口脚本

var ctx;//context
var bt=[];

var gameState=MENU;//游戏状态0--菜单，1--游戏运行
var btimg=['img/btnew1.png','img/btnew2.png','img/btexit1.png','img/btexit2.png'];
var playX,playY; //玩家飞机坐标

$(function() {
        var can= document.getElementById('MyGame');
        ctx = can.getContext('2d');
        playX=can.width/2-27,playY=can.height-60 //在玩家在屏幕中央
        drawCoverImage();//画图片
        for (var i = 0; i < 2; i++) {
            bt[i] = new Button(btimg[i * 2], btimg[i * 2 + 1], 500, 500+i * 40);//画按钮
            bt[i].draw();
        }

    }
)
onmousedown=function(e) { //当按钮按下时
    var x = e.clientX;
    var y = e.clientY;
    for (var i = 0; i < 2; i++) {
        var w = bt[i].getWidth(); //获取按钮 wh
        var h = bt[i].getHeight();
        switch(gameState){
            case MENU:
                if (x > bt[i].x && x < bt[i].x + w && y > bt[i].y && y < bt[i].y + h) { //点到按钮矩形 内 画act
                    bt[i].drawAct();
                    menu(i)
                } else { //在不在按钮内 def
                    bt[i].drawDef();
                }
                break;
            case RUN:
                break;

        }

    }
}
onmousemove=function(e){
    var x= e.clientX;
    var y= e.clientY;
    switch(gameState) {
        case RUN:
            playX = x - 27;//移动鼠标 飞机一起移动
            playY = y - 27;
            if (playY > 600)playY = 600; // player飞机边界检查
            if (playY < 0)playY = 0;
            if (playX > 800)playX = 800;
            if (playX < 0)playX = 0;
            break;
    }
}
onmouseover=function(){ //鼠标在dom 文档时 绘制 按钮
    switch(gameState){
        case MENU:
            for(var i=0;i<2;i++)
                bt[i].drawDef();
            break;

    }

}
onmouseup=function(){
    switch(gameState){
        case MENU:
            for(var i=0;i<2;i++)
                bt[i].drawDef();
            break;

    }

}
function Rect(x,y,w,h,x1,y1){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.containt=function(){
        if(x1>x&&x1<x+w&&y1>y&&y1<y+h)return true;
        else return false;
    }
}
function Button(url1,url2,x,y){
    this.url1=url1;
    this.url2=url2;
    this.x=x;
    this.y=y;
    var def=new Image();//未被操作时的显示图像
    var click=new Image();//点击时显示的图像
    def.src=this.url1;
    click.src=this.url2;
    //绘制默认图片
    this.drawDef=function(){
        ctx.drawImage(def,x,y)
    }
    //绘制激活状态
    this.drawAct=function(){
        ctx.drawImage(click,x,y)
    }
    //获取按钮宽度
    this.getWidth=function(){
        var w=0; //定义私有宽度
        def.onload=function(){
            w= def.width;//加载完 赋值
        }();
        return w;//返回数值
    }
    //获取按钮高度
    this.getHeight=function(){
        var h=0;
        def.onload=function(){
            h= def.height;
        }();
        return h;
    }
    //画默认按钮
    this.draw=function(){
        def.onload=function(){
            ctx.drawImage(def,x,y,def.width,def.height);
        }
    }


}
//new Button (canvas,button[0],0)
//对应菜单 进入游戏
function menu(btIndex){
    switch(btIndex){
        case 0:
            gameState=RUN;//改变状态
            loadBack();//进入游戏 game.js中
            break;
    }

}
//封装的画图形
function draw(img,x,y,w,h){
    // canvas.drawImage(cover,0,0,cover.width,cover.height,0,0,800,600);
    if(x==undefined)x=0;
    if(y==undefined)y=0;
    if(w==undefined)w=img.width;
    if(h==undefined)h=img.height;
    ctx.drawImage(img,x,y,w,h);
}

var enemy=[];
var button=[];
var player;
//画背景图
function drawCoverImage(){
    var  img=new Image();
    img.src="img/cover.jpg";
    img.onload=function(){
        draw(img,0,0,800,600);
    }
}

/**
 * Created by luwen on 2017/5/8.
 */
var score;
function loadBack(){
    var mapY=0;
    var timer ;
    var backgroundMap=new Image();
    backgroundMap.onload=function(){//当地图加载完后开启定时器
        timer =setInterval(backRoll,50);
    }
    backgroundMap.src="img/background.jpg";
    var mapArr=[backgroundMap,backgroundMap]; //两张背景图
    var i= 0,j=1; // ij isenf 控制图像交换
    var isend=false;

    function  backRoll(){ //重复绘制的内容
        //添加敌人
        addEnemy()
        //添加子弹;
        addBullet();
      ctx.drawImage(mapArr[i],0,mapY+i*602,800,600); //画第一张 地图
      ctx.drawImage(mapArr[j],0,mapY+j*602,800,600);//画第二张 地图
        mapY-=4;//让地图动起来
        if(mapY<-600) { //当 第一张 出屏幕  该 把第一张 移到 第二张后面
            mapY = 0;
            isend=true;
        }else{  //第一张还没到头
            isend=false;
        }
        if(isend){ //在第二张 后面绘制图纸
            i=1;
            j=0;
        }else{// 在 第一张前绘制 图像
            i=0;
            j=1;
        }
        //画敌机
        drawEne();
        //画玩家
        drawPlayer();
        //画子弹
       drawBullet();
        //碰撞检测
        collid();
        //绘制得分
    }

    //敌机精灵生成与绘制
    var eneArr=[]; //敌机精灵坐标数组
    var spEnemy;//敌机精灵
    var imgEnemy=new Image();//敌机image
    imgEnemy.onload=function(){
        spEnemy=new Sprite(imgEnemy);//当图片加载 后 建 敌机精灵
    }
    imgEnemy.src="img/en3.png";//图片设置地址
    function addEnemy(){
        var y=-88;
        var x=Math.random()*700+27; //在 图片外 添加敌机
        var pos=[x,y];
        if(eneArr.length<10){ //限制敌机的书面
            eneArr.push(pos);
        }

    }

    function drawEne(){
        for(var i=0;i<eneArr.length;i++){
            var pos=eneArr[i];
            spEnemy.setPosition(pos[0],pos[1]);//设置敌机的位置
             pos[1]+=4;//改变敌机 的坐标
             pos[0]+=4;//
            if(spEnemy.getY()>690||spEnemy.getX()>800){ //当敌机出边界时移除敌机
               eneArr.splice(i,1);
            }
            spEnemy.draw();//因为在不停的画 要 在画之前 移除 敌机
        }

    }
    //玩家精灵的生成与绘制
    var spPlayer;
    var imgPlayer=new Image();
    imgPlayer.onload=function(){
       spPlayer=new Sprite(imgPlayer);
    };
    imgPlayer.src="img/player.png"
    function  defen(cxt){

    }
    function drawPlayer(){
        var pos=[playX,playY];
        spPlayer.setPosition(pos[0],pos[1]);//玩家的位置
        spPlayer.draw();//画玩家

    }
    //增加子弹
    var spBullet;
    var imgBullet=new Image();
    imgBullet.onload=function(){
        spBullet=new Sprite(imgBullet);
    }
    imgBullet.src="img/bullet1.png";
    var arrBullet=[];
    function addBullet(){
        var pos=[playX+19,playY];
        if(arrBullet.length<30) //子弹 集合 小于 30个
        arrBullet.push(pos);

    }
    function drawBullet(){ //画子弹
        for(var i=0;i<arrBullet.length;i++){
            var pos=arrBullet[i];
            spBullet.setPosition(pos[0],pos[1]);//不断设置子弹 坐标
            pos[1]-=10;//子弹 y不断减少
            if(pos[1]<-20)arrBullet.splice(i,1);//当出边界时 移除子弹
            spBullet.draw();
        }
    }
    //碰撞检测
    function collid(){
        for(var i=0;i<eneArr.length;i++){ //循环敌机
            var enepos=eneArr[i];
            for(var j=0;j<arrBullet.length;j++){ //每一敌机看看是否碰上子弹
                var bPos=arrBullet[j];
                if(!(bPos[0]>enepos[0]+94||bPos[0]+16<enepos[0]
                ||bPos[1]>enepos[1]+70||bPos[1]+43<enepos[1])){ //子弹与敌机 俩矩形的碰撞检测
                    eneArr.splice(i,1);
                    arrBullet.splice(j,1);
                    score+=100;
                }
            }
        }
    }
}


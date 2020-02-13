
var G={       //常数全局变量集合Global
    middleX:600,          //地图原点X坐标（左上角定位）
    middleY:500,          //地图原点Y坐标（左上角定位）
    hexagonside:100,      //六边形边长
    hexagonhigh:172,
    roadside:18,          //路的宽度（两个六边形的间隔）
    homeside:40,
    nodelist:new Array()
}

function getNearPosition(P,deg){//获取临近六边形坐标
    var newX=P.x,newY=P.y;
    while(deg<0)deg+=360;
    switch(deg%360)
    {
        case 0:
            newX=P.x+1;
            if(newX==0 && (Math.abs(P.y%2)))newX+=1;
        break;
        case 180:
            newX=P.x-1;
            if(newX==0 && (Math.abs(P.y%2)))newX-=1;
        break;
        case 60:
            newY+=1;
            if((!(Math.abs(P.y%2)))&& (P.x>=0))newX+=1;
            if((Math.abs(P.y%2))&& (P.x<0))newX+=1;
        break;
        case 120:
            newY+=1;
            if((Math.abs(P.y%2))&& (P.x>0))newX-=1;
            if((!(Math.abs(P.y%2)))&& (P.x<=0))newX-=1;
        break;
        case 240:
            newY-=1;
            if((Math.abs(P.y%2))&& (P.x>0))newX-=1;
            if((!(Math.abs(P.y%2)))&& (P.x<=0))newX-=1;
        break;
        case 300:
            newY-=1;
            if((!(Math.abs(P.y%2)))&& (P.x>=0))newX+=1;
            if((Math.abs(P.y%2))&& (P.x<0))newX+=1;
        break;
    }
    return {
        x:newX,
        y:newY
    }
}

function getAllNodeNearby(P)//获取和这个六边形相邻的所有节点
{
    var retval=new Array();
    var N0={x:this.x,y:this.y};
    for(var i=0;i<360;i+=60)
    {
        var N1=getNearPosition(P,i);
        var N2=getNearPosition(P,i+60);
        retval.push({N0,N1,N2});
    }
    return retval;
}

function calcHexagonMiddle(blockx,blocky) {            ///计算对应坐标的六边形块在页面中的中心坐标
    var posY,posX;
    posX=G.middleX+(G.hexagonhigh+G.roadside)*blockx;
    if(blocky%2)//需要偏移的情况 x正负影响偏移正负
    {
        if(blockx>0)posX-=(G.hexagonhigh+G.roadside)/2;
        else posX+=(G.hexagonhigh+G.roadside)/2;
    }
    posY=G.middleY-(G.hexagonside/2*3+G.roadside)*blocky;

    posX+=(G.hexagonside);
    posY+=(G.hexagonside);
    return {x:posX,y:posY};
}

function initMap()//初始化游戏地图
{
    debugger
    var hexretval=new Array();//六边形列表
    var it={x:0,y:0};//迭代器初值
    hexretval.push(it);
    for(var i=1;i<=2;i++)
    {
        it=getNearPosition(it,300);
        hexretval.push(it);
        for(var deg=0;deg<360;deg+=60)
        {
            var k=0;
            if(deg==0)k+=1;
            while(k<i)
            {
                it=getNearPosition(it,deg);
                hexretval.push(it);
                k++;
            }
        }
    }
    
    return hexretval;
}

export default{
    getNearPosition,
    getAllNodeNearby,
    calcHexagonMiddle,
    G,
    initMap
}
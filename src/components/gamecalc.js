import Vue from 'vue'

var G={       //常数全局变量集合Global
    middleX:500,          //地图原点X坐标（左上角定位）
    middleY:400,          //地图原点Y坐标（左上角定位）
    hexagonside:100,      //六边形边长
    hexagonhigh:172,
    roadside:18,          //路的宽度（两个六边形的间隔）
    homeside:40,
    reslistCN:Array('木头','铁'   ,'羊毛' ,'小麦' ,'石头' ,'士兵'    ,'丰收之年','垄断'   ,'道路建设'     ,'胜利点'),
    reslist:Array('forest','iron','grass','wheat','stone','solders','harvest','monopoly','roadbuilding','winpoint')
}

/*由于核心代码转移到了后端，因此弃用了
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
    var retval=new Array();//node列表
    var retchk=new Array();//给出对应点的nodeid，避免重复添加用
    var N0={x:P.x,y:P.y};
    for(var i=0;i<360;i+=60)
    {
        var N1=getNearPosition(P,i);
        var N2=getNearPosition(P,i+60);
        retval.push({N0,N1,N2});
        retchk.push(calcNodeId(N0,N1,N2));
    }
    return {val:retval,chk:retchk};
}

function getAllRoadNeayBy(P)//获取该六边形临近的所有节点
{
    var retval=new Array();
    var retchk=new Array();
    var N0={x:P.x,y:P.y};
    for(var i=0;i<360;i+=60)
    {
        var N1=getNearPosition(P,i);
        retval.push({N0,N1});
        retchk.push(calcRoadId(N0,N1));
    }
    return {val:retval,chk:retchk};
}
*/
function calcHexagonId(P)
{
    var hexagonid='hexagon-x'+String(P.x.toFixed(2))+'y'+String(P.y.toFixed(2));
    hexagonid=String(hexagonid).replace(/\./g,'d');
    return hexagonid;
}

function calcNodeId(P){//给每一个节点一个唯一编号
    var nodeid;
    var X,Y;
    X=(P[0].x+P[1].x+P[2].x)/3;
    Y=(P[0].y+P[1].y+P[2].y)/3;
    nodeid='node-x'+String(X.toFixed(2))+'y'+String(Y.toFixed(2));
    nodeid=String(nodeid).replace(/\./g,'d');
    return nodeid;
}

function calcRoadId(P){//给每一个节点一个唯一编号
    var X,Y,roadid;
    X=(P[0].x+P[1].x)/2;
    Y=(P[0].y+P[1].y)/2;
    roadid='road-x'+String(X.toFixed(2))+'y'+String(Y.toFixed(2));
    roadid=String(roadid).replace(/\./g,'d');
    return roadid;
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
export default{
    calcHexagonMiddle,
    G,
    calcNodeId,
    calcRoadId,
    calcHexagonId,
}
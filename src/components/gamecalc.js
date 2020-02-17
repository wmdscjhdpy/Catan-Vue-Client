
var G={       //常数全局变量集合Global
    middleX:500,          //地图原点X坐标（左上角定位）
    middleY:400,          //地图原点Y坐标（左上角定位）
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

function calcHexagonId(P)
{
    var hexagonid='hexagon-x'+String(P.x.toFixed(2))+'y'+String(P.y.toFixed(2));
    hexagonid=String(hexagonid).replace(/\./g,'d');
    return hexagonid;
}

function calcNodeId(P1,P2,P3){//给每一个节点一个唯一编号
    var nodeid;
    var X,Y;
    X=(P1.x+P2.x+P3.x)/3;
    Y=(P1.y+P2.y+P3.y)/3;
    nodeid='node-x'+String(X.toFixed(2))+'y'+String(Y.toFixed(2));
    nodeid=String(nodeid).replace(/\./g,'d');
    return nodeid;
}

function calcRoadId(P1,P2){//给每一个节点一个唯一编号
    var X,Y,roadid;
    X=(P1.x+P2.x)/2;
    Y=(P1.y+P2.y)/2;
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

function initMap()//初始化游戏地图
{
    var hexretval=new Array();//六边形列表
    var it={x:0,y:0};//迭代器初值 迭代的是hexagon
    hexretval.push(it);
    //大循环
    for(var i=1;i<=2;i++)
    {
        it=getNearPosition(it,300);

        hexretval.push(it);
        for(var deg=0;deg<360;deg+=60)
        {
            var k=0;
            if(deg==0)k+=1;//每一次第一次的时候由于突出了一格，所以0°的操作少一个
            while(k<i)
            {
                it=getNearPosition(it,deg);
                hexretval.push(it);
                k++;
            }
        }
    }
    var nodelist=new Array();//节点列表
    var nodechklist=new Array();//节点重复性检查列表
    var tmpnodelist;
    //开始生成节点
    for(i=0;i<hexretval.length;i++)
    {
        tmpnodelist=getAllNodeNearby(hexretval[i]);//获取节点
        for(var l=0;l<6;l++)
        {
            if(nodechklist.indexOf(tmpnodelist.chk[l])==-1)//不存在这个node
            {
                nodechklist.push(tmpnodelist.chk[l]);//添加校验
                nodelist.push(tmpnodelist.val[l]);//添加值
            }
        }
    }
    var roadlist=new Array();//道路列表
    var tmproadlist;
    var roadchklist=new Array();
    //开始生成道路
    for(i=0;i<hexretval.length;i++)
    {
        tmproadlist=getAllRoadNeayBy(hexretval[i]);//获取节点
        for(l=0;l<6;l++)
        {
            if(roadchklist.indexOf(tmproadlist.chk[l])==-1)//不存在这个road
            {
                roadchklist.push(tmproadlist.chk[l]);//添加校验
                roadlist.push(tmproadlist.val[l]);//添加值
            }
        }
    }
    return {road:roadlist,hexagon:hexretval,node:nodelist};
}



export default{
    getNearPosition,
    calcHexagonMiddle,
    G,
    initMap,
    calcNodeId,
    calcRoadId,
    calcHexagonId
}
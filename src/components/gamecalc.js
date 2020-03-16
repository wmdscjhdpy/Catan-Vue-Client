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
}
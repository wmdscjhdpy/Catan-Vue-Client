<template>
  <div id="app">
    <div v-if="gamemap!=null">
      <hexagon @myClick="hexagonHandle" v-for="hexa in gamemap.hexagon" :ref="calcHexagonId(hexa.Pos)" :key="hexa.label" :P="hexa.Pos" :rollnum="hexa.number" :kind="hexa.kind" active="0"/>
      <node @myClick="nodeHandle"  v-for="nod in gamemap.node" :ref="calcNodeId(nod.Pos)" :key="nod.label" :P1="nod.Pos[0]" :P2="nod.Pos[1]" :P3="nod.Pos[2]"/>
      <road @myClick="roadHandle"  v-for="roa in gamemap.road" :ref="calcRoadId(roa.Pos)" :key="roa.label" :P1="roa.Pos[0]" :P2="roa.Pos[1]"/>
      <roll :num="roll" style="position:absolute;left:1000px;top:50px"/>
    </div>
    <div v-if="gamemap==null">
      <img :src="backgroundimg" width="900" height="900" style="position:absolute;left:100px;top:20px;"/>
    </div>
    <div style="position:absolute;left:1300px;top:10px">
      <room ref="room" @gameDataHandle="gameDataHandle"/>
      <button @click="nodeact=1" style="resize:none;font-size:16px;">我要建村！</button>
    </div>
  </div>
</template>

<script>
import background from './assets/background.jpg'

import hexagon from './components/hexagon.vue'
import node from './components/node.vue'
import road from './components/road.vue'
import gamecalc from './components/gamecalc.js'
import room from './components/room.vue'
import roll from './components/roll.vue'

export default {
  name: 'App',
  components: {
    hexagon,
    node,
    road,
    room,
    roll
  },
  data:function(){
    return{
      gamemap:null,               //存放游戏地图
      backgroundimg:background,   //背景图
      roll:Array(0,0),            //骰子数据
      hexact:0,                   //六边形活跃值
      nodeact:0,                  //节点活跃值 0代表无事件，1代表检查放村，2代表检查放城
      roadact:0,                  //道路活跃值 0代表无事件，1代表检查放路
    }
  },
  beforeMount(){

  },
  mounted(){

  },
  methods: {
    gameDataHandle(data){//游戏接收到的数据总管
      switch(data.head)
      {   
          case 'leavesuccess':
            this.gamemap=null;
          break;
          //上面的case为房间维护相关 和游戏无关
          case 'startgame':
            this.gamemap=data;
          break;
      }
    },
    hexagonHandle(P){//hexagon事件代理函数
      alert('hexagon');
    },
    nodeHandle(P){//node事件代理函数
      alert('node');

    },
    roadHandle(P){//road事件代理函数
      alert('road');
    },
    //被迫使用复制的方式来达到使用的目的了。。。
    calcHexagonId(P)
    {
        var hexagonid='hexagon-x'+String(P.x.toFixed(2))+'y'+String(P.y.toFixed(2));
        hexagonid=String(hexagonid).replace(/\./g,'d');
        return hexagonid;
    },
    calcNodeId(P){//给每一个节点一个唯一编号
      var nodeid;
      var X,Y;
      X=(P[0].x+P[1].x+P[2].x)/3;
      Y=(P[0].y+P[1].y+P[2].y)/3;
      nodeid='node-x'+String(X.toFixed(2))+'y'+String(Y.toFixed(2));
      nodeid=String(nodeid).replace(/\./g,'d');
      return nodeid;
    },
    calcRoadId(P){//给每一个节点一个唯一编号
        var X,Y,roadid;
        X=(P[0].x+P[1].x)/2;
        Y=(P[0].y+P[1].y)/2;
        roadid='road-x'+String(X.toFixed(2))+'y'+String(Y.toFixed(2));
        roadid=String(roadid).replace(/\./g,'d');
        return roadid;
    }
  },
}
</script>



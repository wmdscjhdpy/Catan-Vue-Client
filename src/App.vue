<template>
  <div id="app">
    <hexagon v-for="Pos in this.gamemap.hexagon" :key="Pos.label" :P="Pos"/>
    <node v-for="Pos in this.gamemap.node" :key="Pos.label" :P1="Pos.N0" :P2="Pos.N1" :P3="Pos.N2"/>
    <road v-for="Pos in this.gamemap.road" :key="Pos.label" :P1="Pos.N0" :P2="Pos.N1"/>
    <textarea rows="10" cols="50" readonly="readonly" style="position:absolute;left:1300px;top:500px;resize:none;font-size:16px;" v-model="showmsg"/>
    
  </div>
</template>

<script>
import hexagon from './components/hexagon.vue'
import node from './components/node.vue'
import road from './components/road.vue'
import gamecalc from './components/gamecalc.js'

export default {
  gamecalc,
  name: 'App',
  components: {
    hexagon,
    node,
    road,
  },
  data:function(){
    return{
      gamemap:0,
      showmsg:"卡坦岛内测版0.1"//用于显示游戏界面文字提示
    }
  },
  beforeMount(){
    var webSocket = new WebSocket("ws://localhost:2333");
    webSocket.onerror = function (event){
      alert('无法获得与服务器的连接，请联系管理员？'+String(event));
    };
    /*
    // 打开websocket
    webSocket.onopen = function (event){
      onOpen(event);
    };  

    //监听消息
    webSocket.onmessage = function (event){
      onMessage(event);
    };
    */
    this.gamemap=gamecalc.initMap();
  }
}
</script>



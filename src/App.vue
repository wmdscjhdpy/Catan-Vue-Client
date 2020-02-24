<template>
  <div id="app">
    <div v-if="gamemap!=null">
      <hexagon v-for="hexa in gamemap.hexagon" :key="hexa.label" :P="hexa.Pos" :rollnum="hexa.number" :kind="hexa.kind"/>
      <node v-for="nod in gamemap.node" :key="nod.label" :P1="nod.Pos[0]" :P2="nod.Pos[1]" :P3="nod.Pos[2]"/>
      <road v-for="roa in gamemap.road" :key="roa.label" :P1="roa.Pos[0]" :P2="roa.Pos[1]"/>
      <roll :num="roll" style="position:absolute;left:1000px;top:50px"/>
    </div>
    <div v-if="gamemap==null">
      <img :src="backgroundimg" width="900" height="900" style="position:absolute;left:100px;top:20px;"/>
    </div>
    <room @gameDataHandle="gameDataHandle" x="1300" y="10"/>
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
      gamemap:null,
      backgroundimg:background,
      roll:Array(0,0)
    }
  },
  beforeMount(){

  },
  mounted(){

  },
  methods: {
    gameDataHandle(data){
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
    }
  },
}
</script>



<template>
  <div id="app">
    <div v-if="gamemap!=null">
      <hexagon v-for="hexa in gamemap.hexagon" :key="hexa.label" :P="hexa.Pos" :rollnum="hexa.number" :kind="hexa.kind"/>
      <node v-for="Pos in gamemap.node" :key="Pos.label" :P1="Pos[0]" :P2="Pos[1]" :P3="Pos[2]"/>
      <road v-for="Pos in gamemap.road" :key="Pos.label" :P1="Pos[0]" :P2="Pos[1]"/>
    </div>
    <room @gameDataHandle="gameDataHandle" x="1300" y="10"/>
  </div>
</template>

<script>
import hexagon from './components/hexagon.vue'
import node from './components/node.vue'
import road from './components/road.vue'
import gamecalc from './components/gamecalc.js'
import room from './components/room.vue'

export default {
  name: 'App',
  components: {
    hexagon,
    node,
    road,
    room,
  },
  data:function(){
    return{
      gamemap:null
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
          case 'startgame':
            this.gamemap=data;
          break;
      }
    }
  },
}
</script>



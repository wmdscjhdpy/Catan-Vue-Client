<template>
  <div id="app">
    <hexagon v-for="Pos in this.gamemap.hexagon" :key="Pos.label" :P="Pos"/>
    <node v-for="Pos in this.gamemap.node" :key="Pos.label" :P1="Pos.N0" :P2="Pos.N1" :P3="Pos.N2"/>
    <road v-for="Pos in this.gamemap.road" :key="Pos.label" :P1="Pos.N0" :P2="Pos.N1"/>
    <room x="1300" y="10"/>
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
    room
  },
  data:function(){
    return{
      gamemap:0,
      webSocket:0,
    }
  },
  beforeMount(){
    
    this.gamemap=gamecalc.initMap();
  },
  mounted(){
  },
  methods: {
    
  },
}
</script>



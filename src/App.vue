<template>
  <div id="app">
    <hexagon v-for="Pos in this.gamemap" :key="Pos.label" :P="Pos"/>
    <node :P1="{x:0,y:0}" :P2="{x:1,y:1}" :P3="{x:1,y:0}"/>
    <road :P1="{x:0,y:0}" :P2="{x:1,y:0}"/>
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
      gamemap:{x:0,y:0}
    }
  },
  beforeMount(){
      this.gamemap=gamecalc.initMap();
      console(this.gamemap);
  }
}
</script>



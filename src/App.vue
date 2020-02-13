<template>
  <div id="app">
    <hexagon v-for="num in 5" :key="num.label" :P="{x:num-3,y:0}"/>
    <hexagon v-for="num in 4" :key="num.label" :P="{x:num>2?num-2:num-3,y:1}"/>
    <hexagon v-for="num in 4" :key="num.label" :P="{x:num>2?num-2:num-3,y:-1}"/>
    <hexagon v-for="num in 3" :key="num.label" :P="{x:num-2,y:2}"/>
    <hexagon v-for="num in 3" :key="num.label" :P="{x:num-2,y:-2}"/>

    <node :P1="{x:0,y:0}" :P2="{x:1,y:1}" :P3="{x:1,y:0}"/>
    <road :P1="{x:0,y:0}" :P2="{x:1,y:0}"/>
  </div>
</template>

<script>
import hexagon from './components/hexagon.vue'
import node from './components/node.vue'
import road from './components/road.vue'

export default {
  name: 'App',
  components: {
    hexagon,
    node,
    road
  }
}
</script>



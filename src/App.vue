<template>
  <div id="app">
    <hexagon v-for="num in 5" :key="num.label" :x="num-3" y="0"/>
    <hexagon v-for="num in 4" :key="num.label" :x="num>2?num-2:num-3" y="1"/>
    <hexagon v-for="num in 4" :key="num.label" :x="num>2?num-2:num-3" y="-1"/>
    <hexagon v-for="num in 3" :key="num.label" :x="num-2" y="2"/>
    <hexagon v-for="num in 3" :key="num.label" :x="num-2" y="-2"/>

    <node v-for="num in 11" :key="num.label" :x="num-6" y="1"/>
    <node v-for="num in 11" :key="num.label" :x="num-6" y="-1"/>
    <node v-for="num in 9" :key="num.label" :x="num-5" y="2"/>
    <node v-for="num in 9" :key="num.label" :x="num-5" y="-2"/>
    <node v-for="num in 7" :key="num.label" :x="num-4" y="3"/>
    <node v-for="num in 7" :key="num.label" :x="num-4" y="-3"/>
  </div>
</template>

<script>
import hexagon from './components/hexagon.vue'
import node from './components/node.vue'

export default {
  name: 'App',
  components: {
    hexagon,
    node
  }
}
</script>



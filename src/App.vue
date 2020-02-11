<template>
  <div id="app">
    <hexagon v-for="num in 5" :key="num.label" :x="num-3" y="0" kind="desert"/>
    <hexagon v-for="num in 4" :key="num.label" :x="num>2?num-2:num-3" y="1" kind="desert"/>
    <hexagon v-for="num in 4" :key="num.label" :x="num>2?num-2:num-3" y="-1" kind="desert"/>
    <hexagon v-for="num in 3" :key="num.label" :x="num-2" y="2" kind="desert"/>
    <hexagon v-for="num in 3" :key="num.label" :x="num-2" y="-2" kind="desert"/>
  </div>
</template>

<script>
import hexagon from './components/hexagon.vue'

export default {
  name: 'App',
  components: {
    hexagon
  }
}
</script>



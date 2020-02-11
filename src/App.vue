<template>
  <div id="app">
    <hexagon v-for="count in 9" :key="count.label" :x="count" y="1" kind="desert"/>
    <hexagon v-for="count in 7" :key="count.label" :x="count+1" y="2" kind="desert"/>
    <hexagon v-for="count in 3" :key="count.label" :x="count*2+1" y="3" kind="desert"/>
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



<template>
  <div id="app">
    <Automaton/>
  </div>
</template>

<script>
import Automaton from './components/automaton/Automaton.vue'

export default {
  name: 'app',
  components: {
    Automaton
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

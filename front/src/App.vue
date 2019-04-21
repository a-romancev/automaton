<template>
  <div id="app" class="content">
    <Evolution/>
  </div>
</template>

<script>
import Automaton from './components/automaton/Automaton.vue'
import Evolution from "./components/evolution/Evolution";

export default {
  name: 'app',
  components: {
      Evolution,
    Automaton
  }
}
</script>

<style lang="sass">

#app
  height: 100%
  width: 100%
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  text-align: center
  display: inline-block

.content
  background-color: #3c4556

body, html
  height: 100%
  overflow: hidden
  margin: 0

</style>

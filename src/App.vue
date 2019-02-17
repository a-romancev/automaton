<template>
  <div id="app" class="content">
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

<style lang="sass">

#app
  height: 100%
  width: 100%
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  text-align: center
  display: inline-block

.content
  background-color: #3C4556

body, html
  height: 100%
  margin: 0

</style>

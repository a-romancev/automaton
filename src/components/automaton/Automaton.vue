<template>
  <div class="hello">
    <canvas @click="start" class="canvas"></canvas>
  </div>
</template>

<script>
import Renderer from "@/components/automaton/renderer.js"
import RandomGenerator from "@/components/automaton/generators/random.js"

export default {
  name: 'Automaton',
  props: {
    msg: String
  },
  methods: {
    start: function () {
      var field = new RandomGenerator().generate(100, 100, 1)
      var f = new Renderer(document.getElementsByClassName('canvas')[0], field)
      f.start()
    }
  }
}
</script>

<style scoped lang="sass">
  .canvas
    border: red 2px solid
    width: 500px
    height: 500px
</style>

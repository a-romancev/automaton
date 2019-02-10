<template>
  <div class="hello">
    <canvas @click="start" class="canvas"></canvas>
  </div>
</template>

<script>
import Renderer from "@/components/automaton/renderer.js"
import RandomGenerator from "@/components/automaton/generators/random.js"
import Evolution from "@/components/automaton/evolution.js"

export default {
  name: 'Automaton',
  props: {
    msg: String
  },
  methods: {
    start: function () {
      let field = new RandomGenerator(200, 200, 0.2).generate()
      new Evolution(field).start()
      new Renderer(document.getElementsByClassName('canvas')[0], field).start()
    }
  }
}
</script>

<style scoped lang="sass">
  .canvas
    border: red 2px solid
    width: 1000px
    height: 1000px
</style>

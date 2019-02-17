<template>

  <div>
    <div class="hello">
      Evolution
      <div class="explanation">
        (Click inside to begin the process)
      </div>
    </div>
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
      let field = new RandomGenerator(200, 200, 0.15).generate()
      new Evolution(field).start()
      new Renderer(document.getElementsByClassName('canvas')[0], field).start()
    }
  }
}
</script>s
<style scoped lang="sass">

  .canvas
    border: #5f6872 5px solid
    width: 900px
    height: 800px

  .hello
    color: #fefeff
    margin: 10px
    text-align: center
    font-size: 20px

  .explanation
    font-size: 12px
    color: #a9b2b6

</style>

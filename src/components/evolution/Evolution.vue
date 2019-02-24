<template>

  <div class="content">
    <div class="hello">
      Gol
      <div class="explanation">
        (Click inside to draw)
      </div>
    </div>
    <Automaton ref="automation"/>
    <div class="control-panel">

      <div class="control-panel-title">Control panel</div>

      <br/>
      <div>Resolution</div>
      <input v-model="resolution" type="range" min="10" max="150" step="5">
      <div>{{ resolution }}</div>

      <div @click="start" class="button">Start</div>
      <div @click="generate" class="button">Generate random</div>
      <div @click="init" class="button">Create new field</div>

      <br/>
      <div>Generate at random</div>
      <input type="checkbox" v-model="checked">
      <div>Density</div>
      <input v-model="density" type="range" min="0.01" max="1" step="0.01">
      <div>{{ density }}</div>

    </div>
  </div>
</template>

<script>
    import Automaton from "../automaton/Automaton"
    import RandomGenerator from "@/components/automaton/generators/random.js"
    import DrawMutator from "@/components/automaton/mutators/draw.js"
    import GOLMutator from "@/components/automaton/mutators/gol.js"

    export default {
        name: 'Evolution',

        data() {
            return {
                resolution: 10,
                density: 0.01,
                checked: false,
            }
        },

        components: {Automaton},

        mounted() {
            this.init()
        },

        methods: {
            init() {
                if (this.draw) {
                    this.draw.stop()
                }
                if (this.gol) {
                    this.gol.stop()
                }
                this.field = this.$refs.automation.init(parseInt(this.$data.resolution), parseInt(this.$data.resolution))
                this.draw = new DrawMutator(this.field, this.$refs.automation)
                this.gol = new GOLMutator(this.field)
                this.draw.start()
            },

            generate() {
                let generator = new RandomGenerator(this.field, this.$data.density)
                generator.generate()
            },

            start() {
                this.gol.start()
            },
        }
    }
</script>

<style scoped lang="sass">

  .content
    position: relative

  .hello
    color: #fefeff
    margin: 10px
    text-align: center
    font-size: 20px

  .explanation
    font-size: 12px
    color: #a9b2b6

  .control-panel
    height: 400px
    width: 300px
    right: 0
    top: 0
    position: absolute
    color: whitesmoke
    margin: 46px
    padding: 10px
    border: #58667c 5px solid
    display: block

  .control-panel-title
    font-size: 25px

  .button
    background-color: #49A078
    padding: 10px
    border: grey 1px solid
    margin: 5px
    cursor: pointer

  .space
    padding: 10px


</style>

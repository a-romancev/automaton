<template>

  <div class="content">
    <div class="hello">
      Evolution
      <div class="explanation">
        (Click inside to draw)
      </div>
    </div>
    <Automaton ref="automation"/>
    <div class="control-panel">

      <div class="control-panel-title">Control panel</div>

      <div class="control-section">
      <div>Resolution</div>
      <input v-model="resolution" type="range" min="10" max="150" step="5">
      <div>{{ resolution }}</div>
      <md-button @click="init" class="button">Create new field</md-button>
      </div>

      <div class="control-section">
      <md-button @click="generate" class="button">Generate random</md-button>
      <!--<div>Generate at random</div>-->
      <!--<input type="checkbox" v-model="checked">-->
      <div>Density</div>
      <input v-model="density" type="range" min="0.01" max="1" step="0.01">
      <div>{{ density }}</div>
      </div>

      <md-button @click="start" class="start-button button">Start</md-button>
      <md-button @click="save" class="start-button button">Save</md-button>
      <md-button @click="load" class="start-button button">Load</md-button>

    </div>
  </div>
</template>

<script>
    import Automaton from "../automaton/Automaton"
    import RandomGenerator from "@/components/automaton/generators/random.js"
    import DrawMutator from "@/components/automaton/mutators/draw.js"
    import GOLMutator from "@/components/automaton/mutators/gol.js"
    import axios from "axios"
    import conf from "@/conf.js"

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

            save() {
                axios.post(conf.API_URL + '/api/field/', this.field)
            },
            load() {
                axios.get(conf.API_URL + '/api/field/')
                    .then((response) => {
                        this.field.load(response.data.data)
                    })
            }
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
    height: 500px
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
    cursor: pointer
    width: 200px
    margin: 5px auto
    color: whitesmoke

  .space
    padding: 10px

  .control-section
    padding: 10px
    border: #58667c 3px solid
    width: 250px
    margin: 10px auto

  .start-button
    width: 250px



</style>

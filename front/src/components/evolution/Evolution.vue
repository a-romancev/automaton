<template>

  <div class="content">
    <div class="grid"></div>
    <div class="hello">
      Evolution
      <div class="explanation">
        (Click inside to draw)
      </div>
    </div>
    <Automaton ref="automation"/>
    <div class="control-panel">

      <div class="switch">Control Panel</div>
      <div class="control-panel__title">Control panel</div>

      <div class="control-panel__section">
      <div>Resolution</div>
      <input v-model="resolution" type="range" min="10" max="150" step="5">
      <div>{{ resolution }}</div>
      <md-button @click="init" class="button">Create new field</md-button>
      </div>

      <div class="control-panel__section">
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
                this.field = this.$refs.automation.init(parseInt(this.$data.resolution), calcHeight(parseInt(this.$data.resolution)))
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

    function calcHeight(width) {
        const cell = window.innerWidth / width
        return parseInt(window.innerHeight / cell)
    }
</script>

<style scoped lang="sass">

  .content
    position: relative
    width: 100%
    height: 100%

  .hello
    color: #fefeff
    margin: 10px
    text-align: center
    font-size: 20px
    position: absolute
    width: 100%
    opacity: 0.7
    -moz-user-select: none
    -webkit-user-select: none
    user-select: none

  .explanation
    font-size: 12px
    color: #a9b2b6

  .control-panel
    $wd: 300px
    height: 550px
    width: $wd
    right: -$wd
    top: 0
    position: fixed
    color: whitesmoke
    margin-top: 50px
    padding: 10px
    border: #58667c 5px solid
    display: block
    transition: right ease-out 0.6s
    background-color: #3c4556
    &:hover
      right: 0
      transition: right ease-out 0.35s

  .switch
    position: relative
    top: 50%
    left: -75px
    width: 100px
    height: 20px
    background: #49A078
    transform: rotate(-90deg)

  .control-panel__title
    font-size: 25px
    top: 0px

  .button
    background-color: #49A078
    cursor: pointer
    width: 200px
    margin: 5px auto
    color: whitesmoke

  .control-panel__section
    padding: 10px
    border: #58667c 3px solid
    width: 250px
    margin: 10px auto

  .start-button
    width: 250px

</style>

<template>

  <div class="content">
    <div class="hello">
      Evolution
      <div class="explanation">
        (Click inside to begin the process)
      </div>
    </div>
    <Automaton ref="automation"/>
    <div class="control-panel">

      <div class="control-panel-title">Control panel</div>

      <div class="space"></div>
      <div>Resolution</div>
      <input v-model="resolution" type="range" min="10" max="150" step="5">
      <div>{{ resolution }}</div>

      <div @click="start" class="button">Start</div>
      <div @click="generate" class="button">Generate</div>

      <div class="space"></div>
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
    import UserGenerator from "@/components/automaton/generators/user.js"

    export default {
        name: 'Evolution',

        data() {
            return {
                resolution: 10,
                density:0.01,
                checked: false,
            }
        },

        components: {Automaton},

        methods: {
            generate() {
                let generator = new UserGenerator(this.$data.resolution, this.$data.resolution, this.$refs.automation)
                if (this.$data.checked) {
                    generator = new RandomGenerator(this.$data.resolution, this.$data.resolution, this.$data.density)
                }
                //let generator = new RandomGenerator(this.$data.resolution, this.$data.resolution, this.$data.density)
                // let generator = new RandomGenerator(this.$data.resolution, this.$data.resolution, 0.15)
                this.$refs.automation.generate(generator)
            },

            start() {
                this.$refs.automation.start()
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

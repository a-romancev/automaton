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
      Control panel
      <div @click="start" class="button">Start</div>
      <div>{{ resolution }}</div>
      <input v-model="resolution" name="jopa" type="range" min="100" max="200" step="2">
    </div>
  </div>

</template>

<script>
    import Automaton from "../automaton/Automaton"
    export default {
        name: 'Evolution',

        data() {
            return {
                resolution: 10,
            }
        },

        components: {Automaton},

        methods: {
            start() {
                this.$refs.automation.start(this.$data.resolution)
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

  .button
    background-color: deepskyblue
    padding: 10px
</style>

<template>
  <canvas class="canvas" ref="canvas"></canvas>
</template>

<script>
import Renderer from "@/components/automaton/renderer.js"
import Evolution from "@/components/automaton/evolution.js"

export default {
    name: 'Automaton',

    beforeCreate() {
        this.field = null
        this.evo = null
        this.renderer = null
    },

    methods: {

        generate(generator) {
            if (this.renderer) {
                this.renderer.stop()
            }
            this.field = generator.generate()
            this.renderer = new Renderer(this.$refs.canvas, this.field)
            this.renderer.start()
        },

        start() {
            if (this.evo) {
                this.evo.stop()
            }
            this.evo = new Evolution(this.field)
            this.evo.start()
        },
    }
}
</script>

<style scoped lang="sass">

  .canvas
    border: #5f6872 5px solid
    width: 900px
    height: 800px

</style>

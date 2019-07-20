<template>
  <canvas class="canvas" ref="canvas"></canvas>
</template>

<script>
import Renderer from "@/components/automaton/renderer.js"
import Gol from "@/components/automaton/mutators/gol.js"
import Field from "@/components/automaton/field.js"

export default {
    name: 'Automaton',

    beforeCreate() {
        this.field = null
        this.evo = null
        this.renderer = null
    },

    methods: {
        init(width, height){
            if (this.renderer) {
                this.renderer.stop()
            }
            this.field = new Field(width, height)
            this.renderer = new Renderer(this.$refs.canvas, this.field)
            this.renderer.start()
            return this.field
        },

        start() {
            if (this.evo) {
                this.evo.stop()
            }
            this.evo = new Gol(this.field)
            this.evo.start()
        },
    }
}
</script>

<style scoped lang="sass">

.canvas
  width: 100%
  height: 100%
  z-index: 10

</style>

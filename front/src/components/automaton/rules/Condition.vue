<template>
  <div class="condition_content">
    <div>Condition</div>
    Alive = <input type="number" v-model="aliveCount">
  </div>
</template>

<script>
    export default {
        name: "Condition",

        data() {
            return {
                aliveCount: 1
            }
        },
        props: {
            initial: Object
        },
        mounted() {
            this.load(this.initial)
        },
        methods: {
            save() {
                return {
                    aliveCount: parseInt(this.aliveCount)
                }
            },
            load(data) {
                if (!data) {
                    return
                }
                this.aliveCount = data.aliveCount
            }
        }
    }
</script>

<style scoped lang="sass">

</style>
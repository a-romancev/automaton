<template>
  <div>
    <div @click="add" class="add_new">+</div>
    <Condition :initial="c" ref="condition" v-for="c in conditions"></Condition>
  </div>
</template>

<script>
    export default {
        name: "And",
        components: {
            "Condition": () => import("./Condition")
        },
        data() {
            return {
                conditions: []
            }
        },

        methods: {
            save() {
                let data = {
                    conditions: []
                }
                if (this.$refs.condition) {
                    for (let condition of this.$refs.condition) {
                        data.conditions.push(condition.save())
                    }
                }
                return data
            },
            load(data) {
                this.conditions = []
                for (let c of data.conditions) {
                    this.conditions.push(c)
                }
            },
            add() {
                this.conditions.push(null)
            }
        }
    }
</script>

<style scoped lang="sass">
.add_new
  cursor: pointer
</style>
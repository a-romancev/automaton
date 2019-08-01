<template>
  <select  v-model="populated">
    <option style="color: #3c4556" value=0>None</option>
    <option style="color: #49A078" value=1>Cyan</option>
    <option style="color: #962e38" value=2>Red</option>
    <option style="color: #303ca1" value=3>Blue</option>
  </select>
</template>

<script>
    import Const from "@/components/automaton/mutators/const.js"

    export default {
        name: "State",
        data() {
            return {
                populated: Const.color.cyan.toString()
            }
        },

        methods: {
            save() {
                return {
                    populated: parseInt(this.populated)
                }
            },
            load(data) {
                if (!data) {
                    return
                }
                this.populated = data.populated.toString()
            }
        }
    }
</script>

<style scoped>

</style>
<template>
  <select v-model="populated">
    <option selected :style="{'background-color': colorCodeConst[color_id]}" v-for="color_id in colorConst" :value="color_id">{{colorNameConst[color_id]}}</option>
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

        computed:{
            operConst(){
                return Const.operType
            },
            colorConst(){
                return Const.color
            },
            colorCodeConst(){
                return Const.colorCode
            },
            colorNameConst() {
                return Const.colorName
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
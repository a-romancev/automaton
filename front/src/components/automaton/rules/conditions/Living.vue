<template>
  <div>
  Color
    <select v-model="color" >
      <option selected :style="{'background-color': colorCodeConst[color_id]}" v-for="color_id in colorConst" :value="color_id">{{colorNameConst[color_id]}}</option>
    </select>
  <select v-model="operator">
    <option selected :value="operConst.eq"> = </option>
    <option :value="operConst.neq"> != </option>
    <option :value="operConst.gt"> > </option>
    <option :value="operConst.lt"> < </option>
    <option :value="operConst.gte"> >= </option>
    <option :value="operConst.lte"> <= </option>
  </select>
  <input type="number" v-model="aliveCount">
  </div>
</template>

<script>
    import Const from "@/components/automaton/mutators/const.js"

    export default {
        name: "Living",
        data() {
            return {
                operator: Const.operType.eq.toString(),
                aliveCount: 0,
                color: Const.color.cyan.toString()
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
                return Const.color
            },
            colorNameConst() {
                return Const.colorName
            }

        },

        methods: {
            test() {
              console.log(this.color)
            },
            save() {
                let data = {
                    operator: parseInt(this.operator),
                    aliveCount: parseInt(this.aliveCount),
                    color : this.color
                }
                return data
            },
            load(data) {
                this.operator = data.operator
                this.aliveCount = data.aliveCount
                this.color = data.color
            }
        }
    }
</script>

<style scoped>

</style>
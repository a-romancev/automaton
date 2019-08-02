<template>
  <div>
  Color
  <select @change="test" v-model="color">
    <option style="color: #3c4556" selected :value="colorConst.none">None</option>
    <option style="color: #49A078" :value="colorConst.cyan">Cyan</option>
    <option style="color: #962e38" :value="colorConst.red">Red</option>
    <option style="color: #303ca1" :value="colorConst.blue">Blue</option>
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
                color: {}
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
<template>
  <div>
  Alive
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
                aliveCount: 0
            }
        },

        computed:{
            operConst(){
                return Const.operType
            }

        },

        methods: {
            save() {
                let data = {
                    operator: parseInt(this.operator),
                    aliveCount: parseInt(this.aliveCount)
                }
                return data
            },
            load(data) {
                this.operator = data.operator
                this.aliveCount = data.aliveCount
            }
        }
    }
</script>

<style scoped>

</style>
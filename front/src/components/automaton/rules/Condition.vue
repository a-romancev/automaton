<template>
  <div class="condition_content">
    <div>Condition</div>
    <select v-model="type">
      <option selected :value="typeConst.living">Living neighbours</option>
      <option :value="typeConst.state">Current state</option>
    </select>
    <div v-if="this.type === typeConst.living" >
      Alive
      <select v-model="living.operator">
        <option selected :value="operConst.eq"> = </option>
        <option :value="operConst.neq"> != </option>
        <option :value="operConst.gt"> > </option>
        <option :value="operConst.lt"> < </option>
        <option :value="operConst.gte"> >= </option>
        <option :value="operConst.lte"> <= </option>
      </select>
      <input type="number" v-model="living.aliveCount">
    </div>
    <div v-if="this.type === typeConst.state" >
      <select v-model="state.populated">
        <option selected :value='"true"'>Populated</option>
        <option :value='"false"'>Unpopulated</option>
      </select>
    </div>

  </div>
</template>

<script>
  import Const from "@/components/automaton/mutators/const.js"

    export default {
        name: "Condition",

        data() {
            return {
                type: Const.condType.living,
                living: {aliveCount: 1, operator: '1'},
                state: {populated: "true"}
            }
        },
        computed:{
            typeConst() {
                return Const.condType
            },
            operConst(){
                return Const.operType
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
                let data = null
                switch (this.type) {
                    case Const.condType.living:
                        data = {
                            aliveCount: parseInt(this.living.aliveCount),
                            operator: parseInt(this.living.operator)
                        }
                        break
                    case Const.condType.state:
                        data = {
                            populated: this.state.populated === "true"
                        }
                        break
                }
                data.type = this.type
                return data
            },
            load(data) {
                if (!data) {
                    return
                }
                switch (data.type) {
                    case Const.condType.living:
                        this.living.aliveCount = data.aliveCount
                        this.living.operator = data.operator
                        break
                    case Const.condType.state:
                        this.state.populated = data.populated ? "true" : "false"
                        break
                }
                this.type = data.type
            }
        }
    }
</script>

<style scoped lang="sass">

</style>
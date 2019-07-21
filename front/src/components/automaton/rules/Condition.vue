<template>
  <div class="condition_content">
    <div>Condition</div>
    <select v-model="type">
      <option selected :value="typeConst.living">Living neighbours</option>
      <option :value="typeConst.state">Current state</option>
    </select>
    <div v-if="this.type === typeConst.living" >
      Alive = <input type="number" v-model="living.aliveCount">
    </div>
    <div v-if="this.type === typeConst.state" >
      <select v-model="state.populated">
        <option selected value="true">Populated</option>
        <option value="false">Unpopulated</option>
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
                living: {aliveCount: 1},
                state: {populated: "true"}
            }
        },
        computed:{
            typeConst() {
                return Const.condType
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
                            aliveCount: parseInt(this.living.aliveCount)
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
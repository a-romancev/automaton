<template>
  <div class="condition_content">
    <div>Condition</div>
    <select v-model="type">
      <option selected :value="typeConst.living">Neighbours</option>
      <option :value="typeConst.state">Current state</option>
      <option :value="typeConst.and">And</option>
      <option :value="typeConst.any">Any</option>
    </select>
    <Living ref="child" v-if="this.type === typeConst.living" ></Living>
    <State ref="child" v-if="this.type === typeConst.state"></State>
    <And ref="child" v-if="this.type === typeConst.and" ></And>
    <Any ref="child" v-if="this.type === typeConst.any" ></Any>
    <div class="bracket" v-if="this.type === typeConst.and" >All off the above</div>
    <div class="bracket" v-if="this.type === typeConst.any" >Any off the above</div>
    </div>
</template>

<script>
  import Const from "@/components/automaton/mutators/const.js"
  import State from "./State";
  import Living from "./Living";
  import And from "./And";
  import Any from "./Any";

    export default {
        name: "Condition",
        components: {And, Any, Living, State},
        data() {
            return {
                type: Const.condType.living,
            }
        },
        props: {
            initial: Object
        },
        mounted() {
            this.load(this.initial)
        },
        computed:{
            typeConst() {
                return Const.condType
            },

        },
        methods: {
            save() {
                return {
                    child: this.$refs.child.save(),
                    type: this.type
                }
            },
            load(data) {
                if (!data) {
                    return
                }
                this.type = data.type
                this.$nextTick().then(() => {
                    this.$refs.child.load(data.child)
                })
            }
        }
    }
</script>

<style scoped lang="sass">
  .condition_content
    padding: 5px 10px
    margin: 10px 0
    border: 1px darkgray solid
    border-radius: 1px
    transition: background-color 0.1s, border 0.1s
    &:hover
      background: rgba(0, 0, 0, 0.1)
      border: 1px dimgray solid

</style>
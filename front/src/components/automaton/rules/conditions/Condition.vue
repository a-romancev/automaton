<template>
  <div class="condition_content">
    <div>Condition</div>
    <select v-model="type">
      <option selected :value="typeConst.living">Living neighbours</option>
      <option :value="typeConst.state">Current state</option>
      <option :value="typeConst.and">And</option>
    </select>
    <Living ref="child" v-if="this.type === typeConst.living" ></Living>
    <State ref="child" v-if="this.type === typeConst.state"></State>
    <And ref="child" v-if="this.type === typeConst.and" ></And>

  </div>
</template>

<script>
  import Const from "@/components/automaton/mutators/const.js"
  import State from "./State";
  import Living from "./Living";
  import And from "./And";

    export default {
        name: "Condition",
        components: {And, Living, State},
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

</style>
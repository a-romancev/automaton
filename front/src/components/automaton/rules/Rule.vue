<template>
  <div class="rule_content">
    <div class="exp">If</div>
    <div class="block">
      <condition ref="cond"/>
    </div>
    <div class="exp">Then</div>
    <div class="block">
      <action ref="action"/>
    </div>
  </div>
</template>

<script>
    import Condition from "@/components/automaton/rules/conditions/Condition";
    import Action from "./Action";
    export default {
        name: "Rule",
        components: {Action, Condition},
        data() {
            return {
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
                return {
                    condition: this.$refs.cond.save(),
                    action: this.$refs.action.save(),
                }
            },
            load(data) {
                if (!data) {
                    return
                }
                this.$refs.cond.load(data.condition)
                this.$refs.action.load(data.action)
            }
        }
    }
</script>

<style scoped lang="sass">
.rule_content
  border: 2px darkgray solid
  padding: 10px
  display: flex
  text-align: center
  align-items: center
.block
  border: 2px darkgray solid
  padding: 10px
.exp
  padding: 20px 10px
  font-size: 30px

</style>

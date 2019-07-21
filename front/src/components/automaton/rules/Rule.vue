<template>
  <div class="rule_content">
    <condition ref="cond"/>
    <action ref="action"/>
  </div>
</template>

<script>
    import Condition from "@/components/automaton/rules/Condition";
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

</style>
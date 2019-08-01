<template>
  <div class="action_content">
    <div>Action</div>
    Color
    <select  v-model="populate">
      <option style="color: #3c4556" value=0>None</option>
      <option style="color: #49A078" value=1>Cyan</option>
      <option style="color: #962e38" value=2>Red</option>
      <option style="color: #303ca1" value=3>Blue</option>
    </select>
  </div>
</template>

<script>
    import Const from "@/components/automaton/mutators/const.js"

    export default {
        name: "Action",
        components: {},
        data() {
            return {
                populate: Const.color.cyan.toString()
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
                    populate: parseInt(this.populate)
                }
            },
            load(data) {
                if (!data) {
                    return
                }
                this.populate = data.populate.toString()
            }
        }
    }
</script>

<style scoped>

</style>
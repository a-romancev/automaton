<template>
  <div class="action_content">
    <div>Action</div>
    Populate
  <select v-model="populate">
    <option value="true">Populate</option>
    <option value="false">Kill</option>
  </select>
  <div v-if="populate === 'true'">
    Color
    <select  v-model="populate_color">
      <option style="color: #49A078"  value=1>Cyan</option>
      <option style="color: #962e38" value=2>Red</option>
      <option style="color: #303ca1" value=3>Blue</option>
    </select>
  </div>

  </div>
</template>

<script>
    import Const from "@/components/automaton/mutators/const.js"

    export default {
        name: "Action",
        components: {},
        data() {
            return {
                populate: "true",
                populate_color: Const.color.cyan
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
                if (this.populate === "true") {
                    return {
                    populate: this.populate_color
                }}
                return {
                    populate: Const.color.none
                }

            },
            load(data) {
                if (!data) {
                    return
                }
                this.populate_color = data.populate
                this.populate = data.populate ? "true" : "false"
            }
        }
    }
</script>

<style scoped>

</style>
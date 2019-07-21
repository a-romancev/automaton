<template>
  <div class="action_content">
    <div>Action</div>
    Populate <select v-model="populate">
    <option selected value="true">Populate</option>
    <option value="false">Kill</option>
  </select>
  </div>
</template>

<script>
    export default {
        name: "Action",
        components: {},
        data() {
            return {
                populate: "true"
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
                    populate: this.populate === "true"

                }
            },
            load(data) {
                if (!data) {
                    return
                }
                this.populate = data.populate ? "true" : "false"
            }
        }
    }
</script>

<style scoped>

</style>
<template>
  <select v-model="populated">
    <option selected :value='"true"'>Populated</option>
    <option :value='"false"'>Unpopulated</option>
  </select>
</template>

<script>
    export default {
        name: "State",
        data() {
            return {
                populated: "true"
            }
        },

        methods: {
            save() {
                return {
                    populated: this.populated === "true"
                }
            },
            load(data) {
                this.populated = data.populated ? "true" : "false"
            }
        }
    }
</script>

<style scoped>

</style>
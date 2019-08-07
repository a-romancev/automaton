<template>
  <div class="action_content">
    <div>Action</div>
    Color
    <select v-model="populate">
      <option selected :style="{'background-color': colorCodeConst[color_id]}" v-for="color_id in colorConst" :value="color_id">{{colorNameConst[color_id]}}</option>
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

        computed: {
            colorConst() {
                return Const.color
            },
            colorCodeConst() {
                return Const.colorCode
            },
            colorNameConst() {
                return Const.colorName
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
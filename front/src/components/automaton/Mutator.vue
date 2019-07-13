<template>
  <div class="content" >
    <div> Mutator name:</div>
    <input type="text" v-model="mutator.name">
    <md-button @click="save">Save</md-button>
  </div>
</template>

<script>
    import axios from "axios"
    import conf from "@/conf.js"
    export default {
        name: "Mutator",

        data() {
            return {
                mutator: {
                    name: ''
                }
            }
        },

        mounted() {
            axios.get(conf.API_URL + '/api/mutator/' + this.$route.params.id)
                .then((resp) => {
                    this.mutator = resp.data
                })
                .catch((resp) => {
                    alert(resp)
                })

        },
        methods: {
            save() {
                axios.post(conf.API_URL + '/api/mutator/' + this.$route.params.id + '/', this.mutator)
                    .then(() => {
                        alert("Saved")
                    })
                    .catch((resp) => {
                        alert(resp)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
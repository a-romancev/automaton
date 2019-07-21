<template>
  <div class="content" >
    <div class="block save_block"> Mutator name:
      <input type="text" v-model="name">
      <md-button @click="save">Save</md-button>
    </div>
    <div class="block">
      <md-button @click="createNewRule" >Create new rule</md-button>
      <rule ref="rule" :initial="rule" v-for="rule in rules">
      </rule>
    </div>
  </div>
</template>

<script>
    import axios from "axios"
    import conf from "@/conf.js"
    import Rule from "./rules/Rule";

    export default {
        name: "Mutator",
        components: {Rule},
        data() {
            return {
                name: '',
                rules: []
            }
        },

        mounted() {
            axios.get(conf.API_URL + '/api/mutator/' + this.$route.params.id)
                .then((resp) => {
                    this.rules = resp.data.rules
                    this.name = resp.data.name
                })
                .catch((resp) => {
                    alert(resp)
                })

        },
        methods: {
            save() {
                let data = {
                    name: this.name,
                    rules: []
                }

                for (let rule of this.$refs.rule) {
                    data.rules.push(rule.save())
                }
                axios.post(conf.API_URL + '/api/mutator/' + this.$route.params.id + '/', data)
                    .then(() => {
                        alert("Saved")
                    })
                    .catch((resp) => {
                        alert(resp)
                    })
            },
            createNewRule() {
                this.rules.push({})
            }
        }
    }
</script>

<style scoped lang="sass">

  .content
    display: inline-flex
    margin-top: 200px
    background-color: #49A078
    width: 1000px
    text-align: center
    color: whitesmoke

  .block
    width: 70%
    height: 500px
    text-align: center
    display: flex
    flex-direction: column
    align-items: center
    border: #58667c 5px solid
    justify-content: center
    overflow-y: auto

  .save_block
    width: 30%


</style>
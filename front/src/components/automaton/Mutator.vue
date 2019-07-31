<template>
  <div class="content" >
    <div class="block save_block"> Mutator name:
      <input type="text" v-model="name">
      <md-button @click="save">Save</md-button>
    </div>
    <md-button @click="createNewRule">Create new rule</md-button>
    <div class="block">
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
                if (this.$refs.rule) {
                    for (let rule of this.$refs.rule) {
                        data.rules.push(rule.save())
                    }
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
  display: inline-block
  background-color: #49A078
  width: 65%
  color: whitesmoke
  height: 100%
  overflow: auto
.block
  text-align: center
  display: flex
  flex-direction: column
  align-items: center
  border: #58667c 5px solid
  justify-content: center
  overflow: auto
</style>

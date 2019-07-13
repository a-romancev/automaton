<template>
  <div class="content">
    <div>
      <md-button @click="create" class="start-button button">Add mutator</md-button>
      Mutator List
      <ul>
        <li v-for="mutator in mutators">
          {{ mutator.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import axios from "axios"
    import conf from "@/conf.js"

    export default {
        data() {
            return {
                mutators: []
            }
        },


        name: "MutatorList",
        mounted() {

            axios.get(conf.API_URL + '/api/mutator_list/')
                .then((resp) => { this.mutators = resp.data } )
                .catch((resp) =>{
                    alert(resp)
                })

        },
        methods: {
            create() {
                  axios.post(conf.API_URL + '/api/mutator/')
                      .then((resp) => {
                          this.$router.push('/mutator/' + resp.data.id)
                      })
                      .catch((resp) =>{
                          alert(resp)
                      })
            }

        }
    }
</script>

<style scoped>

</style>
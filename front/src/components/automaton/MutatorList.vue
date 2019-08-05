<template>
  <div class="content">
    <div>
      <div class="title">Mutator List</div>
      <md-button @click="create" class="button">Add mutator</md-button>
      <ul class="list">
        <li v-for="mutator in mutators">
          <router-link :to="{path: '/mutator/' + mutator.id}" class="link">{{ mutator.name }}</router-link>
          <a @click="delete_mutator(mutator.id, mutator.name)" class="cross material-icons">clear</a>
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
            delete_mutator(id, name) {
                if (confirm('Delete '+ name + '?')) {
                    axios.delete(conf.API_URL + '/api/mutator/' + id)
                        .then(() => {
                            axios.get(conf.API_URL + '/api/mutator_list/')
                                .then((resp) => { this.mutators = resp.data } )
                                .catch((resp) =>{
                                    alert(resp)
                                })

                        })
                }
            },
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

<style scoped lang="sass">
.content
  color:  whitesmoke
  display: inline-flex

.button
  background-color: #49A078
  cursor: pointer
  width: 200px
  margin: 5px auto
  color: whitesmoke

.title
  padding: 20px
  font-size: 25px

.list
  font-size: 20px
  list-style-type: none
  padding-left: 0
  line-height: 30px
  height: 800px
  overflow: auto

.cross
  text-decoration: none
  cursor: pointer
  font-size: 20px
  padding-left: 10px
  position: relative
  top: 3px
  &:hover
    color: #50b385
    transition: color 0.2s
    text-decoration: none



</style>
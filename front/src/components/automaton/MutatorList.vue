<template>
  <div class="content">
    <div>
      <div class="title">Mutator List</div>
      <md-button @click="create" class="button">Add mutator</md-button>
      <ul class="list">
        <li v-for="mutator in mutators">
          <router-link :to="{path: '/mutator/' + mutator.id}" class="link">{{ mutator.name }}</router-link>
          <a @click="delete_mutator(mutator.id)" class="cross">X</a>
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
            delete_mutator(id) {
                axios.delete(conf.API_URL + '/api/mutator/' + id)
                    .then((resp) => {
                    })
                // this.$router.go()
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

.cross
  text-decoration: none
  cursor: pointer
  font-size: 20px
  position: absolute
  padding-left: 20px
  &:hover
    font-size: 22px
    color: #50b385
    transition: color, font-size 0.1s
    text-decoration: none



</style>
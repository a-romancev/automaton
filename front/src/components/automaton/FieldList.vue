<template>
  <div class="content">
    <div>
      <div class="title">Field List</div>
      <md-button @click="create" class="button">Add field</md-button>
      <ul class="list">
        <li v-for="field in fields" >
          <router-link :to="{path: '/field/' + field.id}" class="link">{{ field.name }} </router-link>
          <a @click="delete_field(field.id)" class="cross">X</a>
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
                fields: [
                ]
            }
        },
        name: "FieldList",
        mounted() {

            axios.get(conf.API_URL + '/api/field_list/')
                .then((resp) => { this.fields = resp.data } )
                .catch((resp) =>{
                    alert(resp)
                })
        },

        methods: {
            delete_field(id) {
                axios.delete(conf.API_URL + '/api/field/' + id)
                    .then((resp) => {
                        console.log(resp)
                    })
                // this.$router.go()
            },
            create() {
                axios.post(conf.API_URL + '/api/field/')
                    .then((resp) => {
                        this.$router.push('/field/' + resp.data.id)
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
    font-size: 23px
    color: #50b385
    transition: color, font-size 0.1s
    text-decoration: none


</style>

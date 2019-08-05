<template>
  <div class="content">
    <div>
      <div class="title">Field List</div>
      <md-button @click="create" class="button">Add field</md-button>
      <md-button @click="check_best" class="button">Check best fields</md-button>
      <ul class="list">
        <li v-for="field in fields" >
          <router-link :to="{path: '/field/' + field.id}" class="link">{{ field.name }} </router-link>
          <a @click="delete_field(field.id, field.name)" class="cross material-icons">clear</a>
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
            check_best() {
                this.$router.push("/field/rating/")
            },

            delete_field(id, name) {
                if (confirm('Delete '+ name + '?')) {
                    axios.delete(conf.API_URL + '/api/field/' + id)
                        .then(() =>{
                            axios.get(conf.API_URL + '/api/field_list/')
                                .then((resp) => { this.fields = resp.data } )
                                .catch((resp) =>{
                                    alert(resp)
                                })
                        })
                        .catch((resp) => {
                            alert(resp)
                        })
                }
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
  display: inline-block

.button
  background-color: #49A078
  cursor: pointer
  width: 200px
  margin: 5px auto
  color: whitesmoke
  border: 2px #58667c solid

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

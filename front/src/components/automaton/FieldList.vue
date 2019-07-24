<template>
  <div class="content">
    <div>
      <div class="title">Field List</div>
      <md-button @click="create" class="button">Add field</md-button>
      <ul class="list">
        <li v-for="field in fields">
          <router-link :to="{path: '/field/' + field.id}" class="link">{{ field.name }}</router-link>
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
            //.then((resp) => { console.log(resp.data) } )
        },
        methods: {
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
</style>

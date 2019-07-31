<template>
  <div class="content">
    <div>
      <div class="title">Best Fields</div>
      <ul class="list">
        <li v-for="field in fields">
          <router-link :to="{path: '/field/' + field.id}" class="link">{{ field.name }} [{{ field.rating.toFixed(2) }}]</router-link>
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
                fields: []
            }
        },


        name: "MutatorList",
        mounted() {

            axios.get(conf.API_URL + '/api/field_rating_list/')
                .then((resp) => { this.fields = resp.data } )
                .catch((resp) =>{
                    alert(resp)
                })


        },
        methods: {
        }
    }
</script>

<style scoped lang="sass">

.content
  color:  whitesmoke
  display: inline-flex

.title
  padding: 20px
  font-size: 25px

.list
  font-size: 20px
  list-style-type: none
  padding-left: 0
  line-height: 30px


</style>
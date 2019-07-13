<template>
  <div class="content">
    <div>
      Listolist
      <ul>
        <li v-for="field in fields">
          {{ field.name }}
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

        }
    }
</script>

<style scoped>

</style>
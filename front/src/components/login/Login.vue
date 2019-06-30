<template>
  <div class="content">
    <div>
      Register
      <input v-model="login" type="text"/>
      <input v-model="password" type="text"/>
      <md-button @click="register">Register</md-button>
    </div>
  </div>
</template>
<script>
    import axios from "axios"
    import conf from "@/conf.js"

    export default {
        data() {
            return {
                login: "",
                password: ""
            }
        },
        methods:{
            register() {
                axios.post(conf.API_URL + '/api/register/', {login: this.login , password: this.password})
                    .then((resp) => {
                        if (resp.data.error) {
                            alert(resp.data.error)
                            return
                        }

                        alert(resp.error)
                    })
                    .catch((resp) => {
                        console.log(resp)
                        alert(resp)
                    })
            }
        }
    }
</script>

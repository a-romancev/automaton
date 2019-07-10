<template>
  <div class="content">
    <div class="register_block block">
      <div class="title">Register</div>
      Login <input v-model="login" type="text"/>
      Password <input v-model="password" type="text"/>
      Password again <input v-model="password_check" type="text"/>
      <md-button @click="register">Register</md-button>
    </div>
    <div class="login_block block">
      <div class="title">Login</div>
      Login<input v-model="login" type="text"/>
      Password<input v-model="password" type="text"/>
      <md-button @click="register">Login</md-button>
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
                password: "",
                password_check: ""
            }
        },
        methods:{
            register() {
                if (this.password === this.password_check) {
                    axios.post(conf.API_URL + '/api/register/', {login: this.login, password: this.password})
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
                } else {
                    alert("Passwords do not match!")
                }
            }
        }
    }
</script>

<style scoped lang="sass">

.content
  display: inline-flex
  margin-top: 100px
  background-color: #49A078
  width: 1000px
  text-align: center
  color: whitesmoke


.block
  width: 500px
  height: 500px
  text-align: center
  display: flex
  flex-direction: column
  align-items: center
  border: #58667c 5px solid
  justify-content: center

.title
  font-size: 30px
  padding: 10px

</style>
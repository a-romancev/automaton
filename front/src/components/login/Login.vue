<template>
  <div class="content">
    <div class="register_block block">
      <div class="title">Register</div>
      Login <input v-model="login_reg" type="text"/>
      Password <input @change="pass_not_match = false" v-model="password_reg" type="password"/>
      Password again <input v-model="password_check" type="password"/>
      <div v-if="pass_not_match" class="alert">Passwords do not match!</div>
      <md-button @click="register">Register</md-button>
    </div>
    <div class="login_block block">
      <div class="title">Login</div>
      Login<input v-model="login_in" type="text"/>
      Password<input v-model="password_in" type="password"/>
      <md-button @click="login">Login</md-button>

    </div>
  </div>
</template>
<script>
    import axios from "axios"
    import conf from "@/conf.js"

    export default {
        data() {
            return {
                login_reg: "",
                login_in: "",
                password_reg: "",
                password_in: "",
                password_check: "",
                pass_not_match: false,
                reg_success: false,
            }
        },
        methods:{
            register() {
                if (this.password_reg !== this.password_check) {
                    this.pass_not_match = true

                    return
                }

                axios.post(conf.API_URL + '/api/register/', {login: this.login_reg, password: this.password_reg})
                    .then((resp) => {
                        if (resp.data.error) {
                            alert(resp.data.error)
                            return
                        }
                        this.$router.push('/field_list')

                    })
                    .catch((resp) => {
                        console.log(resp)
                        alert(resp)
                    })
                this.$router.push('/')

            },

            login() {
                axios.post(conf.API_URL + '/api/login/', {login: this.login_in, password: this.password_in})
                    .then((resp) => {
                        if (resp.data.error) {
                            alert(resp.data.error)
                            return
                        }
                        this.$router.push('/field_list')

                    })
                    .catch((resp) => {
                        console.log(resp)
                        alert(resp)
                    })

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

.alert
  color: red

</style>
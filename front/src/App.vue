<template>
  <div id="app" class="content">
    <header class="app_header">
      <router-link v-if="this.$store.getters.LOGON === false" class="header_item header_item_right" to='/login'>Login</router-link>
      <router-link v-if="this.$store.getters.LOGON" class="header_item header_item_right" to='/mutator_list'>My mutators</router-link>
      <router-link v-if="this.$store.getters.LOGON" class="header_item header_item_right" to='/field_list'>My fields</router-link>
      <router-link v-if="this.$store.getters.LOGON" class="header_item header_item_right" to='/field/rating/'>Best fields</router-link>
      <router-link class="header_item header_item_left" to='/'>Home</router-link>
    </header>
    <router-view/>
  </div>
</template>

<script>
import Automaton from './components/automaton/Automaton.vue'
import Evolution from "./components/automaton/Evolution"
import axios from "axios"
import conf from "@/conf.js"

export default {
    name: 'app',
    components: {
        Evolution,
        Automaton
    },
    mounted() {
        axios.get(conf.API_URL + '/api/login/')
            .then((resp) => {
                if (resp.data.error) {
                    alert(resp.data.error)
                    return
                }
                this.$store.commit('SET_LOGON', true)
            })
    }
}

</script>

<style lang="sass">

#app
  height: 100%
  width: 100%
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  text-align: center
  display: inline-block

.content
  background-color: #3c4556

body, html
  height: 100%
  overflow: hidden
  margin: 0

.app_header
  width: 100%
  height: 25px
  display: inline-block
  position: absolute
  top: 0
  left: 0
  z-index: 5
  -moz-user-select: none
  -webkit-user-select: none

.header_item
  font-size: 15px
  text-decoration: none
  display: inline-block
  color: whitesmoke
  background-color: #49A078
  width: 100px
  height: 100%
  border: #58667c 3px solid
  &:hover
    background-color: #50b385
    transition: background-color 0.5s
    text-decoration: none

.header_item_left
  float: left
  margin-left: 10px

.header_item_right
  float: right
  margin-right: 10px

.link
  color: whitesmoke

a:link:not(.fake):not(.fake)
  text-decoration: none

</style>

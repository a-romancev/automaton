<template>
  <div id="app" class="content">
    <header class="app_header">
      <router-link style="text-decoration:none" class="header_item header_item_right" to='/login'>Login</router-link>
      <router-link style="text-decoration:none" class="header_item header_item_left" to='/'>Home</router-link>
    </header>
    <router-view />
  </div>
</template>

<script>
import Automaton from './components/automaton/Automaton.vue'
import Evolution from "./components/evolution/Evolution";

export default {
  name: 'app',
  components: {
      Evolution,
    Automaton
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

</style>

import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import VueRouter from 'vue-router'
import routes from './routes'
import axios from "axios"

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.config.productionTip = false
axios.defaults.withCredentials = true

const router = new VueRouter({mode: 'history', routes})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

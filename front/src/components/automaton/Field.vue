<template>

  <div class="content">
    <div class="field_name">
      {{this.name}}
      <div class="creator_name">
        (By {{this.$store.getters.LOGON_NAME}})
      </div>
    </div>
    <Automaton ref="automation"/>
    <div class="control-panel">
      <div class="switch">Control Panel</div>
      <div class="control-panel__title">Control panel</div>
      <div class="control-panel__section">
        Mutator
        <select @change="realTimeMutators" v-model="mutator_id">
          <option :value="mutator.id" v-for="mutator in mutators">
            {{mutator.name}}
          </option>
        </select>
        <div class="button" v-if="this.$store.getters.LOGON" @click="go_to(mutator_id)">Go to</div>
        <div class="button" v-if="this.$store.getters.LOGON" @click="create_new_mutator">Create new mutator</div>
        <div class="color_picker">
          Color <input @change="color_change" v-model="color" type="color">
        </div>
      </div>
      <div class="control-panel__section">
        <div>Resolution</div>
        <input v-model="resolution" type="range" min="10" max="150" step="5">
        <div>{{ resolution }}</div>
        <md-button @click="create_new" class="button">Refill Field</md-button>
        <md-button @click="init" class="button">Reset field</md-button>
      </div>
      <div class="control-panel__section">
        <md-button @click="generate" class="button">Generate random</md-button>
        <div>Density</div>
        <input v-model="density" type="range" min="0.01" max="1" step="0.01">
        <div>{{ density }}</div>
      </div>
      <div class="control-panel__section">
        <div> Field name:</div>
        <input type="text" v-model="name">
        <md-button @click="save" v-if="this.$store.getters.LOGON" class=" button">Save field</md-button>
        <div @click="clone" v-if="this.$store.getters.LOGON" class="button" >Clone this field</div>
        <div @click="rate" v-if="this.$store.getters.LOGON" class="button">Rate this field</div>
      </div>
      <md-button @click="start" class="start_button button">Start</md-button>

    </div>
  </div>
</template>

<script>
    import Automaton from "./Automaton"
    import RandomGenerator from "@/components/automaton/generators/random.js"
    import DrawMutator from "@/components/automaton/mutators/draw.js"
    import CustomMutator from "@/components/automaton/mutators/custom.js"
    import axios from "axios"
    import conf from "@/conf.js"

    export default {
        name: 'Evolution',

        data() {
            return {
                resolution: 100,
                density: 0.01,
                checked: false,
                name: "",
                mutators: [],
                mutator_id: null,
                color: "#49A078"
            }
        },

        components: {Automaton},

        mounted() {
            this.init()
        },

        methods: {

            init() {
                axios.get(conf.API_URL + '/api/mutator_list/')
                    .then((resp) => { this.mutators = resp.data } )
                    .catch((resp) =>{
                        alert(resp)
                    })

                this.field = this.$refs.automation.init(
                    parseInt(this.resolution),
                    calcHeight(parseInt(this.resolution)),
                    this.color
                )
                this.load(this.$route.params.id)
            },

            clone() {
                if (confirm('Add this field to your library?')) {
                    axios.post(conf.API_URL + '/api/field/' + this.$route.params.id + '/clone/')
                        .then((resp) => {
                            if (resp.data.error) {
                                alert(resp.data.error)
                                return
                            }
                            this.$router.push('/field/' + resp.data)
                            alert('Cloned')
                        })
                }
            },
            rate() {
                while (true) {
                    let rate= prompt('Rate the field (Integer 1-5)')
                    if (rate === null) {
                        return
                    }
                    if (rate <= 5 && rate >= 1 && Number.isInteger(parseInt(rate))) {
                        alert('Rated!')
                        let data = {
                            rating : rate
                        }
                        axios.post(conf.API_URL + '/api/field/' + this.$route.params.id + '/rate/', data)
                        break
                    }
                    else {
                        alert('Must be Integer(1-5)')
                    }
                }
            },

            create_new_mutator() {
                axios.post(conf.API_URL + '/api/mutator/')
                    .then((resp) => {
                        this.$router.push('/mutator/' + resp.data.id)
                    })
                    .catch((resp) =>{
                        alert(resp)
                    })
            },

            go_to(id) {
                if (id === null) {
                    return
                }
                this.$router.push("/mutator/"+ id + "/")

            },

            color_change() {
                this.$refs.automation.set_color(this.color)
            },

            realTimeMutators() {
                axios.get(conf.API_URL + '/api/mutator/' + this.mutator_id)
                    .then((response) => {
                        if (response.data.error) {
                            alert(response.data.error)
                            return
                        }
                        this.mutator_id = response.data.id
                        this.rules = response.data.rules
                        this.updateMutators()
                    })
            },

            create_new() {
                this.field = this.$refs.automation.init(
                    parseInt(this.resolution),
                    calcHeight(parseInt(this.resolution)),
                    this.color
                )
                this.updateMutators()
            },

            generate() {
                let generator = new RandomGenerator(this.field, this.density)
                generator.generate()
            },

            start() {
                this.mutator.start()
            },

            save() {
                let data = {
                    name: this.name,
                    data: this.field.data,
                    mutator_id : this.mutator_id,
                    color: this.color
                }
                axios.post(conf.API_URL + '/api/field/' + this.$route.params.id + '/', data)
                    .then((resp) => {
                        if (resp.data.error) {
                            alert(resp.data.error)
                            return
                        }
                        alert("Saved")
                    })
                    .catch((resp) =>{
                        alert(resp)
                    })
            },

            load(id) {
                axios.get(conf.API_URL + '/api/field/' + id)
                    .then((response) => {
                        if (response.data.error) {
                            alert(response.data.error)
                            return
                        }
                        this.mutator_id = response.data.mutator_id
                        this.name = response.data.name
                        this.field.load(response.data.data)
                        this.rules = response.data.mutator.rules
                        this.color = response.data.color
                        this.$refs.automation.set_color(response.data.color)
                        this.updateMutators()
                    })

            },

            updateMutators() {
                if (this.draw) {
                    this.draw.stop()
                }
                if (this.mutator) {
                    this.mutator.stop()
                }
                this.draw = new DrawMutator(this.field, this.$refs.automation)
                this.mutator = new CustomMutator(this.field, this.rules)
                this.draw.start()
            }
        }
    }

    function calcHeight(width) {
        const cell = window.innerWidth / width
        return parseInt(window.innerHeight / cell)
    }

</script>

<style scoped lang="sass">

.field_name
  color: #fefeff
  margin: 10px
  text-align: center
  font-size: 20px
  position: absolute
  width: 100%
  opacity: 0.7
  -moz-user-select: none
  -webkit-user-select: none
  user-select: none

.creator_name
  font-size: 15px
  color: #a9b2b6

.content
  position: relative
  width: 100%
  height: 100%

.control-panel
  $wd: 300px
  height: 830px
  width: $wd
  right: -$wd
  top: 0
  position: fixed
  color: whitesmoke
  margin-top: 50px
  padding: 0
  border: #58667c 5px solid
  display: block
  transition: right ease-out 0.6s
  background-color: #3c4556
  transition-delay: 1.5s
  &:hover
    right: 0
    transition: right ease-out 0.35s

.switch
  position: relative
  top: 50%
  left: -65px
  width: 100px
  height: 25px
  background: #49A078
  transform: rotate(-90deg)
  border: #58667c 3px solid

.control-panel__title
  font-size: 25px
  top: 0px

.button
  background-color: #49A078
  cursor: pointer
  width: 200px
  margin: 5px auto
  color: whitesmoke

.control-panel__section
  padding: 10px
  border: #58667c 3px solid
  width: 250px
  margin: 10px auto

.start_button
  width: 250px

.color_picker
  padding: 10px
</style>

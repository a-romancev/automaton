import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        log_on: false,
        log_on_name: ''
    },
    getters: {
        LOGON: state => {
            return state.log_on;
        },
        LOGON_NAME: state => {
            return state.log_on_name;
        },
    },
    mutations: {
        SET_LOGON: (state, payload) => {
            state.log_on = payload
        },
        SET_LOGON_NAME: (state, payload) => {
            state.log_on_name = payload
        }
    },
    actions: {},
});
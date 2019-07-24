import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        log_on: false
    },
    getters: {
        LOGON: state => {
            return state.log_on;
        },
    },
    mutations: {
        SET_LOGON: (state, payload) => {
            state.log_on = payload
        }
    },
    actions: {},
});
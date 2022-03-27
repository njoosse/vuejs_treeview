import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);

import { layers } from './layers.module'

export default new Vuex.Store({
    modules: {
        layers,
    }
})
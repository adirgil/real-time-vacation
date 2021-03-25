import Vue from "vue";
import Vuex from 'vuex'
import deals from './deals/deals.index'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules:{
        deals
    }
})
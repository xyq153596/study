import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

/**
 * 导入 mutation types
 */
import {
  types_g
} from './mutation-types.js'

/**
 * 导入各个模块的store
 */
import store_lines from './store-lines'
import store_orders from './store-orders'
import store_users from './store-users'

/**
 * 注册全局store
 */
const G_Store = {
  state: {
    loading: true,
    error: false
  },
  mutations: {
    [types_g.UPDATE_LOADING](state, val) {
      state.loading = val;
    },
    [types_g.UPDATE_ERROR](state, val) {
      state.error = val;
    }
  }
}

/**
 * 注册模块store
 */
const modules = {
  lines: store_lines,
  orders: store_orders,
  users: store_users
}


export default new Vuex.Store({
  state: G_Store.state,
  mutations: G_Store.mutations,
  actions: G_Store.actions,
  modules
})

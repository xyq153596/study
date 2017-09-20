import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

/**
 * 导入各个模块的store
 */
import store_G from './store-g'
import store_lines from './store-lines'
import store_orders from './store-orders'
import store_users from './store-users'

/**
 * 注册子模块store
 */
const modules = {
  lines: store_lines,
  orders: store_orders,
  users: store_users
}

export default new Vuex.Store(Object.assign({
  modules
}, store_G))

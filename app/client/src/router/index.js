import Vue from 'vue'
import Router from 'vue-router'
import Config from '../config'
Vue.use(Router)

/**
 * 导入子模块路由
 */
import routes_lines from './router-lines'
import routes_orders from './router-orders'
import routes_users from './router-users'


/**
 * 合并成路由数组
 */
const routes = [routes_lines, routes_orders, routes_users].reduce((a, b) => {
  return a.concat(b);
})

export default new Router(Object.assign(Config.router, {
  routes
}))
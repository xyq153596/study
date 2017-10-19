import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Config from './config'
import filters from './plugins/vue-filter'

// import FastClick from 'fastclick'

// FastClick.attache(document.body);

Vue.use(filters);
/**
 * 注册vux插件
 */
Config.vux.plugins.forEach((item, index) => {
  Vue.use(item)
})

/**
 * 设置vue配置
 */
Object.assign(Vue.config, Config.vue);

const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import FastClick from 'fastclick'

FastClick.attache(document.body);

const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

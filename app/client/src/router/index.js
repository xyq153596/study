import Vue from 'vue'
import Router from 'vue-router'

import index from '@/modules/lines/index.vue'
import detail from '@/modules/lines/detail.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/detail/:id',
    name: 'detail',
    component: detail
  }]
})

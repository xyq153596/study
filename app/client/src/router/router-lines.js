const index = () =>
  import ( /* webpackChunkName: "group-detail" */ '@/modules/lines/index.vue')
const detail = () =>
  import ( /* webpackChunkName: "group-detail" */ '@/modules/lines/detail.vue')
const serach = () =>
  import ( /* webpackChunkName: "group-detail" */ '@/modules/lines/serach.vue')
const test = () =>
  import ( /* webpackChunkName: "group-detail" */ '@/modules/lines/test.vue')

export default [{
  path: '/',
  name: 'index',
  component: index
}, {
  path: '/detail',
  name: 'detail',
  component: detail
}, {
  path: '/serach',
  name: 'serach',
  component: serach
}, {
  path: '/test',
  name: 'test',
  component: test
}]

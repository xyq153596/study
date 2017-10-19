import {
  AlertPlugin
} from 'vux'

export default {
  axios: {
    baseURL: "http://www.easy-mock.com/mock/59e44e9ec15ade4b6d13cadd/api",
    timeout: 5000
  },
  vue: {
    productionTip: false,
    silent: false,
    devtools: true,
    performance: true,
    errorHandler() {
    }
  },
  vux: {
    plugins: [AlertPlugin]
  },
  router: {
    mode: 'hash',
    base: '/'
  }
}

import {
  chunk
} from 'lodash'
export default {
  install(Vue) {
    
    Vue.filter('filter_chunk', function (val) {
      return chunk(val, 2);
    })
    Vue.filter('filter_toNumber2', function (val) {
      return Number(val) + 2;
    })
  }

}

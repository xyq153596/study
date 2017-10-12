import {
  types_g
} from './store-g'

/**
 * 模拟数据
 */
let data = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/5.jpg',
  title: '送你一次旅行',
  fallbackImg: 'https://static.vux.li/demo/3.jpg'
}];


export const types_lines = {
  GET_ART: 'GET_LINES_ART',
  GET_INDEX: 'GET_LINES_INDEX'
}
export default {
  state: {
    indexList: []
  },
  mutations: {
    [types_lines.GET_INDEX](state, val) {
      state.indexList = val;
    }
  },
  actions: {
    [types_lines.GET_INDEX]({
      commit
    }) {
      setTimeout(() => { //异步请求获取数据
        commit(types_lines.GET_INDEX, data); //数据赋值
      }, 2000)
    }
  }
}

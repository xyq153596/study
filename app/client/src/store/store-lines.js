import axios from '@plugins/vue-axios'
import {
  objectValues
} from '@utils'
import {
  types_g
} from './store-g'
/**
 * 事件类型
 */
export const types_lines = {
  GET_INDEX: 'GET_LINES_INDEX'
}
/**
 * 返回事件类型的数组
 */
export const typesValue = objectValues(types_lines);

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
      axios.get('/index').then((req) => {
        if (req.status === 200) {
          commit(types_lines.GET_INDEX, req.data.data); //数据赋值
        }
      }).catch((req) => {
        console.error(req.message);
      })
    }
  }
}

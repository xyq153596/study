import {
  types_lines,
  types_g
} from './mutation-types.js'

export default {
  state: {
    art: '还没拿到数据'
  },
  mutations: {
    [types_lines.GET_ART](state, val) {
      state.art = val;
    }
  },
  actions: {
    [types_lines.GET_ART]({
      commit
    }) {
      commit(types_lines.GET_ART, null); //把数据清空
      commit(types_g.UPDATE_LOADING, true); //显示loading
      setTimeout(() => { //异步请求获取数据
        commit(types_lines.GET_ART, '拿到了数据' + Math.random()); //数据赋值
        commit(types_g.UPDATE_LOADING, false); //隐藏loading
      }, 2000)

    }
  }
}

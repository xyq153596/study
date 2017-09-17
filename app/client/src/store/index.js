import Vue from 'vue'
import Vuex from 'vuex'

import * as type from './mutation-types'
Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    loading: true,
    error: false,
    art: '没有被art'
  },
  getters: {
    loading2(state) {
      return state.loading2 = 2;
    }
  },
  mutations: {
    [type.UPDATE_LOADING](state, val) {
      state.loading = val
    },
    [type.UPDATE_ERROR](state, val) {
      state.error = val
    },
    [type.GET_ART](state, val) {
      state.art = val;
    }
  },
  actions: {
    artAsync({
      commit
    }) {
      return new Promise((resolve, reject) => {
        commit(type.UPDATE_LOADING, true)
        setTimeout(function () {
          commit(type.GET_ART, '被art了' + Math.random());
          commit(type.UPDATE_LOADING, false);
          resolve();
        }, 2000)
      })

    }
  }
})

export default store

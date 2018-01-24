import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      data: ""
    },
    mutations: {
      setData(state, val) {
        state.data = val;
      }
    },
    actions: {
      getData({
        commit
      }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('setData', '得到了大傻逼' + Math.random());
            resolve();
          }, 1000);

        })
      }
    }
  })
}
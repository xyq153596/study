export const types_g = {
  /**
   * 更新loading
   */
  UPDATE_LOADING: 'UPDATE_G_LOADING',
  /**
   * 更新error
   */
  UPDATE_ERROR: 'UPDATE_ERROR'
}

export default {
  state: {
    loading: true,
    error: false
  },
  mutations: {
    [types_g.UPDATE_LOADING](state, val) {
      state.loading = val;
    },
    [types_g.UPDATE_ERROR](state, val) {
      state.error = val;
    }
  }
}

const MUTATIONS_TYPES = {
  GET_TEST1: 'GET_TEST1',
  GET_TEST2: 'GET_TEST2'
}

export default {
  state: {
    test1: [],
    test2: []
  },
  mutations: {
    [MUTATIONS_TYPES.GET_TEST1](state, val) {
      state.test1 = val;
    }
  },
  actions: {
    [MUTATIONS_TYPES.GET_TEST1](context) {
      context.commit(MUTATIONS_TYPES.GET_TEST1);
    }
  }
}

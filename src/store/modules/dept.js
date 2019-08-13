
const state = {
  depts: []
}

const mutations = {
  SET_DEPTS: (state, depts) => {
    state.depts = depts
  }
}

const actions = {

  setDepts({ commit }, deptDate) {
    commit('SET_DEPTS', deptDate)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

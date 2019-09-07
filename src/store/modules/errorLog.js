/*
 * @Description: 这是什么
 * @Author: anan
 * @Date: 2019-07-13 13:52:51
 * @LastEditors: anan
 * @LastEditTime: 2019-09-07 15:29:25
 */

const state = {
  logs: []
}

const mutations = {
  ADD_ERROR_LOG: (state, log) => {
    state.logs.push(log)
  }
}

const actions = {
  addErrorLog({ commit }, log) {
    commit('ADD_ERROR_LOG', log)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

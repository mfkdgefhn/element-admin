// import { login, logout, getInfo } from '@/api/user'
// import { getUserList } from '@/api/article'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'

import { getToken, removeToken } from '@/utils/auth'
import { getRoleList } from '@/api/article'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  roleList: [],
  total: 0
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERLIST: (state, userList) => {
    state.userList = userList
  },
  SET_USERCOUNT: (state, total) => {
    state.total = total
  }
}

const actions = {

  SET_ROLELIST({ commit }, data) {
    commit('SET_ROLELIST', data)
  },

  getRoleList({ commit }, data) {
    if (!data) {
      data = {
        page: 1,
        limit: 8
      }
    }
    // console.log(data)
    return new Promise((resolve, reject) => {
      getRoleList(data).then(response => {
        if (!response.data.records) {
          commit('SET_USERLIST', response.data)
        } else {
          commit('SET_USERLIST', response.data.records)
          commit('SET_USERCOUNT', response.data.total)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  // 删除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

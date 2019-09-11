/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-07-13 13:52:51
 * @LastEditors: anan
 * @LastEditTime: 2019-09-10 17:14:34
 */
import { login, logout, getInfo } from '@/api/user'
import { getUserList, getDeptList } from '@/api/article'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userList: [],
  total: 0
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
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
  SET_USERLIST_DEPTNAME: (state, index, deptName) => {
    state.userList[index].deptName = deptName
  },
  SET_USERCOUNT: (state, total) => {
    state.total = total
  }
}

const actions = {

  SET_USERLIST({ commit }, data) {
    commit('SET_USERLIST', data)
  },

  getUserList({ commit }, data) {
    if (!data) {
      data = {
        page: 1,
        limit: 8
      }
    }

    return new Promise((resolve, reject) => {
      getUserList(data).then(response => {
        if (!response.data.records) {
          commit('SET_USERLIST', response.data)
          getDeptList().then(resule => {
            var _userList = state.userList
            for (let i = 0; i < _userList.length; i++) {
              for (let j = 0; j < resule.data.length; j++) {
                if (_userList[i].deptId === resule.data[j].deptId) {
                  _userList[i].deptName = resule.data[j].deptName
                  break
                }
              }
            }
          })
        } else {
          commit('SET_USERLIST', response.data.records)
          commit('SET_USERCOUNT', response.data.total)
          getDeptList().then(resule => {
            var _userList = state.userList
            for (let i = 0; i < _userList.length; i++) {
              for (let j = 0; j < resule.data.length; j++) {
                if (_userList[i].deptId === resule.data[j].deptId) {
                  _userList[i].deptName = resule.data[j].deptName
                  break
                }
              }
            }
          })
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  setDepts({ commit }, deptDate) {
    console.log('到这了')
    // commit('SET_DEPTS', deptDate)
  },

  // user login
  login({ commit }, userInfo) {
    const { userName, password, loginIp, browser, os, loginLocation } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: userName.trim(), password: password, loginIp: loginIp, browser: browser, os: os, loginLocation: loginLocation }).then(response => {
        const { data } = response
        // 设置store的token
        commit('SET_TOKEN', data.token)
        // 设置Cookies的token
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        // 角色必须是非空数组
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        // debugger
        resetRouter()
        // dispatch('permission/reset_routes', {}, { root: true })
        // router.addRoutes(this.$store.getters.permission_routes)
        // location.reload()
        removeToken()
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
  },

  // dynamically modify permissions
  // 动态修改权限
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      // 根据角色生成可访问的路由映射
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      // 动态添加可访问路由
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      // 重置访问的视图和缓存的视图
      dispatch('tagsView/delAllViews', null, { root: true })

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

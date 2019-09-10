/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-07-13 13:52:51
 * @LastEditors: anan
 * @LastEditTime: 2019-09-10 14:46:44
 */
import { asyncRoutes, constantRoutes } from '@/router'
import { getMenuList } from '@/api/article'
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * 使用meta.role确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export function generaMenu(routes, data) {
  data.forEach(item => {
    const menu = {
      path: item.url === '#' ? item.menuId + '_key' : item.url,
      component: item.url === '#' ? Layout : () => import(`@/views${item.url}/index`),
      children: [],
      name: 'menu_' + item.menuId,
      meta: { title: item.i18, id: item.menuId, roles: item.roles.split(','), icon: item.icon }
    }
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
}

/**
 * Filter asynchronous routing tables by recursion
 * 按递归筛选异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const loadMenuData = []
      const listQuery = {
        page: 1,
        limit: 8,
        sort: '+id',
        parentId: 0
      }
      getMenuList(listQuery).then(response => { // state.token
        let data = response
        if (response.code !== '20000') {
          this.$message({
            message: '菜单数据加载异常',
            type: 0
          })
        } else {
          data = response.data.records
          Object.assign(loadMenuData, data)
          generaMenu(asyncRoutes, loadMenuData)
          let accessedRoutes
          if (roles.includes('admin')) {
            accessedRoutes = asyncRoutes || []
          } else {
            accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
          }
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }
      }).catch(error => {
        console.log(error)
      })
    })
  }
}

// const actions = {
//   generateRoutes({ commit }, roles) {
//     return new Promise(resolve => {
//       let accessedRoutes
//       if (roles.includes('admin')) {
//         debugger
//         accessedRoutes = asyncRoutes || []
//       } else {
//         accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
//       }
//       commit('SET_ROUTES', accessedRoutes)
//       resolve(accessedRoutes)
//     })
//   }
// }

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

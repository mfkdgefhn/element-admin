// 路由拦截，请求权限

// 路由
import router from './router'
// vuex
import store from './store'
// 框架
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar 进度条组件
import 'nprogress/nprogress.css' // progress bar style 进度条样式
import { getToken } from '@/utils/auth' // get token from cookie 从cookie获取令牌
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration 进程配置

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist 没有重定向白名单

// to:router即将进入的路由对象
// from:当前导航即将离开的路由
// next:Function,进行管道中的一个钩子，如果执行完了，则导航的状态就是 confirmed （确认的）；否则为false，终止导航
router.beforeEach(async(to, from, next) => {
  // start progress bar
  // 启动进度条
  NProgress.start()

  // set page title
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // 确定用户是否已登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      // 判断用户是否通过getinfo获取了权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // 获取用户信息
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // 注意：角色必须是对象数组！例如：【管理员】或，【开发人员】、【编辑人员】
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          // 根据角色生成可访问的路由映射
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          // 动态添加可访问路由
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // hack方法确保addroutes完成
          // set the replace: true, so the navigation will not leave a history record
          // 设置replace:true，导航不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          // 删除token，转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    /* 没有令牌*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      // 在免费登录白名单中，直接进入
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // 其他没有访问权限的页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  // 完成进度条
  NProgress.done()
})

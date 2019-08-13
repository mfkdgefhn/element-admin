import Vue from 'vue'

import 'default-passive-events'

import Cookies from 'js-cookie'

// CSS重置的现代替代方案
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css 全局CSS

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization 国际化
import './icons' // icon
import './permission' // permission control 权限控制
import './utils/error-log' // error log 错误日志

import * as filters from './filters' // global filters 全局筛选器

/**
 * If you don't want to use mock-server
 * 如果不想使用模拟服务器
 * you want to use MockJs for mock api
 * 您想使用mockjs来模拟API
 * you can execute: mockXHR()
 * 您可以执行：mockxhr（）。
 * Currently MockJs will be used in the production environment,
 * 目前，mockjs将用于生产环境，
 * please remove it before going online! ! !
 * 请在联机前将其删除！！！
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size //设置元素UI默认大小
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
// 注册全局实用程序筛选器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

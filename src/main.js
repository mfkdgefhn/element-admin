/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-07-13 13:52:51
 * @LastEditors: anan
 * @LastEditTime: 2019-10-06 09:04:48
 */
import Vue from 'vue'

import './plugins/utils'
import './plugins/xtable'

import 'default-passive-events'

import Cookies from 'js-cookie'

// CSS重置的现代替代方案
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'

import EleForm from 'vue-ele-form'
import EleFormJsonEditor from 'vue-ele-form-json-editor'
import EleFormCodemirror from 'vue-ele-form-codemirror'
import EleFormVideoUploader from 'vue-ele-form-video-uploader'
import EleFormUploadFile from 'vue-ele-form-upload-file'
import EleFormImageUploader from 'vue-ele-form-image-uploader'
import EleFormQuillEditor from 'vue-ele-form-quill-editor'
import EleFormMarkdownEditor from 'vue-ele-form-markdown-editor'
import EleFormBmap from 'vue-ele-form-bmap'

// language js
import 'codemirror/mode/javascript/javascript.js'
// theme css
import 'codemirror/theme/base16-dark.css'

import '@/styles/index.scss' // global css 全局CSS

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization 国际化
import './icons' // icon
import './permission' // permission control 权限控制
import './utils/error-log' // error log 错误日志

import * as filters from './filters' // global filters 全局筛选器

import echarts from 'echarts' // 全局定义echarts

Vue.prototype.$echarts = echarts

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

Vue.use(
  Element, {
    size: Cookies.get('size') || 'medium', // set element-ui default size //设置元素UI默认大小
    i18n: (key, value) => i18n.t(key, value)
  }
)

Vue.use(FormMaking)

// 注册 vue-ele-form
Vue.use(EleForm, {
  upload: {
    action: 'https://jsonplaceholder.typicode.com/posts/', // 请求地址,
    data: { token: 'xxx' }, // 附带的参数,
    responseFn(response, file) {
      return file.url
    }
  },
  'quill-editor': {
    // 比如设置上传 action 后, 所有的 quill-editor 编辑器上传图片都会采用这个属性
    action: 'https://xxx.com/upload/images'
  },
  'upload-file': {
    responseFn(response, file) {
      return {
        name: file.name,
        url: URL.createObjectURL(file.raw),
        size: file.size
      }
    }
  },
  'video-uploader': {
    // action: 'https://jsonplaceholder.typicode.com/posts' // 上传地址
  },
  'image-uploader': {
    action: 'https://jsonplaceholder.typicode.com/posts' // 上传地址
  },
  'markdown-editor': {
    // 比如设置上传 action 后, 所有的 markdown-editor 编辑器上传图片都会采用这个属性
    action: 'https://xxx.com/upload/images'
  },
  bmap: {
    // 比如设置 ak 后, 所有的 bmap 编辑器上传图片都会采用这个属性值
    ak: 'YOUR_APP_KEY'
  },
  codemirror: {
    options: {
      theme: 'base16-dark',
      tabSize: 4,
      mode: 'text/javascript',
      lineNumbers: true,
      line: true
    }
    // events: ['scroll', ...]
  },
  // 可以在这里设置全局的 json-editor 属性
  'json-editor': {
    height: '500'
  }
})

// 注册 json 组件
Vue.component('json-editor', EleFormJsonEditor)
// 注册 video-uploader 组件
Vue.component('video-uploader', EleFormVideoUploader)
Vue.component('upload-file', EleFormUploadFile)
// 注册 codemirror 组件
Vue.component('codemirror', EleFormCodemirror)
Vue.component('image-uploader', EleFormImageUploader)
Vue.component('quill-editor', EleFormQuillEditor)
Vue.component('markdown-editor', EleFormMarkdownEditor)
Vue.component('bmap', EleFormBmap)

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

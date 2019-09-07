/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-07-13 13:52:51
 * @LastEditors: anan
 * @LastEditTime: 2019-09-07 15:29:33
 */
import Vue from 'vue'
import store from '@/store'
import { isString, isArray } from '@/utils/validate'
import settings from '@/settings'

// you can set in settings.js
// 可以在settings.js中设置
// errorLog:'production' | ['production', 'development']
// 错误日志：'production'['production'、'development']
const { errorLog: needErrorLog } = settings

function checkNeed() {
  const env = process.env.NODE_ENV
  if (isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}

if (checkNeed()) {
  Vue.config.errorHandler = function(err, vm, info, a) {
    // Don't ask me why I use Vue.nextTick, it just a hack.
    // 不要问我为什么要用vue.nextick，它只是一个黑客。
    // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    // 详情请参见 https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    Vue.nextTick(() => {
      store.dispatch('errorLog/addErrorLog', {
        err,
        vm,
        info,
        url: window.location.href
      })
      console.error(err, info)
    })
  }
}

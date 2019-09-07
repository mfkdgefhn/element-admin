/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-07-13 13:52:51
 * @LastEditors: anan
 * @LastEditTime: 2019-09-07 16:57:20
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
// 创建AXIOS实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests   //跨域请求时发送cookie
  timeout: 5000 // request timeout
})

// request interceptor
// 请求截获
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 在发送请求之前做一些事情
    // 第一次请求登陆的时候请求头获取不到，所以请求头为content-type
    if (store.getters.token) {
      // let each request carry token
      // 让每个请求携带令牌
      // ['X-Token'] is a custom headers key
      // ['X-TOKEN']是自定义头密钥
      // please modify it according to the actual situation
      // 请根据实际情况进行修改
      config.headers['anan-token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    // 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * 如果要获取HTTP信息，如头或状态
   * Please return  response => response
   * 请返回响应=>响应
  */

  /**
   * Determine the request status by custom code
   * 通过自定义代码确定请求状态
   * Here is just an example
   * 这只是一个例子
   * You can also judge the status by HTTP Status Code
   * 您还可以通过HTTP状态代码判断状态
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    // 如果自定义代码不是20000，则判断为错误。
    if (res.code !== '20000') {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 1 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // 50008:非法令牌；50012:其他客户端登录；50014:令牌过期；
      if (res.code === '50008' || res.code === '50012' || res.code === '50014') {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // debugger
    // var str = '登陆失败  '
    // if (error.message === 'Network Error') {
    //   str += '网络不通!'
    // }
    Message({
      message: error.message ? error.message : error.msg,
      type: 'error',
      duration: 1 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

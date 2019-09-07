/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-07-13 13:52:51
 * @LastEditors: anan
 * @LastEditTime: 2019-09-07 16:29:12
 */
// 设置cookie信息
import Cookies from 'js-cookie'

const TokenKey = 'auth-token'

// 设置token过期天数
const days = 1

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: days })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

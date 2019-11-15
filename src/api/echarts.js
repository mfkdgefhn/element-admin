/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-05 09:19:29
 * @LastEditors: anan
 * @LastEditTime: 2019-11-05 11:04:15
 */

// import axios from 'axios'
import request from '@/utils/request41'

var url = 'http://10.10.1.41/Q/p.do?o=qhxqk&showSql=gmqdbcenter'
// var url1 = 'http://jsonplaceholder.typicode.com/posts/1'

// 获取优惠券
export function getCoupon() {
  return request({
    url: '/Q/p.do',
    method: 'get',
    params: {
      o: 'qhxqk',
      showSql: 'gmqdbcenter'
    }
  })
}

// 获取短信通知
export function getSms() {
  return request({
    url: '/Q/p.do',
    method: 'get',
    params: {
      o: 'dxtz-x',
      showSql: 'gmqdbcenter'
    }
  })
}

export function getCouponText() {
  return request({
    url: url,
    method: 'get'
  })
}

// export function getCouponText() {
//   return request({
//     url: '/posts/1',
//     method: 'get'
//   })
// }

// export function getCouponText() {
//   return axios.get('http://10.10.1.41/Q/p.do', {
//     params: {
//       o: 'qhxqk',
//       showSql: 'gmqdbcenter'
//     }
//   })
// }

/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-05 09:19:29
 * @LastEditors: anan
 * @LastEditTime: 2020-10-07 10:21:28
 */

// import axios from 'axios'
import request from '@/utils/request41'

var url = 'http://10.10.1.41:443'
// var url = 'http://10.10.1.41:443/Q/p.do?o=qhxqk&showSql=gmqdbcenter'
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

// 获取优惠券
export function getCouponText() {
  return request({
    url: url + '/Q/p.do?o=qhxqk',
    method: 'get'
  })
}

// 新增会员情况
export function getNewVip() {
  return request({
    url: url + '/Q/r.do?o=xzhy',
    method: 'get'
  })
}

// 会员开卡率情况
export function getOpenCardRate() {
  return request({
    url: url + '/Q/r.do?o=hykkl',
    method: 'get'
  })
}

// 会员开卡率情况
export function getProportionOfSales() {
  return request({
    url: url + '/Q/r.do?o=tjhyxszb1',
    method: 'get'
  })
}

// 购物券核销情况
export function getVouWriteOffs() {
  return request({
    url: url + '/Q/r.do?o=gwqhxqk',
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

import request from '@/utils/request'

var url = 'http://192.168.10.222:8888'

export function login(data) {
  return request({
    url: url + '/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: url + '/userInfo/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: url + '/sys/user/info',
    method: 'get',
    params: { token }
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

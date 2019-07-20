import request from '@/utils/request'

var url = 'http://127.0.0.1:8888'

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

// export function login(data) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/sys/user/getUserList',
//     method: 'get',
//     params: { token }
//   })
// }

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

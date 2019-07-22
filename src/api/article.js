import request from '@/utils/request'

var url = 'http://localhost:8888'

export function getDeptList(query) {
  return request({
    url: url + '/sys/dept/getDeptList',
    method: 'get',
    params: query
  })
}

export function getUserByDeptId(deptId) {
  return request({
    url: url + '/sys/user/getUserByDeptId',
    method: 'get',
    params: { deptId }
  })
}

export function getUserByDeptIds(deptIds) {
  return request({
    url: url + '/sys/user/getUserByDeptIds',
    method: 'get',
    params: { deptIds }
  })
}

export function getUserList(data) {
  return request({
    url: url + '/sys/user/getUserList',
    method: 'get',
    params: data
  })
  // let params = ''
  // if (data) {
  //   params = '/sys/user/getUserList?page=' + data.page + '&limit=' + data.limit
  // } else {
  //   params = '/sys/user/getUserList'
  // }
  // console.log('page' + data)
  // console.log(params)

  // return request({
  //   url: url + params,
  //   method: 'get'
  // })
}

// export function getUserList(data) {
//   let params = ''
//   if (data) {
//     params = '/sys/user/getUserList?page=' + data.page + '&limit=' + data.limit
//   } else {
//     params = '/sys/user/getUserList'
//   }
//   console.log('page' + data)
//   console.log(params)

//   return request({
//     url: url + params,
//     method: 'get'
//   })
// }

export function updateUserParmeterByUserId(data) {
  return request({
    url: url + '/sys/user/updateUserParmeterByUserId',
    method: 'post',
    data
  })
}

export function deleteById(data) {
  return request({
    url: url + '/sys/user/deleteById',
    method: 'post',
    data
  })
}

export function fetchRoleList(query) {
  return request({
    url: '/article/roleList',
    method: 'get',
    params: query
  })
}

export function fetchUserList(query) {
  return request({
    url: '/article/userList',
    method: 'get',
    params: query
  })
}

export function fetchTreeList(query) {
  return request({
    url: '/article/treeList',
    method: 'get',
    params: query
  })
}

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

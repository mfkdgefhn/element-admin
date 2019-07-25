import request from '@/utils/request'

var url = 'http://localhost:8888'

// 获取部门列表
export function getDeptList(query) {
  return request({
    url: url + '/sys/dept/getDeptList',
    method: 'get',
    params: query
  })
}

// 根据部门获取用户列表
export function getUserByDeptId(deptId) {
  return request({
    url: url + '/sys/user/getUserByDeptId',
    method: 'get',
    params: { deptId }
  })
}

// 根据多部门获取用户列表
export function getUserByDeptIds(deptIds) {
  return request({
    url: url + '/sys/user/getUserByDeptIds',
    method: 'get',
    params: { deptIds }
  })
}

// 获取用户列表
export function getUserList(data) {
  return request({
    url: url + '/sys/user/getUserList',
    method: 'get',
    params: data
  })
}

// 修改用户参数
export function updateUserByUserId(data) {
  return request({
    url: url + '/sys/user/updateUserByUserId',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteUserById(data) {
  return request({
    url: url + '/sys/user/deleteUserById',
    method: 'post',
    data
  })
}

// 获取角色列表
export function fetchRoleList(query) {
  return request({
    url: url + '/sys/role/getRoleList',
    method: 'get',
    params: query
  })
}

// 修改角色参数
export function updateRoleByRoleId(data) {
  return request({
    url: url + '/sys/role/updateRoleByRoleId',
    method: 'post',
    data
  })
}

// 删除角色
export function deleteByRoleId(data) {
  return request({
    url: url + '/sys/role/deleteByRoleId',
    method: 'post',
    data
  })
}

// 获取菜单列表
export function fetchMenuList(query) {
  return request({
    url: url + '/sys/menu/getMenuList',
    method: 'get',
    params: query
  })
}

export function createArticle(data) {
  return request({
    url: url + '/sys/role/addRole',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: url + '/sys/role/updateRoleByRoleId',
    method: 'post',
    data
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


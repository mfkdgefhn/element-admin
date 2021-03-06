/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-07-13 13:52:51
 * @LastEditors: anan
 * @LastEditTime: 2019-09-26 13:33:13
 */
import request from '@/utils/request'

var url = 'http://192.168.10.222:8888'

// 获取部门列表
export function getDeptList(query) {
  return request({
    url: url + '/sys/dept/getDeptList',
    method: 'get',
    params: query
  })
}

// 修改部门信息
export function updateDeptById(data) {
  return request({
    url: url + '/sys/dept/updateDeptById',
    method: 'post',
    data
  })
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: url + '/sys/menu/addMenu',
    method: 'post',
    data
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
    method: 'delete',
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
    method: 'delete',
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

// 创建菜单
export function createMenu(data) {
  return request({
    url: url + '/sys/menu/createMenu',
    method: 'post',
    data
  })
}
// 删除菜单ID
export function delMenuById(query) {
  return request({
    url: url + '/sys/menu/delMenuById',
    method: 'delete',
    params: {
      menuId: query
    }
  })
}

// 创建菜单
export function updateMenuById(data) {
  return request({
    url: url + '/sys/menu/updateMenuById',
    method: 'post',
    data
  })
}

// 获取菜单列表
export function getMenuList(query) {
  return request({
    url: url + '/sys/menu/getMenuListMC',
    method: 'get',
    params: query
  })
}

// 获取菜单列表
export function getMenuLists(query) {
  return request({
    url: url + '/sys/menu/getMenuLists',
    method: 'get',
    params: query
  })
}

// 新增角色
export function createRoleArticle(data) {
  return request({
    url: url + '/sys/role/addRole',
    method: 'post',
    data
  })
}

// 修改角色
export function updateArticle(data) {
  return request({
    url: url + '/sys/role/updateRoleByRoleId',
    method: 'post',
    data
  })
}

// 修改角色默认权限
export function updateRoleDefaultJurisdiction(data) {
  return request({
    url: url + '/sys/role/updateRoleDefaultJurisdiction',
    method: 'post',
    data
  })
}

// 获取部门列表
export function fetchDeptList(query) {
  return request({
    url: url + '/sys/dept/getDeptList',
    method: 'get',
    params: query
  })
}

// 删除部门
export function deleteByDeptId(data) {
  return request({
    url: url + '/sys/dept/deleteByDeptId',
    method: 'delete',
    data
  })
}

// 新增部门
export function createDeptArticle(data) {
  return request({
    url: url + '/sys/dept/addDept',
    method: 'post',
    data
  })
}

// 获取岗倍列表
export function fetchPostList(query) {
  return request({
    url: url + '/sys/post/getPostList',
    method: 'get',
    params: query
  })
}

// 删除岗倍
export function deleteByPostId(data) {
  return request({
    url: url + '/sys/post/deleteByPostId',
    method: 'delete',
    data
  })
}

// 新增岗位
export function createPostArticle(data) {
  return request({
    url: url + '/sys/post/addPost',
    method: 'post',
    data
  })
}

// 修改岗位
export function updatePostArticle(data) {
  return request({
    url: url + '/sys/post/updatePostByPostId',
    method: 'post',
    data
  })
}

// 获取字典管理列表
export function fetchDictTypeList(query) {
  return request({
    url: url + '/sys/dict-type/getDictTypeList',
    method: 'get',
    params: query
  })
}

// 新增字典管理
export function createDictTypeArticle(data) {
  return request({
    url: url + '/sys/dict-type/addDictType',
    method: 'post',
    data
  })
}

// 修改字典管理
export function updateDictTypeArticle(data) {
  return request({
    url: url + '/sys/dict-type/updateDictTypeByDictId',
    method: 'post',
    data
  })
}

// 删除字典管理
export function deleteByDictId(data) {
  return request({
    url: url + '/sys/dict-type/deleteByDictId',
    method: 'delete',
    data
  })
}

// 获取字典数据列表
export function fetchDictDataList(query) {
  return request({
    url: url + '/sys/dict-data/getDictDataList',
    method: 'get',
    params: query
  })
}

// 新增字典数据
export function createDictDataArticle(data) {
  return request({
    url: url + '/sys/dict-data/addDictData',
    method: 'post',
    data
  })
}

// 删除字典数据
export function deleteByDictCode(data) {
  return request({
    url: url + '/sys/dict-data/deleteByDictCode',
    method: 'delete',
    data
  })
}

// 修改字典数据
export function updateDictDataArticle(data) {
  return request({
    url: url + '/sys/dict-data/updateDictDataByDictCode',
    method: 'post',
    data
  })
}

// 获取系统参数列表
export function fetchConfigList(query) {
  return request({
    url: url + '/sys/config/getConfigList',
    method: 'get',
    params: query
  })
}

// 修改字典数据
export function updateConfigArticle(data) {
  return request({
    url: url + '/sys/config/updateConfigById',
    method: 'post',
    data
  })
}

// 新增字典数据
export function createConfigArticle(data) {
  return request({
    url: url + '/sys/config/addConfig',
    method: 'post',
    data
  })
}

// 删除系统参数
export function deleteByConfigId(data) {
  return request({
    url: url + '/sys/config/deleteByConfigId',
    method: 'delete',
    data
  })
}

// 获取公告列表
export function fetchNoticeList(query) {
  return request({
    url: url + '/sys/notice/getNoticeList',
    method: 'get',
    params: query
  })
}

// 修改公告数据
export function updateNoticeArticle(data) {
  return request({
    url: url + '/sys/notice/updateNoticeById',
    method: 'post',
    data
  })
}

// 新增公告数据
export function createNoticeArticle(data) {
  return request({
    url: url + '/sys/notice/addNotice',
    method: 'post',
    data
  })
}

// 删除系统参数
export function deleteByNoticeId(data) {
  return request({
    url: url + '/sys/notice/deleteByNoticeId',
    method: 'delete',
    data
  })
}

// 获取登录日志记录列表
export function fetchLogininforList(query) {
  return request({
    url: url + '/sys/logininfor/getLogininforList',
    method: 'get',
    params: query
  })
}

// 删除系统参数
export function deleteByLogininfors(data) {
  return request({
    url: url + '/sys/logininfor/deleteLogininfors',
    method: 'delete',
    data
  })
}

// 获取操作日志记录列表
export function fetchOperLogList(query) {
  return request({
    url: url + '/sys/oper-log/getOperLogList',
    method: 'get',
    params: query
  })
}

// 删除操作日志
export function deleteByOperLogs(data) {
  return request({
    url: url + '/sys/oper-log/deleteOperLogs',
    method: 'delete',
    data
  })
}

// 修改角色所对应的菜单
export function updateRoleToMenu(data, roleId) {
  return request({
    url: url + '/sys/role-menu/updateRoleToMenu',
    method: 'post',
    data: {
      data: data,
      roleId: roleId
    }
  })
}
// 修改角色所对应的用户
export function updateRoleToUser(data, roleId) {
  return request({
    url: url + '/sys/user-role/updateRoleToUser',
    method: 'post',
    data: {
      data: data,
      roleId: roleId
    }
  })
}
// 修改角色所对应的部门
export function updateRoleToDept(data, roleId) {
  return request({
    url: url + '/sys/role-dept/updateRoleToDept',
    method: 'post',
    data: {
      data: data,
      roleId: roleId
    }
  })
}
// 根据角色ID获取所属菜单、所属用户、所属部门信息
export function fetchRoleInfo(roleId) {
  return request({
    url: url + '/sys/role/fetchRoleInfo',
    method: 'get',
    params: {
      roleId: roleId
    }
  })
}

// 根据角色ID修改数据范围
export function editDataScope(dataScope, roleId) {
  return request({
    url: url + '/sys/role/editDataScope',
    method: 'post',
    data: {
      dataScope: dataScope,
      roleId: roleId
    }
  })
}

// 根据角色ID修改数据范围
export function getAsyncRoutes(token) {
  return request({
    url: url + '/sys/async-routes/getAsyncRoutes',
    method: 'get',
    params: { token }
  })
}

// 获取在线用户
export function getOnlineUsers(query) {
  return request({
    url: url + '/monitor/online/getOnlineUsers',
    method: 'get',
    params: query
  })
}

// 获取系统信息
export function getServerConfig() {
  return request({
    url: url + '/monitor/server/getServerConfig',
    method: 'get'
  })
}

/**
 *
 * @param {} query
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
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


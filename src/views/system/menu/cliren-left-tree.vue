<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-12 10:35:13
 * @LastEditors: anan
 * @LastEditTime: 2019-09-12 11:11:51
 -->
<template>
  <div>
    <el-row class="left-tree">
      <el-col :span="span" class="tree-margin">
        <el-input v-model="filterText" placeholder="请输入菜单名称" class="tree-input" type="width:80%" />
        <el-tree
          ref="menuList"
          :check-strictly="checkStrictly"
          :data="routesData"
          :props="defaultProps"
          default-expand-all
          highlight-current
          :expand-on-click-node="expandOnClickNode"
          check-on-click-node
          node-key="menuId"
          :show-checkbox="showCheckbox"
          :filter-node-method="filterNode"
          class="permission-tree"
          @node-click="handleNodeClick"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { getMenuLists } from '@/api/article'

export default {
  data() {
    return {
      span: 24,
      filterText: '',
      showCheckbox: false,
      checkStrictly: false,
      routesData: [],
      expandOnClickNode: false,
      listQuery: {
        page: 1,
        limit: 8
      },
      defaultProps: {
        children: 'children',
        label: 'menuName'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.menuList.filter(val)
    }
  },
  created() {
    this.initMenuList()
  },
  methods: {
    // 初始化部门列表
    initMenuList() {
      this.listLoading = true
      getMenuLists(this.listQuery).then(response => {
        this.routesData = response.data// [0].children
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 点击树节点获取用户列表
    handleNodeClick(data) {
      this.menuDate = data
      this.$emit('updateTreeMenuId', data)
    },
    // 检索部门树，返回符合参数值的树
    retrievalTree(arr, data, newArr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].menuId === data.menuId) {
          newArr.push(arr[i])
        } else {
          if (arr[i].children) {
            this.retrievalTree(arr[i].children, data, newArr)
          }
        }
      }
    },
    // 获取该部门下所有ID进一个数组内
    retrievalDeptId(arr, newArr) {
      arr.forEach(menu => {
        newArr.push(menu.menuId)
        if (menu.children) {
          this.retrievalDeptId(menu.children, newArr)
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

<style>
.left-tree {
  border: 1px solid #e6ebf5;
  border-radius: 5px;
}
.tree-margin {
  margin: 0px;
  text-align: center;
}
.tree-input {
  width: 90%;
  margin-top: 15px;
  margin-bottom: 10px;
}

.permission-tree {
  margin-bottom: 30px;
}
.vertical-line {
  color: #409eff;
  height: 200px;
  width: 100%;
  border: 1px solid #000;
}
/* .el-input {
  margin: 10px;
} */
</style>

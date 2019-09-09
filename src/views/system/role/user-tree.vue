<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-08-28 16:48:07
 * @LastEditors: anan
 * @LastEditTime: 2019-09-09 15:52:29
 -->
<template>
  <div>
    <el-row class="left-tree">
      <el-col :span="span" class="tree-margin">
        <el-input v-model="filterText" placeholder="过滤" class="tree-input" type="width:80%" />
        <div class="tree">
          <el-tree
            ref="userList"
            :render-content="renderContent"
            :props="defaultProps"
            :data="data"
            show-checkbox
            default-expand-all
            :expand-on-click-node="expandOnClickNode"
            node-key="userId"
            empty-text="没有菜单"
            highlight-current
            check-on-click-node
            :default-checked-keys="defaultCheckedKey"
            class="memu-tree"
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { getUserList } from '@/api/article'

export default {
  props: {
    roleId: {
      type: Number,
      default: null
    },
    userData: {
      type: Array,
      default: () => []
    },
    sure: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 8
      },
      span: 24,
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'userNick'
      },
      defaultCheckedKey: [],
      expandOnClickNode: false
    }
  },
  watch: {
    userData(val) {
      this.$refs.userList.setCheckedKeys([])
      this.defaultCheckedKey = val
      var data = this.data
      for (let i = 0; i < data.length; i++) {
        if (data[i].userId === 1) {
          data[i]['disabled'] = true
          break
        }
      }
    },
    sure(val) {
      // 向父组件传值
      this.$emit('editUser', this.$refs.userList.getCheckedNodes())
    }
  },
  mounted() {
    this.initUserList()
  },
  methods: {
    // 初始化部门列表
    initUserList() {
      this.listLoading = true
      getUserList(this.listQuery).then(response => {
        this.data = response.data.records // [0].children
      })
    },

    // 点击树节点获取用户列表
    handleNodeClick(data) {
      // this.listLoading = true
      // 遍历部门及下级部门的所有ID
      // var depts = []
      // this.retrievalTree(this.routesData, data, depts)
      // 获取该部门下所有ID进一个数组内
      // var deptIds = []
      // this.retrievalDeptId(depts, deptIds)
      // 获取后台数据
      // getUserByDeptIds(deptIds.join(',')).then(response => {
      //   this.deptUser = response.data
      //   this.$store.dispatch('user/SET_USERLIST', response.data)
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })

      // var test = this.$refs.deptList.getCheckedKeys()

    },
    renderContent(h, { node, data, store }) {
      console.log(node)
      console.log(data.userName)
      console.log(store)
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            {data.userName}
          </span>
        </span>)
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

.menu-tree {
  margin-bottom: 30px;
}
.vertical-line {
  color: #409eff;
  height: 200px;
  width: 100%;
  border: 1px solid #000;
}
.el-tree {
  min-width: 100%;
  font-size: 14px;
  display: inline-block;
}
.tree {
  overflow-y: auto;
  overflow-x: scroll;
  height: 400px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

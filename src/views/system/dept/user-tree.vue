<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-12 10:35:13
 * @LastEditors: anan
 * @LastEditTime: 2019-09-21 17:48:18
 -->
<template>
  <div>
    <el-row class="left-tree">
      <el-col :span="span" class="tree-margin">
        <el-input v-model="filterText" placeholder="请输入用户名称" class="tree-input" type="width:80%" />
        <el-tree
          ref="deptList"
          :check-strictly="checkStrictly"
          :data="routesData"
          :props="defaultProps"
          default-expand-all
          highlight-current
          :expand-on-click-node="expandOnClickNode"
          check-on-click-node
          node-key="userId"
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
        limit: 100
      },
      defaultProps: {
        children: 'children',
        label: 'userNick'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.deptList.filter(val)
    }
  },
  created() {
    this.initUserList()
  },
  methods: {
    // 初始化部门列表
    initUserList() {
      this.$store.dispatch('user/getUserList', this.listQuery).then(() => {
        this.routesData = this.$store.state.user.userList
      })
    },
    // 点击树节点获取用户列表
    handleNodeClick(data) {
      this.$emit('updateTreeUserId', data)
    },
    // 检索部门树，返回符合参数值的树
    retrievalTree(arr, data, newArr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].deptId === data.deptId) {
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
      arr.forEach(dept => {
        newArr.push(dept.deptId)
        if (dept.children) {
          this.retrievalDeptId(dept.children, newArr)
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

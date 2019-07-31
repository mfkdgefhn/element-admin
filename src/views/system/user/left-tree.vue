<template>
  <div>
    <el-row class="left-tree">
      <el-col :span="span" class="tree-margin">
        <el-input v-model="filterText" placeholder="过滤" class="tree-input" type="width:80%" />
        <el-tree
          ref="deptList"
          :check-strictly="checkStrictly"
          :data="routesData"
          default-expand-all
          highlight-current
          :expand-on-click-node="expandOnClickNode"
          check-on-click-node
          node-key="id"
          :show-checkbox="showCheckbox"
          :filter-node-method="filterNode"
          class="permission-tree"
          @node-click="handleNodeClick"
        />

        <!-- :check-on-click-node="checkNode" -->
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { getDeptList, getUserByDeptIds } from '@/api/article'
// import { getDeptList } from '@/api/system'

export default {
  data() {
    return {
      span: 24,
      filterText: '',
      expandAll: false,
      checkNode: true,
      showCheckbox: false,
      checkStrictly: false,
      routesData: [],
      expandOnClickNode: false,
      deptUser: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      listQuery: {
        page: 1,
        limit: 8
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.deptList.filter(val)
    }
  },
  created() {
    this.initDeptList()
  },
  methods: {
    // 初始化部门列表
    initDeptList() {
      this.listLoading = true
      getDeptList(this.listQuery).then(response => {
        this.routesData = response.data// [0].children
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 点击树节点获取用户列表
    handleNodeClick(data) {
      this.listLoading = true
      // 遍历部门及下级部门的所有ID
      var depts = []
      this.retrievalTree(this.routesData, data, depts)
      // 获取该部门下所有ID进一个数组内
      var deptIds = []
      this.retrievalDeptId(depts, deptIds)
      // 获取后台数据
      getUserByDeptIds(deptIds.join(',')).then(response => {
        this.deptUser = response.data
        this.$store.dispatch('user/SET_USERLIST', response.data)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })

      // var test = this.$refs.deptList.getCheckedKeys()
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
    Checkbox() {
      this.showCheckbox = !this.showCheckbox
    },
    expand() {
      this.expandAll = !this.expandAll
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getCheckedNodes() {
      console.log(this.$refs.deptList.getCheckedNodes())
    },
    getCheckedKeys() {
      console.log(this.$refs.deptList.getCheckedKeys())
    },
    setCheckedNodes() {
      this.$refs.deptList.setCheckedNodes([{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 9,
        label: '三级 1-1-1'
      }])
    },
    setCheckedKeys() {
      var test = this.$refs.deptList.getCheckedKeys()
      test.push(1)
    },
    resetChecked() {
      this.$refs.deptList.setCheckedKeys([])
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
